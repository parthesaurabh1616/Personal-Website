import { NextRequest } from 'next/server';
import {
  buildPortfolioContext,
  localAnswer,
  type ChatMessage,
} from '@/lib/assistantEngine';
import { SYSTEM_PROMPT } from '@/constants/assistant';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MODEL = process.env.ANTHROPIC_MODEL || 'claude-3-5-haiku-latest';
const MAX_MESSAGES = 16;
const encoder = new TextEncoder();

function sanitize(input: unknown): ChatMessage[] {
  if (!Array.isArray(input)) return [];
  return input
    .filter(
      (m): m is ChatMessage =>
        !!m &&
        (m.role === 'user' || m.role === 'assistant') &&
        typeof m.content === 'string' &&
        m.content.trim().length > 0,
    )
    .slice(-MAX_MESSAGES)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 4000) }));
}

/** Stream a locally-composed grounded answer as word chunks (no API key path). */
function localStream(messages: ChatMessage[]): ReadableStream<Uint8Array> {
  const text = localAnswer(messages);
  const tokens = text.match(/\s*\S+/g) ?? [text];
  let i = 0;
  return new ReadableStream({
    pull(controller) {
      if (i >= tokens.length) {
        controller.close();
        return;
      }
      // Emit a few tokens per tick for a smooth-but-quick reveal.
      const batch = tokens.slice(i, i + 3).join('');
      i += 3;
      controller.enqueue(encoder.encode(batch));
    },
  });
}

/** Stream from the Anthropic Messages API, forwarding text deltas as plain text. */
async function anthropicStream(
  apiKey: string,
  messages: ChatMessage[],
): Promise<ReadableStream<Uint8Array>> {
  const system = `${SYSTEM_PROMPT}\n\n${buildPortfolioContext()}`;
  const upstream = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 1024,
      system,
      stream: true,
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
    }),
  });

  if (!upstream.ok || !upstream.body) {
    // Upstream failed (bad key, rate limit, etc.) — degrade gracefully to local.
    return localStream(messages);
  }

  const reader = upstream.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  return new ReadableStream({
    async pull(controller) {
      const { done, value } = await reader.read();
      if (done) {
        controller.close();
        return;
      }
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() ?? '';
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed.startsWith('data:')) continue;
        const payload = trimmed.slice(5).trim();
        if (!payload || payload === '[DONE]') continue;
        try {
          const evt = JSON.parse(payload);
          if (
            evt.type === 'content_block_delta' &&
            evt.delta?.type === 'text_delta' &&
            typeof evt.delta.text === 'string'
          ) {
            controller.enqueue(encoder.encode(evt.delta.text));
          }
        } catch {
          // ignore non-JSON keep-alive lines
        }
      }
    },
    cancel() {
      reader.cancel().catch(() => {});
    },
  });
}

export async function POST(req: NextRequest) {
  let messages: ChatMessage[] = [];
  try {
    const body = await req.json();
    messages = sanitize(body?.messages);
  } catch {
    return new Response('Invalid request body', { status: 400 });
  }

  if (messages.length === 0) {
    return new Response('No messages provided', { status: 400 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  const headers = {
    'content-type': 'text/plain; charset=utf-8',
    'cache-control': 'no-cache, no-transform',
    'x-assistant-mode': apiKey ? 'claude' : 'local',
  };

  try {
    const stream = apiKey
      ? await anthropicStream(apiKey, messages)
      : localStream(messages);
    return new Response(stream, { headers });
  } catch {
    return new Response(localStream(messages), { headers });
  }
}
