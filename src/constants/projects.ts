import type { Project } from '@/types';

export const PROJECTS: Project[] = [
  {
    id: 'video-intelligence',
    title: 'Distributed Video Intelligence Platform',
    tagline: 'Edge AI for 1000+ concurrent camera streams',
    description:
      'A distributed edge AI video analytics platform capable of processing real-time surveillance streams from 1000+ concurrent camera feeds.',
    longDescription:
      'Real-time inference pipeline with worker pool architecture, Kafka-backed event ingestion, and Kubernetes-driven autoscaling. Designed for sub-50ms end-to-end latency from frame ingest to threat event publication.',
    stack: ['Golang', 'Kafka', 'Kubernetes', 'Redis', 'gRPC', 'Docker', 'Python AI Services'],
    features: [
      'Concurrent stream processing with bounded worker pools',
      'Real-time threat event ingestion via Kafka topics',
      'Distributed telemetry with OpenTelemetry traces',
      'HPA-driven autoscaling on GPU + CPU node pools',
      'Sub-50ms end-to-end inference pipeline',
      'Backpressure and graceful degradation under load',
    ],
    metrics: [
      { label: 'Concurrent Streams', value: '1000+' },
      { label: 'p99 Latency', value: '< 50ms' },
      { label: 'Uptime', value: '99.99%' },
      { label: 'Throughput', value: '30K msg/s' },
    ],
    architecture: [
      'Ingestion: RTSP gateway → frame chunker',
      'Streaming: Kafka topics partitioned by camera-id',
      'Inference: Python AI workers behind gRPC',
      'State: Redis hot store + cold object storage',
      'Orchestration: Kubernetes with custom HPA',
    ],
    domain: 'Edge AI · Computer Vision',
    status: 'production',
  },
  {
    id: 'log-analytics',
    title: 'Distributed Log Analytics Engine',
    tagline: 'High-scale observability for real-time telemetry',
    description:
      'A high-scale observability and log analytics platform designed for real-time distributed telemetry ingestion and querying.',
    longDescription:
      'Stream-first ingestion pipeline that fans out into ElasticSearch and ClickHouse for hybrid search and OLAP analytics. Anomaly detection and intelligent alerting layered on top.',
    stack: ['Kafka', 'ElasticSearch', 'ClickHouse', 'Prometheus', 'Grafana', 'Golang'],
    features: [
      'Distributed indexing across shards',
      'Stream processing with at-least-once semantics',
      'Real-time alerting via rule engine',
      'Anomaly detection on time-series data',
      'High-cardinality query support',
      'Multi-tenant observability dashboards',
    ],
    metrics: [
      { label: 'Ingest Rate', value: '500K ev/s' },
      { label: 'Query p95', value: '< 200ms' },
      { label: 'Retention', value: '90 days hot' },
      { label: 'Sources', value: '10K+ nodes' },
    ],
    architecture: [
      'Producers → Kafka log topics',
      'Stream router → enrich + classify',
      'Storage: ES (search) + ClickHouse (OLAP)',
      'Alert engine on Prometheus metrics',
      'Grafana dashboards + Loki integration',
    ],
    domain: 'Observability · Data Engineering',
    status: 'production',
  },
  {
    id: 'failure-prediction',
    title: 'AI-Powered Failure Prediction System',
    tagline: 'Predict distributed system failures before they occur',
    description:
      'An intelligent infrastructure monitoring platform using machine learning to predict distributed system failures before occurrence.',
    longDescription:
      'Continuous learning pipeline that consumes telemetry, trains anomaly detectors, and emits predictive alerts. Designed to surface signal hours before traditional threshold alerts fire.',
    stack: ['Python', 'TensorFlow', 'FastAPI', 'Kafka', 'Kubernetes'],
    features: [
      'Multivariate anomaly detection',
      'Predictive infrastructure analytics',
      'Distributed telemetry ingestion',
      'Intelligent alert deduplication',
      'Feature store with versioned datasets',
      'Online + offline inference paths',
    ],
    metrics: [
      { label: 'Lead Time', value: '~3h ahead' },
      { label: 'Precision', value: '0.92' },
      { label: 'Recall', value: '0.87' },
      { label: 'Models', value: '12+ in prod' },
    ],
    architecture: [
      'Telemetry → Kafka → feature pipeline',
      'TensorFlow training on K8s GPU pool',
      'FastAPI inference services',
      'Alert router with intelligent suppression',
      'Feedback loop into retraining',
    ],
    domain: 'AI Infrastructure · SRE',
    status: 'research',
  },
  {
    id: 'chat-infra',
    title: 'High-Scale Distributed Chat Infrastructure',
    tagline: 'Realtime messaging with horizontal websocket scaling',
    description:
      'A scalable realtime communication platform supporting distributed websocket connections and horizontal scaling.',
    longDescription:
      'Connection sharding with sticky routing, NATS-backed pub/sub fanout, and Redis-backed session state. Built for graceful failover and zero-downtime deploys.',
    stack: ['Golang', 'Redis', 'NATS', 'WebSockets', 'Kubernetes'],
    features: [
      'Distributed session management',
      'Pub/sub messaging with topic fanout',
      'Fault-tolerant connection routing',
      'Realtime delivery with at-most-once + ack',
      'Autoscaling websocket gateways',
      'Backpressure-aware delivery',
    ],
    metrics: [
      { label: 'Concurrent Conns', value: '250K+' },
      { label: 'p99 Fanout', value: '< 80ms' },
      { label: 'Nodes', value: 'Auto 4-40' },
      { label: 'Delivery', value: '99.999%' },
    ],
    architecture: [
      'Gateway pods: websocket terminators',
      'NATS subjects for cross-node fanout',
      'Redis: presence + session store',
      'Sticky load balancer with hash-by-user',
      'K8s HPA on conn-count metric',
    ],
    domain: 'Distributed Systems · Realtime',
    status: 'production',
  },
  {
    id: 'financial-events',
    title: 'Financial Event Processing Engine',
    tagline: 'Event-driven settlement & claims at scale',
    description:
      'A distributed financial transaction processing platform for real-time event-driven settlement optimization and claims automation.',
    longDescription:
      'Spring Boot microservices orchestrated via Kafka topics, with ElasticSearch-backed search, MySQL for transactional state, and AWS-native deployments. Pricing and settlement run as distributed workflows.',
    stack: ['Spring Boot', 'Kafka', 'ElasticSearch', 'AWS', 'MySQL'],
    features: [
      'Pricing optimization workflows',
      'Distributed processing with idempotent consumers',
      'Event-driven settlement engine',
      'Fault tolerance via dead-letter queues',
      'High availability across AZs',
      'Audit-grade event log',
    ],
    metrics: [
      { label: 'Daily Events', value: '20M+' },
      { label: 'SLA', value: '99.95%' },
      { label: 'Latency p95', value: '< 300ms' },
      { label: 'Services', value: '30+' },
    ],
    architecture: [
      'Spring Boot services → Kafka topics',
      'ElasticSearch for search + aggregations',
      'MySQL primary + read replicas',
      'AWS MSK, EKS, RDS',
      'DLQ + replay tooling',
    ],
    domain: 'FinTech · Event-Driven Systems',
    status: 'production',
  },
];
