// Single source of truth for site content.
// Facts come from the resume and the existing portfolio only — do not add metrics or claims here.

export const profile = {
  name: 'Ajay Parihar',
  role: 'Python Backend Developer',
  focus: 'Secure Systems & AI Integration',
  tagline: 'Fintech-Ready',
  statement:
    'Building secure, scalable backend systems and AI-powered services for complex, data-sensitive products.',
  subStatement:
    '3+ years building production backend systems around APIs, databases, microservices, automation, and AI integration.',
  email: 'ajayparihar876@gmail.com',
  location: 'India',
  site: 'https://iajayparihar.in',
  // Optional cut-out portrait (transparent PNG in /public, e.g. '/portrait.png'). When set it replaces the system graph in the hero.
  photo: null,
  // Set to a path in /public (e.g. '/Ajay_Parihar_Resume.pdf') to show the Resume buttons.
  resume: null,
  social: {
    github: 'https://github.com/iajayparihar',
    linkedin: 'https://www.linkedin.com/in/iajayparihar/',
  },
};

export const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'ai', label: 'AI' },
  { id: 'security', label: 'Security' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'contact', label: 'Contact' },
];

export const signals = [
  'Python', 'Django', 'FastAPI', 'PostgreSQL', 'Redis', 'AWS', 'Docker', 'Kubernetes', 'Generative AI', 'RAG',
];

export const about = [
  {
    k: 'Who I am',
    v: 'A Python backend developer with 3+ years of experience architecting secure, scalable platforms for high-stakes financial and sensitive PII data.',
  },
  {
    k: 'What I build',
    v: 'Backend systems for complex products — sensitive data, third-party integrations, asynchronous workflows, AI services and relational schemas designed to scale.',
  },
  {
    k: 'How I work',
    v: 'Directly with non-technical stakeholders, translating vague product visions into precise technical designs and database schemas. Comfortable integrating third-party APIs even when documentation is ambiguous or legacy.',
  },
  {
    k: 'What I care about',
    v: 'High-reliability systems with strict security and access-control standards: explicit authorization, isolated tenants, predictable failure modes.',
  },
];

export const aboutFocus = [
  'Backend architecture', 'Secure APIs', 'Database design', 'Third-party integrations',
  'Access control', 'AI integration', 'Reliability', 'Stakeholder communication',
];

export const education = {
  degree: 'Master of Computer Applications (MCA)',
  institution: 'Gyanodaya Institute of Professional Studies, Neemuch',
  detail: 'CGPA 8.3',
};

export const experience = [
  {
    role: 'Python Developer',
    company: 'Thoughtwin IT Solutions Pvt. Ltd.',
    period: 'Dec 2023 — Present',
    current: true,
    groups: [
      {
        title: 'APIs & data',
        items: [
          'Build scalable REST APIs with Django and FastAPI.',
          'Design relational database architecture on PostgreSQL.',
        ],
      },
      {
        title: 'Integrations & reliability',
        items: [
          'Integrate third-party APIs, with error handling and fallback strategies.',
          'Secure data transmission between services and external systems.',
        ],
      },
      {
        title: 'Architecture & delivery',
        items: [
          'Work with stakeholders to shape technical architecture from product requirements.',
          'Ship containerised services with Docker and Kubernetes.',
        ],
      },
      {
        title: 'Team',
        items: [
          'Mentor junior developers.',
          'Promote security and architecture best practices.',
        ],
      },
    ],
    stack: ['Python', 'Django', 'DRF', 'FastAPI', 'PostgreSQL', 'Docker', 'Kubernetes'],
  },
];

