import type { Experience } from '@/types';

export const EXPERIENCES: Experience[] = [
  {
    company: 'SkylarkLabs',
    role: 'Software Engineer (SDE-1)',
    period: 'Nov 2025 — Present',
    location: 'Backend · Edge AI · Distributed Systems',
    highlights: [
      'Engineered a distributed video intelligence pipeline in Go processing 1,000+ concurrent RTSP streams through fault-isolated per-camera lifecycles — H.264/H.265 decode → gRPC → NVIDIA Triton Inference Server (dynamic batching, concurrent model execution) → multi-object tracking → WebRTC egress — with bounded channels and atomic state machines guaranteeing one slow camera never stalls the fleet. Deployed each AI detection model as an independent Kubernetes microservice with dedicated GPU node pools and HPA, scaling inference replicas horizontally to eliminate frame-drop and sustain sub-50 ms glass-to-glass throughput at fleet scale.',
      'Designed the production video chunking and delivery pipeline using HLS/fMP4 adaptive segmentation with IDR-gated boundaries and wall-clock arrival timestamps — the same segment architecture behind YouTube and Netflix — eliminating PTS drift, decoder errors, and seek gaps across reconnects. Built the full recording stack: framehub fan-out, in-memory live ring buffer for instant scrub-back, async MinIO/S3 cloud uploader, and a two-stage shutdown that drains the final fragment before fsync, producing gap-free seekable archives without a transcode hop.',
      'Architected the AI detection framework as composable distributed microservices powering 11 production solutions — counter-UAS, ANPR, airport FOD, fire/smoke, weapon, PPE/helmet, intrusion, and crowd — over a shared gRPC/Protobuf inference contract backed by NVIDIA Triton with per-solution model versioning and dynamic batching on Kubernetes. Designed the end-to-end distributed alert system with per-class builders, three-axis cooldown management (per-camera, per-project, geo-grid), and telemetry-gated suppression, publishing verified events to NATS subjects consumed by a multi-tenant notification fleet.',
      'Designed the end-to-end edge-to-cloud distributed system: an Android DJI bridge multiplexing drone telemetry, video, and commands over yamux to a Go relay with a live edge-node registry — surviving NAT traversal, mobile-network handover, and rolling cloud redeploys without re-registration storms. Built the RTSP provider control plane with hardware-accelerated encoding (NVENC/VAAPI/QSV auto-selection), SQLite stream registry, per-tenant signed-URL auth, and MediaMTX lifecycle reconciliation serving multi-tenant live feeds to web embeds and downstream consumers at scale.',
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
