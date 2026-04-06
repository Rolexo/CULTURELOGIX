import { Target, Users, Zap } from 'lucide-react';
import styles from './page.module.css';

export const metadata = {
  title: 'About CULTURELOGIX',
  description: 'Learn about CULTURELOGIX mission to align talent with culture.',
};

export default function AboutPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          Aligning Talent with <span>Culture</span>
        </h1>
        <p className={styles.subtitle}>
          We don't just fill seats. We build high-performing teams by ensuring every hire is a perfect cultural fit.
        </p>
      </header>

      <div className={styles.heroImage}>
        [ Team Collaboration Image / Presentation ]
      </div>

      {/* THE IMPORTANT CONTENT AS SPECIFIED BY USER */}
      <article className={styles.mainContent}>
        <p className={styles.highlightParagraph}>
          CULTURELOGIX is dedicated to sourcing the right fit for your organization by aligning talent with culture. 
          We specialize in recruitment, outsourcing, and HR consultancy services tailored to meet the evolving needs of modern businesses. 
          Whether you are looking to build a high-performing team, outsource critical functions, or gain strategic HR insights, 
          CULTURELOGIX is your trusted partner in workforce transformation.
        </p>
      </article>

      <div className={styles.grid}>
        <div className={styles.card}>
          <div className={styles.iconWrapper}><Target size={28} /></div>
          <h3>Our Mission</h3>
          <p>To redefine recruitment by prioritizing cultural alignment over pure technical capability, creating happier employees and more productive businesses.</p>
        </div>
        <div className={styles.card}>
          <div className={styles.iconWrapper}><Users size={28} /></div>
          <h3>The Community</h3>
          <p>We've built a thriving ecosystem of millions of professionals across Africa and globally, waiting for the right moment to make their next impact.</p>
        </div>
        <div className={styles.card}>
          <div className={styles.iconWrapper}><Zap size={28} /></div>
          <h3>Modern Solutions</h3>
          <p>Fusing human intuition with data-driven AI, our platform provides cutting-edge solutions for resume creation, candidate screening, and job matching.</p>
        </div>
      </div>
    </div>
  );
}
