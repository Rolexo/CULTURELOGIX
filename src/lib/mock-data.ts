export const MOCK_JOBS = [
  {
    id: 'job_1',
    title: 'Senior Frontend Engineer',
    company: 'Safaricom PLC',
    companyLogo: 'S',
    location: 'Nairobi, Kenya (Hybrid)',
    type: 'Full-time',
    category: 'Engineering',
    salary: 'KES 250k - 400k',
    postedAt: '2 days ago',
    description: 'We are looking for a Senior Frontend Engineer to join our innovative M-PESA super app team. You will be responsible for architecting and building high-performance web applications using React and Next.js.',
    requirements: [
      '5+ years of experience with React.js',
      'Strong proficiency in TypeScript and modern JavaScript',
      'Experience with state management (Zustand, Redux)',
      'Understanding of web performance optimization',
      'Knowledge of agile development practices'
    ],
    premium: false
  },
  {
    id: 'job_2',
    title: 'HR Business Partner',
    company: 'Microsoft Africa',
    companyLogo: 'M',
    location: 'Lagos, Nigeria (Remote)',
    type: 'Full-time',
    category: 'Human Resources',
    salary: 'Competitive',
    postedAt: '1 week ago',
    description: 'As an HR Business Partner, you will work closely with engineering leadership to drive talent strategy, organizational health, and employee engagement across our West African hubs.',
    requirements: [
      '7+ years experience in HR leadership roles',
      'Background in tech/software industry preferred',
      'Strong analytical and problem-solving skills',
      'Excellent stakeholder management',
      'Degree in Human Resources or related field'
    ],
    premium: true
  },
  {
    id: 'job_3',
    title: 'Product Designer',
    company: 'Equity Group',
    companyLogo: 'E',
    location: 'Kigali, Rwanda',
    type: 'Contract',
    category: 'Design',
    salary: 'RWF 1.5M - 2.5M',
    postedAt: '3 days ago',
    description: 'Join our digital transformation team to redesign core banking interfaces. We need a visionary designer who understands Fintech and user psychology across emerging markets.',
    requirements: [
      'Portfolio demonstrating complex SaaS/Fintech products',
      'Expertise in Figma and prototyping tools',
      'Strong understanding of design systems',
      'Experience conducting user research'
    ],
    premium: false
  },
  {
    id: 'job_4',
    title: 'Data Scientist',
    company: 'Paystack',
    companyLogo: 'P',
    location: 'Cape Town, South Africa (Remote)',
    type: 'Full-time',
    category: 'Data',
    salary: 'ZAR 80k - 120k',
    postedAt: '5 hours ago',
    description: 'Help us build robust fraud detection models and optimize payment routing intelligence. You will work with billions of transaction records to uncover actionable insights.',
    requirements: [
      'Strong background in statistical modeling',
      'Proficiency in Python, SQL, and pandas',
      'Experience with production machine learning pipelines',
      'Familiarity with AWS SageMaker is a plus'
    ],
    premium: true
  },
  {
    id: 'job_5',
    title: 'Chief Marketing Officer',
    company: 'Andela',
    companyLogo: 'A',
    location: 'Global (Remote)',
    type: 'Full-time',
    category: 'Executive',
    salary: '$150k - $200k',
    postedAt: '1 month ago',
    description: 'Lead global marketing strategies to connect brilliant distributed talent with top tech companies worldwide. Oversee brand, growth, and communications.',
    requirements: [
      '10+ years in senior marketing roles',
      'Proven track record in B2B marketplace growth',
      'Experience managing distributed teams',
      'Data-driven approach to marketing spend'
    ],
    premium: true
  }
];

export const MOCK_CATEGORIES = [
  'Engineering', 'Human Resources', 'Design', 'Data', 'Executive', 'Marketing', 'Sales', 'Customer Support', 'Finance'
];

export const JOB_TYPES = [
  'Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship'
];
