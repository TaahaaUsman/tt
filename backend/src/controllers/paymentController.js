import Stripe from "stripe";
import { getTokenFromRequest } from "../middlewares/auth.js";
import { verifyToken } from "../utils/jwt.js";
import db from "../config/db.js";
import User from "../models/User.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const FRONTEND_BASE = process.env.FRONTEND_URL || "http://localhost:5173";

/** Plan config: amount in smallest unit (paisa for PKR, cents for USD) */
const PLANS = {
  monthly: {
    name: "Monthly",
    description: "Full access for 1 month. All courses, notes, quizzes, past papers, AI Chat",
    amount: 29900, // 299 PKR
    currency: "pkr",
  },
  six_month: {
    name: "6 Months",
    description: "Best value - 6 months full access. 500+ past papers, priority support",
    amount: 49900, // 499 PKR
    currency: "pkr",
  },
  yearly: {
    name: "1 Year",
    description: "Maximum savings - 12 months. Certificate, early access, 1-on-1 sessions",
    amount: 89900, // 899 PKR
    currency: "pkr",
  },
  // Legacy plans (USD) – kept for backward compatibility
  pro: {
    name: "Pro",
    description: "Full access to all courses, notes, quizzes, past papers & mind maps",
    amount: 4900,
    currency: "usd",
  },
  ultra_pro: {
    name: "Ultra Pro",
    description: "Everything in Pro + certificate, priority support",
    amount: 9900,
    currency: "usd",
  },
};

export async function createCheckoutSession(req, res) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return res.status(503).json({ error: "Payments are not configured" });
    }
    const { plan, customerEmail } = req.body || {};
    const planConfig = PLANS[plan];
    if (!planConfig) {
      return res.status(400).json({ error: "Invalid plan. Use 'monthly', 'six_month', 'yearly', 'pro' or 'ultra_pro'" });
    }

    let userId = null;
    const token = getTokenFromRequest(req);
    if (token) {
      try {
        const decoded = verifyToken(token);
        userId = decoded?.id || decoded?._id;
      } catch (_) {}
    }

    const currency = planConfig.currency || "usd";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency,
            product_data: {
              name: planConfig.name + " Plan",
              description: planConfig.description,
              images: [],
            },
            unit_amount: planConfig.amount,
          },
          quantity: 1,
        },
      ],
      success_url: `${FRONTEND_BASE}/pricing?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${FRONTEND_BASE}/pricing?canceled=true`,
      customer_email: customerEmail || undefined,
      client_reference_id: userId ? String(userId) : undefined,
      metadata: { userId: userId ? String(userId) : "", plan },
    });

    res.json({ url: session.url, sessionId: session.id });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    res.status(500).json({ error: err.message || "Payment setup failed" });
  }
}

/** Stripe webhook: run with express.raw({ type: 'application/json' }) so req.body is Buffer */
export async function webhook(req, res) {
  const sig = req.headers["stripe-signature"];
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    console.warn("STRIPE_WEBHOOK_SECRET not set – webhook disabled");
    return res.status(503).send("Webhook not configured");
  }
  let event;
  try {
    const body = req.body;
    event = stripe.webhooks.constructEvent(body, sig, secret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const userId = session.client_reference_id || session.metadata?.userId;
    const plan = session.metadata?.plan;
    const validPlans = ["pro", "ultra_pro", "monthly", "six_month", "yearly"];
    if (userId && validPlans.includes(plan)) {
      try {
        await db();
        await User.findByIdAndUpdate(userId, { plan });
        console.log("Updated user", userId, "to plan", plan);
      } catch (err) {
        console.error("Webhook: failed to update user plan:", err);
      }
    }
  }

  res.json({ received: true });
}

/** Optional: confirm payment from frontend after redirect (for dev when webhook not reachable) */
export async function confirmSuccess(req, res) {
  try {
    const { session_id } = req.body || {};
    const token = getTokenFromRequest(req);
    if (!token || !session_id) {
      return res.status(400).json({ error: "session_id and auth required" });
    }
    const decoded = verifyToken(token);
    const userId = decoded?.id || decoded?._id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const session = await stripe.checkout.sessions.retrieve(session_id);
    if (session.payment_status !== "paid") {
      return res.status(400).json({ error: "Payment not completed" });
    }
    const plan = session.metadata?.plan;
    const refId = session.client_reference_id;
    const validPlans = ["pro", "ultra_pro", "monthly", "six_month", "yearly"];
    if ((refId !== String(userId) && refId !== userId) || !plan || !validPlans.includes(plan)) {
      return res.status(403).json({ error: "Session does not match your account" });
    }

    await db();
    await User.findByIdAndUpdate(userId, { plan });
    return res.json({ success: true, plan });
  } catch (err) {
    console.error("confirmSuccess error:", err);
    return res.status(500).json({ error: err.message || "Failed to confirm" });
  }
}
