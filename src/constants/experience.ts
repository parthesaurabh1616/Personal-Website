import type { Experience } from '@/types';

export const EXPERIENCES: Experience[] = [
  {
    company: 'SkylarkLabs',
    role: 'Software Engineer (SDE-1)',
    period: 'Nov 2025 — Present',
    location: 'Backend · Edge AI · Distributed Systems',
    highlights: [
      'Built a distributed Go pipeline processing 1,000+ concurrent RTSP streams — H.264/H.265 decode → gRPC → NVIDIA Triton Inference Server (dynamic batching) → multi-object tracking → WebRTC egress — with bounded channels and fault-isolated per-camera state machines sustaining sub-50 ms latency; deployed each AI model as an independent Kubernetes microservice with GPU node pools and HPA, scaling replicas horizontally to eliminate frame-drop at fleet scale.',
      'Designed a production HLS/fMP4 video chunking pipeline with IDR-gated segment boundaries and wall-clock timestamps — the adaptive segmentation architecture behind YouTube and Netflix — eliminating PTS drift and decoder errors; built framehub fan-out, in-memory live ring buffer, async MinIO/S3 cloud uploader, and two-stage shutdown producing seekable gap-free archives without a transcode hop.',
      'Architected 11 AI detection workloads (counter-UAS, ANPR, FOD, fire/smoke, weapon, PPE, intrusion, crowd) as composable Kubernetes microservices over a shared gRPC/Protobuf contract backed by NVIDIA Triton; engineered the distributed alert system with per-class builders, three-axis cooldown (per-camera, per-project, geo-grid), and telemetry-gated suppression publishing to NATS for multi-tenant delivery.',
      'Designed the edge-to-cloud distributed control plane — Android DJI bridge multiplexing drone telemetry, video, and commands over yamux to a Go relay with a live edge-node registry surviving NAT traversal and mobile-network handover; built the RTSP provider control plane with NVENC/VAAPI/QSV hardware encoding, SQLite stream registry, signed-URL auth, and MediaMTX lifecycle reconciliation for multi-tenant live stream delivery at scale.',
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
