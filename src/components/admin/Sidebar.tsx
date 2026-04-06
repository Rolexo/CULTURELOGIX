'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, FileText, CreditCard, Shield } from 'lucide-react';
import styles from '../../app/admin/layout.module.css';

export function AdminSidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard Reports', path: '/admin/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'User Management', path: '/admin/users', icon: <Users size={20} /> },
    { name: 'Job Listings', path: '/admin/listings', icon: <FileText size={20} /> },
    { name: 'Subscriptions', path: '/admin/payments', icon: <CreditCard size={20} /> },
    { name: 'Platform Settings', path: '/admin/settings', icon: <Shield size={20} /> },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarTitle}>Admin Console</div>
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
