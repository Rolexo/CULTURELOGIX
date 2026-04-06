import Link from 'next/link';
import { BriefcaseBusiness } from 'lucide-react';
import styles from './Footer.module.css';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.brand}>
          <Link href="/" className={styles.logo}>
            <BriefcaseBusiness size={28} />
            <span>CULTURELOGIX</span>
          </Link>
          <p className={styles.description}>
            Empowering modern businesses by aligning talent with culture. Your trusted partner for recruitment, outsourcing, and HR consultancy.
          </p>
        </div>

        <div className={styles.column}>
          <h4 className={styles.columnTitle}>For Job Seekers</h4>
          <nav className={styles.links}>
            <Link href="/jobs" className={styles.link}>Browse Jobs</Link>
            <Link href="/seeker/cv-builder" className={styles.link}>CV Builder</Link>
            <Link href="/seeker/cover-letter" className={styles.link}>Cover Letter AI</Link>
            <Link href="/pricing" className={styles.link}>Pricing & Access</Link>
          </nav>
        </div>

        <div className={styles.column}>
          <h4 className={styles.columnTitle}>For Employers</h4>
          <nav className={styles.links}>
            <Link href="/post-job" className={styles.link}>Post a Job</Link>
            <Link href="/employer/dashboard" className={styles.link}>Employer Dashboard</Link>
            <Link href="/services/outsourcing" className={styles.link}>HR Outsourcing</Link>
            <Link href="/services/consulting" className={styles.link}>Consultancy Services</Link>
          </nav>
        </div>

        <div className={styles.column}>
          <h4 className={styles.columnTitle}>Company</h4>
          <nav className={styles.links}>
            <Link href="/about" className={styles.link}>About Us</Link>
            <Link href="/contact" className={styles.link}>Contact</Link>
            <Link href="/privacy" className={styles.link}>Privacy Policy</Link>
            <Link href="/terms" className={styles.link}>Terms of Service</Link>
          </nav>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>&copy; {currentYear} CULTURELOGIX. All rights reserved.</p>
        <div className={styles.social}>
          <a href="#" className={styles.socialLink} aria-label="LinkedIn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
          </a>
          <a href="#" className={styles.socialLink} aria-label="Twitter">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
          </a>
          <a href="#" className={styles.socialLink} aria-label="Facebook">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
          </a>
          <a href="#" className={styles.socialLink} aria-label="Instagram">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
