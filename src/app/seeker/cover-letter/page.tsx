'use client';

import { Sparkles, Copy, RefreshCw } from 'lucide-react';
import { useState } from 'react';

export default function CoverLetterGenerator() {
  const [jobDesc, setJobDesc] = useState('');
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState('');

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobDesc) return;
    setGenerating(true);
    
    // Simulate AI generation time
    setTimeout(() => {
      setResult("Dear Hiring Manager,\n\nI am writing to express my strong interest in the open position at your company. With over 6 years of experience designing scalable products, I have successfully driven user engagement by 45% in my previous role at Fintech Africa.\n\nMy background in creating comprehensive design systems and conducting deep user research aligns perfectly with the requirements you have outlined. I am eager to bring my expertise to your team and contribute to your ongoing success.\n\nThank you for considering my application. I look forward to the opportunity to discuss how my skills and experiences make me the ideal candidate for this role.\n\nSincerely,\nJane Doe");
      setGenerating(false);
    }, 1500);
  };

  return (
    <div style={{ maxWidth: '1000px', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2xl)' }}>
      <header>
        <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>AI Cover Letter Generator</h1>
        <p style={{ color: 'var(--color-text-muted)' }}>Paste a job description and let our AI generate a perfectly tailored cover letter using your profile data.</p>
        <div style={{ display: 'inline-block', marginTop: '12px', padding: '4px 12px', background: 'linear-gradient(135deg, #f59e0b, #ef4444)', color: 'white', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase' }}>
          Premium Feature
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) minmax(400px, 1.2fr)', gap: 'var(--spacing-2xl)' }}>
        <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontWeight: 600 }}>1. Paste the Job Description</label>
            <textarea 
              placeholder="Paste the requirements, role description, and company name here..."
              value={jobDesc}
              onChange={(e) => setJobDesc(e.target.value)}
              style={{ width: '100%', height: '250px', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', resize: 'vertical', fontFamily: 'inherit' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontWeight: 600 }}>2. Tone</label>
            <select style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', background: 'white' }}>
              <option>Professional</option>
              <option>Confident & Bold</option>
              <option>Creative & Casual</option>
            </select>
          </div>

          <button 
            type="submit" 
            disabled={!jobDesc || generating}
            style={{ 
              background: 'var(--color-primary)', color: 'white', padding: '14px', 
              borderRadius: 'var(--radius-md)', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              opacity: (!jobDesc || generating) ? 0.7 : 1, cursor: (!jobDesc || generating) ? 'not-allowed' : 'pointer'
            }}
          >
            {generating ? <RefreshCw className="spin" size={20} /> : <Sparkles size={20} />} 
            {generating ? 'Drafting...' : 'Generate Cover Letter'}
          </button>
        </form>

        <div style={{ background: 'white', padding: 'var(--spacing-2xl)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-lg)', borderBottom: '1px solid var(--color-surface)', paddingBottom: '12px' }}>
            <h3 style={{ fontWeight: 600 }}>Generated Result</h3>
            {result && (
              <button style={{ color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.9rem', fontWeight: 600 }}>
                <Copy size={16} /> Copy
              </button>
            )}
          </div>
          
          {result ? (
            <div style={{ whiteSpace: 'pre-wrap', color: 'var(--color-text-main)', lineHeight: '1.6', fontSize: '0.95rem' }}>
              {result}
            </div>
          ) : (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', color: 'var(--color-text-muted)', textAlign: 'center', gap: '12px' }}>
              <Sparkles size={48} opacity={0.2} />
              <p>Your AI-generated cover letter will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
