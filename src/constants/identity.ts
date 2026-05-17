import {
  Cpu,
  Network,
  Layers,
  Activity,
  Boxes,
  GitBranch,
} from 'lucide-react';

export interface IdentityPillar {
  title: string;
  description: string;
  icon: typeof Cpu;
  signal: string;
  metric: string;
}

export const IDENTITY_PILLARS: IdentityPillar[] = [
  {
    title: 'Distributed Systems',
    description:
      'Designing systems that stay consistent, available, and observable as they scale across regions, nodes, and failure domains.',
    icon: Network,
    signal: 'Consensus · Replication · Partitioning',
    metric: 'CAP-aware design',
  },
  {
    title: 'Event-Driven Architecture',
    description:
      'Kafka-first pipelines with idempotent consumers, exactly-once semantics where it matters, and replay-safe topologies.',
    icon: GitBranch,
    signal: 'Kafka · NATS · Sagas',
    metric: '500K events / sec',
  },
  {
    title: 'AI Infrastructure',
    description:
      'Serving and orchestrating ML workloads — from edge inference to GPU-backed model fleets — with operational discipline.',
    icon: Cpu,
    signal: 'Serving · Batching · GPU Pools',
    metric: 'Sub-50ms inference',
  },
  {
    title: 'Kubernetes Orchestration',
    description:
      'Production-grade Kubernetes — custom HPAs, KEDA, service mesh, multi-tenant clusters, and zero-downtime rollouts.',
    icon: Boxes,
    signal: 'HPA · KEDA · Helm · Istio',
    metric: 'Auto 4–40 nodes',
  },
  {
    title: 'Real-Time Processing',
    description:
      'Stream processing pipelines that hold latency budgets and degrade gracefully under bursty load and backpressure.',
    icon: Activity,
    signal: 'Streams · Backpressure · QoS',
    metric: 'p99 < 80ms',
  },
  {
    title: 'Scalable Backend Systems',
    description:
      'High-performance Go and Java services — clean architecture, observability baked in, and SLOs that mean something.',
    icon: Layers,
    signal: 'Go · Java · gRPC · REST',
    metric: '30+ services owned',
  },
];
