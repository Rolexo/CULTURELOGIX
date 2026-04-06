import { Download, FilePlus2, Layout } from 'lucide-react';

export default function CVBuilder() {
  return (
    <div style={{ maxWidth: '1000px', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2xl)' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>CV Builder</h1>
          <p style={{ color: 'var(--color-text-muted)' }}>Select a template and export your profile to a professional PDF.</p>
        </div>
        <button style={{ 
          background: 'var(--color-primary)', color: 'white', padding: 'var(--spacing-sm) var(--spacing-xl)', 
          borderRadius: 'var(--radius-md)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' 
        }}>
          <Download size={18} /> Export PDF
        </button>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'var(--spacing-2xl)' }}>
        <aside style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
          <div style={{ background: 'white', padding: 'var(--spacing-lg)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: 'var(--spacing-md)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Layout size={18} /> Templates
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
              <button style={{ padding: '8px', border: '2px solid var(--color-primary)', background: 'rgba(26, 20, 100, 0.05)', borderRadius: 'var(--radius-sm)', textAlign: 'left', fontWeight: '500', color: 'var(--color-primary)' }}>Modern Clean</button>
              <button style={{ padding: '8px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', textAlign: 'left' }}>Executive</button>
              <button style={{ padding: '8px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', textAlign: 'left' }}>Creative Designer</button>
            </div>
          </div>
          
          <button style={{ background: 'white', border: '1px dashed var(--color-text-muted)', padding: 'var(--spacing-md)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: 'var(--color-text-muted)', cursor: 'pointer' }}>
            <FilePlus2 size={18} /> Import from LinkedIn
          </button>
        </aside>

        <div style={{ background: 'white', padding: 'var(--spacing-3xl)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', minHeight: '600px', boxShadow: 'var(--shadow-md)' }}>
          {/* Mock Document Preview */}
          <div style={{ borderBottom: '2px solid var(--color-primary)', paddingBottom: '24px', marginBottom: '24px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '8px', color: '#1a1464' }}>Jane Doe</h2>
            <div style={{ color: '#64748b', fontSize: '1.1rem' }}>Senior Product Designer | Nairobi, Kenya | jane.doe@example.com</div>
          </div>
          
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.2rem', color: '#1a1464', marginBottom: '12px', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px' }}>SUMMARY</h3>
            <p style={{ color: '#334155', lineHeight: '1.6' }}>
              Innovative Product Designer with over 6 years of experience in Fintech and SaaS platforms. Proven track record of improving user engagement and conversion metrics through research-driven, user-centric design methodologies.
            </p>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.2rem', color: '#1a1464', marginBottom: '12px', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px' }}>EXPERIENCE</h3>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                <span>Fintech Africa Inc. - Senior Product Designer</span>
                <span>Jan 2023 - Present</span>
              </div>
              <ul style={{ paddingLeft: '20px', marginTop: '8px', color: '#334155', lineHeight: '1.6' }}>
                <li>Led the redesign of the core mobile banking application.</li>
                <li>Established and maintained the company-wide design system.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