// Flow diagrams: each step has a short label, a mono tag and a one-line explanation.
export const featured = [
  {
    id: 'officertrack',
    name: 'OfficerTrack',
    subtitle: 'Enterprise Workforce & Access Management',
    what: 'A secure multi-tenant enterprise platform for managing officers, shift assignments and off-duty request lifecycles.',
    why: 'Workforce data is sensitive and organisation-specific: every request has to be scoped to the right tenant and the right role before it touches the data.',
    how: 'Django REST Framework APIs guarded by RBAC and tenant scoping, PostgreSQL as the system of record, Celery workers on Redis for background processing, WebSockets for real-time updates, and integrations with NetSuite and Firebase.',
    highlights: [
      'Multi-tenancy', 'RBAC', 'Shift assignment', 'Off-duty request lifecycle', 'Enterprise workflows',
      'Third-party integration', 'Sensitive data handling', 'Background processing', 'Real-time communication',
    ],
    stack: ['Python', 'Django', 'DRF', 'PostgreSQL', 'Redis', 'Celery', 'Docker', 'Kubernetes', 'WebSockets'],
    integrations: ['NetSuite', 'Firebase'],
    decisions: [
      'Authorization is enforced at the API layer, before business services run — never in the client.',
      'Slow or external work (integrations, notifications) runs in Celery workers, off the request path.',
      'Real-time state changes are pushed over WebSockets instead of polled.',
    ],
    flow: [
      { label: 'Users', tag: 'client', note: 'Officers, supervisors and admins across organisations.' },
      { label: 'RBAC', tag: 'authz', note: 'Role and tenant checks gate every request.' },
      { label: 'API Layer', tag: 'drf', note: 'Django REST Framework endpoints.' },
      { label: 'Business Services', tag: 'domain', note: 'Shifts, assignments, off-duty request lifecycle.' },
      { label: 'PostgreSQL', tag: 'store', note: 'Relational system of record.' },
    ],
    branches: [
      { label: 'Redis', tag: 'cache/broker', note: 'Broker and cache for async work.' },
      { label: 'Celery', tag: 'workers', note: 'Background processing off the request path.' },
      { label: 'WebSockets', tag: 'realtime', note: 'Real-time communication to clients.' },
      { label: 'External Systems', tag: 'NetSuite · Firebase', note: 'Third-party integrations.' },
    ],
  },
  {
    id: 'ruh',
    name: 'Ruh AI',
    subtitle: 'AI-Assisted Processing & Automation',
    what: 'Async backend services that use LLMs (OpenAI GPT-4o, Groq) for AI-driven processing and automated routing.',
    why: 'AI output feeds real workflows that handle sensitive PII — so the model sits inside a pipeline with validation, routing and graceful degradation around it.',
    how: 'FastAPI async services with PostgreSQL via SQLAlchemy, event-driven worker architecture, containerised with Docker, and Google Cloud Storage for secure data pipelines.',
    highlights: [
      'GPT-4o', 'Groq', 'AI-driven processing', 'Automated routing', 'Async event processing', 'Worker architecture',
      'Containerised services', 'Google Cloud Storage', 'Secure data pipelines', 'Graceful degradation', 'PII handling',
    ],
    stack: ['Python', 'FastAPI Async', 'OpenAI GPT-4o', 'Groq', 'PostgreSQL', 'SQLAlchemy', 'Docker', 'Google Cloud Storage'],
    decisions: [
      'Async I/O end to end so LLM latency does not block other requests.',
      'Workers consume events so long-running AI tasks are decoupled from the API.',
      'Graceful degradation when an AI provider is slow or unavailable.',
    ],
    flow: [
      { label: 'Input', tag: 'event', note: 'Incoming request or event.' },
      { label: 'API', tag: 'fastapi', note: 'Async FastAPI endpoint.' },
      { label: 'Context', tag: 'prep', note: 'Context processing before the model call.' },
      { label: 'LLM', tag: 'gpt-4o · groq', note: 'AI-driven processing.' },
      { label: 'Routing', tag: 'decide', note: 'Automated routing on the model output.' },
      { label: 'Worker', tag: 'async', note: 'Async event processing.' },
      { label: 'Storage', tag: 'pg · gcs', note: 'PostgreSQL and Google Cloud Storage.' },
      { label: 'Response', tag: 'out', note: 'Result returned or dispatched.' },
    ],
  },
];

export const aiPipeline = [
  { label: 'User Request', tag: 'in', note: 'A request enters through the same API as any other.' },
  { label: 'API', tag: 'fastapi', note: 'Async endpoint; AI is a service behind it, not the product surface.' },
  { label: 'Authentication', tag: 'authn', note: 'Identity and permissions are checked before any model sees data.' },
  { label: 'Context', tag: 'prep', note: 'Build the prompt from scoped, permitted data only.' },
  { label: 'Retriever', tag: 'rag', note: 'Retrieval-augmented generation pulls relevant context.' },
  { label: 'LLM', tag: 'openai', note: 'Model call with timeouts and fallbacks.' },
  { label: 'Validation', tag: 'guard', note: 'Model output is validated before it is trusted.' },
  { label: 'Business Logic', tag: 'domain', note: 'Deterministic code decides what happens next.' },
  { label: 'Response', tag: 'out', note: 'Returned to the caller or routed to a worker.' },
];

