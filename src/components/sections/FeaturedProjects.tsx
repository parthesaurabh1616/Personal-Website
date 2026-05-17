'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronRight, Server, Gauge, GitBranch } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { GlowCard } from '@/components/ui/GlowCard';
import { Tag } from '@/components/ui/Tag';
import { StatusDot } from '@/components/ui/StatusDot';
import { GridBackground } from '@/components/visuals/GridBackground';
import { PROJECTS } from '@/constants/projects';
import { fadeUp, staggerContainer } from '@/lib/animations';
import { cn } from '@/lib/utils';
import type { Project } from '@/types';

const statusLabel: Record<Project['status'], string> = {
  production: 'Production',
  research: 'Research',
  experimental: 'Experimental',
};

const statusVariant: Record<Project['status'], 'green' | 'blue' | 'amber'> = {
  production: 'green',
  research: 'blue',
  experimental: 'amber',
};

export function FeaturedProjects() {
  const [active, setActive] = useState(PROJECTS[0].id);
  const project = PROJECTS.find((p) => p.id === active) ?? PROJECTS[0];

  return (
    <section id="projects" className="section relative overflow-hidden">
      <GridBackground withGlow={false} />
      <div className="container-page relative z-10">
        <SectionHeader
          eyebrow="02 / Featured Projects"
          title="Production-grade infrastructure, end-to-end."
          description="Each project is a complete distributed system — designed, deployed, monitored, and tuned for real workloads. Architecture decisions, metrics, and trade-offs included."
        />

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-[340px,1fr]">
          {/* Project list */}
          <motion.aside
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="flex flex-col gap-2"
          >
            {PROJECTS.map((p, i) => (
              <motion.button
                key={p.id}
                variants={fadeUp}
                onClick={() => setActive(p.id)}
                className={cn(
                  'group relative flex items-start gap-3 rounded-2xl border p-4 text-left transition-all duration-300',
                  active === p.id
                    ? 'border-accent-blue/40 bg-white/[0.05] shadow-glow'
                    : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]',
                )}
              >
                <div className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] font-mono text-[10px] text-white/70">
                  0{i + 1}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <StatusDot variant={statusVariant[p.status]} />
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/50">
                      {statusLabel[p.status]}
                    </span>
                  </div>
                  <p className="mt-1.5 truncate font-display text-sm font-semibold text-white">
                    {p.title}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-white/50">{p.tagline}</p>
                </div>
                <ChevronRight
                  size={16}
                  className={cn(
                    'mt-2 shrink-0 transition-transform',
                    active === p.id ? 'text-accent-blue' : 'text-white/30 group-hover:translate-x-0.5',
                  )}
                />
              </motion.button>
            ))}
          </motion.aside>

          {/* Detail */}
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <GlowCard className="p-8" interactive>
              <div className="flex flex-wrap items-center gap-2">
                <Tag intent="blue">{project.domain}</Tag>
                <Tag intent={statusVariant[project.status] === 'green' ? 'green' : 'purple'}>
                  {statusLabel[project.status]}
                </Tag>
              </div>
              <h3 className="mt-5 font-display text-3xl font-semibold text-white md:text-4xl">
                {project.title}
              </h3>
              <p className="mt-3 text-white/65">{project.description}</p>
              <p className="mt-3 text-sm leading-relaxed text-white/55">{project.longDescription}</p>

              {/* metrics */}
              <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {project.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="rounded-xl border border-white/10 bg-white/[0.03] p-3"
                  >
                    <div className="font-display text-lg font-semibold text-white">{m.value}</div>
                    <div className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.22em] text-white/50">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-7 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <div className="mb-3 flex items-center gap-2">
                    <Gauge size={14} className="text-accent-blue" />
                    <h4 className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/60">
                      Engineering Features
                    </h4>
                  </div>
                  <ul className="space-y-2">
                    {project.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-white/65">
                        <span className="mt-1.5 inline-block h-1 w-1 rounded-full bg-accent-blue" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="mb-3 flex items-center gap-2">
                    <Server size={14} className="text-accent-purple" />
                    <h4 className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/60">
                      Architecture
                    </h4>
                  </div>
                  <ul className="space-y-2">
                    {project.architecture.map((a) => (
                      <li key={a} className="flex items-start gap-2 text-sm text-white/65">
                        <span className="mt-1.5 inline-block h-1 w-1 rounded-full bg-accent-purple" />
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-7 border-t border-white/10 pt-5">
                <div className="mb-3 flex items-center gap-2">
                  <GitBranch size={14} className="text-accent-cyan" />
                  <h4 className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/60">
                    Stack
                  </h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((s) => (
                    <Tag key={s} intent="default">
                      {s}
                    </Tag>
                  ))}
                </div>
              </div>
            </GlowCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
