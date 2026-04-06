import { MapPin, Briefcase } from 'lucide-react';
import styles from './page.module.css';

export default function SeekerProfile() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1>My Profile</h1>
          <p>Manage your professional identity and resume data.</p>
        </div>
        <button className={styles.btnEdit}>Edit Profile</button>
      </header>

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
              <span className={styles.statValue}>Pro</span>
              <span className={styles.statLabel}>Plan</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>
          Top Skills
          <button className={styles.btnEdit} style={{fontSize: '0.85rem', padding: '4px 10px'}}>Edit</button>
        </h3>
        <div className={styles.skillsList}>
          <span className={styles.skillItem}>UI/UX Design</span>
          <span className={styles.skillItem}>Figma</span>
          <span className={styles.skillItem}>User Research</span>
          <span className={styles.skillItem}>Prototyping</span>
          <span className={styles.skillItem}>Agile</span>
          <span className={styles.skillItem}>Design Systems</span>
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>
          Experience
          <button className={styles.btnEdit} style={{fontSize: '0.85rem', padding: '4px 10px'}}>Add</button>
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

        <div style={{height: '1px', backgroundColor: 'var(--color-border)', margin: 'var(--spacing-lg) 0'}}></div>

        <div className={styles.experienceItem}>
          <div className={styles.jobTitle}>UI Designer</div>
          <div className={styles.company}>Creative Agency Global</div>
          <div className={styles.period}>Jun 2019 - Dec 2022 (3 yrs 6 mos)</div>
          <p className={styles.desc}>
            Collaborated with clients to design scalable web interfaces. Delivered 20+ successful projects from concept to launch.
          </p>
        </div>
      </section>
    </div>
  );
}
