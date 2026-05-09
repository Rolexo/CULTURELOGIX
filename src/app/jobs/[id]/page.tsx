import JobDetailClient from './JobDetailClient';
import { MOCK_JOBS } from '@/lib/mock-data';
import { notFound } from 'next/navigation';
import type { Job } from '@/lib/types';

async function getJob(id: string): Promise<Job | null> {
  // First check local mock jobs
  const local = MOCK_JOBS.find((j) => j.id === id);
  if (local) return local;

  // For scraped jobs, fetch from the API
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/jobs`, { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    return (data.jobs as Job[]).find((j: Job) => j.id === id) || null;
  } catch {
    return null;
  }
}

export default async function JobDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const job = await getJob(params.id);
  if (!job) notFound();
  return <JobDetailClient job={job} />;
}
