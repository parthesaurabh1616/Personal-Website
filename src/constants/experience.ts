import type { Experience } from '@/types';

export const EXPERIENCES: Experience[] = [
  {
    company: 'SkylarkLabs',
    role: 'Software Engineer (SDE-1)',
    period: 'Nov 2025 — Present',
    location: 'Backend · Edge AI · Distributed Systems',
    highlights: [
      'Designed and shipped a per-camera Go pipeline fanning 1,000+ concurrent RTSP feeds through isolated lifecycles — H.264/H.265 capture → gRPC AI inference → multi-object tracking → pixel-to-world geo-projection → WebRTC republish to MediaMTX — using bounded channels, atomic state machines, and context-scoped cancellation for full fault isolation, sustaining sub-50 ms glass-to-glass latency at fleet scale; ran an independent audio inference path (gunshot/scream detection) on the same goroutine lifecycle with no head-of-line coupling to the video path.',
      'Authored the detection-solution framework powering 11 production AI workloads — counter-UAS, ANPR, airport FOD, fire/smoke, weapon, PPE/helmet, intrusion, and crowd detection — as composable post-processors over a shared gRPC inference contract; wired each solution to an alert pipeline with per-class builders, a three-axis cooldown manager (per-camera, per-project, grid-cell), and telemetry-gated suppression that mutes detections during gimbal slew and platform instability, cutting false-positive volume by an order of magnitude on airborne feeds before publishing to NATS.',
      'Authored the fragmented-MP4 recording subsystem — framehub fan-out, in-memory live ring buffer for instant timeline scrub-back, fMP4 muxer with wall-clock arrival timestamps and IDR-gated segment boundaries, async MinIO/S3 cloud uploader, and a two-stage shutdown that drains the final fragment before fsync — producing seekable, gap-free archives across reconnects and process restarts without a transcode hop.',
      'Designed the edge-to-cloud control plane: an Android DJI bridge that multiplexes drone video, telemetry, and command channels over a single yamux session to a Go relay maintaining a live edge-node registry and demultiplexing API requests by device ID — surviving NAT traversal, mobile-network handover, and rolling cloud redeploys without re-registration storms; separately built the RTSP provider control plane with auto-selected NVENC/VAAPI/QSV/CPU encoding, SQLite-backed stream registry, per-tenant signed-URL auth, and MediaMTX lifecycle reconciliation.',
    ],
    stack: ['Golang', 'gRPC', 'NATS', 'WebRTC', 'MediaMTX', 'yamux', 'Kubernetes', 'MinIO', 'SQLite', 'Protobuf'],
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
