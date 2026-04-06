'use client';

import { Users, Building2, CreditCard, ActiveActivity, TrendingUp } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import styles from './page.module.css';

const data = [
  { name: 'Mon', revenue: 4000, users: 2400 },
  { name: 'Tue', revenue: 3000, users: 1398 },
  { name: 'Wed', revenue: 2000, users: 9800 },
  { name: 'Thu', revenue: 2780, users: 3908 },
  { name: 'Fri', revenue: 1890, users: 4800 },
  { name: 'Sat', revenue: 2390, users: 3800 },
  { name: 'Sun', revenue: 3490, users: 4300 },
];

export default function AdminDashboard() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Platform Analytics</h1>
        <p>Monitor platform health, user growth, and revenue numbers.</p>
      </header>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIconWrapper} style={{ backgroundColor: '#1a1464' }}>
            <Users size={28} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>1,204</span>
            <span className={styles.statLabel}>Total Users</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIconWrapper} style={{ backgroundColor: '#f59e0b' }}>
            <Building2 size={28} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>32</span>
            <span className={styles.statLabel}>Companies</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIconWrapper} style={{ backgroundColor: '#10b981' }}>
            <CreditCard size={28} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>$12.4k</span>
            <span className={styles.statLabel}>MRR</span>
          </div>
        </div>
      </div>

      <section className={styles.recentSection} style={{ padding: 'var(--spacing-xl)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
          <h2 className={styles.sectionTitle}>Revenue & Engagement (Last 7 Days)</h2>
        </div>
        
        <div style={{ height: '350px', width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1a1464" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#1a1464" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Area type="monotone" dataKey="revenue" stroke="#1a1464" fillOpacity={1} fill="url(#colorRevenue)" />
              <Area type="monotone" dataKey="users" stroke="#f59e0b" fillOpacity={1} fill="url(#colorUsers)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}
