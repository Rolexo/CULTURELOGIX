'use client';

import Link from 'next/link';
import { ArrowLeft, MapPin, Briefcase, DollarSign, Clock, BookmarkPlus, Lock, ExternalLink } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import type { Job } from '@/lib/types';
import styles from './page.module.css';

export default function JobDetailClient({ job }: { job: Job }) {
  const { isPremium, checkExpiry } = useAppStore();
  checkExpiry();

  const isLocked = job.premium && !isPremium;

  return (
    <div className={styles.container}>
      <Link href="/jobs" className={styles.backLink}>
        <ArrowLeft size={16} /> Back to Jobs
      </Link>

      <article className={styles.contentWrapper}>
        <header className={styles.header}>
          <div className={styles.headerBg}></div>
          <div className={styles.headerContent}>
            <div className={styles.companyLogo}>{job.companyLogo}</div>

            <div className={styles.headerMain}>
              <h1 className={styles.title}>{job.title}</h1>
              <div className={styles.companyName}>{job.company}</div>
              <div className={styles.tags}>
                <span className={styles.tag}><MapPin size={16} /> {job.location}</span>
                <span className={styles.tag}><Briefcase size={16} /> {job.type}</span>
                <span className={styles.tag}><DollarSign size={16} /> {job.salary}</span>
                <span className={styles.tag}><Clock size={16} /> Posted {job.postedAt}</span>
              </div>
            </div>

            <div className={styles.applySection}>
              {!isLocked ? (
                <>
                  {job.applyUrl ? (
                    <a href={job.applyUrl} target="_blank" rel="noopener noreferrer" className={styles.btnApply}>
                      Apply Now <ExternalLink size={14} style={{ display: 'inline', marginLeft: '4px' }} />
                    </a>
                  ) : (
                    <button className={styles.btnApply}>Apply Now</button>
                  )}
                  <button className={styles.btnSave}><BookmarkPlus size={18} /> Save Job</button>
                </>
              ) : (
                <Link href="/pricing" className={styles.btnApply} style={{ background: '#f59e0b', textDecoration: 'none' }}>
                  Unlock via Premium
                </Link>
              )}
            </div>
          </div>
        </header>

        <div className={styles.body} style={{ position: 'relative' }}>
          {isLocked && (
            <div className={styles.premiumOverlay}>
              <Lock size={48} color="#f59e0b" style={{ marginBottom: '16px' }} />
              <h3>Premium Role</h3>
              <p>This is an exclusive listing. Subscribe to Pro Seeker at <strong>₦22,500/month</strong> to view and apply.</p>
              <Link href="/pricing" className={styles.btnUpgrade}>Upgrade Now — ₦22,500/mo</Link>
            </div>
          )}

          <div style={{ filter: isLocked ? 'blur(8px)' : 'none', pointerEvents: isLocked ? 'none' : 'auto' }}>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>About the Role</h2>
              <p className={styles.description}>{job.description}</p>
            </section>

            {job.requirements.length > 0 && (
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Key Requirements</h2>
                <ul className={styles.requirementsList}>
                  {job.requirements.map((req, i) => <li key={i}>{req}</li>)}
                </ul>
              </section>
            )}
          </div>

          <aside className={styles.sidebar} style={{ filter: isLocked ? 'blur(8px)' : 'none' }}>
            <h3 className={styles.sidebarTitle}>Job Overview</h3>
            <div className={styles.sidebarItem}>
              <span className={styles.sidebarLabel}>Date Posted</span>
              <span className={styles.sidebarValue}>{job.postedAt}</span>
            </div>
            <div className={styles.sidebarItem}>
              <span className={styles.sidebarLabel}>Job Category</span>
              <span className={styles.sidebarValue}>{job.category}</span>
            </div>
            <div className={styles.sidebarItem}>
              <span className={styles.sidebarLabel}>Job Type</span>
              <span className={styles.sidebarValue}>{job.type}</span>
            </div>
            <div className={styles.sidebarItem}>
              <span className={styles.sidebarLabel}>Base Salary</span>
              <span className={styles.sidebarValue}>{job.salary}</span>
            </div>
            {job.source && (
              <div className={styles.sidebarItem}>
                <span className={styles.sidebarLabel}>Source</span>
                <span className={styles.sidebarValue} style={{ textTransform: 'capitalize' }}>{job.source}</span>
              </div>
            )}
          </aside>
        </div>
      </article>
    </div>
  );
}
