'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, BriefcaseBusiness, UserRound } from 'lucide-react';
import styles from '../auth.module.css';

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState<'seeker' | 'employer'>('seeker');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === 'employer') {
      router.push('/employer/dashboard');
    } else {
      router.push('/seeker/profile');
    }
  };

  return (
    <>
      <div className={styles.header}>
        <h1>Create an Account</h1>
        <p>Join CULTURELOGIX to transform your future.</p>
      </div>

      <div className={styles.roleSelector}>
        <div 
          className={`${styles.roleOption} ${role === 'seeker' ? styles.active : ''}`}
          onClick={() => setRole('seeker')}
        >
          <UserRound size={24} style={{ margin: '0 auto 8px' }} />
          Job Seeker
        </div>
        <div 
          className={`${styles.roleOption} ${role === 'employer' ? styles.active : ''}`}
          onClick={() => setRole('employer')}
        >
          <BriefcaseBusiness size={24} style={{ margin: '0 auto 8px' }} />
          Employer
        </div>
      </div>

      <button className={styles.btnGoogle}>
        <Mail size={18} /> Sign up with Google
      </button>

      <div className={styles.divider}>
        <span>or sign up with email</span>
      </div>

      <form onSubmit={handleRegister}>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="name">Full Name {role === 'employer' && '/ Company Name'}</label>
          <input 
            type="text" 
            id="name" 
            className={styles.input} 
            placeholder={role === 'employer' ? "Acme Corp" : "Jane Doe"} 
            required 
          />
        </div>

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
            minLength={8}
          />
        </div>

        <button type="submit" className={styles.btnSubmit}>
          Create Account
        </button>
      </form>

      <div className={styles.footer}>
        Already have an account? <Link href="/auth/login" className={styles.link}>Log in</Link>
      </div>
    </>
  );
}
