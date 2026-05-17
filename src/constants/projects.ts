import type { Project } from '@/types';

export const PROJECTS: Project[] = [
  {
    id: 'video-intelligence',
    title: 'Distributed Video Intelligence Platform',
    tagline: 'Edge AI inference across 1000+ concurrent camera streams',
    description:
      'Real-time video analytics platform that processes concurrent camera streams through a bounded goroutine worker pool, runs AI threat detection via a FastAPI inference service, and publishes events to Kafka — with automatic backpressure under load.',
    longDescription:
      'Built in Go with a Sarama Kafka producer (Snappy compression), Redis per-camera state with 30-second TTL, and a Python FastAPI inference service running mock CNN analysis at 45ms p99. Goroutine pool drops frames gracefully under backpressure rather than blocking the ingestion path.',
    stack: ['Go', 'Kafka', 'Redis', 'Python', 'FastAPI', 'Prometheus', 'Docker', 'Kubernetes'],
    features: [
      'Bounded goroutine worker pool — configurable concurrency limit',
      'Frame-drop backpressure: never blocks producers under overload',
      '45ms context timeout per AI inference round-trip',
      'Per-camera Redis state with 30-second TTL',
      'Sarama SyncProducer with Snappy compression to Kafka',
      'Prometheus: frame throughput, latency histograms, threat event counts',
    ],
    metrics: [
      { label: 'Concurrent Streams', value: '1000+' },
      { label: 'Inference p99', value: '< 45ms' },
      { label: 'Frame Rate', value: '30 fps' },
      { label: 'Throughput', value: '30K msg/s' },
    ],
    architecture: [
      'N camera goroutines → bounded channel (backpressure gate)',
      'Worker pool: goroutines with 45ms timeout context per frame',
      'Python FastAPI: /analyze endpoint — mock CNN, 5% threat rate',
      'Sarama SyncProducer → Kafka topic (Snappy)',
      'Redis hot store: camera-state:<id>, 30s TTL per camera',
    ],
    domain: 'Edge AI · Computer Vision',
    status: 'production',
    githubUrl: 'https://github.com/parthesaurabh1616/Distributed-Video-Intelligence-Platform',
  },
  {
    id: 'log-analytics',
    title: 'Distributed Log Analytics Engine',
    tagline: 'Dual-store ingestion pipeline with sliding-window alerting',
    description:
      'High-throughput log ingestion pipeline that fans out simultaneously into Elasticsearch (full-text search) and ClickHouse (OLAP analytics), with a real-time sliding-window alert engine running over the live stream — no separate alerting infrastructure required.',
    longDescription:
      'Go consumer group reads from Kafka at 100 logs/sec across 7 simulated services. Each entry is indexed into Elasticsearch and batch-inserted into ClickHouse MergeTree (LZ4 compression, 90-day TTL). The in-process alert engine evaluates three rule types — fatal rate, high latency (>1000ms), error rate (>10%) — over 30-second sliding windows.',
    stack: ['Go', 'Kafka', 'Elasticsearch', 'ClickHouse', 'Prometheus', 'Docker'],
    features: [
      'Dual fan-out: Elasticsearch full-text search + ClickHouse OLAP',
      'ClickHouse MergeTree — LZ4 compression, 90-day TTL, ordered by time/level/service',
      'Sliding-window alert engine: fatal / high-latency / error-rate rules',
      'Sarama consumer group — at-least-once delivery with offset commit',
      'Mock producer: 7 services, 100 logs/sec, weighted severity distribution',
      'Prometheus counters on ingest rate, fan-out lag, alert fire counts',
    ],
    metrics: [
      { label: 'Ingest Rate', value: '100 logs/s' },
      { label: 'Services', value: '7 simulated' },
      { label: 'Retention', value: '90-day TTL' },
      { label: 'Alert Window', value: '30s sliding' },
    ],
    architecture: [
      'Mock producer → Kafka topic (100 logs/sec, weighted levels)',
      'Sarama ConsumerGroup → fan-out ingestion worker',
      'Elasticsearch: IndexRequest per entry, "logs" index',
      'ClickHouse: batch insert, MergeTree ORDER BY (timestamp, level, service)',
      'Alert engine: 3 rules evaluated over sliding 30-second window',
    ],
    domain: 'Observability · Data Engineering',
    status: 'production',
    githubUrl: 'https://github.com/parthesaurabh1616/Distributed-Log-Analytics-Engine',
  },
  {
    id: 'failure-prediction',
    title: 'AI-Powered Failure Prediction System',
    tagline: 'Multi-agent LangGraph pipeline predicting failures 3 hours ahead',
    description:
      'Autonomous AI system that monitors 7 distributed services in real time, runs unsupervised anomaly detection, forecasts failures up to 3 hours ahead with time-series models, and performs root cause analysis with Claude Haiku — all orchestrated in a LangGraph StateGraph.',
    longDescription:
      'Four-agent pipeline: AnomalyAgent (Isolation Forest, score threshold −0.10), PredictionAgent (Holt-Winters, 18-step horizon), RCAAgent (Claude Haiku via Anthropic SDK — returns structured JSON: root cause, affected services, ordered remediation steps), AlertAgent (P1/P2/P3 severity, Redis stream). Falls back to a deterministic rule engine when no API key is configured.',
    stack: ['Python', 'LangGraph', 'Claude Haiku', 'scikit-learn', 'statsmodels', 'FastAPI', 'Redis', 'Prometheus', 'Docker', 'Kubernetes'],
    features: [
      'Isolation Forest anomaly detection — 150 estimators, z-score per metric',
      'Holt-Winters ExponentialSmoothing — 18-step forecast ≈ 3h ahead',
      'Claude Haiku RCA: root cause, affected services, remediation steps (JSON)',
      'Conditional LangGraph edge — clean services skip LLM call entirely',
      'P1/P2/P3 alert severity with failure probability + time-to-failure',
      'Offline fallback: deterministic rule-based RCA when no API key set',
    ],
    metrics: [
      { label: 'Prediction Lead', value: '~3h ahead' },
      { label: 'Services', value: '7 monitored' },
      { label: 'Pipeline Agents', value: '4 agents' },
      { label: 'Alert Levels', value: 'P1 / P2 / P3' },
    ],
    architecture: [
      'Telemetry stream → 7 services, scheduled failure injection',
      'AnomalyAgent: Isolation Forest → z-score attribution per metric',
      'PredictionAgent: Holt-Winters → failure probability + TTF estimate',
      'RCAAgent: Claude Haiku → structured JSON root cause analysis',
      'AlertAgent → Redis stream, FastAPI /predictions /alerts endpoints',
    ],
    domain: 'AI Infrastructure · SRE',
    status: 'research',
    githubUrl: 'https://github.com/parthesaurabh1616/AI-Powered-Failure-Prediction-System',
  },
  {
    id: 'chat-infra',
    title: 'High-Scale Distributed Chat Infrastructure',
    tagline: 'Cross-node WebSocket fanout over NATS with zero lock contention',
    description:
      'Production-grade WebSocket chat backend in Go where three gateway nodes share session state through Redis and fan out messages across nodes through NATS — any client on any node receives every room message with sub-millisecond delivery.',
    longDescription:
      'Each client runs a dedicated goroutine read/write pump with a 256-slot buffered send channel. All register/unregister/fanout operations run on a single-goroutine Hub event loop — zero lock contention on connection maps. A NATS wildcard subscription (chat.room.*) on each node receives all room traffic, eliminating per-room subscription management overhead.',
    stack: ['Go', 'NATS', 'Redis', 'gorilla/websocket', 'Prometheus', 'Docker', 'Kubernetes'],
    features: [
      'Single-goroutine Hub event loop — no mutex on connection or room maps',
      'Goroutine read/write pump per client, 256-slot buffered send channel',
      'NATS wildcard chat.room.* — one subscription handles all rooms per node',
      'Redis: presence TTL, room membership sets, last 50 messages per room',
      'Slow-client drop: send buffer full → close client, hub never blocks',
      'Prometheus: active connections, rooms, messages in/out, NATS errors',
    ],
    metrics: [
      { label: 'Conns / Node', value: '10K max' },
      { label: 'Gateway Nodes', value: '3 (HPA 3–20)' },
      { label: 'Fanout Bus', value: 'NATS in-memory' },
      { label: 'Msg History', value: 'Last 50 / room' },
    ],
    architecture: [
      'Client → gorilla/websocket upgrade → Hub register channel',
      'Hub: single-goroutine event loop, fanout + presence broadcast',
      'Outbound → NATS publish chat.room.<roomID>',
      'All nodes: NATS chat.room.* → deliver to local Hub',
      'Redis: presence:<room>:<user> TTL · room:members set · room:history list',
    ],
    domain: 'Distributed Systems · Realtime',
    status: 'production',
    githubUrl: 'https://github.com/parthesaurabh1616/High-Scale-Distributed-Chat-Infrastructure',
  },
  {
    id: 'financial-events',
    title: 'Financial Event Processing Engine',
    tagline: 'Price-time priority matching with four-rule risk management',
    description:
      'High-throughput financial order processing system in Go with an in-memory price-time priority matching engine, a multi-rule risk management layer, and an event-sourcing pipeline over Kafka — with PostgreSQL persistence and a built-in order simulator that injects fat-finger events.',
    longDescription:
      'Per-symbol order book with bid/ask price levels, partial fills, and self-trade prevention. The risk engine enforces position limits (±10K shares), notional cap ($1M), order size (5K shares), and velocity (10 orders/sec/account) via a sliding-window timestamp queue. Orders flow through Kafka consumer group → risk check → matching → PostgreSQL upsert, with executed trades published to fin.trades.executed.',
    stack: ['Go', 'Kafka', 'PostgreSQL', 'Prometheus', 'Docker', 'Kubernetes'],
    features: [
      'Price-time priority order book: bid/ask levels, partial fills, FIFO within level',
      'Self-trade prevention across buyer/seller account IDs',
      'Risk engine: MAX_QTY · MAX_NOTIONAL · POSITION_LIMIT · ORDER_VELOCITY',
      'Velocity limiter: per-account sliding-window timestamp queue',
      'PostgreSQL 16 upsert-on-conflict for idempotent order state',
      'Simulator: 5 symbols (AAPL/MSFT/GOOGL/TSLA/NVDA), fat-finger injection every ~20 orders',
    ],
    metrics: [
      { label: 'Risk Rules', value: '4 enforced' },
      { label: 'Symbols', value: '5 (AAPL+)' },
      { label: 'Order Book', value: 'Price-time' },
      { label: 'Storage', value: 'PostgreSQL 16' },
    ],
    architecture: [
      'REST API / Simulator → Kafka fin.orders.new (4 partitions)',
      'Consumer group → validate → risk check → order book match',
      'PostgreSQL: orders (upsert), trades (immutable), risk_alerts',
      'Downstream: fin.trades.executed · fin.risk.alerts Kafka topics',
      'REST: /orderbook · /trades · /accounts/positions · /risk/alerts',
    ],
    domain: 'FinTech · Event-Driven Systems',
    status: 'production',
    githubUrl: 'https://github.com/parthesaurabh1616/Financial-Event-Processing-Engine',
  },
];
