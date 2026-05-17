'use client';

import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  icon?: ReactNode;
  as?: 'button';
}

const base =
  'group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-mono text-xs uppercase tracking-[0.22em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue/60 disabled:cursor-not-allowed disabled:opacity-50';

const variants: Record<Variant, string> = {
  primary:
    'bg-gradient-to-r from-accent-blue/90 via-accent-electric/90 to-accent-purple/90 text-white shadow-glow hover:shadow-glow-lg hover:brightness-110',
  secondary:
    'border border-white/15 bg-white/[0.04] text-white/90 backdrop-blur-md hover:border-accent-blue/50 hover:bg-white/[0.07]',
  ghost: 'text-white/70 hover:text-white',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = 'primary', icon, children, ...rest },
  ref,
) {
  return (
    <button ref={ref} className={cn(base, variants[variant], className)} {...rest}>
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
        {icon}
      </span>
      {variant === 'primary' && (
        <span className="pointer-events-none absolute inset-0 -z-0 rounded-full opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-60"
          style={{ background: 'linear-gradient(90deg,#3b82f6,#8b5cf6,#22d3ee)' }}
        />
      )}
    </button>
  );
});