export const aiTopics = [
  'LLMs', 'RAG', 'AI Agents', 'LangChain', 'OpenAI', 'Async AI services', 'AI APIs', 'Automated processing', 'Context-aware routing',
];

export const securityLayers = [
  { label: 'User', tag: 'L0', note: 'Every request starts untrusted.', controls: ['Secure API design', 'Encrypted transmission'] },
  { label: 'Authentication', tag: 'L1', note: 'Establish who is calling.', controls: ['Secure authentication', 'Token validation'] },
  { label: 'RBAC', tag: 'L2', note: 'Decide what that identity may do.', controls: ['Role-based access control', 'Multi-level authorization'] },
  { label: 'Tenant Isolation', tag: 'L3', note: 'Scope every query to its organisation.', controls: ['Multi-tenancy', 'Data segregation'] },
  { label: 'Business Services', tag: 'L4', note: 'Domain logic runs with least privilege.', controls: ['Service isolation', 'Graceful failure'] },
  { label: 'Database', tag: 'L5', note: 'PII and financial data behind scoped, least-privilege access.', controls: ['PII handling', 'Access control'] },
];

export const architecture = {
  core: [
    { label: 'Client', tag: 'web · mobile', note: 'Browsers, apps, partner systems.' },
    { label: 'API Gateway', tag: 'edge', note: 'Single entry point, routing.' },
    { label: 'Authentication', tag: 'authn/z', note: 'Identity, roles, tenant scope.' },
    { label: 'Service Layer', tag: 'django · fastapi', note: 'Business logic behind REST APIs.' },
    { label: 'Redis', tag: 'cache/broker', note: 'Caching and task brokering.' },
    { label: 'Celery', tag: 'workers', note: 'Background and scheduled jobs.' },
    { label: 'PostgreSQL', tag: 'store', note: 'Relational source of truth.' },
    { label: 'Cloud', tag: 'aws · gcp · k8s', note: 'Containerised on Docker and Kubernetes.' },
  ],
  ai: [
    { label: 'Request', tag: 'in', note: 'From the service layer.' },
    { label: 'Context', tag: 'prep', note: 'Permitted data only.' },
    { label: 'RAG', tag: 'retrieve', note: 'Relevant context retrieval.' },
    { label: 'LLM', tag: 'model', note: 'Generation.' },
    { label: 'Validation', tag: 'guard', note: 'Check before trust.' },
    { label: 'Response', tag: 'out', note: 'Back to business logic.' },
  ],
  principles: [
    { k: 'Boundaries first', v: 'Auth, tenant scope and validation live at the edges so services can trust their inputs.' },
    { k: 'Async where it matters', v: 'Integrations, AI calls and heavy work move to workers instead of blocking requests.' },
    { k: 'Schema as design', v: 'Relational models are designed with stakeholders before endpoints are written.' },
    { k: 'Fail predictably', v: 'Third-party and AI dependencies get timeouts, error handling and fallbacks.' },
  ],
};

export const categories = ['All', 'Backend', 'AI', 'Security', 'Databases', 'Cloud', 'Infrastructure'];

