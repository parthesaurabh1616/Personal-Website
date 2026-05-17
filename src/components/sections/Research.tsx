'use client';

import Link from 'next/link';
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
          description="Deep dives and engineering notes on the systems-level topics I work in every day. Click any note to read the full article."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {RESEARCH_POSTS.map((p) => (
            <motion.article key={p.slug} variants={fadeUp}>
              <Link href={`/notes/${p.slug}`} className="block h-full">
                <GlowCard className="flex h-full flex-col transition-all duration-300 hover:border-accent-blue/30 hover:shadow-glow" interactive>
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
                      <span>{p.publishedAt} · {p.readTime}</span>
                      <ArrowUpRight size={14} className="text-accent-blue transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </GlowCard>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
