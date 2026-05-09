'use client';

import { MapPin, Briefcase, Crown, CheckCircle, Clock } from 'lucide-react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import styles from './page.module.css';

export default function SeekerProfile() {
  const { isPremium, plan, expiresAt, checkExpiry } = useAppStore();
  checkExpiry();

  const planLabel = plan === 'pro' ? 'Pro Seeker' : plan === 'employer' ? 'Employer' : 'Basic (Free)';
  const daysLeft = expiresAt ? Math.max(0, Math.ceil((expiresAt - Date.now()) / (1000 * 60 * 60 * 24))) : null;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1>My Profile</h1>
          <p>Manage your professional identity and resume data.</p>
        </div>
        <button className={styles.btnEdit}>Edit Profile</button>
      </header>

      {/* Subscription banner */}
      {isPremium ? (
        <div style={{ background: 'linear-gradient(135deg, #1a1464 0%, #2d2299 100%)', color: 'white', borderRadius: 'var(--radius-lg)', padding: 'var(--spacing-lg) var(--spacing-xl)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Crown size={24} color="#f59e0b" />
            <div>
              <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{planLabel} — Active</div>
              {daysLeft !== null && (
                <div style={{ fontSize: '0.85rem', opacity: 0.8 }}>
                  <Clock size={12} style={{ display: 'inline', marginRight: '4px' }} />
                  {daysLeft} day{daysLeft !== 1 ? 's' : ''} remaining
                </div>
              )}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}>
              <CheckCircle size={14} color="#10b981" style={{ marginTop: '2px' }} />
              Premium Jobs
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}>
              <CheckCircle size={14} color="#10b981" />
              CV Download
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}>
              <CheckCircle size={14} color="#10b981" />
              Cover Letters
            </div>
          </div>
        </div>
      ) : (
        <div style={{ background: '#fffbeb', border: '1px solid #fbbf24', borderRadius: 'var(--radius-lg)', padding: 'var(--spacing-lg) var(--spacing-xl)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ fontWeight: 700, color: '#92400e' }}>You are on the Free plan</div>
            <div style={{ fontSize: '0.87rem', color: '#b45309', marginTop: '4px' }}>Upgrade to Pro Seeker to access premium jobs, CV downloads, and AI cover letters.</div>
          </div>
          <Link href="/pricing" style={{ background: '#f59e0b', color: 'white', padding: '10px 20px', borderRadius: 'var(--radius-md)', fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap' }}>
            Upgrade to Pro
          </Link>
        </div>
      )}

      <section className={styles.profileCard}>
        <div className={styles.avatar}>JD</div>
        <div className={styles.profileInfo}>
          <h2 className={styles.name}>Jane Doe</h2>
          <div className={styles.titleLine}>
            <Briefcase size={16} /> Senior Product Designer &bull; <MapPin size={16} /> Nairobi, Kenya
          </div>
          <div className={styles.stats}>
            <div className={styles.statItem}>
              <span className={styles.statValue}>12</span>
              <span className={styles.statLabel}>Applications</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statValue}>145</span>
              <span className={styles.statLabel}>Profile Views</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statValue} style={{ color: isPremium ? '#059669' : '#64748b' }}>
                {isPremium ? '★ ' : ''}{planLabel}
              </span>
              <span className={styles.statLabel}>Plan</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>
          Top Skills
          <button className={styles.btnEdit} style={{ fontSize: '0.85rem', padding: '4px 10px' }}>Edit</button>
        </h3>
        <div className={styles.skillsList}>
          {['UI/UX Design', 'Figma', 'User Research', 'Prototyping', 'Agile', 'Design Systems'].map((s) => (
            <span key={s} className={styles.skillItem}>{s}</span>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>
          Experience
          <button className={styles.btnEdit} style={{ fontSize: '0.85rem', padding: '4px 10px' }}>Add</button>
        </h3>

        <div className={styles.experienceItem}>
          <div className={styles.jobTitle}>Senior Product Designer</div>
          <div className={styles.company}>Fintech Africa Inc.</div>
          <div className={styles.period}>Jan 2023 - Present (3 yrs 4 mos)</div>
          <p className={styles.desc}>
            Led the redesign of the core mobile banking application resulting in a 45% increase in user retention.
            Established and maintained the company-wide design system used across 5 cross-functional teams.
          </p>
        </div>

        <div style={{ height: '1px', backgroundColor: 'var(--color-border)', margin: 'var(--spacing-lg) 0' }}></div>

        <div className={styles.experienceItem}>
          <div className={styles.jobTitle}>UI Designer</div>
          <div className={styles.company}>Creative Agency Global</div>
          <div className={styles.period}>Jun 2019 - Dec 2022 (3 yrs 6 mos)</div>
          <p className={styles.desc}>
            Collaborated with clients to design scalable web interfaces. Delivered 20+ successful projects from concept to launch.
          </p>
        </div>
      </section>

      {/* Premium Feature shortcuts */}
      {isPremium && (
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Premium Tools</h3>
          <div style={{ display: 'flex', gap: 'var(--spacing-md)', flexWrap: 'wrap' }}>
            <Link href="/seeker/cv-builder" style={{ background: 'rgba(26,20,100,0.07)', color: 'var(--color-primary)', padding: '12px 20px', borderRadius: 'var(--radius-md)', fontWeight: 600, textDecoration: 'none', border: '1px solid rgba(26,20,100,0.15)' }}>
              Build & Download CV
            </Link>
            <Link href="/seeker/cover-letter" style={{ background: 'rgba(245,158,11,0.08)', color: '#b45309', padding: '12px 20px', borderRadius: 'var(--radius-md)', fontWeight: 600, textDecoration: 'none', border: '1px solid rgba(245,158,11,0.2)' }}>
              Generate Cover Letter
            </Link>
            <Link href="/jobs" style={{ background: 'rgba(16,185,129,0.08)', color: '#059669', padding: '12px 20px', borderRadius: 'var(--radius-md)', fontWeight: 600, textDecoration: 'none', border: '1px solid rgba(16,185,129,0.2)' }}>
              Browse Premium Jobs
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
