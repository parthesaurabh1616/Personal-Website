import type { Experience } from '@/types';

export const EXPERIENCES: Experience[] = [
  {
    company: 'SkylarkLabs',
    role: 'Software Engineer (SDE-1)',
    period: 'Nov 2025 — Present',
    location: 'Backend · Edge AI · Distributed Systems',
    highlights: [
      'Build and own distributed Golang microservices and REST/gRPC APIs across 10+ internal services',
      'Design service contracts, data models, and end-to-end request flows for the video intelligence platform',
      'Process 1000+ concurrent camera streams with sub-50ms end-to-end latency',
      'Operate and scale edge AI infrastructure with autoscaling Kubernetes deployments',
      'Implement Kafka-backed event pipelines for real-time threat detection and alerting',
      'Own observability stack — Prometheus, Grafana, and OpenTelemetry across all services',
    ],
    stack: ['Golang', 'Kafka', 'Kubernetes', 'gRPC', 'Redis', 'Python'],
  },
  {
    company: 'NeoXam',
    role: 'Software Engineer',
    period: 'May 2025 — Nov 2025',
    location: 'FinTech · Backend · Event-Driven Systems',
    highlights: [
      'Developed and shipped financial transaction microservices on Spring Boot',
      'Designed and maintained REST APIs and internal service contracts for settlement workflows',
      'Built Kafka event-driven processing pipelines for real-time claims and settlement',
      'Integrated ElasticSearch for high-cardinality financial data search and aggregations',
      'Deployed fault-tolerant services across AWS regions with multi-AZ high availability',
      'Optimized pricing pipelines processing millions of financial events daily',
    ],
    stack: ['Java', 'Spring Boot', 'Kafka', 'ElasticSearch', 'AWS', 'MySQL'],
  },
  {
    company: 'Seven Mentor',
    role: 'Software Engineer Intern',
    period: 'Aug 2023 — Aug 2024',
    location: 'ML · Backend Development',
    highlights: [
      'Built backend services and REST APIs integrating ML-powered recommendation features',
      'Developed end-to-end data pipelines from ingestion to model training and serving',
      'Wrote feature engineering workflows and operationalized predictive models with XGBoost',
      'Contributed to anomaly detection modules running on streaming data',
      'Gained hands-on exposure to production ML pipelines and software delivery processes',
    ],
    stack: ['Python', 'XGBoost', 'TensorFlow', 'FastAPI', 'Pandas', 'Scikit-learn'],
  },
];
