import { EmployerSidebar } from '@/components/employer/Sidebar';
import styles from './layout.module.css';

export default function EmployerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.dashboardLayout}>
      <EmployerSidebar />
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}
