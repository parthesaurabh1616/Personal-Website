import type { ResearchPost } from '@/types';
import { GO_REST_API }    from '@/constants/notes/go-rest-api';
import { GO_CONCURRENCY } from '@/constants/notes/go-concurrency';
import { SRE_PRACTICE }   from '@/constants/notes/sre-practice';
import { KAFKA_INTERNALS } from '@/constants/notes/kafka-internals';
import { K8S_SCALING }    from '@/constants/notes/k8s-scaling';
import { EVENT_DRIVEN }   from '@/constants/notes/event-driven';

export const RESEARCH_POSTS: ResearchPost[] = [
  {
    slug: 'go-rest-api',
    title: 'Building Production REST APIs in Go',
    summary:
      'Versioning, structured error types, middleware chains, request validation, graceful shutdown, and the patterns that separate a hobby project from a service that runs at 3 AM.',
    category: 'Backend Engineering',
    readTime: '10 min',
    publishedAt: 'May 2025',
    topics: ['Golang', 'REST', 'API Design', 'Middleware'],
    content: GO_REST_API,
  },
  {
    slug: 'go-concurrency',
    title: 'Golang Concurrency Patterns for Production Backends',
    summary:
      'Worker pools, fan-out/fan-in, errgroup structured concurrency, backpressure with buffered channels, and how to keep goroutine counts bounded under unpredictable load.',
    category: 'Backend Engineering',
    readTime: '10 min',
    publishedAt: 'April 2025',
    topics: ['Golang', 'Concurrency', 'Worker Pools', 'errgroup'],
    content: GO_CONCURRENCY,
  },
  {
    slug: 'sre-practice',
    title: 'SRE in Practice: SLOs, Error Budgets, and On-Call That Works',
    summary:
      'How to define SLOs that reflect user experience, spend error budgets intentionally, design symptom-based alerts, and build runbooks that survive a 2 AM incident.',
    category: 'SRE',
    readTime: '12 min',
    publishedAt: 'March 2025',
    topics: ['SLO', 'Error Budget', 'On-Call', 'Runbooks', 'Postmortem'],
    content: SRE_PRACTICE,
  },
  {
    slug: 'kafka-internals',
    title: 'Kafka Internals: Partitions, ISRs, and the Cost of Ordering',
    summary:
      'How Kafka guarantees ordering, how ISR replication shapes durability, producer acknowledgement trade-offs, consumer group rebalancing, and the knobs that matter for throughput.',
    category: 'Distributed Systems',
    readTime: '12 min',
    publishedAt: 'February 2025',
    topics: ['Kafka', 'Replication', 'ISR', 'Consumer Groups', 'Ordering'],
    content: KAFKA_INTERNALS,
  },
  {
    slug: 'k8s-scaling',
    title: 'Kubernetes Scaling Strategies Beyond HPA',
    summary:
      'When CPU-based HPA stops working — custom metrics with Prometheus Adapter, event-driven autoscaling with KEDA, VPA right-sizing, Cluster Autoscaler tuning, and topology spread.',
    category: 'Cloud Native',
    readTime: '14 min',
    publishedAt: 'January 2025',
    topics: ['Kubernetes', 'HPA', 'KEDA', 'VPA', 'Autoscaling'],
    content: K8S_SCALING,
  },
  {
    slug: 'event-driven',
    title: 'Designing Event-Driven Systems That Survive Failure',
    summary:
      'Idempotency keys, transactional outbox, saga pattern, dead letter queues, event replay strategies, and the operational hygiene needed to keep distributed state correct.',
    category: 'Distributed Systems',
    readTime: '13 min',
    publishedAt: 'December 2024',
    topics: ['Event-Driven', 'Sagas', 'Outbox', 'Idempotency', 'DLQ'],
    content: EVENT_DRIVEN,
  },
];
