'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface DataStreamProps {
  className?: string;
  lines?: number;
}

export function DataStream({ className, lines = 6 }: DataStreamProps) {
  return (
    <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-px w-[40%] bg-gradient-to-r from-transparent via-accent-blue/60 to-transparent"
          style={{
            top: `${(i / lines) * 100 + Math.random() * 8}%`,
            left: '-40%',
          }}
          animate={{ left: ['-40%', '120%'] }}
          transition={{
            duration: 6 + Math.random() * 4,
            repeat: Infinity,
            delay: i * 0.6,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}
