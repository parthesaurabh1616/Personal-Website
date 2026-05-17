import type { ContentBlock } from '@/types';

export const K8S_SCALING: ContentBlock[] = [
  {
    t: 'p',
    v: "CPU utilization is a proxy metric. It correlates with load for CPU-bound services, poorly for I/O-bound services, and not at all for event-driven services that are idle at 2% CPU but have 500,000 messages queued. HPA on CPU works until it doesn't — and the services where it fails tend to be the most critical ones. This covers the scaling stack that operates in production.",
  },
  {
    t: 'h2',
    v: 'Why CPU HPA Breaks Down',
  },
  {
    t: 'p',
    v: 'The HPA controller polls metrics every 15 seconds by default. For a spike that saturates a service in under 30 seconds, the controller is already two polling cycles behind. By the time new pods are scheduled and pass readiness probes (another 10-60 seconds depending on your service), the spike has either self-resolved or caused significant degradation.',
  },
  {
    t: 'ul',
    v: [
      'Metric lag: CPU is a lagging indicator. It climbs after the service is already overloaded.',
      'Scale-to-zero impossible: HPA minReplicas must be at least 1. For event-driven workloads that should genuinely idle at zero pods, HPA cannot help.',
      'Flapping: rapid scale-up/down as load oscillates. The default stabilization window (300s for scale down, 0 for scale up) helps but does not eliminate it.',
      'Wrong metric for I/O-bound services: a Go service blocked on database queries has 3% CPU and 10,000 goroutines waiting. HPA sees nothing to act on.',
    ],
  },
  {
    t: 'h2',
    v: 'Custom Metrics with Prometheus Adapter',
  },
  {
    t: 'p',
    v: 'The Kubernetes custom metrics API allows HPA to scale on any metric you can express in Prometheus. The prometheus-adapter translates PromQL queries into the custom metrics API that HPA consumes. This lets you scale on queue depth, active connections, request rate, or any business metric you instrument.',
  },
  {
    t: 'code',
    lang: 'yaml',
    v: `# prometheus-adapter config: expose a custom metric for HPA
rules:
- seriesQuery: 'http_requests_in_flight{namespace!="",pod!=""}'
  resources:
    overrides:
      namespace: { resource: namespace }
      pod:       { resource: pod }
  name:
    matches: "http_requests_in_flight"
    as: "requests_in_flight_per_pod"
  metricsQuery: 'sum(<<.Series>>{<<.LabelMatchers>>}) by (<<.GroupBy>>)'

---
# HPA using the custom metric
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
spec:
  metrics:
  - type: Pods
    pods:
      metric:
        name: requests_in_flight_per_pod
      target:
        type: AverageValue
        averageValue: "50"  # scale when avg in-flight > 50 per pod`,
  },
  {
    t: 'h2',
    v: 'KEDA: Event-Driven Autoscaling',
  },
  {
    t: 'p',
    v: "KEDA (Kubernetes Event-Driven Autoscaling) is the right tool for workloads that scale on external event sources. It supports scale-to-zero natively, has 50+ built-in scalers (Kafka, Redis, Prometheus, SQS, Azure Service Bus, and more), and integrates with HPA rather than replacing it. KEDA installs a ScaledObject CRD that describes what to scale and when.",
  },
  {
    t: 'code',
    lang: 'yaml',
    v: `apiVersion: keda.sh/v1alpha1
kind: ScaledObject
metadata:
  name: order-processor-scaler
spec:
  scaleTargetRef:
    name: order-processor         # Deployment to scale
  minReplicaCount: 0              # Scale to zero when queue is empty
  maxReplicaCount: 20
  cooldownPeriod: 60              # Seconds to wait before scaling down
  triggers:
  - type: kafka
    metadata:
      bootstrapServers: kafka:9092
      consumerGroup: fep-processor
      topic: fin.orders.new
      lagThreshold: "100"         # Scale up when consumer lag > 100 per partition
      offsetResetPolicy: latest`,
  },
  {
    t: 'p',
    v: 'With this configuration, when the Kafka topic has no messages, KEDA scales the Deployment to zero. When lag exceeds 100 messages per partition, KEDA adds replicas — up to one per partition (the true parallelism ceiling for Kafka consumers).',
  },
  {
    t: 'h2',
    v: 'VPA: Right-Sizing Pod Resources',
  },
  {
    t: 'p',
    v: 'The Vertical Pod Autoscaler automatically adjusts CPU and memory requests based on historical usage. It has three components: the Recommender (analyzes usage history and generates recommendations), the Updater (evicts pods with outdated resource specs), and the Admission Controller (patches new pods with recommended values at admission time).',
  },
  {
    t: 'code',
    lang: 'yaml',
    v: `apiVersion: autoscaling.k8s.io/v1
kind: VerticalPodAutoscaler
metadata:
  name: chat-gateway-vpa
spec:
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: chat-gateway
  updatePolicy:
    updateMode: "Auto"        # Recreate pods with new resource specs
  resourcePolicy:
    containerPolicies:
    - containerName: gateway
      minAllowed:
        cpu:    100m
        memory: 64Mi
      maxAllowed:
        cpu:    2
        memory: 2Gi`,
  },
  {
    t: 'note',
    v: 'VPA and HPA cannot both manage CPU/memory on the same Deployment simultaneously — VPA will keep changing request values that HPA uses for its calculations. Use VPA for "Off" or "Initial" mode to generate recommendations, then apply them manually, while HPA handles horizontal scaling on a different metric (connections, queue depth, etc.).',
  },
  {
    t: 'h2',
    v: 'Cluster Autoscaler Tuning',
  },
  {
    t: 'p',
    v: 'The Cluster Autoscaler adds nodes when pods are pending due to insufficient resources and removes underutilized nodes after a stability period. The defaults are conservative — scale-down requires a node to be underutilized for 10 minutes. For bursty workloads, this matters:',
  },
  {
    t: 'ul',
    v: [
      'scale-down-unneeded-time: how long a node must be underutilized before removal (default 10m). Lower this for cost savings on bursty workloads.',
      'scale-down-utilization-threshold: a node is "underutilized" if CPU and memory are below this fraction (default 0.5). Raise it if nodes are consistently half-empty.',
      'expander: how to choose which node group to expand. "least-waste" picks the group that wastes fewest resources. "priority" lets you rank node groups manually.',
      'Node pools: separate spot/preemptible pools from on-demand. Route latency-sensitive workloads to on-demand; batch jobs to spot. Use node affinity + tolerations.',
    ],
  },
  {
    t: 'h2',
    v: 'Pod Disruption Budgets',
  },
  {
    t: 'p',
    v: "When the Cluster Autoscaler drains a node or a rollout evicts pods, it respects PodDisruptionBudgets. Without a PDB, a scale-down event can evict all replicas of a critical service simultaneously. A PDB sets a floor on how many pods must remain available during voluntary disruptions.",
  },
  {
    t: 'code',
    lang: 'yaml',
    v: `apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: chat-gateway-pdb
spec:
  minAvailable: 2          # at least 2 pods must stay up during drains
  selector:
    matchLabels:
      app: chat-gateway`,
  },
  {
    t: 'h2',
    v: 'Topology Spread Constraints',
  },
  {
    t: 'p',
    v: 'Scaling to 10 pods means nothing if all 10 land on the same availability zone and that AZ has an outage. TopologySpreadConstraints force the scheduler to distribute pods evenly across failure domains:',
  },
  {
    t: 'code',
    lang: 'yaml',
    v: `spec:
  topologySpreadConstraints:
  - maxSkew: 1                              # max imbalance across zones
    topologyKey: topology.kubernetes.io/zone
    whenUnsatisfiable: DoNotSchedule
    labelSelector:
      matchLabels:
        app: chat-gateway
  - maxSkew: 1
    topologyKey: kubernetes.io/hostname     # also spread across nodes
    whenUnsatisfiable: ScheduleAnyway       # best-effort for nodes`,
  },
  {
    t: 'p',
    v: "maxSkew: 1 means no zone can have more than one extra pod compared to the least-loaded zone. DoNotSchedule makes it hard — the scheduler refuses to place a pod that would violate the constraint. ScheduleAnyway makes it soft — it tries but will violate if there's no other option.",
  },
];
