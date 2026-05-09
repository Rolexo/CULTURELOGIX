'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import type { SubscriptionPlan } from '@/lib/types';

declare global {
  interface Window {
    PaystackPop: {
      setup: (opts: PaystackOptions) => { openIframe: () => void };
    };
  }
}

interface PaystackOptions {
  key: string;
  email: string;
  amount: number;
  currency: string;
  ref: string;
  metadata?: Record<string, string>;
  callback: (response: { reference: string }) => void;
  onClose: () => void;
}

interface PaystackButtonProps {
  email: string;
  /** Amount in NGN (naira), NOT kobo */
  amountNGN: number;
  label: string;
  purpose: 'cv' | 'cover_letter' | 'pro_subscription' | 'employer_subscription';
  plan?: SubscriptionPlan;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  onSuccess?: (reference: string) => void;
  onClose?: () => void;
}

async function verifyPayment(reference: string) {
  const res = await fetch(`/api/payment/verify?reference=${reference}`);
  return res.json();
}

export function PaystackButton({
  email,
  amountNGN,
  label,
  purpose,
  plan,
  className,
  style,
  disabled,
  onSuccess,
  onClose,
}: PaystackButtonProps) {
  const [loading, setLoading] = useState(false);
  const activatePremium = useAppStore((s) => s.activatePremium);

  const handleClick = () => {
    if (disabled || loading) return;

    const effectiveEmail = email || 'guest@culturelogix.com';

    const ref = `clx_${purpose}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

    if (typeof window === 'undefined' || !window.PaystackPop) {
      alert('Payment gateway is loading. Please try again in a moment.');
      return;
    }

    const handler = window.PaystackPop.setup({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
      email: effectiveEmail,
      amount: amountNGN * 100, // kobo
      currency: 'NGN',
      ref,
      metadata: { purpose, plan: plan || 'pro' },
      callback: async (response) => {
        setLoading(true);
        try {
          const result = await verifyPayment(response.reference);
          if (result?.data?.status === 'success') {
            if (plan && (purpose === 'pro_subscription' || purpose === 'employer_subscription')) {
              activatePremium(plan, response.reference, effectiveEmail);
            }
            onSuccess?.(response.reference);
          } else {
            alert('Payment verification failed. Please contact support.');
          }
        } finally {
          setLoading(false);
        }
      },
      onClose: () => {
        onClose?.();
      },
    });

    handler.openIframe();
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled || loading}
      className={className}
      style={style}
    >
      {loading ? 'Verifying…' : label}
    </button>
  );
}
