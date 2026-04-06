'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, X } from 'lucide-react';
import styles from './page.module.css';

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Unlock Full Access to Top Jobs</h1>
        <p className={styles.subtitle}>
          Choose the right plan to supercharge your career. Whether you're just browsing or actively hunting, we have you covered.
        </p>

        <div className={styles.toggleWrapper}>
          <span className={`${styles.toggleLabel} ${!isYearly ? styles.active : ''}`}>Monthly</span>
          <div 
            className={`${styles.toggle} ${isYearly ? styles.yearly : ''}`}
            onClick={() => setIsYearly(!isYearly)}
          >
            <div className={styles.toggleIndicator}></div>
          </div>
          <span className={`${styles.toggleLabel} ${isYearly ? styles.active : ''}`}>Yearly (Save 20%)</span>
        </div>
      </header>

      <div className={styles.grid}>
        {/* FREE TIER */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Basic</h2>
          <p className={styles.cardDesc}>For professionals casually exploring the job market.</p>
          <div className={styles.price}>
            $0 <span>/ mo</span>
          </div>

          <ul className={styles.featuresList}>
            <li className={styles.featureItem}>
              <Check className={styles.featureIcon} size={20} /> View standard job listings
            </li>
            <li className={styles.featureItem}>
              <Check className={styles.featureIcon} size={20} /> Build a basic profile
            </li>
            <li className={styles.featureItem}>
              <Check className={styles.featureIcon} size={20} /> Track application status
            </li>
            <li className={styles.featureItem} style={{ color: 'var(--color-text-muted)' }}>
              <X className={`${styles.featureIcon} ${styles.missing}`} size={20} /> Access to Premium Jobs
            </li>
            <li className={styles.featureItem} style={{ color: 'var(--color-text-muted)' }}>
              <X className={`${styles.featureIcon} ${styles.missing}`} size={20} /> AI Cover Letter Generator
            </li>
            <li className={styles.featureItem} style={{ color: 'var(--color-text-muted)' }}>
              <X className={`${styles.featureIcon} ${styles.missing}`} size={20} /> Direct employer messaging
            </li>
          </ul>

          <Link href="/auth/register" className={`${styles.btnAction} ${styles.btnSecondary}`} style={{ display: 'block' }}>
            Get Started
          </Link>
        </div>

        {/* PRO TIER */}
        <div className={`${styles.card} ${styles.popular}`}>
          <div className={styles.popularBadge}>MOST POPULAR</div>
          <h2 className={styles.cardTitle}>Pro Seeker</h2>
          <p className={styles.cardDesc}>The ultimate toolkit for landing your dream job fast.</p>
          <div className={styles.price}>
            ${isYearly ? '12' : '15'} <span>/ mo</span>
          </div>

          <ul className={styles.featuresList}>
            <li className={styles.featureItem}>
              <Check className={styles.featureIcon} size={20} /> View standard job listings
            </li>
            <li className={styles.featureItem}>
              <Check className={styles.featureIcon} size={20} /> Build a standout profile
            </li>
            <li className={styles.featureItem}>
              <Check className={styles.featureIcon} size={20} /> Track application status
            </li>
            <li className={styles.featureItem}>
              <Check className={styles.featureIcon} size={20} /> <strong>Access to Premium Jobs</strong>
            </li>
            <li className={styles.featureItem}>
              <Check className={styles.featureIcon} size={20} /> <strong>AI Cover Letter Generator</strong>
            </li>
            <li className={styles.featureItem}>
              <Check className={styles.featureIcon} size={20} /> Priority support
            </li>
          </ul>

          <Link href="/auth/register?plan=pro" className={`${styles.btnAction} ${styles.btnPrimary}`} style={{ display: 'block' }}>
            Upgrade to Pro
          </Link>
        </div>

        {/* EMPLOYER TIER */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Employer</h2>
          <p className={styles.cardDesc}>For teams looking to hire top-tier verified talent.</p>
          <div className={styles.price}>
            ${isYearly ? '79' : '99'} <span>/ mo</span>
          </div>

          <ul className={styles.featuresList}>
            <li className={styles.featureItem}>
              <Check className={styles.featureIcon} size={20} /> Unlimited standard job posts
            </li>
            <li className={styles.featureItem}>
              <Check className={styles.featureIcon} size={20} /> 5 Premium boosted posts/mo
            </li>
            <li className={styles.featureItem}>
              <Check className={styles.featureIcon} size={20} /> Applicant Tracking Kanban
            </li>
            <li className={styles.featureItem}>
              <Check className={styles.featureIcon} size={20} /> AI Candidate matching
            </li>
            <li className={styles.featureItem}>
              <Check className={styles.featureIcon} size={20} /> Custom screening questions
            </li>
            <li className={styles.featureItem}>
              <Check className={styles.featureIcon} size={20} /> Advanced analytics dashboard
            </li>
          </ul>

          <Link href="/employer/dashboard" className={`${styles.btnAction} ${styles.btnSecondary}`} style={{ display: 'block' }}>
            Start Hiring
          </Link>
        </div>
      </div>
    </div>
  );
}
