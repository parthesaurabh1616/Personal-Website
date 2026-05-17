'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, BookOpen } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { GlowCard } from '@/components/ui/GlowCard';
import { Tag } from '@/components/ui/Tag';
import { GridBackground } from '@/components/visuals/GridBackground';
import { RESEARCH_POSTS } from '@/constants/research';
import { fadeUp, staggerContainer } from '@/lib/animations';

export function Research() {
  return (
    <section id="research" className="section relative overflow-hidden">
      <GridBackground withGlow={false} />
      <div className="container-page relative z-10">
        <SectionHeader
          eyebrow="07 / Research & Writing"
          title="Distributed systems, written down."
          description="Notes, deep dives, and engineering writing on the systems-level topics I work in every day."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {RESEARCH_POSTS.map((p) => (
            <motion.article key={p.title} variants={fadeUp}>
              <GlowCard className="flex h-full flex-col">
                <div className="flex items-center justify-between">
                  <Tag intent="purple">{p.category}</Tag>
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">
                    {p.readTime}
                  </span>
                </div>

                <div className="mt-4 flex items-start gap-3">
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04]">
                    <BookOpen size={15} className="text-accent-glow" />
                  </span>
                  <h3 className="font-display text-base font-semibold leading-snug text-white">
                    {p.title}
                  </h3>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-white/60">{p.summary}</p>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {p.topics.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>

                <div className="mt-auto pt-5">
                  <div className="flex items-center justify-between border-t border-white/10 pt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-white/55">
                    <span>Read · Draft</span>
                    <ArrowUpRight size={14} className="text-accent-blue" />
                  </div>
                </div>
              </GlowCard>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
