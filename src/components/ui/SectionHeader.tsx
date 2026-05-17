'use client';

import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/animations';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={fadeUp}
      className={cn(
        'max-w-3xl',
        align === 'center' ? 'mx-auto text-center' : 'text-left',
        className,
      )}
    >
      <div className={cn('mb-4 flex items-center gap-3', align === 'center' && 'justify-center')}>
        <span className="h-px w-8 bg-gradient-to-r from-accent-blue/0 via-accent-blue to-accent-purple" />
        <span className="eyebrow">{eyebrow}</span>
        <span className="h-px w-8 bg-gradient-to-r from-accent-purple via-accent-blue to-accent-blue/0" />
      </div>
      <h2 className="section-title">
        <span className="text-gradient">{title}</span>
      </h2>
      {description && (
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/60 md:text-lg">
          {description}
        </p>
      )}
    </motion.div>
  );
}
