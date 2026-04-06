'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserCircle, Briefcase, FileText, PenTool, Settings } from 'lucide-react';
import styles from '../../app/seeker/layout.module.css';

export function SeekerSidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'My Profile', path: '/seeker/profile', icon: <UserCircle size={20} /> },
    { name: 'Applications', path: '/seeker/applications', icon: <Briefcase size={20} /> },
    { name: 'CV Builder', path: '/seeker/cv-builder', icon: <FileText size={20} /> },
    { name: 'AI Cover Letter', path: '/seeker/cover-letter', icon: <PenTool size={20} /> },
    { name: 'Settings', path: '/seeker/settings', icon: <Settings size={20} /> },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarTitle}>Job Seeker Portal</div>
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
