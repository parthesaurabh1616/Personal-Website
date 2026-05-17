import type { ResearchPost } from '@/types';

export const RESEARCH_POSTS: ResearchPost[] = [
  {
    title: 'Building Production REST APIs in Go',
    summary:
      'Versioning, request validation, middleware chains, graceful shutdown, and the patterns that separate a hobby project from a service that runs at 3 AM.',
    category: 'Backend Engineering',
    readTime: '10 min',
    topics: ['Golang', 'REST', 'API Design', 'Middleware'],
  },
  {
    title: 'Golang Concurrency Patterns for Production Backends',
    summary:
      'Worker pools, fan-out/fan-in, errgroup discipline, and how to keep goroutine counts bounded under unpredictable load.',
    category: 'Backend Engineering',
    readTime: '10 min',
    topics: ['Golang', 'Concurrency', 'Worker Pools'],
  },
  {
    title: 'SRE in Practice: SLOs, Error Budgets, and On-Call That Works',
    summary:
      'How to define SLOs that actually reflect user experience, burn error budgets intentionally, and build runbooks that survive a 2 AM incident.',
    category: 'SRE',
    readTime: '12 min',
    topics: ['SLO', 'Error Budget', 'On-Call', 'Runbooks'],
  },
  {
    title: 'Kafka Internals: Partitions, ISRs, and the Cost of Ordering',
    summary:
      'A deep dive into how Kafka guarantees ordering, how ISR replication shapes durability, and the trade-offs between throughput and consistency at scale.',
    category: 'Distributed Systems',
    readTime: '12 min',
    topics: ['Kafka', 'Replication', 'Ordering', 'Throughput'],
  },
  {
    title: 'Kubernetes Scaling Strategies Beyond HPA',
    summary:
      'When CPU-based HPA stops working — custom metrics, KEDA, VPA, cluster-autoscaler tuning, and node-pool topology.',
    category: 'Cloud Native',
    readTime: '14 min',
    topics: ['Kubernetes', 'HPA', 'KEDA', 'Autoscaling'],
  },
  {
    title: 'Designing Event-Driven Systems That Survive Failure',
    summary:
      'Idempotency keys, transactional outbox, sagas, and the operational hygiene needed to replay events without breaking downstream state.',
    category: 'Distributed Systems',
    readTime: '13 min',
    topics: ['Event-Driven', 'Sagas', 'Outbox', 'Idempotency'],
  },
];
