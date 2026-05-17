import type { ContentBlock } from '@/types';

export const EVENT_DRIVEN: ContentBlock[] = [
  {
    t: 'p',
    v: "In a distributed system, failure is not an edge case — it is the default state. Messages are delivered out of order. Services crash mid-transaction. Networks partition. The discipline of designing event-driven systems is the discipline of assuming all of this will happen and building systems that remain correct despite it. The patterns here are not theoretical; they are the infrastructure that prevents double-billing, lost orders, and phantom inventory.",
  },
  {
    t: 'h2',
    v: 'Idempotency: The First Principle',
  },
  {
    t: 'p',
    v: "An operation is idempotent if performing it multiple times produces the same result as performing it once. In event-driven systems, you will always process some events more than once — network retries, consumer restarts, rebalances. Idempotency makes duplicate processing safe.",
  },
  {
    t: 'p',
    v: 'Two approaches to idempotency:',
  },
  {
    t: 'ul',
    v: [
      'Natural idempotency: some operations are idempotent by nature. SET operations, absolute state updates ("set balance to $500"), and pure reads are all naturally idempotent. Delta operations ("add $10 to balance") are not.',
      'Idempotency keys: the producer assigns a deterministic ID to each operation. The consumer stores processed IDs in a seen-set (Redis, database table with a unique constraint). Duplicate events with already-seen keys are dropped at the gate.',
    ],
  },
  {
    t: 'code',
    lang: 'go',
    v: `// PostgreSQL upsert as idempotent write — safe to call multiple times.
// ON CONFLICT DO UPDATE means a duplicate event with the same ID
// updates to the same values rather than failing or creating a duplicate.
_, err = db.Exec(ctx, \`
    INSERT INTO orders (id, account_id, symbol, quantity, status, created_at)
    VALUES ($1, $2, $3, $4, $5, $6)
    ON CONFLICT (id) DO UPDATE
        SET status = EXCLUDED.status,
            filled = EXCLUDED.filled,
            updated_at = NOW()
    WHERE orders.status != 'FILLED'
\`, order.ID, order.AccountID, order.Symbol, order.Quantity, order.Status, order.CreatedAt)`,
  },
  {
    t: 'h2',
    v: 'The Transactional Outbox Pattern',
  },
  {
    t: 'p',
    v: 'The hardest problem in event-driven systems: how do you atomically update your database AND publish an event to Kafka? If you write to the database and then crash before publishing, the event is lost. If you publish and then crash before writing, the database is behind. A transaction cannot span two different systems.',
  },
  {
    t: 'p',
    v: 'The transactional outbox solves this by putting both writes inside the same database transaction:',
  },
  {
    t: 'ul',
    v: [
      '1. Within a single database transaction: update your business table AND insert a row into an outbox table',
      '2. A separate outbox relay process reads unpublished outbox rows and publishes them to Kafka',
      '3. Only after confirmed delivery does the relay mark the row as published (or delete it)',
      '4. At-least-once: if the relay crashes after publishing but before marking, it will re-publish on restart — make consumers idempotent',
    ],
  },
  {
    t: 'code',
    lang: 'go',
    v: `// Outbox write inside the same transaction as the business operation.
// Both succeed or both fail atomically.
tx, _ := db.Begin(ctx)

// Business operation
_, err = tx.Exec(ctx,
    "INSERT INTO orders (id, status) VALUES ($1, $2)",
    order.ID, "PENDING")

// Outbox entry — will be relayed to Kafka asynchronously
payload, _ := json.Marshal(order)
_, err = tx.Exec(ctx,
    "INSERT INTO outbox (id, topic, key, payload, published) VALUES ($1, $2, $3, $4, false)",
    uuid.New(), "fin.orders.new", order.ID, payload)

tx.Commit(ctx)`,
  },
  {
    t: 'note',
    v: "Change Data Capture (CDC) with Debezium is a more robust alternative to polling-based outbox relay. Debezium reads the Postgres WAL (write-ahead log) directly and emits events to Kafka. This eliminates the polling interval and works even for existing tables without an outbox column — but requires enabling logical replication on the database.",
  },
  {
    t: 'h2',
    v: 'Saga Pattern: Distributed Transactions Without Locking',
  },
  {
    t: 'p',
    v: "A distributed transaction that spans multiple services cannot use a database transaction — each service owns its own data store. The saga pattern replaces the ACID transaction with a sequence of local transactions, each of which publishes an event. If any step fails, compensating transactions undo the completed steps.",
  },
  {
    t: 'p',
    v: 'Two implementations:',
  },
  {
    t: 'ul',
    v: [
      "Choreography: each service listens for events and decides what to do next. No central coordinator. Services are decoupled but the saga's flow is implicit — debugging requires tracing events across services. Good for simple flows with few steps.",
      "Orchestration: a central orchestrator service explicitly calls each participant and handles failures. The saga's state is centralized, making it visible and debuggable. Good for complex flows with many steps, timeouts, and conditional branches.",
    ],
  },
  {
    t: 'code',
    lang: 'text',
    v: `Order Saga (choreography):

1. OrderService: creates order → publishes OrderCreated
2. PaymentService: listens OrderCreated → reserves funds → publishes PaymentReserved
3. InventoryService: listens PaymentReserved → reserves stock → publishes StockReserved
4. ShippingService: listens StockReserved → creates shipment → publishes OrderFulfilled

On failure at step 3 (stock unavailable):
3. InventoryService → publishes StockUnavailable
2. PaymentService: listens StockUnavailable → releases funds → publishes PaymentReleased
1. OrderService: listens PaymentReleased → cancels order`,
  },
  {
    t: 'h2',
    v: 'Dead Letter Queues',
  },
  {
    t: 'p',
    v: 'A dead letter queue (DLQ) is where messages go when they cannot be processed after N retries. Without a DLQ, a poison pill message (malformed JSON, schema mismatch, a bug in your handler) halts your consumer entirely — Kafka consumers cannot skip offsets without committing them.',
  },
  {
    t: 'ul',
    v: [
      'Design your DLQ as a Kafka topic, not an out-of-band system. This keeps it observable with the same tooling.',
      'Include the original message, the error, the topic, the partition, the offset, and the timestamp in the DLQ record.',
      'Build a replay tool before you need it — reprocessing DLQ messages after a bug fix should be a one-command operation.',
      'Alert on DLQ depth. A growing DLQ means your consumer has a systematic bug, not just a transient failure.',
      'Set a maximum retry count (3-5 retries with exponential backoff) before sending to DLQ. Unlimited retries guarantee that one broken message blocks indefinitely.',
    ],
  },
  {
    t: 'h2',
    v: 'Event Replay Strategies',
  },
  {
    t: 'p',
    v: "Kafka's offset-based consumption means any consumer group can reset its offset to replay any window of history. This is one of Kafka's most powerful features — but replaying into a system that is already in a post-replay state requires care.",
  },
  {
    t: 'ul',
    v: [
      'Replay to a shadow system first: reset a second consumer group reading from the same topic into a shadow database. Verify the results before cutting over.',
      'Idempotency is required: replayed events will be processed again. Every handler must be safe to re-execute with the same event.',
      'Replay at low concurrency: replaying months of history at full consumer speed can overwhelm downstream services. Throttle using max.poll.records and explicit rate limiting.',
      'Tombstone events: to delete a record in a compacted topic, publish an event with a null value for that key. Compaction will eventually remove both the original and the tombstone.',
    ],
  },
  {
    t: 'h2',
    v: 'Schema Evolution',
  },
  {
    t: 'p',
    v: "Events are long-lived. Unlike a REST API where you can update both client and server simultaneously, Kafka events from 6 months ago may be replayed today by a consumer that was written last week. Schema evolution is not optional.",
  },
  {
    t: 'ul',
    v: [
      'Backward compatibility: new consumers can read events written by old producers. Add fields with defaults; never remove or rename required fields.',
      'Forward compatibility: old consumers can read events written by new producers. New fields should be optional and ignorable.',
      'Avro / Protobuf + Schema Registry: binary formats with schema evolution rules enforced at publish time. The Schema Registry rejects incompatible schema changes before they reach consumers.',
      'Avoid using JSON without a schema — it gives you maximum flexibility and minimum safety. A renamed field silently breaks consumers with no error until someone checks the output.',
    ],
  },
  {
    t: 'h2',
    v: 'Operational Checklist',
  },
  {
    t: 'ul',
    v: [
      'Every consumer has a DLQ and an alert on DLQ depth',
      'Every event has a deterministic, globally unique ID assigned by the producer',
      'Every consumer handler is idempotent — tested by replaying the same event twice',
      'Outbox or CDC in place for any operation that must atomically update DB and publish',
      'Consumer lag is monitored per consumer group per partition',
      'Schema registry or explicit versioning enforced — no unversioned JSON event contracts',
      'Replay procedure documented and tested at least once in a non-production environment',
    ],
  },
];
