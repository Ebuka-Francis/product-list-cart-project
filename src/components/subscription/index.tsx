"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { startPaystackCheckout, PLAN_PRICING    } from "@/lib/Paystack";
import { SubscriptionPlan } from "@/types/types";

const PLANS: { name: SubscriptionPlan; perks: string[] }[] = [
  { name: "Starter", perks: ["Up to 10 meal listings", "Basic vendor profile"] },
  { name: "Business", perks: ["Up to 50 meal listings", "Priority placement", "Basic analytics"] },
  { name: "Premium", perks: ["Unlimited meal listings", "Top placement", "Full analytics", "Priority support"] },
];

interface SubscriptionPlansProps {
  vendorId: string;
  currentPlan?: SubscriptionPlan;
  onSubscribed?: (plan: SubscriptionPlan) => void;
}

export default function SubscriptionPlans({
  vendorId,
  currentPlan,
  onSubscribed,
}: SubscriptionPlansProps) {
  const { user } = useAuth();
  const [processingPlan, setProcessingPlan] = useState<SubscriptionPlan | null>(null);
  const [error, setError] = useState("");

  const handleSubscribe = async (plan: SubscriptionPlan) => {
    if (!user?.email) return;
    setError("");
    setProcessingPlan(plan);

    try {
      await startPaystackCheckout({
        email: user.email,
        plan,
        onSuccess: async (reference) => {
          const res = await fetch("/api/paystack/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ reference, vendorId, plan }),
          });

          if (!res.ok) {
            setError("Payment succeeded but we couldn't confirm it. Contact support with your reference: " + reference);
          } else {
            onSubscribed?.(plan);
          }
          setProcessingPlan(null);
        },
        onClose: () => setProcessingPlan(null),
      });
    } catch (err) {
      console.error(err);
      setError("Couldn't start checkout. Please try again.");
      setProcessingPlan(null);
    }
  };

  return (
    <div>
      <h3 className="mb-4 text-lg font-bold text-[#3a2418]">Choose a plan</h3>

      {error && (
        <p className="mb-4 rounded-xl bg-red-50 px-4 py-2.5 text-sm text-red-500">{error}</p>
      )}

      <div className="grid gap-4 sm:grid-cols-3">
        {PLANS.map(({ name, perks }) => {
          const isCurrent = currentPlan === name;
          return (
            <div
              key={name}
              className={`flex flex-col rounded-2xl border px-5 py-5 ${
                isCurrent ? "border-[#c8632a] bg-[#c8632a]/5" : "border-[#e4d3c0] bg-white"
              }`}
            >
              <h4 className="text-sm font-bold text-[#3a2418]">{name}</h4>
              <p className="mt-1 text-xs text-[#a68a72]">{PLAN_PRICING[name].label}</p>

              <ul className="mt-4 flex-1 space-y-2">
                {perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-2 text-xs text-[#3a2418]">
                    <Check size={14} className="mt-0.5 shrink-0 text-[#c8632a]" />
                    {perk}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSubscribe(name)}
                disabled={isCurrent || processingPlan !== null}
                className="mt-5 w-full rounded-xl bg-[#c8632a] py-2.5 text-xs font-semibold text-white transition hover:bg-[#b3551f] disabled:opacity-60"
              >
                {isCurrent
                  ? "Current plan"
                  : processingPlan === name
                  ? "Processing..."
                  : "Subscribe"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}