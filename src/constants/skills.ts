import type { Skill } from '@/types';

export const SKILLS: Skill[] = [
  // Languages
  { name: 'Golang', category: 'Languages', level: 'expert' },
  { name: 'Python', category: 'Languages', level: 'expert' },
  { name: 'Java', category: 'Languages', level: 'advanced' },
  { name: 'TypeScript', category: 'Languages', level: 'advanced' },

  // Distributed & Backend
  { name: 'Kafka', category: 'Distributed Systems', level: 'expert' },
  { name: 'gRPC', category: 'Distributed Systems', level: 'expert' },
  { name: 'NATS', category: 'Distributed Systems', level: 'advanced' },
  { name: 'Event-Driven Architecture', category: 'Distributed Systems', level: 'expert' },
  { name: 'CQRS / Event Sourcing', category: 'Distributed Systems', level: 'advanced' },
  { name: 'System Design', category: 'Distributed Systems', level: 'expert' },
  { name: 'Microservices', category: 'Distributed Systems', level: 'expert' },
  { name: 'Service Mesh', category: 'Distributed Systems', level: 'advanced' },

  // Cloud Native
  { name: 'Kubernetes', category: 'Cloud Native', level: 'expert' },
  { name: 'Docker', category: 'Cloud Native', level: 'expert' },
  { name: 'AWS', category: 'Cloud Native', level: 'advanced' },
  { name: 'Helm', category: 'Cloud Native', level: 'advanced' },
  { name: 'Terraform', category: 'Cloud Native', level: 'advanced' },

  // AI / ML
  { name: 'TensorFlow', category: 'AI / ML', level: 'advanced' },
  { name: 'PyTorch', category: 'AI / ML', level: 'advanced' },
  { name: 'Prompt Engineering', category: 'AI / ML', level: 'expert' },
  { name: 'LLM Systems', category: 'AI / ML', level: 'advanced' },
  { name: 'XGBoost', category: 'AI / ML', level: 'advanced' },
  { name: 'AI Infrastructure', category: 'AI / ML', level: 'expert' },

  // Data
  { name: 'PostgreSQL', category: 'Data', level: 'expert' },
  { name: 'Redis', category: 'Data', level: 'expert' },
  { name: 'ElasticSearch', category: 'Data', level: 'advanced' },
  { name: 'ClickHouse', category: 'Data', level: 'advanced' },
  { name: 'Spark', category: 'Data', level: 'advanced' },
  { name: 'MySQL', category: 'Data', level: 'advanced' },

  // Observability
  { name: 'Prometheus', category: 'Observability', level: 'expert' },
  { name: 'Grafana', category: 'Observability', level: 'expert' },
  { name: 'OpenTelemetry', category: 'Observability', level: 'advanced' },
  { name: 'Distributed Tracing', category: 'Observability', level: 'expert' },

  // Frameworks
  { name: 'Spring Boot', category: 'Frameworks', level: 'advanced' },
  { name: 'FastAPI', category: 'Frameworks', level: 'expert' },
  { name: 'Next.js', category: 'Frameworks', level: 'advanced' },
  { name: 'React', category: 'Frameworks', level: 'advanced' },
];

export const SKILL_CATEGORIES = [
  'Languages',
  'Distributed Systems',
  'Cloud Native',
  'AI / ML',
  'Data',
  'Observability',
  'Frameworks',
] as const;
