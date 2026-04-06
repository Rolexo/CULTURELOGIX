'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, PlusCircle, Users, BarChart3, Settings } from 'lucide-react';
import styles from '../../app/employer/layout.module.css';

export function EmployerSidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', path: '/employer/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Post a Job', path: '/post-job', icon: <PlusCircle size={20} /> },
    { name: 'Applicants (ATS)', path: '/employer/applicants', icon: <Users size={20} /> },
    { name: 'Analytics', path: '/employer/analytics', icon: <BarChart3 size={20} /> },
    { name: 'Settings', path: '/employer/settings', icon: <Settings size={20} /> },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarTitle}>Employer Portal</div>
      <nav className={styles.navMenu}>
        {navItems.map((item) => {
          const isActive = pathname === item.path || pathname.startsWith(item.path + '/');
          return (
            <Link 
              key={item.path} 
              href={item.path} 
              className={`${styles.navLink} ${isActive ? styles.active : ''}`}
            >
              {item.icon} {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
