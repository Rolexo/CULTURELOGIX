import { ExternalLink, CheckCircle, Clock, XCircle } from 'lucide-react';

export default function ApplicationsTracker() {
  const applications = [
    { title: 'Senior Product Designer', company: 'Safaricom PLC', date: 'Oct 12, 2026', status: 'interview', label: 'Interview Scheduled' },
    { title: 'UX Lead', company: 'Microsoft Africa', date: 'Oct 5, 2026', status: 'pending', label: 'Under Review' },
    { title: 'Product Designer', company: 'Equity Group', date: 'Sep 28, 2026', status: 'rejected', label: 'Not Selected' },
  ];

  return (
    <div style={{ maxWidth: '900px', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2xl)' }}>
      <header>
        <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>My Applications</h1>
        <p style={{ color: 'var(--color-text-muted)' }}>Track the status of all your current job applications in one place.</p>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
        {applications.map((app, i) => (
          <div key={i} style={{ 
            background: 'white', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', 
            padding: 'var(--spacing-xl)', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div>
              <h2 style={{ fontSize: '1.2rem', marginBottom: '4px' }}>{app.title}</h2>
              <div style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>{app.company} &bull; Applied: {app.date}</div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-lg)' }}>
              <span style={{ 
                display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', fontWeight: 600,
                color: app.status === 'interview' ? 'var(--color-success)' : app.status === 'pending' ? 'var(--color-warning)' : 'var(--color-text-muted)',
                backgroundColor: app.status === 'interview' ? 'rgba(16, 185, 129, 0.1)' : app.status === 'pending' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(100, 116, 139, 0.1)',
                padding: '6px 12px', borderRadius: 'var(--radius-full)'
              }}>
                {app.status === 'interview' && <CheckCircle size={14} />}
                {app.status === 'pending' && <Clock size={14} />}
                {app.status === 'rejected' && <XCircle size={14} />}
                {app.label}
              </span>
              <button style={{ color: 'var(--color-primary)' }}><ExternalLink size={20}/></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
