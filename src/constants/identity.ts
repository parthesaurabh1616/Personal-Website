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
    title: 'Backend Engineering',
    description:
      'Designing and shipping production-grade APIs, microservices, and backend systems in Go, Java, and Python — clean contracts, testable code, and reliable delivery.',
    icon: Layers,
    signal: 'Go · Java · REST · gRPC',
    metric: '30+ services owned',
  },
  {
    title: 'Distributed Systems',
    description:
      'Building systems that stay consistent, available, and observable as they scale across regions, nodes, and failure domains.',
    icon: Network,
    signal: 'Consensus · Replication · Partitioning',
    metric: 'CAP-aware design',
  },
  {
    title: 'SRE & Reliability',
    description:
      'Defining SLOs, owning on-call, and engineering the observability stack — metrics, logs, traces — so incidents are caught before users notice.',
    icon: Activity,
    signal: 'Prometheus · Grafana · OpenTelemetry',
    metric: '99.99% uptime',
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
    title: 'Kubernetes & Cloud Native',
    description:
      'Production-grade Kubernetes — custom HPAs, KEDA, service mesh, multi-tenant clusters, and zero-downtime rollouts on AWS.',
    icon: Boxes,
    signal: 'HPA · KEDA · Helm · Istio',
    metric: 'Auto 4–40 nodes',
  },
  {
    title: 'AI Infrastructure',
    description:
      'Integrating and operating ML workloads in production — edge inference, model serving pipelines, and GPU-backed infrastructure.',
    icon: Cpu,
    signal: 'Inference · Batching · GPU Pools',
    metric: 'Sub-50ms inference',
  },
];
