'use client';

import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { GlowCard } from '@/components/ui/GlowCard';
import { GridBackground } from '@/components/visuals/GridBackground';
import { OrbitRings } from '@/components/visuals/OrbitRings';
import { Tag } from '@/components/ui/Tag';
import { fadeUp, staggerContainer } from '@/lib/animations';

const PRINCIPLES = [
  {
    title: 'Systems Thinking',
    body: 'Engineering decisions ripple — through latency, cost, on-call burden, and team velocity. I optimize for the whole graph, not the local edge.',
  },
  {
    title: 'Scalable Architecture',
    body: 'Designs that hold their shape under 10x load. Bounded contexts, idempotent paths, explicit failure modes — by design, not by accident.',
  },
  {
    title: 'AI Infrastructure',
    body: 'ML lives or dies on the systems around it. Feature pipelines, model serving, GPU economics, and observability are the real product.',
  },
  {
    title: 'Distributed Computing',
    body: 'CAP-aware design, replication topologies, consensus where required, eventual consistency where it suffices — chosen, not assumed.',
  },
  {
    title: 'Clean Architecture',
    body: 'Domain logic separated from transport, storage, and frameworks. Code that can be tested without infrastructure and replaced without rewrites.',
  },
  {
    title: 'Reliability Engineering',
    body: 'SLOs that mean something, error budgets that get respected, runbooks that are written before the incident — not during it.',
  },
];

export function About() {
  return (
    <section id="about" className="section relative overflow-hidden">
      <GridBackground />
      <OrbitRings className="opacity-40" />
      <div className="container-page relative z-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr,1.2fr] lg:items-start">
          <div>
            <SectionHeader
              eyebrow="08 / About"
              title="Engineering for systems that think."
              description="I build infrastructure for the kind of systems that have to be right, fast, and observable at the same time. Distributed by default. Intelligent where it matters."
            />
            <div className="mt-8 space-y-4 text-base leading-relaxed text-white/65">
              <p>
                My work sits at the intersection of distributed systems and AI infrastructure —
                the layer where latency budgets, fault tolerance, and model behavior all collide.
                I&apos;ve built platforms that process thousands of real-time camera streams, financial
                event pipelines clearing millions of daily transactions, and predictive systems
                that catch infrastructure failures before they happen.
              </p>
              <p>
                I care about the parts that don&apos;t demo well: backpressure, idempotency, replay
                semantics, observability, and the operational hygiene that makes 99.99% a
                sustained number — not a screenshot. Production is the only review that matters.
              </p>
              <p>
                Outside of work, I&apos;m a long-form thinker on system design, a competitive
                problem-solver (600+ LeetCode), and a believer that the next decade of AI will
                be won at the infrastructure layer — not the model layer.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              <Tag intent="blue">Distributed Systems</Tag>
              <Tag intent="purple">AI Infrastructure</Tag>
              <Tag intent="cyan">Reliability Engineering</Tag>
              <Tag>System Design</Tag>
              <Tag>Event-Driven</Tag>
            </div>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-1 gap-3 sm:grid-cols-2"
          >
            {PRINCIPLES.map((p) => (
              <motion.div key={p.title} variants={fadeUp}>
                <GlowCard className="h-full">
                  <h3 className="font-display text-base font-semibold text-white">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{p.body}</p>
                </GlowCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
