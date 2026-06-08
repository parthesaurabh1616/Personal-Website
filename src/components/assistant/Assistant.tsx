'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Bot, Send, X, Sparkles, Loader2 } from 'lucide-react';
import { ASSISTANT_GREETING, ASSISTANT_NAME, QUICK_PROMPTS } from '@/constants/assistant';
import { cn } from '@/lib/utils';

interface Msg {
  role: 'user' | 'assistant';
  content: string;
}

/* --- tiny, safe inline renderer: bold + bullets + section anchors --------- */
function scrollToHash(hash: string) {
  const el = document.querySelector(hash);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function Inline({ text }: { text: string }) {
  // Split on **bold** and #section anchors, keep delimiters.
  const parts = text.split(/(\*\*[^*]+\*\*|#[a-z]+)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (/^\*\*[^*]+\*\*$/.test(part)) {
          return (
            <strong key={i} className="font-semibold text-white">
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (/^#(projects|experience|stack|research|about|contact)$/.test(part)) {
          return (
            <button
              key={i}
              onClick={() => scrollToHash(part)}
              className="font-mono text-accent-cyan underline-offset-2 hover:underline"
            >
              {part}
            </button>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

function Markdownish({ content }: { content: string }) {
  const lines = content.split('\n');
  const blocks: React.ReactNode[] = [];
  let bullets: string[] = [];

  const flush = (key: string) => {
    if (bullets.length) {
      blocks.push(
        <ul key={key} className="my-1.5 space-y-1 pl-1">
          {bullets.map((b, i) => (
            <li key={i} className="flex gap-2 text-white/75">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent-blue" />
              <span>
                <Inline text={b} />
              </span>
            </li>
          ))}
        </ul>,
      );
      bullets = [];
    }
  };

  lines.forEach((line, idx) => {
    const t = line.trim();
    if (/^[-•]\s+/.test(t)) {
      bullets.push(t.replace(/^[-•]\s+/, ''));
      return;
    }
    flush(`ul-${idx}`);
    if (t.length === 0) {
      blocks.push(<div key={`sp-${idx}`} className="h-1.5" />);
      return;
    }
    blocks.push(
      <p key={`p-${idx}`} className="text-white/75">
        <Inline text={t} />
      </p>,
    );
  });
  flush('ul-end');
  return <div className="space-y-1 leading-relaxed">{blocks}</div>;
}

/* -------------------------------------------------------------------------- */

export function Assistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: 'assistant', content: ASSISTANT_GREETING },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, streaming]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 250);
  }, [open]);

  const send = useCallback(
    async (raw: string) => {
      const text = raw.trim();
      if (!text || streaming) return;

      const next: Msg[] = [...messages, { role: 'user', content: text }];
      setMessages([...next, { role: 'assistant', content: '' }]);
      setInput('');
      setStreaming(true);

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ messages: next }),
          signal: controller.signal,
        });

        if (!res.ok || !res.body) throw new Error('request failed');

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let acc = '';
        // eslint-disable-next-line no-constant-condition
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          acc += decoder.decode(value, { stream: true });
          setMessages((prev) => {
            const copy = [...prev];
            copy[copy.length - 1] = { role: 'assistant', content: acc };
            return copy;
          });
        }
        if (!acc.trim()) {
          setMessages((prev) => {
            const copy = [...prev];
            copy[copy.length - 1] = {
              role: 'assistant',
              content: 'Something interrupted that response. Mind asking again?',
            };
            return copy;
          });
        }
      } catch (err) {
        if ((err as Error)?.name !== 'AbortError') {
          setMessages((prev) => {
            const copy = [...prev];
            copy[copy.length - 1] = {
              role: 'assistant',
              content:
                "I couldn't reach the engine just now. Try again in a moment — or explore the Projects (#projects) and Experience (#experience) sections directly.",
            };
            return copy;
          });
        }
      } finally {
        setStreaming(false);
        abortRef.current = null;
      }
    },
    [messages, streaming],
  );

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  return (
    <>
      {/* Launcher */}
      <motion.button
        aria-label="Open engineering assistant"
        onClick={() => setOpen((v) => !v)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, type: 'spring', stiffness: 220, damping: 18 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-5 right-5 z-[60] flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-gradient-to-br from-accent-blue/90 to-accent-purple/90 shadow-glow backdrop-blur-xl"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="h-6 w-6 text-white" />
            </motion.span>
          ) : (
            <motion.span key="bot" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <Bot className="h-6 w-6 text-white" />
            </motion.span>
          )}
        </AnimatePresence>
        {!open && (
          <span className="absolute right-0 top-0 h-3 w-3 animate-pulse-soft rounded-full bg-signal-green ring-2 ring-black" />
        )}
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
            className="fixed bottom-24 right-5 z-[60] flex h-[min(640px,75vh)] w-[min(420px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-white/12 bg-ink-900/85 shadow-glow-lg backdrop-blur-2xl"
            data-lenis-prevent
          >
            {/* Header */}
            <div className="relative flex items-center gap-3 border-b border-white/10 bg-white/[0.03] px-4 py-3">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-gradient-to-br from-accent-blue/30 to-accent-purple/30">
                <Sparkles className="h-4 w-4 text-accent-cyan" />
              </div>
              <div className="min-w-0">
                <p className="font-display text-sm font-semibold leading-tight text-white">
                  {ASSISTANT_NAME}
                </p>
                <p className="flex items-center gap-1.5 text-[11px] text-white/50">
                  <span className="h-1.5 w-1.5 rounded-full bg-signal-green" />
                  Engineering assistant · grounded in the portfolio
                </p>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
              {messages.map((m, i) => {
                const isUser = m.role === 'user';
                const isLast = i === messages.length - 1;
                return (
                  <div key={i} className={cn('flex', isUser ? 'justify-end' : 'justify-start')}>
                    <div
                      className={cn(
                        'max-w-[88%] rounded-2xl px-3.5 py-2.5 text-sm',
                        isUser
                          ? 'bg-gradient-to-br from-accent-blue/25 to-accent-purple/20 text-white'
                          : 'border border-white/10 bg-white/[0.03] text-white/80',
                      )}
                    >
                      {isUser ? (
                        m.content
                      ) : m.content ? (
                        <Markdownish content={m.content} />
                      ) : (
                        <span className="flex items-center gap-2 text-white/50">
                          <Loader2 className="h-3.5 w-3.5 animate-spin" /> thinking…
                        </span>
                      )}
                      {!isUser && isLast && streaming && m.content && (
                        <span className="ml-0.5 inline-block h-3 w-1.5 animate-pulse-soft bg-accent-cyan align-middle" />
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Quick prompts on a fresh thread */}
              {messages.length === 1 && !streaming && (
                <div className="space-y-2 pt-1">
                  <p className="eyebrow">Try asking</p>
                  <div className="flex flex-wrap gap-2">
                    {QUICK_PROMPTS.map((p) => (
                      <button
                        key={p}
                        onClick={() => send(p)}
                        className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-left text-xs text-white/70 transition-colors hover:border-accent-blue/40 hover:bg-accent-blue/10 hover:text-white"
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Composer */}
            <div className="border-t border-white/10 bg-white/[0.02] p-3">
              <div className="flex items-end gap-2 rounded-xl border border-white/10 bg-black/40 px-3 py-2 focus-within:border-accent-blue/40">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  rows={1}
                  placeholder="Ask about architecture, tradeoffs, scale…"
                  className="max-h-28 flex-1 resize-none bg-transparent text-sm text-white placeholder:text-white/35 focus:outline-none"
                />
                <button
                  onClick={() => send(input)}
                  disabled={!input.trim() || streaming}
                  aria-label="Send"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-accent-blue to-accent-purple text-white transition-opacity disabled:opacity-30"
                >
                  {streaming ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </button>
              </div>
              <p className="mt-1.5 px-1 text-center text-[10px] text-white/30">
                Answers are grounded in Saurabh&apos;s portfolio. Enter to send · Shift+Enter for newline.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
