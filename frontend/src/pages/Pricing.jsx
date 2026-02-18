import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "../query/client";
import { useSelector } from "react-redux";
import { FiCheck, FiZap, FiAward, FiArrowRight, FiShield, FiStar } from "react-icons/fi";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const PLANS = [
  {
    id: "monthly",
    name: "Monthly",
    price: 299,
    currency: "PKR",
    period: "per month",
    savings: null,
    description: "Perfect for trying out Buddy. Cancel anytime.",
    features: [
      "All courses & short notes",
      "Interactive quizzes",
      "Past paper library",
      "Visual mind maps",
      "Buddy AI Chat",
      "Short & long questions (AI evaluated)",
    ],
    cta: "Get Started",
    popular: false,
    icon: FiZap,
    color: "indigo",
  },
  {
    id: "six_month",
    name: "6 Months",
    price: 499,
    currency: "PKR",
    period: "for 6 months",
    savings: "72%",
    perMonth: "~83 PKR/mo",
    description: "Best value for serious students. Hand recommended.",
    features: [
      "Everything in Monthly",
      "500+ past papers",
      "Unlimited AI Chat",
      "Priority support",
      "Progress analytics",
      "Download notes offline",
    ],
    cta: "Best Deal",
    popular: true,
    handRecommended: true,
    icon: FiStar,
    color: "amber",
  },
  {
    id: "yearly",
    name: "1 Year",
    price: 899,
    currency: "PKR",
    period: "for 12 months",
    savings: "75%",
    perMonth: "~75 PKR/mo",
    description: "Maximum savings. Lock in the lowest rate.",
    features: [
      "Everything in 6 Months",
      "Certificate of completion",
      "Early access to new courses",
      "1-on-1 doubt sessions (2/month)",
      "Dedicated support",
    ],
    cta: "Maximum Savings",
    popular: false,
    icon: FiAward,
    color: "purple",
  },
];

