import Link from 'next/link';
import { Briefcase, Users, Eye, TrendingUp } from 'lucide-react';
import styles from './page.module.css';

export default function EmployerDashboardHome() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Dashboard Overview</h1>
        <p>Welcome back, Acme Corp! Here is what's happening with your job postings.</p>
      </header>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIconWrapper} style={{ backgroundColor: '#10b981' }}>
            <Briefcase size={28} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>12</span>
            <span className={styles.statLabel}>Active Jobs</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIconWrapper} style={{ backgroundColor: '#f59e0b' }}>
            <Users size={28} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>148</span>
            <span className={styles.statLabel}>Total Applicants</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIconWrapper} style={{ backgroundColor: '#1a1464' }}>
            <Eye size={28} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>2.4k</span>
            <span className={styles.statLabel}>Job Views</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIconWrapper} style={{ backgroundColor: '#8b5cf6' }}>
            <TrendingUp size={28} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>18</span>
            <span className={styles.statLabel}>Shortlisted</span>
          </div>
        </div>
      </div>

      <section className={styles.recentSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Recent Job Postings</h2>
          <Link href="/employer/jobs" className={styles.viewAll}>View all</Link>
        </div>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Status</th>
                <th>Applicants</th>
                <th>Shortlisted</th>
                <th>Posted Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={styles.jobTitleCell}>Senior Frontend Engineer</td>
                <td><span className={`${styles.statusBadge} ${styles.statusActive}`}>Active</span></td>
                <td>42</td>
                <td>5</td>
                <td>Oct 12, 2026</td>
              </tr>
              <tr>
                <td className={styles.jobTitleCell}>Software Engineering Manager</td>
                <td><span className={`${styles.statusBadge} ${styles.statusActive}`}>Active</span></td>
                <td>18</td>
                <td>2</td>
                <td>Oct 10, 2026</td>
              </tr>
              <tr>
                <td className={styles.jobTitleCell}>Product Designer</td>
                <td><span className={`${styles.statusBadge} ${styles.statusDraft}`}>Draft</span></td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
