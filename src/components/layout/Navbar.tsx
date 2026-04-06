'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BriefcaseBusiness, Menu } from 'lucide-react';
import styles from './Navbar.module.css';

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className={styles.navbar}>
      <Link href="/" className={styles.logo}>
        <BriefcaseBusiness size={28} />
        <span>CULTURELOGIX</span>
      </Link>

      <nav className={styles.navLinks}>
        <Link href="/jobs" className={styles.navLink} style={{ color: pathname === '/jobs' ? 'var(--color-primary)' : '' }}>
          Find Jobs
        </Link>
        <Link href="/about" className={styles.navLink} style={{ color: pathname === '/about' ? 'var(--color-primary)' : '' }}>
          About Us
        </Link>
        <Link href="/pricing" className={styles.navLink} style={{ color: pathname === '/pricing' ? 'var(--color-primary)' : '' }}>
          Pricing
        </Link>
      </nav>

      <div className={styles.actions}>
        <Link href="/auth/login" className={`${styles.btnDraft} ${styles.btnLogin}`}>
          Log In
        </Link>
        <Link href="/post-job" className={`${styles.btnDraft} ${styles.btnPostJob}`}>
          Post a Job
        </Link>
      </div>
    </header>
  );
}