export default function Pricing() {
  const [searchParams] = useSearchParams();
  const [loadingPlan, setLoadingPlan] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const queryClient = useQueryClient();

  useEffect(() => {
    const success = searchParams.get("success");
    const sessionId = searchParams.get("session_id");
    const canceled = searchParams.get("canceled");

    if (success === "true" && sessionId) {
      window.history.replaceState({}, "", window.location.pathname);
      apiFetch("/api/payment/confirm-success", {
        method: "POST",
        body: JSON.stringify({ session_id: sessionId }),
      })
        .then((r) => r.json())
        .then((data) => {
          if (data.success) {
            toast.success("Welcome aboard! You now have premium access.");
            queryClient.invalidateQueries({ queryKey: ["user"] });
          } else {
            toast.success("Payment confirmed! Your account is being upgraded.");
            queryClient.invalidateQueries({ queryKey: ["user"] });
          }
        })
        .catch(() => {
          queryClient.invalidateQueries({ queryKey: ["user"] });
        });
    } else if (success === "true") {
      toast.success("Welcome to the premium club!");
      window.history.replaceState({}, "", window.location.pathname);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    }

    if (canceled === "true") {
      toast("Checkout canceled. No worries, we're here when you're ready!", { icon: "ℹ️" });
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, [searchParams, queryClient]);

  const handleCheckout = async (planId) => {
    if (!user) {
      toast.error("Please sign in to upgrade your plan.");
      return;
    }
    setLoadingPlan(planId);
    try {
      const res = await apiFetch("/api/payment/create-checkout-session", {
        method: "POST",
        body: JSON.stringify({
          plan: planId,
          customerEmail: user?.email,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to initiate secure checkout");
      if (data.url) window.location.href = data.url;
    } catch (err) {
      toast.error(err.message || "Failed to securely redirect to checkout");
      setLoadingPlan(null);
    }
  };

  const isPremium = user?.plan === "pro" || user?.plan === "ultra_pro" || ["monthly", "six_month", "yearly"].includes(user?.plan);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="w-full min-h-screen bg-[#fdfdfd] pb-24">
      <section className="px-6 pt-12 pb-12 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase tracking-wider mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
          Billing & Plans
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight"
        >
          Invest in your <span className="text-indigo-600">future self.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-lg text-gray-500 font-medium max-w-2xl mx-auto"
        >
          Unlock unlimited access. Choose the plan that fits your goals.
        </motion.p>

        {isPremium && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8">
            <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-indigo-600 text-white shadow-xl shadow-indigo-100">
              <span className="text-xl">✨</span>
              <span className="text-sm font-black uppercase tracking-widest">Active Plan</span>
            </div>
          </motion.div>
        )}
      </section>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="px-6 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto"
      >
        {PLANS.map((plan) => {
          const Icon = plan.icon;
          const isSelected = plan.id === user?.plan;

          return (
            <motion.div
              key={plan.id}
              variants={itemVariants}
              className={`relative rounded-2xl p-6 md:p-8 border transition-all duration-300 hover:scale-[1.02] ${
                plan.popular
                  ? "bg-white border-amber-200 shadow-[0_20px_50px_rgba(245,158,11,0.15)] ring-2 ring-amber-200"
                  : "bg-white border-gray-100 shadow-sm hover:shadow-xl"
              }`}
            >
              {(plan.popular || plan.handRecommended) && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-lg">
                  {plan.handRecommended ? "👋 Hand Recommended" : "Most Popular"}
                </div>
              )}

              {plan.savings && !plan.handRecommended && (
                <div className="absolute top-4 right-4 px-2 py-1 rounded-lg bg-emerald-100 text-emerald-700 text-[10px] font-bold">
                  Save {plan.savings}
                </div>
              )}

              <div className="flex items-center justify-between mb-6">
                <div className={`p-3 rounded-2xl ${plan.popular ? "bg-amber-50 text-amber-600" : "bg-gray-50 text-gray-500"}`}>
                  <Icon size={28} />
                </div>
                {plan.savings && plan.handRecommended && (
                  <span className="px-2 py-1 rounded-lg bg-emerald-100 text-emerald-700 text-[10px] font-bold">Save {plan.savings}</span>
                )}
              </div>

              <h2 className="text-xl font-black text-gray-900 mb-1">{plan.name}</h2>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-3xl font-black text-gray-900">{plan.price}</span>
                <span className="text-sm font-bold text-gray-500">{plan.currency}</span>
              </div>
              <p className="text-xs text-gray-500 mb-4">{plan.period}</p>
              {plan.perMonth && (
                <p className="text-xs font-semibold text-amber-600 mb-4">{plan.perMonth}</p>
              )}
              <p className="text-sm text-gray-500 mb-6 italic">"{plan.description}"</p>

              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <div className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${plan.popular ? "bg-amber-50 text-amber-600" : "bg-gray-50 text-gray-400"}`}>
                      <FiCheck size={12} />
                    </div>
                    <span className="text-sm font-medium text-gray-600">{f}</span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => handleCheckout(plan.id)}
                disabled={!!loadingPlan || isSelected}
                className={`w-full py-4 rounded-xl font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                  isSelected
                    ? "bg-gray-100 text-gray-400 cursor-default"
                    : plan.popular
                    ? "bg-amber-500 text-white hover:bg-amber-600 active:scale-95 shadow-lg shadow-amber-200"
                    : "bg-gray-900 text-white hover:bg-black active:scale-95"
                } disabled:opacity-60 disabled:cursor-not-allowed`}
              >
                {loadingPlan === plan.id ? (
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : isSelected ? (
                  "Current Plan"
                ) : (
                  <>
                    {plan.cta} <FiArrowRight size={16} />
                  </>
                )}
              </button>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-16 pt-8 border-t border-gray-100 max-w-4xl mx-auto text-center px-6"
      >
        <div className="flex items-center justify-center gap-2 mb-2 text-gray-400">
          <FiShield size={18} />
          <span className="text-xs font-bold uppercase tracking-widest">Secure Payments</span>
        </div>
        <p className="text-sm text-gray-400 max-w-lg mx-auto">
          Payments are processed securely. Prices in PKR.
        </p>
      </motion.section>
    </div>
  );
}
