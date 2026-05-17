import type { ContentBlock } from '@/types';

export const KAFKA_INTERNALS: ContentBlock[] = [
  {
    t: 'p',
    v: "Kafka is not a message queue. A message queue delivers a message once to one consumer and then discards it. Kafka is a distributed, replicated, ordered commit log. Messages persist on disk and can be replayed by multiple consumers at independent offsets. Understanding that distinction explains every Kafka design decision — from why ordering guarantees are scoped to partitions, to why consumer groups can reprocess history on demand.",
  },
  {
    t: 'h2',
    v: 'Topic Anatomy',
  },
  {
    t: 'p',
    v: 'A topic is divided into partitions. Each partition is an ordered, immutable sequence of records stored on disk and replicated across brokers. Producers append to the end of a partition; consumers read sequentially from an offset they control. Records are retained until a time-based or size-based retention policy removes them — not until they are consumed.',
  },
  {
    t: 'ul',
    v: [
      'Partition: the unit of parallelism and ordering. Records within a partition are totally ordered by offset.',
      'Offset: a monotonically increasing integer that uniquely identifies a record within a partition.',
      'Segment: partitions are split into segment files on disk. Kafka reads sequentially from segments — this is why disk I/O is efficient even at millions of messages per second.',
      'Retention: configure per-topic with log.retention.hours or log.retention.bytes. Neither affects consumers — they can be at any offset, including the beginning.',
    ],
  },
  {
    t: 'note',
    v: "Partition count cannot be decreased after a topic is created. Increasing partition count reshuffles which keys land in which partitions, breaking ordering guarantees for key-based routing. Plan your partition count at creation time based on your expected peak throughput and consumer parallelism.",
  },
  {
    t: 'h2',
    v: 'Replication: Leader, ISR, and High Watermark',
  },
  {
    t: 'p',
    v: 'Each partition has one leader broker and zero or more follower brokers. All reads and writes go to the leader. Followers replicate by polling the leader. The In-Sync Replicas set (ISR) is the set of followers that are caught up within replica.lag.time.max.ms of the leader.',
  },
  {
    t: 'p',
    v: 'The high watermark (HW) is the offset up to which all ISR members have confirmed receipt. Consumers can only read up to the HW — this is the committed offset that is safe to expose. A record at offset N is not visible to consumers until all ISR members have replicated it.',
  },
  {
    t: 'code',
    lang: 'text',
    v: `Partition replication state (replication.factor=3):

  Leader    Offset: 0 1 2 3 4 5  ← Leader epoch 4
  Follower1 Offset: 0 1 2 3 4    ← In ISR (caught up)
  Follower2 Offset: 0 1 2 3      ← In ISR (caught up)

  High Watermark = 4 (all ISR members have ack'd up to here)
  Consumer max readable offset = 4

  If Follower2 falls behind by > replica.lag.time.max.ms:
    → Follower2 is removed from ISR
    → HW advances based on Leader + Follower1 only`,
  },
  {
    t: 'h2',
    v: 'Producer Acknowledgements',
  },
  {
    t: 'p',
    v: 'The acks setting controls when the producer considers a write successful. It is the primary lever for trading throughput against durability:',
  },
  {
    t: 'ul',
    v: [
      'acks=0: fire and forget. No acknowledgement. Maximum throughput, zero durability. Use only for metrics, telemetry, or data that is genuinely acceptable to lose.',
      'acks=1: leader acknowledgement only. The leader writes to its local log and responds. If the leader crashes before followers replicate, the record is lost. Default in many clients.',
      'acks=all (or acks=-1): the leader waits until all ISR members have written the record before responding. Combined with min.insync.replicas=2, this guarantees no data loss as long as at least two brokers remain in the ISR.',
    ],
  },
  {
    t: 'code',
    lang: 'go',
    v: `// Sarama producer configuration for durability
cfg := sarama.NewConfig()
cfg.Producer.RequiredAcks = sarama.WaitForAll   // acks=all
cfg.Producer.Retry.Max = 10
cfg.Producer.Idempotent = true                   // enables idempotent producer
cfg.Net.MaxOpenRequests = 1                      // required for idempotent mode

// Matching broker config (server-side):
// min.insync.replicas=2
// default.replication.factor=3`,
  },
  {
    t: 'h2',
    v: 'Consumer Groups and Partition Assignment',
  },
  {
    t: 'p',
    v: 'A consumer group is a set of consumers that cooperate to consume a topic. Each partition is assigned to exactly one consumer in the group at a time. More consumers than partitions means idle consumers — partition count caps your consumer parallelism.',
  },
  {
    t: 'p',
    v: 'When a consumer joins or leaves a group, a rebalance occurs. During rebalance, all consumers pause consumption while the group coordinator reassigns partitions. For high-throughput consumers, rebalances are expensive — minimize them by:',
  },
  {
    t: 'ul',
    v: [
      'Using the Sticky assignment strategy: partitions are reassigned minimally, not randomly reshuffled',
      'Tuning session.timeout.ms and heartbeat.interval.ms correctly — session.timeout should be 3× heartbeat.interval',
      'Avoiding long processing times per record that cause the consumer to miss heartbeats and appear dead',
      'Using Static Group Membership (group.instance.id) for Kubernetes pods: allows a pod to rejoin with the same partition assignment after a restart without triggering a full rebalance',
    ],
  },
  {
    t: 'h2',
    v: 'Ordering Guarantees',
  },
  {
    t: 'p',
    v: "Kafka guarantees ordering within a partition, not across partitions. If you need all events for a given entity (an order, a user, a device) to be processed in order, all events for that entity must go to the same partition. Achieve this by setting a message key — Kafka hashes the key and routes to a consistent partition. The cost: throughput is bounded by the single consumer assigned to that partition.",
  },
  {
    t: 'code',
    lang: 'go',
    v: `// Key-based routing ensures all events for orderID land on the same partition.
// This preserves order across producers and consumer restarts.
_, _, err = producer.SendMessage(&sarama.ProducerMessage{
    Topic: "fin.orders.new",
    Key:   sarama.StringEncoder(order.ID),  // consistent partition for this order
    Value: sarama.ByteEncoder(payload),
})`,
  },
  {
    t: 'h2',
    v: 'At-Least-Once vs Exactly-Once',
  },
  {
    t: 'p',
    v: 'At-least-once delivery is the default for Kafka producers and consumers. The producer retries on network failure, which can produce duplicates. The consumer commits offsets after processing, but a crash between processing and commit causes reprocessing.',
  },
  {
    t: 'p',
    v: 'Exactly-once semantics (EOS) in Kafka requires:',
  },
  {
    t: 'ul',
    v: [
      'Idempotent producer (enable.idempotence=true): deduplicates retries using a producer ID and sequence number per partition',
      'Transactional producer: atomic writes across multiple partitions and atomic offset commit + produce in a single transaction',
      'Idempotent consumers: even with EOS, your downstream system (database, API) must be idempotent — Kafka guarantees delivery, not idempotent side effects',
    ],
  },
  {
    t: 'h2',
    v: 'Performance Knobs',
  },
  {
    t: 'p',
    v: 'The defaults are conservative. In production, these settings have the most impact:',
  },
  {
    t: 'ul',
    v: [
      'batch.size (producer): maximum bytes per batch. Higher = more throughput, more latency. Default 16KB, consider 64-256KB for bulk pipelines.',
      'linger.ms (producer): wait this long for a batch to fill before sending. Default 0 (no wait). Setting 5-50ms dramatically improves throughput at the cost of added latency.',
      'compression.type (producer): lz4 is the best default — fast compression with good ratios. Snappy is similar. gzip has higher compression but much slower CPU cost.',
      'fetch.min.bytes (consumer): minimum bytes the broker collects before responding to a fetch. Increases throughput for consumers reading at scale.',
      'max.poll.records (consumer): maximum records returned per poll. Lower this if processing is slow to avoid session timeout during a batch.',
    ],
  },
];
