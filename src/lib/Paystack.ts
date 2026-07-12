import { SubscriptionPlan } from "@/types/types"

// TODO: adjust these to your actual pricing (kobo — Paystack amounts are in the smallest currency unit)
export const PLAN_PRICING: Record<SubscriptionPlan, { amountKobo: number; label: string }> = {
  Starter: { amountKobo: 500000, label: "₦5,000 / month" }, // ₦5,000
  Business: { amountKobo: 1500000, label: "₦15,000 / month" }, // ₦15,000
  Premium: { amountKobo: 3500000, label: "₦35,000 / month" }, // ₦35,000
};

declare global {
  interface Window {
    PaystackPop?: {
      setup: (options: Record<string, unknown>) => { openIframe: () => void };
    };
  }
}

let scriptPromise: Promise<void> | null = null;

export function loadPaystackScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.PaystackPop) return Promise.resolve();
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Paystack script"));
    document.body.appendChild(script);
  });

  return scriptPromise;
}

interface StartPaystackParams {
  email: string;
  plan: SubscriptionPlan;
  onSuccess: (reference: string) => void;
  onClose?: () => void;
}

export async function startPaystackCheckout({
  email,
  plan,
  onSuccess,
  onClose,
}: StartPaystackParams) {
  await loadPaystackScript();
  if (!window.PaystackPop) throw new Error("Paystack script not available");

  const handler = window.PaystackPop.setup({
    key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
    email,
    amount: PLAN_PRICING[plan].amountKobo,
    currency: "NGN",
    metadata: { plan },
    callback: (response: { reference: string }) => {
      onSuccess(response.reference);
    },
    onClose: () => {
      onClose?.();
    },
  });

  handler.openIframe();
}