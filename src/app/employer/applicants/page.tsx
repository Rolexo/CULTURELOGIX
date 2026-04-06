import { Zap } from 'lucide-react';
import styles from './page.module.css';

export default function ApplicantsKanban() {
  // Mock Data for board
  const columns = [
    { title: 'New Applied', id: 'applied', count: 12 },
    { title: 'Screening', id: 'screening', count: 5 },
    { title: 'Interview', id: 'interview', count: 3 },
    { title: 'Offered', id: 'offered', count: 1 },
    { title: 'Hired', id: 'hired', count: 0 },
  ];

  const mockCards = {
    applied: [
      { name: 'Alice Johnson', role: 'Senior Frontend Engineer', match: 95, date: '2h ago' },
      { name: 'Michael Smith', role: 'Senior Frontend Engineer', match: 82, date: '1d ago' },
    ],
    screening: [
      { name: 'Sarah Lee', role: 'Product Designer', match: 88, date: '3d ago' }
    ],
    interview: [
      { name: 'David Kim', role: 'Software Engineering Manager', match: 98, date: '1w ago' }
    ],
    offered: [
      { name: 'Emma Davis', role: 'Data Scientist', match: 92, date: '2w ago' }
    ],
    hired: []
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Applicant Tracking</h1>
        <p>Manage your talent pipeline. Drag and drop candidates across stages.</p>
      </header>

      <div className={styles.kanbanBoard}>
        {columns.map(col => (
          <div key={col.id} className={styles.column}>
            <div className={styles.columnHeader}>
              <span>{col.title}</span>
              <span className={styles.count}>{col.count}</span>
            </div>
            <div className={styles.cardList}>
              {(mockCards as any)[col.id].map((card: any, i: number) => (
                <div key={i} className={styles.card} draggable>
                  <h4 className={styles.applicantName}>{card.name}</h4>
                  <div className={styles.applicantRole}>{card.role}</div>
                  <div className={styles.cardFooter}>
                    <div className={`${styles.matchScore} ${card.match > 90 ? styles.high : styles.medium}`}>
                      <Zap size={14} /> {card.match}% Match
                    </div>
                    <span className={styles.dateApplied}>{card.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
