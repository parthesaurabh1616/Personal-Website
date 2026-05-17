import { cn } from '@/lib/utils';

interface GridBackgroundProps {
  className?: string;
  variant?: 'default' | 'sm';
  withGlow?: boolean;
}

export function GridBackground({ className, variant = 'default', withGlow = true }: GridBackgroundProps) {
  return (
    <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      <div
        className={cn(
          'absolute inset-0 bg-grid-pattern mask-radial',
          variant === 'sm' ? 'bg-grid-sm' : 'bg-grid',
        )}
      />
      {withGlow && (
        <>
          <div className="absolute inset-0 bg-hero-glow" />
          <div className="absolute -left-1/4 top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-accent-blue/10 blur-[120px]" />
          <div className="absolute -right-1/4 top-1/3 h-[500px] w-[500px] rounded-full bg-accent-purple/10 blur-[120px]" />
        </>
      )}
    </div>
  );
}
