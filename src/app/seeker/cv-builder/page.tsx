'use client';

import { useState, useRef, useCallback } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Download, Layout, Plus, Trash2, Check, Loader2 } from 'lucide-react';
import { PaystackButton } from '@/components/PaystackButton';
import { useAppStore } from '@/lib/store';
import type { CVData, ExperienceEntry, EducationEntry } from '@/lib/types';
import styles from './page.module.css';

type Template = 'modern' | 'executive' | 'creative';

const DEFAULT_CV: CVData = {
  fullName: '',
  title: '',
  email: '',
  phone: '',
  location: '',
  linkedin: '',
  summary: '',
  experience: [],
  education: [],
  skills: [],
};

function newExp(): ExperienceEntry {
  return { id: crypto.randomUUID(), company: '', role: '', startDate: '', endDate: '', current: false, bullets: [''] };
}
function newEdu(): EducationEntry {
  return { id: crypto.randomUUID(), institution: '', degree: '', year: '' };
}

// ─── CV Preview Templates ────────────────────────────────────────────────────

function ModernPreview({ cv }: { cv: CVData }) {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', color: '#1e293b', fontSize: '11pt', lineHeight: 1.5 }}>
      <div style={{ borderBottom: '3px solid #1a1464', paddingBottom: '16px', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '24pt', margin: 0, color: '#1a1464' }}>{cv.fullName || 'Your Name'}</h1>
        <div style={{ color: '#64748b', marginTop: '4px', fontSize: '11pt' }}>
          {cv.title || 'Your Job Title'}
        </div>
        <div style={{ display: 'flex', gap: '16px', marginTop: '8px', fontSize: '9pt', color: '#475569', flexWrap: 'wrap' }}>
          {cv.email && <span>{cv.email}</span>}
          {cv.phone && <span>{cv.phone}</span>}
          {cv.location && <span>{cv.location}</span>}
          {cv.linkedin && <span>{cv.linkedin}</span>}
        </div>
      </div>

      {cv.summary && (
        <div style={{ marginBottom: '18px' }}>
          <h2 style={{ fontSize: '11pt', color: '#1a1464', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>Summary</h2>
          <p style={{ margin: '8px 0 0', color: '#334155' }}>{cv.summary}</p>
        </div>
      )}

      {cv.experience.length > 0 && (
        <div style={{ marginBottom: '18px' }}>
          <h2 style={{ fontSize: '11pt', color: '#1a1464', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>Experience</h2>
          {cv.experience.map((exp) => (
            <div key={exp.id} style={{ marginTop: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                <span>{exp.role} — {exp.company}</span>
                <span style={{ color: '#64748b', fontWeight: 'normal', fontSize: '9pt' }}>
                  {exp.startDate}{exp.startDate && (exp.current ? ' – Present' : exp.endDate ? ` – ${exp.endDate}` : '')}
                </span>
              </div>
              {exp.bullets.filter(Boolean).length > 0 && (
                <ul style={{ margin: '4px 0 0 16px', padding: 0, color: '#334155' }}>
                  {exp.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {cv.education.length > 0 && (
        <div style={{ marginBottom: '18px' }}>
          <h2 style={{ fontSize: '11pt', color: '#1a1464', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>Education</h2>
          {cv.education.map((edu) => (
            <div key={edu.id} style={{ marginTop: '8px', display: 'flex', justifyContent: 'space-between' }}>
              <div><strong>{edu.degree}</strong> — {edu.institution}</div>
              <div style={{ color: '#64748b', fontSize: '9pt' }}>{edu.year}</div>
            </div>
          ))}
        </div>
      )}

      {cv.skills.length > 0 && (
        <div>
          <h2 style={{ fontSize: '11pt', color: '#1a1464', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>Skills</h2>
          <div style={{ marginTop: '8px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {cv.skills.filter(Boolean).map((s, i) => (
              <span key={i} style={{ background: '#f1f5f9', padding: '2px 10px', borderRadius: '12px', fontSize: '9pt', color: '#1a1464' }}>{s}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ExecutivePreview({ cv }: { cv: CVData }) {
  return (
    <div style={{ fontFamily: 'Georgia, serif', color: '#1e293b', fontSize: '11pt', lineHeight: 1.6 }}>
      <div style={{ textAlign: 'center', borderBottom: '2px solid #0f172a', paddingBottom: '20px', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '26pt', margin: 0, color: '#0f172a', letterSpacing: '2px', textTransform: 'uppercase' }}>{cv.fullName || 'Your Name'}</h1>
        <div style={{ color: '#475569', marginTop: '6px', fontSize: '12pt', fontStyle: 'italic' }}>{cv.title || 'Your Title'}</div>
        <div style={{ display: 'flex', gap: '20px', marginTop: '10px', fontSize: '9pt', color: '#64748b', justifyContent: 'center', flexWrap: 'wrap' }}>
          {cv.email && <span>{cv.email}</span>}
          {cv.phone && <span>{cv.phone}</span>}
          {cv.location && <span>{cv.location}</span>}
          {cv.linkedin && <span>{cv.linkedin}</span>}
        </div>
      </div>

      {cv.summary && (
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '10pt', letterSpacing: '3px', textTransform: 'uppercase', color: '#64748b', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px' }}>Executive Profile</h2>
          <p style={{ margin: '10px 0 0', color: '#1e293b', fontStyle: 'italic' }}>{cv.summary}</p>
        </div>
      )}

      {cv.experience.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '10pt', letterSpacing: '3px', textTransform: 'uppercase', color: '#64748b', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px' }}>Career History</h2>
          {cv.experience.map((exp) => (
            <div key={exp.id} style={{ marginTop: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong style={{ fontSize: '12pt' }}>{exp.role}</strong>
                <span style={{ color: '#64748b', fontSize: '9pt' }}>
                  {exp.startDate}{exp.current ? ' – Present' : exp.endDate ? ` – ${exp.endDate}` : ''}
                </span>
              </div>
              <div style={{ color: '#475569', fontStyle: 'italic' }}>{exp.company}</div>
              {exp.bullets.filter(Boolean).length > 0 && (
                <ul style={{ margin: '6px 0 0 16px', color: '#334155' }}>
                  {exp.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {cv.skills.length > 0 && (
        <div>
          <h2 style={{ fontSize: '10pt', letterSpacing: '3px', textTransform: 'uppercase', color: '#64748b', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px' }}>Core Competencies</h2>
          <div style={{ marginTop: '10px', columns: 2, columnGap: '20px' }}>
            {cv.skills.filter(Boolean).map((s, i) => (
              <div key={i} style={{ color: '#1e293b', marginBottom: '4px' }}>▸ {s}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function CreativePreview({ cv }: { cv: CVData }) {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', display: 'grid', gridTemplateColumns: '35% 65%', minHeight: '600px', fontSize: '10pt' }}>
      {/* Sidebar */}
      <div style={{ background: '#1a1464', color: 'white', padding: '24px 16px' }}>
        <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28pt', fontWeight: 'bold', marginBottom: '12px' }}>
          {cv.fullName?.[0] || '?'}
        </div>
        <h1 style={{ fontSize: '14pt', margin: '0 0 4px', lineHeight: 1.3 }}>{cv.fullName || 'Your Name'}</h1>
        <div style={{ color: '#f59e0b', fontSize: '9pt', marginBottom: '20px' }}>{cv.title || 'Your Title'}</div>

        <div style={{ fontSize: '8pt', marginBottom: '16px' }}>
          <div style={{ color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>Contact</div>
          {cv.email && <div style={{ marginBottom: '4px', wordBreak: 'break-all' }}>{cv.email}</div>}
          {cv.phone && <div style={{ marginBottom: '4px' }}>{cv.phone}</div>}
          {cv.location && <div style={{ marginBottom: '4px' }}>{cv.location}</div>}
          {cv.linkedin && <div style={{ marginBottom: '4px', wordBreak: 'break-all' }}>{cv.linkedin}</div>}
        </div>

        {cv.skills.length > 0 && (
          <div>
            <div style={{ color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px', fontSize: '8pt' }}>Skills</div>
            {cv.skills.filter(Boolean).map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', fontSize: '8pt' }}>
                <span style={{ color: '#f59e0b' }}>●</span> {s}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main */}
      <div style={{ padding: '24px 20px', color: '#1e293b' }}>
        {cv.summary && (
          <div style={{ marginBottom: '18px' }}>
            <h2 style={{ fontSize: '10pt', color: '#1a1464', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px', borderBottom: '2px solid #1a1464', paddingBottom: '4px' }}>Profile</h2>
            <p style={{ color: '#475569', lineHeight: 1.6 }}>{cv.summary}</p>
          </div>
        )}

        {cv.experience.length > 0 && (
          <div style={{ marginBottom: '18px' }}>
            <h2 style={{ fontSize: '10pt', color: '#1a1464', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px', borderBottom: '2px solid #1a1464', paddingBottom: '4px' }}>Experience</h2>
            {cv.experience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <strong>{exp.role}</strong>
                  <span style={{ color: '#64748b', fontSize: '8pt' }}>
                    {exp.startDate}{exp.current ? '–Now' : exp.endDate ? `–${exp.endDate}` : ''}
                  </span>
                </div>
                <div style={{ color: '#f59e0b', fontWeight: '600', fontSize: '8.5pt' }}>{exp.company}</div>
                {exp.bullets.filter(Boolean).map((b, i) => (
                  <div key={i} style={{ color: '#475569', fontSize: '8.5pt', marginTop: '2px', paddingLeft: '10px' }}>• {b}</div>
                ))}
              </div>
            ))}
          </div>
        )}

        {cv.education.length > 0 && (
          <div>
            <h2 style={{ fontSize: '10pt', color: '#1a1464', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px', borderBottom: '2px solid #1a1464', paddingBottom: '4px' }}>Education</h2>
            {cv.education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: '8px' }}>
                <strong>{edu.degree}</strong>
                <div style={{ color: '#475569', fontSize: '8.5pt' }}>{edu.institution} · {edu.year}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function CVBuilderPage() {
  const [cv, setCv] = useState<CVData>(DEFAULT_CV);
  const [template, setTemplate] = useState<Template>('modern');
  const [skillInput, setSkillInput] = useState('');
  const [paid, setPaid] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const userEmail = useAppStore((s) => s.userEmail);

  const handlePrint = useReactToPrint({
    contentRef: previewRef,
    documentTitle: `${cv.fullName || 'CV'} - CultureLogix`,
  });

  const triggerDownload = useCallback(() => {
    setDownloading(true);
    setTimeout(() => {
      handlePrint();
      setDownloading(false);
    }, 300);
  }, [handlePrint]);

  const handlePaySuccess = useCallback(() => {
    setPaid(true);
    setTimeout(triggerDownload, 500);
  }, [triggerDownload]);

  // CV field helpers
  const field = (key: keyof CVData, val: string) =>
    setCv((prev) => ({ ...prev, [key]: val }));

  const addExp = () => setCv((p) => ({ ...p, experience: [...p.experience, newExp()] }));
  const removeExp = (id: string) => setCv((p) => ({ ...p, experience: p.experience.filter((e) => e.id !== id) }));
  const updateExp = (id: string, key: keyof ExperienceEntry, val: string | boolean) =>
    setCv((p) => ({ ...p, experience: p.experience.map((e) => e.id === id ? { ...e, [key]: val } : e) }));
  const updateBullet = (expId: string, i: number, val: string) =>
    setCv((p) => ({
      ...p,
      experience: p.experience.map((e) =>
        e.id === expId ? { ...e, bullets: e.bullets.map((b, j) => j === i ? val : b) } : e),
    }));
  const addBullet = (expId: string) =>
    setCv((p) => ({ ...p, experience: p.experience.map((e) => e.id === expId ? { ...e, bullets: [...e.bullets, ''] } : e) }));

  const addEdu = () => setCv((p) => ({ ...p, education: [...p.education, newEdu()] }));
  const removeEdu = (id: string) => setCv((p) => ({ ...p, education: p.education.filter((e) => e.id !== id) }));
  const updateEdu = (id: string, key: keyof EducationEntry, val: string) =>
    setCv((p) => ({ ...p, education: p.education.map((e) => e.id === id ? { ...e, [key]: val } : e) }));

  const addSkill = () => {
    const s = skillInput.trim();
    if (s && !cv.skills.includes(s)) {
      setCv((p) => ({ ...p, skills: [...p.skills, s] }));
    }
    setSkillInput('');
  };
  const removeSkill = (s: string) => setCv((p) => ({ ...p, skills: p.skills.filter((x) => x !== s) }));

  const templates: { key: Template; label: string }[] = [
    { key: 'modern', label: 'Modern Clean' },
    { key: 'executive', label: 'Executive' },
    { key: 'creative', label: 'Creative Designer' },
  ];

  return (
    <div className={styles.wrapper}>
      {/* ── Header ── */}
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>CV Builder</h1>
          <p className={styles.subtitle}>Fill in your details, pick a template, and download a professional PDF.</p>
        </div>

        {paid ? (
          <button
            className={styles.btnDownload}
            onClick={triggerDownload}
            disabled={downloading}
          >
            {downloading ? <Loader2 size={18} className={styles.spin} /> : <Download size={18} />}
            {downloading ? 'Generating…' : 'Download PDF'}
          </button>
        ) : (
          <PaystackButton
            email={userEmail || 'user@culturelogix.com'}
            amountNGN={4500}
            label="Download PDF — ₦4,500"
            purpose="cv"
            className={styles.btnDownload}
            onSuccess={handlePaySuccess}
          />
        )}
      </header>

      <div className={styles.grid}>
        {/* ── Sidebar: Template + Form ── */}
        <aside className={styles.sidebar}>
          {/* Template selector */}
          <div className={styles.card}>
            <h3 className={styles.cardTitle}><Layout size={16} /> Templates</h3>
            <div className={styles.templateList}>
              {templates.map((t) => (
                <button
                  key={t.key}
                  className={`${styles.templateBtn} ${template === t.key ? styles.templateBtnActive : ''}`}
                  onClick={() => setTemplate(t.key)}
                >
                  {template === t.key && <Check size={14} />} {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Personal Info */}
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Personal Info</h3>
            <div className={styles.formGrid}>
              {([
                ['fullName', 'Full Name', 'Jane Doe'],
                ['title', 'Job Title', 'Senior Product Designer'],
                ['email', 'Email', 'jane@example.com'],
                ['phone', 'Phone', '+254 700 000 000'],
                ['location', 'Location', 'Nairobi, Kenya'],
                ['linkedin', 'LinkedIn / Website', 'linkedin.com/in/jane'],
              ] as [keyof CVData, string, string][]).map(([k, label, ph]) => (
                <label key={k} className={styles.label}>
                  {label}
                  <input
                    className={styles.input}
                    placeholder={ph}
                    value={cv[k] as string}
                    onChange={(e) => field(k, e.target.value)}
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Summary</h3>
            <textarea
              className={styles.textarea}
              placeholder="2–3 sentence professional summary…"
              value={cv.summary}
              onChange={(e) => field('summary', e.target.value)}
            />
          </div>

          {/* Experience */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>Experience</h3>
              <button className={styles.btnAdd} onClick={addExp}><Plus size={14} /> Add</button>
            </div>
            {cv.experience.map((exp) => (
              <div key={exp.id} className={styles.entryBlock}>
                <div className={styles.entryRow}>
                  <input className={styles.input} placeholder="Company" value={exp.company}
                    onChange={(e) => updateExp(exp.id, 'company', e.target.value)} />
                  <button className={styles.btnRemove} onClick={() => removeExp(exp.id)}><Trash2 size={14} /></button>
                </div>
                <input className={styles.input} placeholder="Role / Title" value={exp.role}
                  onChange={(e) => updateExp(exp.id, 'role', e.target.value)} />
                <div className={styles.dateRow}>
                  <input className={styles.input} placeholder="Start (e.g. Jan 2022)" value={exp.startDate}
                    onChange={(e) => updateExp(exp.id, 'startDate', e.target.value)} />
                  {!exp.current && (
                    <input className={styles.input} placeholder="End" value={exp.endDate}
                      onChange={(e) => updateExp(exp.id, 'endDate', e.target.value)} />
                  )}
                </div>
                <label className={styles.checkboxLabel}>
                  <input type="checkbox" checked={exp.current}
                    onChange={(e) => updateExp(exp.id, 'current', e.target.checked)} />
                  Currently working here
                </label>
                <div className={styles.bulletsSection}>
                  <span className={styles.bulletsLabel}>Bullet points</span>
                  {exp.bullets.map((b, i) => (
                    <input key={i} className={styles.input} placeholder={`• Achievement ${i + 1}`}
                      value={b} onChange={(e) => updateBullet(exp.id, i, e.target.value)} />
                  ))}
                  <button className={styles.btnAddSmall} onClick={() => addBullet(exp.id)}><Plus size={12} /> Add bullet</button>
                </div>
              </div>
            ))}
          </div>

          {/* Education */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>Education</h3>
              <button className={styles.btnAdd} onClick={addEdu}><Plus size={14} /> Add</button>
            </div>
            {cv.education.map((edu) => (
              <div key={edu.id} className={styles.entryBlock}>
                <div className={styles.entryRow}>
                  <input className={styles.input} placeholder="Institution" value={edu.institution}
                    onChange={(e) => updateEdu(edu.id, 'institution', e.target.value)} />
                  <button className={styles.btnRemove} onClick={() => removeEdu(edu.id)}><Trash2 size={14} /></button>
                </div>
                <input className={styles.input} placeholder="Degree / Certification" value={edu.degree}
                  onChange={(e) => updateEdu(edu.id, 'degree', e.target.value)} />
                <input className={styles.input} placeholder="Year (e.g. 2020)" value={edu.year}
                  onChange={(e) => updateEdu(edu.id, 'year', e.target.value)} />
              </div>
            ))}
          </div>

          {/* Skills */}
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Skills</h3>
            <div className={styles.skillsInput}>
              <input
                className={styles.input}
                placeholder="Type a skill and press Enter"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addSkill(); } }}
              />
              <button className={styles.btnAdd} onClick={addSkill}><Plus size={14} /></button>
            </div>
            <div className={styles.skillTags}>
              {cv.skills.map((s) => (
                <span key={s} className={styles.skillTag}>
                  {s} <button onClick={() => removeSkill(s)}>×</button>
                </span>
              ))}
            </div>
          </div>
        </aside>

        {/* ── CV Preview ── */}
        <div className={styles.previewWrapper}>
          <div className={styles.previewLabel}>Live Preview</div>
          <div className={styles.previewPage} ref={previewRef}>
            {template === 'modern' && <ModernPreview cv={cv} />}
            {template === 'executive' && <ExecutivePreview cv={cv} />}
            {template === 'creative' && <CreativePreview cv={cv} />}
          </div>
          {!paid && (
            <div className={styles.previewCTA}>
              <p>Your CV looks great! Pay <strong>₦4,500</strong> to download as PDF.</p>
              <PaystackButton
                email={userEmail || 'user@culturelogix.com'}
                amountNGN={4500}
                label="Pay ₦4,500 & Download PDF"
                purpose="cv"
                className={styles.btnDownload}
                onSuccess={handlePaySuccess}
              />
            </div>
          )}
        </div>
      </div>

      {/* Print-only styles injected for clean PDF output */}
      <style>{`
        @media print {
          body * { visibility: hidden; }
          .${styles.previewPage}, .${styles.previewPage} * { visibility: visible; }
          .${styles.previewPage} { position: fixed; left: 0; top: 0; width: 100%; }
        }
      `}</style>
    </div>
  );
}
