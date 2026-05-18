import type { Experience } from '@/types';

export const EXPERIENCES: Experience[] = [
  {
    company: 'SkylarkLabs',
    role: 'Software Engineer (SDE-1)',
    period: 'Nov 2025 — Present',
    location: 'Backend · Edge AI · Distributed Systems',
    highlights: [
      'Built a distributed Go pipeline processing 1,000+ concurrent RTSP streams through gRPC, NVIDIA Triton Inference Server with dynamic batching, and WebRTC egress, sustaining sub-50ms end-to-end latency.',
      'Engineered production HLS/fMP4 video chunking with IDR-gated segment boundaries, in-memory ring buffer, and async MinIO/S3 upload for gap-free seekable archives — the architecture behind YouTube and Netflix.',
      'Architected 11 AI detection workloads (ANPR, FOD, fire/smoke, PPE, intrusion) as independent Kubernetes microservices on NVIDIA Triton with gRPC/Protobuf contracts and NATS-based multi-tenant alert delivery.',
      'Built edge-to-cloud control plane multiplexing drone telemetry over yamux, with NVENC/VAAPI hardware encoding, signed-URL auth, and MediaMTX for multi-tenant RTSP/WebRTC live stream delivery at scale.',
    ],
    stack: ['Golang', 'Triton', 'gRPC', 'Kubernetes', 'NATS', 'WebRTC', 'HLS/fMP4', 'MinIO', 'yamux', 'Protobuf', 'NVENC/VAAPI'],
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
