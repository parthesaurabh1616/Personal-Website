import type { ContentBlock } from '@/types';

export const GO_CONCURRENCY: ContentBlock[] = [
  {
    t: 'p',
    v: 'A goroutine costs roughly 2KB of stack memory at startup. Spawn ten thousand of them carelessly and you have 20MB of stacks, a scheduler under load, and a service that falls over under backpressure. The goroutine is cheap — the leak is expensive. This covers the patterns that keep concurrent Go code bounded, correct, and operable.',
  },
  {
    t: 'h2',
    v: 'The Worker Pool',
  },
  {
    t: 'p',
    v: 'The most useful concurrency primitive in production Go is the bounded worker pool. It lets you process work concurrently while keeping the number of goroutines fixed regardless of how many items are in the queue — essential when each worker touches an external resource like a database or an API.',
  },
  {
    t: 'code',
    lang: 'go',
    v: `// A semaphore-based pool: at most N goroutines run concurrently.
// The channel acts as a counting semaphore — acquiring a slot blocks
// when the pool is full, applying natural backpressure.
func Process(ctx context.Context, items []Item, concurrency int) error {
    sem := make(chan struct{}, concurrency)
    var wg sync.WaitGroup
    var mu sync.Mutex
    var firstErr error

    for _, item := range items {
        item := item // capture for goroutine
        select {
        case sem <- struct{}{}: // acquire slot
        case <-ctx.Done():
            break
        }
        wg.Add(1)
        go func() {
            defer wg.Done()
            defer func() { <-sem }() // release slot
            if err := process(ctx, item); err != nil {
                mu.Lock()
                if firstErr == nil {
                    firstErr = err
                }
                mu.Unlock()
            }
        }()
    }
    wg.Wait()
    return firstErr
}`,
  },
  {
    t: 'h2',
    v: 'errgroup: Structured Concurrency',
  },
  {
    t: 'p',
    v: 'For launching a known set of goroutines where you want the first error to cancel all others, reach for golang.org/x/sync/errgroup. It wires cancellation, wait semantics, and error collection together, eliminating the boilerplate that most hand-rolled solutions get wrong.',
  },
  {
    t: 'code',
    lang: 'go',
    v: `import "golang.org/x/sync/errgroup"

func FetchAll(ctx context.Context, ids []string) ([]*Record, error) {
    g, ctx := errgroup.WithContext(ctx)
    results := make([]*Record, len(ids))

    for i, id := range ids {
        i, id := i, id // capture
        g.Go(func() error {
            rec, err := fetch(ctx, id)
            if err != nil {
                return fmt.Errorf("fetch %s: %w", id, err)
            }
            results[i] = rec
            return nil
        })
    }

    if err := g.Wait(); err != nil {
        return nil, err
    }
    return results, nil
}`,
  },
  {
    t: 'p',
    v: "When the first goroutine returns an error, errgroup's context is cancelled — all other goroutines see ctx.Done() and should return promptly. This only works if your leaf functions actually respect context cancellation, which means passing ctx through every database query and HTTP call.",
  },
  {
    t: 'h2',
    v: 'Fan-Out / Fan-In',
  },
  {
    t: 'p',
    v: 'Fan-out distributes work across N goroutines; fan-in collects their results through a single channel. The pattern composes pipelines from independent stages, each running at its own pace:',
  },
  {
    t: 'code',
    lang: 'go',
    v: `// fanOut sends each item to one of N worker goroutines.
func fanOut(ctx context.Context, in <-chan Item, workers int) <-chan Result {
    out := make(chan Result, workers)
    var wg sync.WaitGroup
    for i := 0; i < workers; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            for item := range in {
                select {
                case out <- process(ctx, item):
                case <-ctx.Done():
                    return
                }
            }
        }()
    }
    go func() {
        wg.Wait()
        close(out) // safe: only this goroutine closes, after all writers are done
    }()
    return out
}`,
  },
  {
    t: 'note',
    v: 'Only the goroutine that owns the channel should close it. Closing a channel from a writer goroutine while other writers are active causes a panic. The pattern above closes only after wg.Wait() confirms all writers have exited.',
  },
  {
    t: 'h2',
    v: 'Backpressure with Buffered Channels',
  },
  {
    t: 'p',
    v: 'When a producer is faster than consumers, you have three options: block the producer (natural backpressure), drop items (load shedding), or buffer a fixed number and then block. Choose based on what losing a message costs. For video frames, dropping is fine. For financial events, blocking with a timeout is safer.',
  },
  {
    t: 'code',
    lang: 'go',
    v: `// Non-blocking send with drop: use when losing items is acceptable.
// The default case fires immediately if the channel is full.
func sendOrDrop(ch chan<- Frame, frame Frame) bool {
    select {
    case ch <- frame:
        return true
    default:
        metrics.DroppedFrames.Inc()
        return false
    }
}

// Blocking send with timeout: use when losing items is not acceptable.
func sendWithTimeout(ctx context.Context, ch chan<- Event, event Event) error {
    timeout := time.NewTimer(500 * time.Millisecond)
    defer timeout.Stop()
    select {
    case ch <- event:
        return nil
    case <-timeout.C:
        return fmt.Errorf("send timeout: downstream is saturated")
    case <-ctx.Done():
        return ctx.Err()
    }
}`,
  },
  {
    t: 'h2',
    v: 'The Pipeline Pattern',
  },
  {
    t: 'p',
    v: 'A pipeline composes multiple channel-connected stages. Each stage reads from an input channel, transforms data, and writes to an output channel. Stages run concurrently and each buffers independently, decoupling fast producers from slow consumers:',
  },
  {
    t: 'code',
    lang: 'go',
    v: `func BuildPipeline(ctx context.Context, source <-chan RawEvent) <-chan Alert {
    // Stage 1: parse
    parsed := parse(ctx, source)     // <-chan ParsedEvent

    // Stage 2: enrich (fan-out over 4 workers)
    enriched := fanOut(ctx, parsed, 4) // <-chan EnrichedEvent

    // Stage 3: score and filter
    scored := score(ctx, enriched)   // <-chan ScoredEvent

    // Stage 4: threshold → alert
    return threshold(ctx, scored)    // <-chan Alert
}`,
  },
  {
    t: 'h2',
    v: 'Common Mistakes',
  },
  {
    t: 'ul',
    v: [
      'Loop variable capture: always assign loop variables to a local before spawning a goroutine (fixed in Go 1.22 with per-iteration scoping, but still worth knowing)',
      'Goroutine leak from a blocked channel send: if the reader exits early, the writer blocks forever — always pair channels with cancellation via ctx.Done()',
      'Closing a channel twice or from a non-owner: both cause a panic; use sync.Once or a dedicated closer goroutine',
      'Using a mutex to protect a channel: channels are already synchronized; adding a mutex is redundant and introduces deadlock risk',
      'Unbounded goroutine launch inside a request handler: always use a semaphore or worker pool — one malicious client can exhaust your goroutine budget',
      'Ignoring context cancellation in long-running goroutines: always check ctx.Done() in any loop that does I/O, or the goroutine outlives its context',
    ],
  },
  {
    t: 'h2',
    v: 'Knowing When to Reach for Channels vs Mutexes',
  },
  {
    t: 'p',
    v: 'Channels communicate between goroutines (passing ownership of data). Mutexes protect shared state that multiple goroutines read and write. The Go memory model guarantees: a send on a channel happens-before the corresponding receive completes. Use channels when you are transferring ownership or coordinating lifecycle. Use mutexes when multiple goroutines need concurrent read access or infrequent write access to shared data structures — a sync.RWMutex gives you concurrent reads at low write frequency.',
  },
];
