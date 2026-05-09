'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { SubscriptionState, SubscriptionPlan } from './types';

interface AppStore extends SubscriptionState {
  userEmail: string;
  userName: string;
  setUser: (email: string, name: string) => void;
  activatePremium: (plan: SubscriptionPlan, reference: string, email: string) => void;
  deactivatePremium: () => void;
  checkExpiry: () => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      isPremium: false,
      plan: 'free',
      expiresAt: null,
      reference: null,
      email: null,
      userEmail: '',
      userName: '',

      setUser: (email, name) => set({ userEmail: email, userName: name }),

      activatePremium: (plan, reference, email) => {
        const durationMs = plan === 'employer' ? 30 * 24 * 60 * 60 * 1000 : 30 * 24 * 60 * 60 * 1000;
        set({
          isPremium: true,
          plan,
          reference,
          email,
          expiresAt: Date.now() + durationMs,
          userEmail: email,
        });
      },

      deactivatePremium: () =>
        set({ isPremium: false, plan: 'free', expiresAt: null, reference: null }),

      checkExpiry: () => {
        const { expiresAt, isPremium } = get();
        if (isPremium && expiresAt && Date.now() > expiresAt) {
          set({ isPremium: false, plan: 'free', expiresAt: null, reference: null });
        }
      },
    }),
    { name: 'culturelogix-store' }
  )
);
