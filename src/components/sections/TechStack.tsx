'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { GridBackground } from '@/components/visuals/GridBackground';
import { SKILLS, SKILL_CATEGORIES } from '@/constants/skills';
import { fadeUp, staggerContainer } from '@/lib/animations';
import { cn } from '@/lib/utils';

const levelLabel = {
  core: 'Core',
  advanced: 'Advanced',
  expert: 'Expert',
} as const;

export function TechStack() {
  const [active, setActive] = useState<string>('All');
  const categories = ['All', ...SKILL_CATEGORIES];
  const visible = active === 'All' ? SKILLS : SKILLS.filter((s) => s.category === active);

  return (
    <section id="stack" className="section relative overflow-hidden">
      <GridBackground variant="sm" />
      <div className="container-page relative z-10">
        <SectionHeader
          eyebrow="05 / Tech Stack"
          title="Tools chosen for the workload — not for the resume."
          description="A focused stack covering the full distributed systems lifecycle — from streaming and orchestration to ML serving and observability."
        />

        <div className="mt-10 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={cn(
                'rounded-full border px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] transition-all',
                active === c
                  ? 'border-accent-blue/50 bg-accent-blue/10 text-white shadow-glow'
                  : 'border-white/10 bg-white/[0.02] text-white/60 hover:border-white/20 hover:text-white',
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <motion.div
          key={active}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
        >
          {visible.map((s) => (
            <motion.div
              key={s.name}
              variants={fadeUp}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] p-4 transition-all hover:border-accent-blue/30 hover:bg-white/[0.05]"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/45">
                  {s.category}
                </span>
                <span
                  className={cn(
                    'rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.22em]',
                    s.level === 'expert'
                      ? 'border-accent-purple/30 bg-accent-purple/10 text-accent-violet'
                      : s.level === 'advanced'
                      ? 'border-accent-blue/30 bg-accent-blue/10 text-accent-blue'
                      : 'border-white/15 bg-white/[0.04] text-white/70',
                  )}
                >
                  {levelLabel[s.level]}
                </span>
              </div>
              <p className="mt-3 font-display text-base font-semibold text-white">{s.name}</p>
              {/* progress bar by level */}
              <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{
                    width:
                      s.level === 'expert' ? '94%' : s.level === 'advanced' ? '78%' : '60%',
                  }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full bg-gradient-to-r from-accent-blue via-accent-electric to-accent-purple"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
