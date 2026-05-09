'use client';

import { useState, useRef, useCallback } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Sparkles, Copy, RefreshCw, Download, Check } from 'lucide-react';
import { PaystackButton } from '@/components/PaystackButton';
import { useAppStore } from '@/lib/store';

type Tone = 'professional' | 'bold' | 'creative';

function generateCoverLetter(jobDesc: string, tone: Tone, name: string, title: string): string {
  const applicantName = name || 'Applicant';
  const applicantTitle = title || 'Professional';

  // Extract key details from job description
  const lines = jobDesc.split('\n').filter(Boolean);
  const companyGuess = (() => {
    const m = jobDesc.match(/(?:at|@|for)\s+([A-Z][a-zA-Z\s&]+(?:Ltd|Inc|Corp|Group|Co|PLC|Africa|Kenya)?)/);
    return m ? m[1].trim() : 'your organisation';
  })();

  const roleGuess = (() => {
    const m = jobDesc.match(/(?:hiring|looking for|seeking|role of|position of)\s+(?:a\s+|an\s+)?([A-Za-z\s]+?)(?:\s+to|\s+who|\.|\,)/i);
    return m ? m[1].trim() : 'this position';
  })();

  const keywords = lines
    .join(' ')
    .match(/\b(React|Node|Python|TypeScript|JavaScript|leadership|design|data|analytics|management|marketing|sales|strategy|communication|collaboration|agile|cloud|AI|machine learning|UX|research)\b/gi) || [];
  const uniqueKeywords = [...new Set(keywords)].slice(0, 4).join(', ');

  const openings: Record<Tone, string> = {
    professional: `I am writing to express my strong interest in the ${roleGuess} position at ${companyGuess}. As an experienced ${applicantTitle}, I bring a proven track record of delivering exceptional results and am confident that my background aligns closely with your requirements.`,
    bold: `When I came across the ${roleGuess} opportunity at ${companyGuess}, I knew immediately this was the role I have been building my career toward. With deep expertise as a ${applicantTitle} and a relentless drive to exceed targets, I am ready to make an immediate impact on your team.`,
    creative: `Imagine a ${applicantTitle} who doesn't just meet the bar—they raise it. That's me, and I'm excited to bring my unique blend of creativity and technical skill to the ${roleGuess} role at ${companyGuess}.`,
  };

  const middles: Record<Tone, string> = {
    professional: `Throughout my career, I have consistently demonstrated strong capabilities in ${uniqueKeywords || 'cross-functional collaboration and strategic execution'}. My experience has equipped me with the technical depth and interpersonal skills required to contribute meaningfully from day one. I take a methodical, data-driven approach to problem-solving and pride myself on clear communication across all organisational levels.`,
    bold: `My background in ${uniqueKeywords || 'driving results and leading initiatives'} has given me the skills to tackle your most challenging problems head-on. I have a track record of not just meeting expectations but consistently exceeding them—and I intend to do the same at ${companyGuess}. I thrive in fast-paced environments and have a natural ability to influence and inspire those around me.`,
    creative: `I bring a fresh perspective to ${uniqueKeywords || 'problem-solving and innovation'}. Whether it's designing a new workflow from scratch, crafting a compelling narrative, or building something no one has tried before, I approach every challenge with curiosity and enthusiasm. My work blends analytical rigour with creative intuition, and I believe that combination is exactly what ${companyGuess} is looking for.`,
  };

  const closings: Record<Tone, string> = {
    professional: `I am particularly excited about the opportunity to join ${companyGuess} at this stage of its growth. I would welcome the chance to discuss how my experience and vision can contribute to your team's ongoing success. Thank you sincerely for your time and consideration.\n\nWarm regards,\n${applicantName}`,
    bold: `I am not just looking for a job—I am looking for a place where I can make a real difference. ${companyGuess} represents exactly that opportunity. I look forward to meeting your team and demonstrating why I am the clear choice for this role.\n\nBold regards,\n${applicantName}`,
    creative: `I would love to bring my energy and ideas to ${companyGuess} and collaborate on what comes next. Let's build something remarkable together. I look forward to the conversation.\n\nCreatively yours,\n${applicantName}`,
  };

  return `Dear Hiring Manager,\n\n${openings[tone]}\n\n${middles[tone]}\n\n${closings[tone]}`;
}

