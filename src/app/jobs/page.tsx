'use client';

import { useState, useEffect, useCallback } from 'react';
import { Search, MapPin, Briefcase, DollarSign, Crown, RefreshCw } from 'lucide-react';
import { MOCK_CATEGORIES, JOB_TYPES } from '@/lib/mock-data';
import type { Job } from '@/lib/types';
import styles from './page.module.css';
import Link from 'next/link';

export default function JobsMarketplace() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationTerm, setLocationTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [inputSearch, setInputSearch] = useState('');
  const [inputLocation, setInputLocation] = useState('');

  const fetchJobs = useCallback(async (q: string, loc: string, cat: string, type: string) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (q) params.set('q', q);
      if (loc) params.set('location', loc);
      if (cat) params.set('category', cat);
      if (type) params.set('type', type);
      const res = await fetch(`/api/jobs?${params.toString()}`);
      const data = await res.json();
      setJobs(data.jobs || []);
      setTotal(data.total || 0);
    } catch {
      setJobs([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchJobs('', '', '', '');
  }, [fetchJobs]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchTerm(inputSearch);
    setLocationTerm(inputLocation);
    fetchJobs(inputSearch, inputLocation, selectedCategory, selectedType);
  };

  const handleCategoryChange = (cat: string) => {
    const next = selectedCategory === cat ? '' : cat;
    setSelectedCategory(next);
    fetchJobs(searchTerm, locationTerm, next, selectedType);
  };

  const handleTypeChange = (type: string) => {
    const next = selectedType === type ? '' : type;
    setSelectedType(next);
    fetchJobs(searchTerm, locationTerm, selectedCategory, next);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Find Your Next Opportunity</h1>
        <p className={styles.subtitle}>Live jobs from top companies across Africa and globally — updated every hour.</p>
      </header>

      {/* SEARCH BAR */}
      <form className={styles.searchContainer} onSubmit={handleSearch}>
        <div className={styles.searchGroup}>
          <Search size={20} className={styles.icon} />
          <input
            type="text"
            placeholder="Job title, keywords, or company"
            className={styles.searchInput}
            value={inputSearch}
            onChange={(e) => setInputSearch(e.target.value)}
          />
        </div>
        <div className={styles.searchGroup}>
          <MapPin size={20} className={styles.icon} />
          <input
            type="text"
            placeholder="City, country, or 'Remote'"
            className={styles.searchInput}
            value={inputLocation}
            onChange={(e) => setInputLocation(e.target.value)}
          />
        </div>
        <button type="submit" className={styles.btnSearch}>Search Jobs</button>
      </form>

      {/* FILTERS SIDEBAR */}
      <aside className={styles.filters}>
        <div className={styles.filterGroup}>
          <h3 className={styles.filterTitle}>Category</h3>
          {MOCK_CATEGORIES.map((cat) => (
            <label key={cat} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={selectedCategory === cat}
                onChange={() => handleCategoryChange(cat)}
              /> {cat}
            </label>
          ))}
        </div>

        <div className={styles.filterGroup}>
          <h3 className={styles.filterTitle}>Job Type</h3>
          {JOB_TYPES.map((type) => (
            <label key={type} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={selectedType === type}
                onChange={() => handleTypeChange(type)}
              /> {type}
            </label>
          ))}
        </div>
      </aside>

      {/* JOBS BOARD */}
      <main className={styles.jobsBoard}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <p className={styles.jobsCount}>
            {loading ? 'Loading live jobs…' : `Showing ${total} jobs`}
          </p>
          <button
            onClick={() => fetchJobs(searchTerm, locationTerm, selectedCategory, selectedType)}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-primary)', fontSize: '0.87rem', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <RefreshCw size={14} /> Refresh
          </button>
        </div>

        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[1, 2, 3].map((i) => (
              <div key={i} style={{ height: '140px', background: '#f1f5f9', borderRadius: 'var(--radius-lg)', animation: 'pulse 1.5s ease-in-out infinite' }} />
            ))}
          </div>
        ) : jobs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--color-text-muted)' }}>
            <p style={{ fontSize: '1.1rem' }}>No jobs match your search.</p>
            <p style={{ fontSize: '0.9rem', marginTop: '8px' }}>Try broader keywords or clear filters.</p>
          </div>
        ) : (
          jobs.map((job) => (
            <div key={job.id} className={styles.jobCard}>
              {job.premium && (
                <div className={styles.premiumBadge}>
                  <Crown size={12} style={{ display: 'inline', marginRight: '4px' }} /> PREMIUM
                </div>
              )}

              <div className={styles.jobHeader}>
                <div className={styles.companyLogo}>{job.companyLogo}</div>
                <div className={styles.jobMetaTop}>
                  <h2 className={styles.jobTitle}>{job.title}</h2>
                  <span className={styles.companyName}>
                    {job.company} &bull; {job.location}
                  </span>
                </div>
              </div>

              <p className={styles.jobDescription}>{job.description}</p>

              <div className={styles.tags}>
                <span className={styles.tag}><Briefcase size={14} /> {job.type}</span>
                <span className={styles.tag}><DollarSign size={14} /> {job.salary}</span>
              </div>

              <div className={styles.jobFooter}>
                <span className={styles.postedAt}>Posted {job.postedAt}</span>
                <Link href={`/jobs/${job.id}`} className={styles.btnApply}>
                  View Job
                </Link>
              </div>
            </div>
          ))
        )}
      </main>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
