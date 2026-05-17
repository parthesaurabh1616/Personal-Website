'use client';

import type { HTMLAttributes, ReactNode } from 'react';
import { useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface GlowCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  interactive?: boolean;
}

export function GlowCard({ children, className, interactive = true, ...rest }: GlowCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        if (!interactive || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
      }}
      onMouseLeave={() => setPos(null)}
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] p-6 transition-all duration-500 hover:border-white/20 hover:bg-white/[0.04]',
        className,
      )}
      {...rest}
    >
      {/* gradient ring */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            pos
              ? `radial-gradient(400px circle at ${pos.x}px ${pos.y}px, rgba(59,130,246,0.18), transparent 50%)`
              : 'radial-gradient(400px circle at 50% 0%, rgba(59,130,246,0.10), transparent 50%)',
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