export default function CoverLetterPage() {
  const [jobDesc, setJobDesc] = useState('');
  const [tone, setTone] = useState<Tone>('professional');
  const [applicantName, setApplicantName] = useState('');
  const [applicantTitle, setApplicantTitle] = useState('');
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);
  const [paid, setPaid] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);
  const userEmail = useAppStore((s) => s.userEmail);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: 'Cover Letter - CultureLogix',
  });

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobDesc.trim()) return;
    setGenerating(true);
    setTimeout(() => {
      setResult(generateCoverLetter(jobDesc, tone, applicantName, applicantTitle));
      setGenerating(false);
    }, 1200);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePaySuccess = useCallback(() => {
    setPaid(true);
    setTimeout(() => handlePrint(), 500);
  }, [handlePrint]);

  return (
    <div style={{ maxWidth: '1100px', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2xl)' }}>
      <header>
        <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>AI Cover Letter Generator</h1>
        <p style={{ color: 'var(--color-text-muted)' }}>
          Paste a job description, set your tone, and get a personalised cover letter in seconds. Download as PDF for <strong>₦4,500</strong>.
        </p>
        <div style={{ display: 'inline-block', marginTop: '12px', padding: '4px 12px', background: 'linear-gradient(135deg, #f59e0b, #ef4444)', color: 'white', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase' }}>
          Premium Feature
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) minmax(400px, 1.2fr)', gap: 'var(--spacing-2xl)', alignItems: 'start' }}>
        {/* ── Form ── */}
        <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontWeight: 600, fontSize: '0.9rem' }}>
              Your Name
              <input
                style={{ padding: '10px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', fontFamily: 'inherit', fontSize: '0.9rem' }}
                placeholder="Jane Doe"
                value={applicantName}
                onChange={(e) => setApplicantName(e.target.value)}
              />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontWeight: 600, fontSize: '0.9rem' }}>
              Your Current Title
              <input
                style={{ padding: '10px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', fontFamily: 'inherit', fontSize: '0.9rem' }}
                placeholder="Senior Product Designer"
                value={applicantTitle}
                onChange={(e) => setApplicantTitle(e.target.value)}
              />
            </label>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontWeight: 600 }}>1. Paste the Job Description</label>
            <textarea
              placeholder="Paste the full job post — role, company, requirements…"
              value={jobDesc}
              onChange={(e) => setJobDesc(e.target.value)}
              style={{ width: '100%', height: '220px', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', resize: 'vertical', fontFamily: 'inherit', fontSize: '0.9rem' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontWeight: 600 }}>2. Writing Tone</label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {([['professional', 'Professional'], ['bold', 'Confident & Bold'], ['creative', 'Creative & Fresh']] as [Tone, string][]).map(([val, label]) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setTone(val)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 'var(--radius-full)',
                    border: tone === val ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                    background: tone === val ? 'rgba(26,20,100,0.07)' : 'white',
                    color: tone === val ? 'var(--color-primary)' : 'inherit',
                    fontWeight: tone === val ? 700 : 400,
                    cursor: 'pointer',
                    fontSize: '0.87rem',
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={!jobDesc.trim() || generating}
            style={{
              background: 'var(--color-primary)', color: 'white', padding: '14px',
              borderRadius: 'var(--radius-md)', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              opacity: (!jobDesc.trim() || generating) ? 0.7 : 1,
              cursor: (!jobDesc.trim() || generating) ? 'not-allowed' : 'pointer',
              fontSize: '1rem',
            }}
          >
            {generating ? <RefreshCw size={20} style={{ animation: 'spin 1s linear infinite' }} /> : <Sparkles size={20} />}
            {generating ? 'Drafting your letter…' : 'Generate Cover Letter'}
          </button>
        </form>

        {/* ── Result ── */}
        <div style={{ background: 'white', padding: 'var(--spacing-2xl)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-surface)', paddingBottom: '12px' }}>
            <h3 style={{ fontWeight: 700 }}>Generated Letter</h3>
            {result && (
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={handleCopy}
                  style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-primary)', fontSize: '0.87rem', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
                {paid ? (
                  <button
                    onClick={() => handlePrint()}
                    style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'var(--color-primary)', color: 'white', padding: '6px 12px', borderRadius: 'var(--radius-sm)', fontSize: '0.87rem', fontWeight: 600, border: 'none', cursor: 'pointer' }}
                  >
                    <Download size={14} /> Download PDF
                  </button>
                ) : (
                  <PaystackButton
                    email={userEmail || 'user@culturelogix.com'}
                    amountNGN={4500}
                    label="Download PDF — ₦4,500"
                    purpose="cover_letter"
                    style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#f59e0b', color: 'white', padding: '6px 14px', borderRadius: 'var(--radius-sm)', fontSize: '0.87rem', fontWeight: 600, border: 'none', cursor: 'pointer' }}
                    disabled={!result}
                    onSuccess={handlePaySuccess}
                  />
                )}
              </div>
            )}
          </div>

          {result ? (
            <div>
              {/* Hidden printable area */}
              <div ref={printRef} style={{ fontFamily: 'Georgia, serif', fontSize: '11pt', lineHeight: 1.7, color: '#1e293b', padding: '0 10px' }}>
                <div style={{ borderBottom: '2px solid #1a1464', paddingBottom: '16px', marginBottom: '24px' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '14pt', color: '#1a1464' }}>{applicantName || 'Your Name'}</div>
                  <div style={{ color: '#64748b', fontSize: '10pt' }}>{applicantTitle}</div>
                </div>
                <div style={{ whiteSpace: 'pre-wrap', color: '#1e293b' }}>{result}</div>
              </div>
            </div>
          ) : (
            <div style={{ flex: 1, minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', color: 'var(--color-text-muted)', textAlign: 'center', gap: '12px' }}>
              <Sparkles size={48} opacity={0.15} />
              <p>Your tailored cover letter will appear here after generation.</p>
              <p style={{ fontSize: '0.85rem' }}>Fill in the form and click Generate.</p>
            </div>
          )}
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
