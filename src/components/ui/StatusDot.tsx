import { cn } from '@/lib/utils';

interface StatusDotProps {
  className?: string;
  variant?: 'green' | 'blue' | 'amber';
}

const variants = {
  green: 'bg-signal-green shadow-[0_0_12px_rgba(16,185,129,0.7)]',
  blue: 'bg-accent-blue shadow-[0_0_12px_rgba(59,130,246,0.7)]',
  amber: 'bg-signal-amber shadow-[0_0_12px_rgba(245,158,11,0.7)]',
};

export function StatusDot({ className, variant = 'green' }: StatusDotProps) {
  return (
    <span className={cn('relative inline-flex h-2 w-2', className)}>
      <span className={cn('absolute inline-flex h-full w-full animate-ping rounded-full opacity-60', variants[variant])} />
      <span className={cn('relative inline-flex h-2 w-2 rounded-full', variants[variant])} />
    </span>
  );
}
