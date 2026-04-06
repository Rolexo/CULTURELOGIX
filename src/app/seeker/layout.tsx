import { SeekerSidebar } from '@/components/seeker/Sidebar';
import styles from './layout.module.css';

export default function SeekerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.dashboardLayout}>
      <SeekerSidebar />
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}
