import type { ContentBlock } from '@/types';

export const GO_REST_API: ContentBlock[] = [
  {
    t: 'p',
    v: 'Most Go tutorials stop at a working endpoint. Production engineering starts after that — when someone else is on-call at 3 AM, when a deploy breaks in-flight requests, when a client sends malformed JSON and your service panics. This covers the decisions that separate a service anyone can operate from one that only its author understands.',
  },
  {
    t: 'h2',
    v: 'URL Versioning',
  },
  {
    t: 'p',
    v: 'Prefix all routes with /api/v1/ rather than encoding the version in a header. Header versioning feels elegant until a load balancer strips custom headers, a CDN keys its cache on the wrong fields, or a client forgets to send the header entirely. URL versioning is explicit, cache-friendly, observable in access logs, and requires zero coordination with any infrastructure between client and server.',
  },
  {
    t: 'p',
    v: "Go 1.22 upgraded net/http's ServeMux to support method-prefixed patterns, removing the main reason teams reach for chi or gorilla/mux:",
  },
  {
    t: 'code',
    lang: 'go',
    v: `mux := http.NewServeMux()
mux.HandleFunc("GET /api/v1/orders/{id}", handler.GetOrder)
mux.HandleFunc("POST /api/v1/orders",     handler.CreateOrder)
mux.HandleFunc("DELETE /api/v1/orders/{id}", handler.CancelOrder)`,
  },
  {
    t: 'p',
    v: 'When you ship a breaking v2, mount both routers and keep v1 handlers frozen. Migration is a client problem — the server should never force it:',
  },
  {
    t: 'code',
    lang: 'go',
    v: `mux.Handle("/api/v1/", v1.Routes())
mux.Handle("/api/v2/", v2.Routes())`,
  },
  {
    t: 'h2',
    v: 'Structured Error Types',
  },
  {
    t: 'p',
    v: "The shape your API returns on errors is a contract clients write switch statements against. It must be stable across every endpoint. Two error categories exist: domain errors (validation failure, not found, conflict) where the client can and should act; and infrastructure errors (database timeout, downstream 503) where the client cannot act but your on-call engineer needs a trace ID to find the root cause.",
  },
  {
    t: 'code',
    lang: 'go',
    v: `type APIError struct {
    Code    string \`json:"code"\`
    Message string \`json:"message"\`
    TraceID string \`json:"trace_id,omitempty"\`
}

func writeError(w http.ResponseWriter, status int, code, msg string) {
    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(status)
    json.NewEncoder(w).Encode(APIError{Code: code, Message: msg})
}

// Domain errors — client can act
writeError(w, 400, "VALIDATION_ERROR", "quantity must be positive")
writeError(w, 404, "ORDER_NOT_FOUND",  "no order with that ID")
writeError(w, 409, "ORDER_CONFLICT",   "order already cancelled")

// Infrastructure errors — client cannot act; log the real error internally
writeError(w, 500, "INTERNAL", "an unexpected error occurred")`,
  },
  {
    t: 'h2',
    v: 'Middleware Chains',
  },
  {
    t: 'p',
    v: "Go's http.Handler is composable by design. Every cross-cutting concern — panic recovery, request ID injection, authentication, logging, rate limiting — becomes a wrapper function. Write each independently and compose them at the server entry point.",
  },
  {
    t: 'code',
    lang: 'go',
    v: `// Logging middleware captures status code and latency on every request.
// Uses r.Pattern (Go 1.22) — the route template, not the raw path,
// so /orders/123 and /orders/456 don't blow up your metrics cardinality.
func Logging(log *zap.Logger) func(http.Handler) http.Handler {
    return func(next http.Handler) http.Handler {
        return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
            start := time.Now()
            rw := &responseWriter{ResponseWriter: w, status: 200}
            next.ServeHTTP(rw, r)
            log.Info("http",
                zap.String("method",   r.Method),
                zap.String("route",    r.Pattern),
                zap.Int("status",      rw.status),
                zap.Duration("dur",    time.Since(start)),
                zap.String("trace_id", traceID(r.Context())),
            )
        })
    }
}`,
  },
  {
    t: 'p',
    v: 'Ordering matters. Recovery must be the outermost layer — it needs to catch panics from every layer inside it. Auth runs before any handler needing an identity. Logging wraps everything so it captures real status codes even when auth returns a 401:',
  },
  {
    t: 'code',
    lang: 'go',
    v: `handler := Recovery(log)(
    Logging(log)(
        RateLimit(limiter)(
            Auth(jwtKey)(
                mux,
            ),
        ),
    ),
)

srv := &http.Server{Addr: cfg.Port, Handler: handler}`,
  },
  {
    t: 'h2',
    v: 'Request Validation',
  },
  {
    t: 'p',
    v: 'Validate at the boundary. By the time a request reaches your service layer it should carry only well-typed, semantically valid data. Never pass a partially-zero struct deeper and let it fail somewhere unexpected.',
  },
  {
    t: 'code',
    lang: 'go',
    v: `type CreateOrderReq struct {
    AccountID string          \`json:"account_id"\`
    Symbol    string          \`json:"symbol"\`
    Side      model.Side      \`json:"side"\`
    Type      model.OrderType \`json:"type"\`
    Quantity  float64         \`json:"quantity"\`
    Price     float64         \`json:"price"\`
}

func (r *CreateOrderReq) Validate() error {
    if r.AccountID == "" {
        return fmt.Errorf("account_id required")
    }
    if r.Symbol == "" {
        return fmt.Errorf("symbol required")
    }
    if r.Side != model.Buy && r.Side != model.Sell {
        return fmt.Errorf("side must be BUY or SELL")
    }
    if r.Quantity <= 0 {
        return fmt.Errorf("quantity must be positive")
    }
    if r.Price < 0 {
        return fmt.Errorf("price must be non-negative")
    }
    return nil
}`,
  },
  {
    t: 'p',
    v: 'In the handler, always decode then validate before any business logic. The two steps are distinct: decoding checks structural JSON validity; validation checks semantic correctness.',
  },
  {
    t: 'code',
    lang: 'go',
    v: `func (h *Handler) CreateOrder(w http.ResponseWriter, r *http.Request) {
    var req CreateOrderReq
    if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
        writeError(w, 400, "PARSE_ERROR", "invalid request body")
        return
    }
    if err := req.Validate(); err != nil {
        writeError(w, 400, "VALIDATION_ERROR", err.Error())
        return
    }
    // From here: req is fully validated
    order, err := h.svc.CreateOrder(r.Context(), req)
    // ...
}`,
  },
  {
    t: 'h2',
    v: 'Graceful Shutdown',
  },
  {
    t: 'p',
    v: 'A service that drops in-flight requests on shutdown breaks every rolling deploy. Kubernetes sends SIGTERM and waits terminationGracePeriodSeconds before SIGKILL — use that window to drain cleanly.',
  },
  {
    t: 'code',
    lang: 'go',
    v: `srv := &http.Server{
    Addr:         cfg.Port,
    Handler:      handler,
    ReadTimeout:  15 * time.Second,
    WriteTimeout: 30 * time.Second,
    IdleTimeout:  60 * time.Second,
}

go func() {
    if err := srv.ListenAndServe(); err != http.ErrServerClosed {
        log.Fatal("server error", zap.Error(err))
    }
}()

ctx, stop := signal.NotifyContext(context.Background(), syscall.SIGTERM, os.Interrupt)
defer stop()
<-ctx.Done()

// Give in-flight requests up to 15s to complete
shutCtx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
defer cancel()
if err := srv.Shutdown(shutCtx); err != nil {
    log.Error("shutdown timed out", zap.Error(err))
}`,
  },
  {
    t: 'note',
    v: 'Set terminationGracePeriodSeconds in your Kubernetes pod spec to at least 5 seconds more than your HTTP timeout. After SIGTERM the pod needs a brief window to stop receiving traffic from the load balancer before it drains — if you skip this gap, new requests arrive during shutdown and get connection-refused.',
  },
  {
    t: 'h2',
    v: 'Testing Handlers with httptest',
  },
  {
    t: 'p',
    v: "Go's httptest package makes handler tests fast, dependency-free, and runnable in parallel. No test servers, no listening ports, no race with network availability. Write table-driven tests covering the happy path, every validation boundary, and error paths:",
  },
  {
    t: 'code',
    lang: 'go',
    v: `func TestCreateOrder(t *testing.T) {
    tests := []struct {
        name   string
        body   string
        status int
    }{
        {
            name:   "valid BUY order",
            body:   \`{"account_id":"acc-1","symbol":"AAPL","side":"BUY","type":"LIMIT","quantity":100,"price":185.0}\`,
            status: http.StatusAccepted,
        },
        {
            name:   "missing symbol",
            body:   \`{"account_id":"acc-1","side":"BUY","quantity":100,"price":185.0}\`,
            status: http.StatusBadRequest,
        },
        {
            name:   "zero quantity",
            body:   \`{"account_id":"acc-1","symbol":"AAPL","side":"BUY","quantity":0,"price":185.0}\`,
            status: http.StatusBadRequest,
        },
    }

    for _, tc := range tests {
        t.Run(tc.name, func(t *testing.T) {
            req := httptest.NewRequest(http.MethodPost, "/api/v1/orders", strings.NewReader(tc.body))
            req.Header.Set("Content-Type", "application/json")
            rr := httptest.NewRecorder()
            handler.CreateOrder(rr, req)
            assert.Equal(t, tc.status, rr.Code)
        })
    }
}`,
  },
  {
    t: 'h2',
    v: 'The Pre-Ship Checklist',
  },
  {
    t: 'p',
    v: 'Before you mark an endpoint ready for production, verify every point on this list:',
  },
  {
    t: 'ul',
    v: [
      'Every request emits method, route template (not raw path), status, latency, and trace ID',
      'Errors return a stable code field — clients switch on codes, not message strings',
      '5xx responses include a trace_id that maps to a structured log entry with the real error',
      'Every downstream call (database, external API) has an explicit context timeout',
      'The server drains gracefully — verified with a load test running during a rolling restart',
      'Rate limiting is active, especially on unauthenticated and idempotency-sensitive endpoints',
      'Table-driven tests cover boundary values, not just the happy path',
      'r.Pattern is logged, not r.URL.Path — keep cardinality bounded in metrics',
    ],
  },
];
