import { NextResponse } from 'next/server';
import type { Job } from '@/lib/types';
import { MOCK_JOBS } from '@/lib/mock-data';

export const revalidate = 3600; // re-scrape every hour

interface RemotiveJob {
  id: number;
  url: string;
  title: string;
  company_name: string;
  company_logo: string;
  category: string;
  tags: string[];
  job_type: string;
  publication_date: string;
  candidate_required_location: string;
  salary: string;
  description: string;
}

interface ArbeitnowJob {
  slug: string;
  company_name: string;
  title: string;
  description: string;
  remote: boolean;
  url: string;
  tags: string[];
  job_types: string[];
  location: string;
  created_at: number;
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} day${days !== 1 ? 's' : ''} ago`;
  const weeks = Math.floor(days / 7);
  return `${weeks} week${weeks !== 1 ? 's' : ''} ago`;
}

function timestampAgo(ts: number): string {
  return timeAgo(new Date(ts * 1000).toISOString());
}

async function fetchRemotiveJobs(): Promise<Job[]> {
  try {
    const res = await fetch('https://remotive.com/api/remote-jobs?limit=40', {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.jobs as RemotiveJob[]).map((j) => ({
      id: `remotive_${j.id}`,
      title: j.title,
      company: j.company_name,
      companyLogo: j.company_name.charAt(0).toUpperCase(),
      location: j.candidate_required_location || 'Remote',
      type: j.job_type || 'Full-time',
      category: j.category || 'General',
      salary: j.salary || 'Competitive',
      postedAt: timeAgo(j.publication_date),
      description: j.description.replace(/<[^>]+>/g, '').slice(0, 300) + '…',
      requirements: j.tags.slice(0, 5),
      premium: j.category?.toLowerCase().includes('executive') || j.salary?.includes('200'),
      applyUrl: j.url,
      source: 'remotive',
    }));
  } catch {
    return [];
  }
}

async function fetchArbeitnowJobs(): Promise<Job[]> {
  try {
    const res = await fetch('https://www.arbeitnow.com/api/job-board-api?page=1', {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.data as ArbeitnowJob[]).slice(0, 30).map((j) => ({
      id: `arbeitnow_${j.slug}`,
      title: j.title,
      company: j.company_name,
      companyLogo: j.company_name.charAt(0).toUpperCase(),
      location: j.location || (j.remote ? 'Remote' : 'On-site'),
      type: j.job_types?.[0] || 'Full-time',
      category: j.tags?.[0] || 'General',
      salary: 'Competitive',
      postedAt: timestampAgo(j.created_at),
      description: j.description.replace(/<[^>]+>/g, '').slice(0, 300) + '…',
      requirements: j.tags.slice(0, 5),
      premium: false,
      applyUrl: j.url,
      source: 'arbeitnow',
    }));
  } catch {
    return [];
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.toLowerCase() || '';
  const location = searchParams.get('location')?.toLowerCase() || '';
  const category = searchParams.get('category') || '';
  const type = searchParams.get('type') || '';

  const [remotive, arbeitnow] = await Promise.all([
    fetchRemotiveJobs(),
    fetchArbeitnowJobs(),
  ]);

  // Combine: local mock jobs first (curated Africa-focused), then live scraped
  const allJobs: Job[] = [...MOCK_JOBS, ...remotive, ...arbeitnow];

  const filtered = allJobs.filter((job) => {
    const matchesQuery =
      !query ||
      job.title.toLowerCase().includes(query) ||
      job.company.toLowerCase().includes(query) ||
      job.description.toLowerCase().includes(query);

    const matchesLocation =
      !location ||
      job.location.toLowerCase().includes(location) ||
      job.location.toLowerCase().includes('remote');

    const matchesCategory = !category || job.category.toLowerCase().includes(category.toLowerCase());
    const matchesType = !type || job.type.toLowerCase().includes(type.toLowerCase());

    return matchesQuery && matchesLocation && matchesCategory && matchesType;
  });

  return NextResponse.json({ jobs: filtered, total: filtered.length });
}
