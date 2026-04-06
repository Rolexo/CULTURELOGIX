'use client';

import { useState } from 'react';
import { Search, MapPin, Briefcase, DollarSign, Crown } from 'lucide-react';
import { MOCK_JOBS, MOCK_CATEGORIES, JOB_TYPES } from '@/lib/mock-data';
import styles from './page.module.css';
import Link from 'next/link';

export default function JobsMarketplace() {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationTerm, setLocationTerm] = useState('');

  // Very basic search filter for demonstration
  const filteredJobs = MOCK_JOBS.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    job.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Find Your Next Opportunity</h1>
        <p className={styles.subtitle}>Explore 10,000+ jobs from top companies across the globe.</p>
      </header>

      {/* SEARCH BAR */}
      <div className={styles.searchContainer}>
        <div className={styles.searchGroup}>
          <Search size={20} className={styles.icon} />
          <input 
            type="text" 
            placeholder="Job title, keywords, or company" 
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className={styles.searchGroup}>
          <MapPin size={20} className={styles.icon} />
          <input 
            type="text" 
            placeholder="City, state, or 'Remote'" 
            className={styles.searchInput}
            value={locationTerm}
            onChange={(e) => setLocationTerm(e.target.value)}
          />
        </div>
        <button className={styles.btnSearch}>Search Jobs</button>
      </div>

      {/* FILTERS SIDEBAR */}
      <aside className={styles.filters}>
        <div className={styles.filterGroup}>
          <h3 className={styles.filterTitle}>Category</h3>
          {MOCK_CATEGORIES.slice(0, 5).map(cat => (
            <label key={cat} className={styles.checkboxLabel}>
              <input type="checkbox" /> {cat}
            </label>
          ))}
          <span className={styles.checkboxLabel} style={{ color: 'var(--color-primary)', marginTop: '4px' }}>Show more...</span>
        </div>

        <div className={styles.filterGroup}>
          <h3 className={styles.filterTitle}>Job Type</h3>
          {JOB_TYPES.map(type => (
            <label key={type} className={styles.checkboxLabel}>
              <input type="checkbox" /> {type}
            </label>
          ))}
        </div>

        <div className={styles.filterGroup}>
          <h3 className={styles.filterTitle}>Salary Range</h3>
          <label className={styles.checkboxLabel}><input type="checkbox" /> $50k - $80k</label>
          <label className={styles.checkboxLabel}><input type="checkbox" /> $80k - $120k</label>
          <label className={styles.checkboxLabel}><input type="checkbox" /> $120k - $200k</label>
          <label className={styles.checkboxLabel}><input type="checkbox" /> $200k+</label>
        </div>
      </aside>

      {/* JOBS BOARD */}
      <main className={styles.jobsBoard}>
        <p className={styles.jobsCount}>Showing {filteredJobs.length} recommended jobs</p>

        {filteredJobs.map(job => (
          <div key={job.id} className={styles.jobCard}>
            {job.premium && (
              <div className={styles.premiumBadge}>
                <Crown size={12} style={{ display: 'inline', marginRight: '4px' }}/> PREMIUM
              </div>
            )}
            
            <div className={styles.jobHeader}>
              <div className={styles.companyLogo}>{job.companyLogo}</div>
              <div className={styles.jobMetaTop}>
                <h2 className={styles.jobTitle}>{job.title}</h2>
                <span className={styles.companyName}>
                  {job.company} • {job.location}
                </span>
              </div>
            </div>

            <p className={styles.jobDescription}>{job.description}</p>

            <div className={styles.tags}>
              <span className={styles.tag}><Briefcase size={14}/> {job.type}</span>
              <span className={styles.tag}><DollarSign size={14}/> {job.salary}</span>
            </div>

            <div className={styles.jobFooter}>
              <span className={styles.postedAt}>Posted {job.postedAt}</span>
              <Link href={`/jobs/${job.id}`} className={styles.btnApply}>
                View Job
              </Link>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
