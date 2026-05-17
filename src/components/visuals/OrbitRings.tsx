import { cn } from '@/lib/utils';

interface OrbitRingsProps {
  className?: string;
}

export function OrbitRings({ className }: OrbitRingsProps) {
  return (
    <div className={cn('pointer-events-none absolute inset-0 flex items-center justify-center', className)}>
      <div className="relative h-[90vmin] w-[90vmin] max-w-[900px] max-h-[900px]">
        <div className="absolute inset-0 rounded-full border border-white/[0.06]" />
        <div className="absolute inset-[8%] rounded-full border border-white/[0.05]" />
        <div className="absolute inset-[18%] rounded-full border border-white/[0.04]" />
        <div className="absolute inset-[30%] rounded-full border border-accent-blue/10 animate-spin-slower" />
        <div className="absolute inset-[42%] rounded-full border border-accent-purple/10 animate-spin-slow" />
      </div>
    </div>
  );
}
