'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail } from 'lucide-react';
import styles from '../auth.module.css';

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login based on the form, standard users go to /seeker/profile, employers to /employer/dashboard
    router.push('/jobs'); 
  };

  return (
    <>
      <div className={styles.header}>
        <h1>Welcome Back</h1>
        <p>Log in to your CULTURELOGIX account</p>
      </div>

      <button className={styles.btnGoogle}>
        <Mail size={18} /> Continue with Google
      </button>

      <div className={styles.divider}>
        <span>or sign in with email</span>
      </div>

      <form onSubmit={handleLogin}>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="email">Email Address</label>
          <input 
            type="email" 
            id="email" 
            className={styles.input} 
            placeholder="you@example.com" 
            required 
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            className={styles.input} 
            placeholder="••••••••" 
            required 
          />
        </div>

        <button type="submit" className={styles.btnSubmit}>
          Sign In
        </button>
      </form>

      <div className={styles.footer}>
        Don't have an account? <Link href="/auth/register" className={styles.link}>Sign up</Link>
      </div>
    </>
  );
}
