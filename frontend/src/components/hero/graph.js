// Shared model for the hero "secure backend system" — used by both the 3D graph and the HTML fallback.
export const GROUP_COLORS = {
  request: '#8b8ff8',
  security: '#34d399',
  data: '#22d3ee',
  ai: '#b4a7fb',
  infra: '#7c8594',
};

export const nodes = [
  { id: 'client', label: 'Client', tag: 'web · mobile', note: 'Browsers, apps and partner systems', group: 'request', pos: [0, 2.55, 0] },
  { id: 'gateway', label: 'API Gateway', tag: 'edge', note: 'Single entry point and routing', group: 'request', pos: [0, 1.65, 0] },
  { id: 'auth', label: 'Authentication', tag: 'authn', note: 'Identity and token validation', group: 'security', pos: [-1.0, 0.8, 0.5] },
  { id: 'rbac', label: 'RBAC', tag: 'authz', note: 'Role and tenant authorization', group: 'security', pos: [1.0, 0.8, -0.4] },
  { id: 'api', label: 'Django / FastAPI', tag: 'services', note: 'Business logic behind REST APIs', group: 'request', pos: [0, -0.1, 0] },
  { id: 'redis', label: 'Redis', tag: 'cache · broker', note: 'Caching and task brokering', group: 'data', pos: [-2.0, -0.95, 0.5] },
  { id: 'celery', label: 'Celery', tag: 'workers', note: 'Background processing off the request path', group: 'data', pos: [-1.15, -1.75, -0.6] },
  { id: 'postgres', label: 'PostgreSQL', tag: 'store', note: 'Relational source of truth', group: 'data', pos: [0.15, -1.45, 0.9] },
  { id: 'llm', label: 'LLM', tag: 'gpt-4o', note: 'Model calls behind async services', group: 'ai', pos: [1.7, -0.95, -0.4] },
  { id: 'rag', label: 'RAG', tag: 'retrieval', note: 'Context retrieval for grounded answers', group: 'ai', pos: [2.3, -1.85, 0.4] },
  { id: 'cloud', label: 'Cloud', tag: 'docker · k8s · aws · gcp', note: 'Containerised infrastructure underneath it all', group: 'infra', pos: [0, -2.6, 0] },
];

export const edges = [
  ['client', 'gateway'], ['gateway', 'auth'], ['auth', 'rbac'], ['rbac', 'api'],
  ['api', 'redis'], ['redis', 'celery'], ['celery', 'postgres'], ['api', 'postgres'],
  ['api', 'llm'], ['llm', 'rag'], ['rag', 'postgres'], ['postgres', 'cloud'],
];
