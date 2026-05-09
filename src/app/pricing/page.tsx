'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, X, Crown } from 'lucide-react';
import { PaystackButton } from '@/components/PaystackButton';
import { useAppStore } from '@/lib/store';
import styles from './page.module.css';

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);
  const [email, setEmail] = useState('');
  const [showEmailInput, setShowEmailInput] = useState<string | null>(null);
  const { isPremium, plan, activatePremium, userEmail } = useAppStore();

  const proMonthly = 22500;
  const proYearly = Math.round(22500 * 12 * 0.8);
  const employerMonthly = 148500;
  const employerYearly = Math.round(148500 * 12 * 0.8);

  const effectiveEmail = email || userEmail || '';

  const handlePlanClick = (planKey: string) => {
    if (!effectiveEmail) {
      setShowEmailInput(planKey);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Unlock Full Access to Top Jobs</h1>
        <p className={styles.subtitle}>
          Choose the right plan to supercharge your career. Payments processed securely via Paystack.
        </p>

        {isPremium && (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(16,185,129,0.1)', color: '#059669', padding: '8px 20px', borderRadius: 'var(--radius-full)', fontWeight: 700, margin: '16px 0' }}>
            <Crown size={16} /> Active Plan: {plan === 'pro' ? 'Pro Seeker' : 'Employer'} — Access granted
          </div>
        )}

        <div className={styles.toggleWrapper}>
          <span className={`${styles.toggleLabel} ${!isYearly ? styles.active : ''}`}>Monthly</span>
          <div className={`${styles.toggle} ${isYearly ? styles.yearly : ''}`} onClick={() => setIsYearly(!isYearly)}>
            <div className={styles.toggleIndicator}></div>
          </div>
          <span className={`${styles.toggleLabel} ${isYearly ? styles.active : ''}`}>Yearly (Save 20%)</span>
        </div>
      </header>

      {/* Email collector (shows when needed) */}
      {showEmailInput && (
        <div style={{ background: '#fffbeb', border: '1px solid #fbbf24', borderRadius: 'var(--radius-md)', padding: 'var(--spacing-lg)', maxWidth: '500px', margin: '0 auto' }}>
          <p style={{ fontWeight: 600, marginBottom: '12px' }}>Enter your email to proceed with payment:</p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ flex: 1, padding: '10px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', fontSize: '0.9rem' }}
            />
            <button
              onClick={() => setShowEmailInput(null)}
              style={{ padding: '10px 16px', background: 'var(--color-primary)', color: 'white', borderRadius: 'var(--radius-sm)', fontWeight: 600 }}
            >
              Continue
            </button>
          </div>
        </div>
      )}

      <div className={styles.grid}>
        {/* FREE TIER */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Basic</h2>
          <p className={styles.cardDesc}>For professionals casually exploring the job market.</p>
          <div className={styles.price}>₦0 <span>/ mo</span></div>

          <ul className={styles.featuresList}>
            <li className={styles.featureItem}><Check className={styles.featureIcon} size={20} /> View standard job listings</li>
            <li className={styles.featureItem}><Check className={styles.featureIcon} size={20} /> Build a basic profile</li>
            <li className={styles.featureItem}><Check className={styles.featureIcon} size={20} /> Track application status</li>
            <li className={styles.featureItem} style={{ color: 'var(--color-text-muted)' }}>
              <X className={`${styles.featureIcon} ${styles.missing}`} size={20} /> Premium job listings
            </li>
            <li className={styles.featureItem} style={{ color: 'var(--color-text-muted)' }}>
              <X className={`${styles.featureIcon} ${styles.missing}`} size={20} /> AI Cover Letter Generator
            </li>
            <li className={styles.featureItem} style={{ color: 'var(--color-text-muted)' }}>
              <X className={`${styles.featureIcon} ${styles.missing}`} size={20} /> CV PDF Download
            </li>
          </ul>

          <Link href="/auth/register" className={`${styles.btnAction} ${styles.btnSecondary}`} style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}>
            Get Started Free
          </Link>
        </div>

        {/* PRO SEEKER */}
        <div className={`${styles.card} ${styles.popular}`}>
          <div className={styles.popularBadge}>MOST POPULAR</div>
          <h2 className={styles.cardTitle}>Pro Seeker</h2>
          <p className={styles.cardDesc}>The ultimate toolkit for landing your dream job fast.</p>
          <div className={styles.price}>
            ₦{isYearly ? (proYearly / 12).toLocaleString() : proMonthly.toLocaleString()} <span>/ mo</span>
          </div>
          {isYearly && <div style={{ color: '#059669', fontSize: '0.85rem', fontWeight: 600, marginBottom: '8px' }}>Billed ₦{proYearly.toLocaleString()} / year</div>}

          <ul className={styles.featuresList}>
            <li className={styles.featureItem}><Check className={styles.featureIcon} size={20} /> All standard job listings</li>
            <li className={styles.featureItem}><Check className={styles.featureIcon} size={20} /> Build a standout profile</li>
            <li className={styles.featureItem}><Check className={styles.featureIcon} size={20} /> Application tracking</li>
            <li className={styles.featureItem}><Check className={styles.featureIcon} size={20} /> <strong>Full access to Premium Jobs</strong></li>
            <li className={styles.featureItem}><Check className={styles.featureIcon} size={20} /> <strong>AI Cover Letter Generator</strong></li>
            <li className={styles.featureItem}><Check className={styles.featureIcon} size={20} /> <strong>CV Builder PDF download</strong></li>
            <li className={styles.featureItem}><Check className={styles.featureIcon} size={20} /> Priority support</li>
          </ul>

          {isPremium && plan === 'pro' ? (
            <div style={{ background: 'rgba(16,185,129,0.1)', color: '#059669', padding: '12px', borderRadius: 'var(--radius-md)', textAlign: 'center', fontWeight: 700 }}>
              ✓ Current Plan
            </div>
          ) : (
            <div>
              {!effectiveEmail ? (
                <button
                  className={`${styles.btnAction} ${styles.btnPrimary}`}
                  style={{ width: '100%' }}
                  onClick={() => handlePlanClick('pro')}
                >
                  Upgrade to Pro
                </button>
              ) : (
                <PaystackButton
                  email={effectiveEmail}
                  amountNGN={isYearly ? proYearly : proMonthly}
                  label={`Subscribe — ₦${(isYearly ? proYearly : proMonthly).toLocaleString()}`}
                  purpose="pro_subscription"
                  plan="pro"
                  className={`${styles.btnAction} ${styles.btnPrimary}`}
                  style={{ width: '100%', justifyContent: 'center' }}
                  onSuccess={(ref) => activatePremium('pro', ref, effectiveEmail)}
                />
              )}
              {!effectiveEmail && (
                <input
                  type="email"
                  placeholder="Enter email to pay"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ width: '100%', marginTop: '8px', padding: '8px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', boxSizing: 'border-box' }}
                />
              )}
            </div>
          )}
        </div>

        {/* EMPLOYER */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Employer</h2>
          <p className={styles.cardDesc}>For teams looking to hire top-tier verified talent.</p>
          <div className={styles.price}>
            ₦{isYearly ? (employerYearly / 12).toLocaleString() : employerMonthly.toLocaleString()} <span>/ mo</span>
          </div>
          {isYearly && <div style={{ color: '#059669', fontSize: '0.85rem', fontWeight: 600, marginBottom: '8px' }}>Billed ₦{employerYearly.toLocaleString()} / year</div>}

          <ul className={styles.featuresList}>
            <li className={styles.featureItem}><Check className={styles.featureIcon} size={20} /> Unlimited standard job posts</li>
            <li className={styles.featureItem}><Check className={styles.featureIcon} size={20} /> 5 Premium boosted posts/mo</li>
            <li className={styles.featureItem}><Check className={styles.featureIcon} size={20} /> Applicant Tracking Kanban</li>
            <li className={styles.featureItem}><Check className={styles.featureIcon} size={20} /> AI candidate matching</li>
            <li className={styles.featureItem}><Check className={styles.featureIcon} size={20} /> Custom screening questions</li>
            <li className={styles.featureItem}><Check className={styles.featureIcon} size={20} /> Advanced analytics dashboard</li>
          </ul>

          {isPremium && plan === 'employer' ? (
            <div style={{ background: 'rgba(16,185,129,0.1)', color: '#059669', padding: '12px', borderRadius: 'var(--radius-md)', textAlign: 'center', fontWeight: 700 }}>
              ✓ Current Plan
            </div>
          ) : (
            <div>
              {!effectiveEmail ? (
                <button
                  className={`${styles.btnAction} ${styles.btnSecondary}`}
                  style={{ width: '100%' }}
                  onClick={() => handlePlanClick('employer')}
                >
                  Start Hiring
                </button>
              ) : (
                <PaystackButton
                  email={effectiveEmail}
                  amountNGN={isYearly ? employerYearly : employerMonthly}
                  label={`Subscribe — ₦${(isYearly ? employerYearly : employerMonthly).toLocaleString()}`}
                  purpose="employer_subscription"
                  plan="employer"
                  className={`${styles.btnAction} ${styles.btnSecondary}`}
                  style={{ width: '100%', justifyContent: 'center' }}
                  onSuccess={(ref) => activatePremium('employer', ref, effectiveEmail)}
                />
              )}
              {!effectiveEmail && (
                <input
                  type="email"
                  placeholder="Enter email to pay"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ width: '100%', marginTop: '8px', padding: '8px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', boxSizing: 'border-box' }}
                />
              )}
            </div>
          )}
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: 'var(--spacing-2xl)', color: 'var(--color-text-muted)', fontSize: '0.87rem' }}>
        <p>All payments are processed securely via <strong>Paystack</strong>. Subscriptions auto-renew monthly. Cancel anytime.</p>
        <p style={{ marginTop: '4px' }}>Test card: 4084 0840 8408 4081 · Any future expiry · CVV 408 · PIN 0000</p>
      </div>
    </div>
  );
}
