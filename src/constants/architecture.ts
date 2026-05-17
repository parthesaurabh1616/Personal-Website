export interface ArchPattern {
  title: string;
  description: string;
  tag: string;
}

export const ARCH_PATTERNS: ArchPattern[] = [
  {
    title: 'Microservices Architecture',
    description:
      'Bounded contexts, service ownership, contract-first APIs, and independent deployability across the fleet.',
    tag: 'Architecture',
  },
  {
    title: 'CQRS + Event Sourcing',
    description:
      'Separated read/write models with replayable event logs as the source of truth across services.',
    tag: 'Patterns',
  },
  {
    title: 'Distributed Caching',
    description:
      'Multi-tier cache topologies — Redis hot path, CDN edge, and in-process for high-read workloads.',
    tag: 'Performance',
  },
  {
    title: 'Observability',
    description:
      'Metrics, logs, and traces wired end-to-end — Prometheus, Grafana, OpenTelemetry, and structured logging.',
    tag: 'SRE',
  },
  {
    title: 'Autoscaling',
    description:
      'HPA + KEDA + cluster-autoscaler tuned per workload, with custom metrics where CPU isn’t enough.',
    tag: 'Scale',
  },
  {
    title: 'Fault Tolerance',
    description:
      'Circuit breakers, bulkheads, retries with jitter, and DLQs that surface — not swallow — failure.',
    tag: 'Resiliency',
  },
  {
    title: 'Load Balancing',
    description:
      'Layer-4 and layer-7 strategies, sticky routing where state demands it, consistent hashing where it doesn’t.',
    tag: 'Networking',
  },
  {
    title: 'Distributed Tracing',
    description:
      'End-to-end causality across services with W3C trace context, tail-sampling, and flame-graph analysis.',
    tag: 'Observability',
  },
  {
    title: 'Service Mesh',
    description:
      'mTLS, traffic shaping, and progressive delivery managed at the mesh layer — not bolted into apps.',
    tag: 'Platform',
  },
];