export const technologies = [
  { name: 'Django', cat: 'Backend', note: 'Batteries-included framework for data-heavy backends and admin workflows.' },
  { name: 'DRF', cat: 'Backend', note: 'Django REST Framework for versioned, permissioned REST APIs.' },
  { name: 'FastAPI', cat: 'Backend', note: 'Async API development for high-performance backend and AI services.' },
  { name: 'Flask', cat: 'Backend', note: 'Lightweight services where a full framework is unnecessary.' },
  { name: 'REST', cat: 'Backend', note: 'RESTful API design with clear resources, status codes and contracts.' },
  { name: 'Microservices', cat: 'Infrastructure', note: 'Service decomposition with clear ownership and APIs between them.' },
  { name: 'RBAC', cat: 'Security', note: 'Role-based access control for multi-level authorization and data segregation.' },
  { name: 'Auth', cat: 'Security', note: 'Secure authentication flows and token handling.' },
  { name: 'Multi-tenancy', cat: 'Security', note: 'Tenant isolation so each organisation only sees its own data.' },
  { name: 'PII', cat: 'Security', note: 'Handling sensitive personal and financial data with strict access control.' },
  { name: 'PostgreSQL', cat: 'Databases', note: 'Primary relational store; schema design and data modelling.' },
  { name: 'MySQL', cat: 'Databases', note: 'Relational database for existing and legacy systems.' },
  { name: 'MongoDB', cat: 'Databases', note: 'Document storage for flexible, schema-light data.' },
  { name: 'Redis', cat: 'Databases', note: 'Caching and message brokering for background workers.' },
  { name: 'SQLAlchemy', cat: 'Databases', note: 'ORM and query layer for FastAPI and async services.' },
  { name: 'Celery', cat: 'Infrastructure', note: 'Distributed task queue for background and scheduled jobs.' },
  { name: 'LLMs', cat: 'AI', note: 'Integrating large language models into backend workflows.' },
  { name: 'RAG', cat: 'AI', note: 'Retrieval-augmented generation workflows for context-aware LLM applications.' },
  { name: 'LangChain', cat: 'AI', note: 'Composing LLM calls, retrievers and tools.' },
  { name: 'OpenAI', cat: 'AI', note: 'GPT models, including GPT-4o, behind async APIs.' },
  { name: 'AI Agents', cat: 'AI', note: 'Agent workflows that call tools and services.' },
  { name: 'AWS', cat: 'Cloud', note: 'Cloud infrastructure for deploying backend services.' },
  { name: 'GCS', cat: 'Cloud', note: 'Google Cloud Storage for secure file and data pipelines.' },
  { name: 'Docker', cat: 'Infrastructure', note: 'Containerised services for consistent environments.' },
  { name: 'Kubernetes', cat: 'Infrastructure', note: 'Orchestrating containerised deployments.' },
  { name: 'CI/CD', cat: 'Infrastructure', note: 'Automated build, test and deploy pipelines.' },
];

export const supporting = ['SQL', 'JavaScript', 'TypeScript'];

export const moreProjects = [
  {
    id: 'scribble',
    name: 'Scribble Addaa',
    kind: 'Real-time multiplayer game',
    summary:
      'An original browser-based multiplayer drawing and guessing game. One player draws, everyone else guesses against the clock.',
    points: [
      'Server-authoritative game engine — clients only render state and send input.',
      'Room creation with shareable room codes, drawing canvas, chat and guessing.',
      'Real-time events over Socket.IO; inputs validated with Zod at the WebSocket boundary.',
      'Mobile support; moderation (kick, ban, mute, vote-kick, report) persisted in PostgreSQL via Prisma.',
    ],
    stack: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS', 'Zustand', 'Socket.IO', 'Node.js', 'PostgreSQL'],
    links: { demo: 'https://scribbleaddaa.online' },
  },
  {
    id: 'fitnessos',
    name: 'FitnessOS',
    kind: 'Multi-tenant SaaS backend',
    summary:
      'The backend foundation for a multi-tenant fitness business platform, built around organisation-level access.',
    points: [
      'Clerk-based authentication integrated with backend JWT handling.',
      'Multi-tenant organisations with tenant isolation tests.',
      'RBAC role catalogue (Owner, Manager, Receptionist, Trainer) with self-role-change restrictions.',
      'Async FastAPI, SQLAlchemy 2 and Alembic migrations on PostgreSQL.',
    ],
    stack: ['Python', 'FastAPI', 'SQLAlchemy', 'PostgreSQL', 'Alembic', 'Clerk', 'Docker'],
    links: { github: 'https://github.com/iajayparihar/FitnessOS' },
  },
  {
    id: 'pidhi',
    name: 'Pidhi',
    kind: 'Family tree SaaS · in development',
    summary:
      'A multi-tenant family tree platform for collaboratively maintaining structured family trees.',
    points: [
      'Role-based access control for family collaboration.',
      'Invitation management for bringing members into a family.',
      'Built from scratch with a focus on backend architecture and clean design.',
    ],
    stack: ['Python', 'Django', 'PostgreSQL', 'Docker', 'Next.js'],
    links: {},
  },
];
