# Stripe – Next steps (payment integration)

Stripe test-mode payment is wired: **Pro** ($49) and **Ultra Pro** ($99) one-time checkout. Below is what to do next.

---

## 1. Test the flow (already working)

- Open **Pricing** from the navbar or home “View plans”.
- Click **Get Pro** or **Get Ultra Pro** → you are redirected to Stripe Checkout.
- Use test card: **4242 4242 4242 4242**, any future expiry, any CVC.
- After payment you are sent back to `/pricing?success=true` and see a success toast.

---

## 2. Go live with real payments

1. **Stripe Dashboard**
   - Turn off **Test mode** (toggle in Stripe Dashboard).
   - Get your **live** keys: [API keys](https://dashboard.stripe.com/apikeys).

2. **Backend**
   - In **backend `.env`** set:
     - `STRIPE_SECRET_KEY=sk_live_...` (replace test key).

3. **Frontend**
   - In **frontend `.env`** set:
     - `VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...` (optional for now; used if you add Stripe.js on frontend later).

4. **Success / cancel URLs**
   - Backend already uses `FRONTEND_URL` for `success_url` and `cancel_url`. Set:
     - Production: `FRONTEND_URL=https://www.thevu.world` (or your live frontend URL).

---

## 3. Record that a user has paid (recommended)

Right now the app does not save “this user bought Pro/Ultra Pro”. To use payments for access control:

1. **Backend**
   - Add a field on the **User** model, e.g. `plan: { type: String, enum: ['free', 'pro', 'ultra_pro'], default: 'free' }`.
   - Add a **Stripe webhook** endpoint (e.g. `POST /api/payment/webhook`) that:
     - Verifies the event with `stripe.webhooks.constructEvent` using `STRIPE_WEBHOOK_SECRET`.
     - On `checkout.session.completed`, read `client_reference_id` or `metadata.plan` (you’d set these when creating the session) and update the user’s `plan` in the DB.

2. **Create Checkout Session**
   - When calling `stripe.checkout.sessions.create`, pass:
     - `client_reference_id: userId` (or store userId in `metadata.userId` / `metadata.plan`).
   - So when the webhook fires, you know which user to upgrade.

3. **Frontend / routes**
   - Where you want “Pro only” or “Ultra Pro only” content, read the user’s `plan` (e.g. from `/api/auth/getUser` if you add `plan` there) and show or hide content / redirect accordingly.

---

## 4. Webhook setup (for automatic upgrade)

1. **Stripe Dashboard**
   - [Webhooks](https://dashboard.stripe.com/webhooks) → Add endpoint.
   - URL: `https://your-backend.com/api/payment/webhook`.
   - Events: `checkout.session.completed`.
   - Copy the **Signing secret** (e.g. `whsec_...`).

2. **Backend**
   - In **backend `.env`** add: `STRIPE_WEBHOOK_SECRET=whsec_...`.
   - Implement the webhook route:
     - Use `raw body` for the webhook (Stripe needs the raw request body to verify the signature).
     - In Express, for that route only, disable `express.json()` and read `req.rawBody` or use `express.raw({ type: 'application/json' })` for the webhook path.
   - In the handler: verify event, then update user `plan` as in step 3 above.

---

## 5. Optional improvements

- **Success page**: Instead of redirecting to `/pricing?success=true`, redirect to a dedicated `/pricing/success` page with a thank-you message and next steps.
- **Customer portal**: Use [Stripe Customer Portal](https://stripe.com/docs/customer-management/customer-portal) so users can see their payments or manage billing (e.g. if you add subscriptions later).
- **Subscriptions**: If you switch to monthly/yearly plans, use `mode: 'subscription'` and Stripe Price IDs (recurring) instead of one-time `payment` and `price_data`.

---

## Summary

| Step | What to do |
|------|------------|
| Now | Test with card 4242 4242 4242 4242 on Pricing page. |
| Go live | Replace test keys with live keys; set `FRONTEND_URL` for production. |
| Track plans | Add `plan` to User model; set `client_reference_id`/metadata in checkout; handle `checkout.session.completed` in a webhook and update user. |
| Webhook | Add endpoint, set `STRIPE_WEBHOOK_SECRET`, verify event and update user. |

Your test keys are already in backend and frontend `.env`; no code change is needed to test. For production and plan-based access, do steps 2–4 above.
