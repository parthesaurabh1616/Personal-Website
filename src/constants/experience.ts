import type { Experience } from '@/types';

export const EXPERIENCES: Experience[] = [
  {
    company: 'SkylarkLabs',
    role: 'Software Engineer (SDE-1)',
    period: '2023 — Present',
    location: 'Edge AI · Distributed Systems',
    highlights: [
      'Architected distributed Golang microservices for real-time video intelligence',
      'Processed 1000+ concurrent camera streams with sub-50ms latency',
      'Built edge AI infrastructure with autoscaling Kubernetes deployments',
      'Implemented Kafka-backed event pipelines for threat detection',
      'Maintained sub-50ms latency systems across distributed inference',
      'Owned observability with Prometheus, Grafana, and OpenTelemetry',
    ],
    stack: ['Golang', 'Kafka', 'Kubernetes', 'gRPC', 'Redis', 'Python'],
  },
  {
    company: 'NeoXam',
    role: 'Software Engineer',
    period: '2022 — 2023',
    location: 'FinTech · Event-Driven Systems',
    highlights: [
      'Engineered financial transaction systems on Spring Boot',
      'Built Kafka event-driven processing for settlement workflows',
      'Integrated ElasticSearch for high-cardinality financial search',
      'Designed fault-tolerant architecture across AWS regions',
      'Optimized pricing pipelines for millions of daily events',
      'Hardened idempotency and replay for downstream consumers',
    ],
    stack: ['Java', 'Spring Boot', 'Kafka', 'ElasticSearch', 'AWS', 'MySQL'],
  },
  {
    company: 'Seven Mentor',
    role: 'Data Scientist Intern',
    period: '2021 — 2022',
    location: 'ML · Predictive Analytics',
    highlights: [
      'Built end-to-end ML pipelines for recommendation systems',
      'Developed predictive analytics models with XGBoost',
      'Operationalized AI systems for production inference',
      'Experimented with anomaly detection on streaming data',
      'Authored data engineering workflows for feature pipelines',
    ],
    stack: ['Python', 'XGBoost', 'TensorFlow', 'Pandas', 'Scikit-learn'],
  },
];
