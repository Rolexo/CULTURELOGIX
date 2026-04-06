'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function PostJobPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      // Submit Job
      alert('Job posted successfully!');
      router.push('/employer/dashboard');
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Post a New Job</h1>
        <p className={styles.subtitle}>Find the perfect candidate for your team</p>
      </header>

      <div className={styles.stepIndicator}>
        <div className={`${styles.step} ${step >= 1 ? styles.active : ''}`}>
          <div className={styles.stepNumber}>1</div>
          <span>Basic Info</span>
        </div>
        <div className={styles.stepDivider}></div>
        <div className={`${styles.step} ${step >= 2 ? styles.active : ''}`}>
          <div className={styles.stepNumber}>2</div>
          <span>Requirements</span>
        </div>
      </div>

      <div className={styles.formCard}>
        <form onSubmit={handleNext}>
          {step === 1 && (
            <>
              <div className={styles.formGroup}>
                <label className={styles.label}>Job Title *</label>
                <input type="text" className={styles.input} placeholder="e.g. Senior Product Manager" required />
              </div>
              
              <div className={styles.row}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Location *</label>
                  <input type="text" className={styles.input} placeholder="e.g. Nairobi, Kenya" required />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Job Type *</label>
                  <select className={styles.select} required>
                    <option value="">Select type...</option>
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="contract">Contract</option>
                    <option value="remote">Remote</option>
                  </select>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Salary Range (Optional)</label>
                <input type="text" className={styles.input} placeholder="e.g. $80k - $120k" />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Job Description *</label>
                <textarea className={styles.textarea} placeholder="Describe the role and responsibilities..." required></textarea>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className={styles.formGroup}>
                <label className={styles.label}>Key Requirements *</label>
                <textarea className={styles.textarea} placeholder="List out specific skills and years of experience (one per line)..." required></textarea>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Screening Questions (Optional)</label>
                <textarea className={styles.textarea} placeholder="Ask candidates up to 3 questions before they apply..."></textarea>
              </div>
            </>
          )}

          <div className={styles.actionButtons}>
            {step === 2 ? (
              <button type="button" className={styles.btnBack} onClick={() => setStep(1)}>Back</button>
            ) : (
              <div></div> // spacer
            )}
            <button type="submit" className={styles.btnNext}>
              {step === 1 ? 'Next Step' : 'Post Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
