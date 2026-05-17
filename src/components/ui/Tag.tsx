import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  intent?: 'default' | 'blue' | 'purple' | 'cyan' | 'green';
}

const intents: Record<NonNullable<TagProps['intent']>, string> = {
  default: 'border-white/15 bg-white/[0.04] text-white/80',
  blue: 'border-accent-blue/30 bg-accent-blue/10 text-accent-blue',
  purple: 'border-accent-purple/30 bg-accent-purple/10 text-accent-violet',
  cyan: 'border-accent-cyan/30 bg-accent-cyan/10 text-accent-cyan',
  green: 'border-signal-green/30 bg-signal-green/10 text-signal-green',
};

export function Tag({ intent = 'default', className, ...rest }: TagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em]',
        intents[intent],
        className,
      )}
      {...rest}
    />
  );
}
