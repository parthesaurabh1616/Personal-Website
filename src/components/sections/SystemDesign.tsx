'use client';

import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { GlowCard } from '@/components/ui/GlowCard';
import { GridBackground } from '@/components/visuals/GridBackground';
import { DataStream } from '@/components/visuals/DataStream';
import { ARCH_PATTERNS } from '@/constants/architecture';
import { fadeUp, staggerContainer } from '@/lib/animations';
import { Tag } from '@/components/ui/Tag';

export function SystemDesign() {
  return (
    <section id="architecture" className="section relative overflow-hidden">
      <GridBackground />
      <DataStream lines={6} />
      <div className="container-page relative z-10">
        <SectionHeader
          eyebrow="03 / System Design"
          title="Architecture as a first-class deliverable."
          description="Distributed systems live or die on architectural decisions made before the first line of code. These are the patterns I reach for — and the trade-offs that come with them."
        />

        <ArchitectureDiagram />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {ARCH_PATTERNS.map((p) => (
            <motion.div key={p.title} variants={fadeUp}>
              <GlowCard className="h-full">
                <Tag intent="blue">{p.tag}</Tag>
                <h3 className="mt-4 font-display text-base font-semibold text-white">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{p.description}</p>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ArchitectureDiagram() {
  const tiers = [
    {
      title: 'Edge / Ingest',
      items: ['RTSP Gateway', 'API Gateway', 'WebSocket Term.'],
      tone: 'from-accent-blue/30 to-accent-blue/5',
    },
    {
      title: 'Stream Backbone',
      items: ['Kafka Topics', 'NATS Subjects', 'Schema Registry'],
      tone: 'from-accent-electric/30 to-accent-electric/5',
    },
    {
      title: 'Services',
      items: ['Golang Workers', 'Python Inference', 'Spring Boot Domain'],
      tone: 'from-accent-purple/30 to-accent-purple/5',
    },
    {
      title: 'State & Search',
      items: ['Postgres', 'Redis', 'ElasticSearch', 'ClickHouse'],
      tone: 'from-accent-violet/30 to-accent-violet/5',
    },
    {
      title: 'Observability',
      items: ['Prometheus', 'Grafana', 'OpenTelemetry'],
      tone: 'from-accent-cyan/30 to-accent-cyan/5',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8 }}
      className="mt-14 overflow-hidden rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur-xl md:p-10"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/50">
            Reference Topology
          </p>
          <h3 className="mt-2 font-display text-xl font-semibold text-white md:text-2xl">
            Distributed system blueprint
          </h3>
        </div>
        <div className="hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-white/40 md:flex">
          <span className="inline-block h-2 w-2 rounded-full bg-accent-blue shadow-[0_0_10px_rgba(59,130,246,0.7)]" />
          Live Request Path
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-5">
        {tiers.map((t, i) => (
          <motion.div
            key={t.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className={`relative rounded-2xl border border-white/10 bg-gradient-to-b ${t.tone} p-4`}
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/70">
              T{i + 1} · {t.title}
            </p>
            <ul className="mt-3 space-y-1.5">
              {t.items.map((it) => (
                <li key={it} className="flex items-center gap-2 text-xs text-white/85">
                  <span className="inline-block h-1 w-1 rounded-full bg-white/70" />
                  {it}
                </li>
              ))}
            </ul>
            {i < tiers.length - 1 && (
              <div className="absolute right-[-10px] top-1/2 hidden h-px w-5 -translate-y-1/2 bg-gradient-to-r from-white/40 to-transparent md:block" />
            )}
          </motion.div>
        ))}
      </div>

      {/* Connection animation strip */}
      <div className="mt-8 grid grid-cols-3 gap-3 text-xs">
        {[
          'request → gateway → topic',
          'consumer → service → state',
          'metric → exporter → grafana',
        ].map((label) => (
          <div
            key={label}
            className="relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/60">{label}</p>
            <motion.div
              className="absolute bottom-0 left-0 h-px w-1/3 bg-gradient-to-r from-accent-blue via-accent-purple to-transparent"
              animate={{ x: ['-100%', '300%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            />
          </div>
        ))}
      </div>
    </motion.div>
  );
}
