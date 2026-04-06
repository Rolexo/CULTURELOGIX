import Link from 'next/link';
import { Briefcase, Building2, Search, Zap, Users, ArrowRight, ShieldCheck, ChevronRight } from 'lucide-react';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.main}>
      {/* HERO SECTION */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}></div>
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            ✨ The #1 Ecosystem for Top Global Talent
          </div>
          <h1 className={styles.heroTitle}>
            Aligning Talent with <span className="text-gradient">Culture</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Whether you are building a high-performing team, outsourcing critical functions, or seeking your next big career move, CULTURELOGIX is your trusted partner.
          </p>
          <div className={styles.heroActions}>
            <Link href="/jobs" className={styles.btnPrimary}>
              <Search size={20} /> Browse Jobs
            </Link>
            <Link href="/employer/dashboard" className={styles.btnSecondary}>
              <Building2 size={20} /> I'm an Employer
            </Link>
          </div>
        </div>
      </section>

      {/* STATS TICKER */}
      <section className={styles.statsContainer}>
        <div className={styles.statsGrid}>
          <div className={styles.statItem}>
            <h3>10k+</h3>
            <p>Active Job Listings</p>
          </div>
          <div className={styles.statItem}>
            <h3>500+</h3>
            <p>Partner Companies</p>
          </div>
          <div className={styles.statItem}>
            <h3>98%</h3>
            <p>Placement Success</p>
          </div>
          <div className={styles.statItem}>
            <h3>24/7</h3>
            <p>AI Matching</p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS / FEATURES */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Why Choose CULTURELOGIX?</h2>
          <p className={styles.sectionSubtitle}>A complete HR platform built for modern businesses and ambitious professionals.</p>
        </div>

        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <Search size={28} />
            </div>
            <h3>Smart Job Aggregation</h3>
            <p>Our platform instantly pulls thousands of jobs from leading company boards, making them searchable in one seamless marketplace.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <Zap size={28} />
            </div>
            <h3>Intelligent Matching</h3>
            <p>Using advanced resume parsing and AI recommendations, we match candidates to the perfect roles based on skills and cultural fit.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <ShieldCheck size={28} />
            </div>
            <h3>Premium Subscriptions</h3>
            <p>Unlock complete access to exclusive job listings, an AI-powered Cover Letter builder, and priority application status.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <Users size={28} />
            </div>
            <h3>Modern ATS for Employers</h3>
            <p>Post jobs, set screening questions, and manage your talent pipeline with our intuitive Kanban-style applicant tracking system.</p>
          </div>
        </div>
      </section>

      {/* RECENT JOBS PREVIEW */}
      <section className={`${styles.section} ${styles.bgSurface}`}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Featured Opportunities</h2>
          <p className={styles.sectionSubtitle}>Discover top open roles from leading organizations.</p>
        </div>

        <div className={styles.jobsPreviewGrid}>
          {/* Mock Job 1 */}
          <div className={styles.jobPreviewCard}>
            <div className={styles.jobInfo}>
              <div className={styles.companyLogo}>S</div>
              <div className={styles.jobDetails}>
                <h4>Senior Frontend Engineer</h4>
                <p>Safaricom PLC • Nairobi, Kenya (Hybrid)</p>
              </div>
            </div>
            <div className={styles.jobMeta}>
              <span>Engineering</span>
              <span>Full-time</span>
              <Link href="/jobs" className={styles.navLink}><ChevronRight size={20}/></Link>
            </div>
          </div>

          {/* Mock Job 2 */}
          <div className={styles.jobPreviewCard}>
            <div className={styles.jobInfo}>
              <div className={styles.companyLogo}>M</div>
              <div className={styles.jobDetails}>
                <h4>HR Business Partner</h4>
                <p>Microsoft Africa • Lagos, Nigeria (Remote)</p>
              </div>
            </div>
            <div className={styles.jobMeta}>
              <span>Human Resources</span>
              <span>Full-time</span>
              <Link href="/jobs" className={styles.navLink}><ChevronRight size={20}/></Link>
            </div>
          </div>

          {/* Mock Job 3 */}
          <div className={styles.jobPreviewCard}>
            <div className={styles.jobInfo}>
              <div className={styles.companyLogo}>E</div>
              <div className={styles.jobDetails}>
                <h4>Product Designer</h4>
                <p>Equity Group • Kigali, Rwanda</p>
              </div>
            </div>
            <div className={styles.jobMeta}>
              <span>Design</span>
              <span>Contract</span>
              <Link href="/jobs" className={styles.navLink}><ChevronRight size={20}/></Link>
            </div>
          </div>
        </div>

        <Link href="/jobs" className={styles.btnOutline}>
          View All 10,000+ Jobs
        </Link>
      </section>

      {/* CTA SECTION */}
      <section className={styles.ctaSection}>
        <h2>Ready to transform your workforce?</h2>
        <p>Join thousands of companies and job seekers who use CULTURELOGIX to build better teams and find dream careers.</p>
        <Link href="/auth/register" className={`${styles.btnPrimary} glass`} style={{ width: 'fit-content', margin: '0 auto', color: 'var(--color-primary)' }}>
          Create an Account <ArrowRight size={20} />
        </Link>
      </section>
    </div>
  );
}
