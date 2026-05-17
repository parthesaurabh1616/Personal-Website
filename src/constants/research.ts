import type { ResearchPost } from '@/types';

export const RESEARCH_POSTS: ResearchPost[] = [
  {
    title: 'Kafka Internals: Partitions, ISRs, and the Cost of Ordering',
    summary:
      'A deep dive into how Kafka guarantees ordering, how ISR replication shapes durability, and the trade-offs between throughput and consistency at scale.',
    category: 'Streaming Systems',
    readTime: '12 min',
    topics: ['Kafka', 'Replication', 'Ordering', 'Throughput'],
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
    title: 'Distributed Tracing in Microservice Topologies',
    summary:
      'Building causality across services with OpenTelemetry — context propagation, sampling strategies, and reading flame graphs across regions.',
    category: 'Observability',
    readTime: '11 min',
    topics: ['Tracing', 'OpenTelemetry', 'Microservices'],
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
  {
    title: 'AI Infrastructure: Serving Models at Sub-50ms Latency',
    summary:
      'Inference graphs, GPU pooling, batching strategies, and the engineering behind keeping ML models hot under bursty traffic.',
    category: 'AI Infrastructure',
    readTime: '15 min',
    topics: ['ML Serving', 'GPU', 'Batching', 'Latency'],
  },
];
