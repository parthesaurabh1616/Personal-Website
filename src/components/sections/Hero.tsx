'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Mail, FlaskConical, FolderGit2 } from 'lucide-react';
import { NeuralTopology } from '@/components/visuals/NeuralTopology';
import { GridBackground } from '@/components/visuals/GridBackground';
import { DataStream } from '@/components/visuals/DataStream';
import { OrbitRings } from '@/components/visuals/OrbitRings';
import { LinkButton } from '@/components/ui/LinkButton';
import { StatusDot } from '@/components/ui/StatusDot';

export function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] w-full items-center overflow-hidden pt-32">
      {/* layered visuals */}
      <GridBackground />
      <OrbitRings />
      <div className="absolute inset-0">
        <NeuralTopology density={90} speed={0.22} className="absolute inset-0 h-full w-full" />
      </div>
      <DataStream lines={8} />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-black" />

      <div className="container-page relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 backdrop-blur-xl"
        >
          <StatusDot />
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/80">
            Live · Edge AI · Distributed Systems
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 font-display text-5xl font-semibold leading-[0.95] tracking-tight md:text-7xl lg:text-[88px]"
        >
          <span className="text-gradient">SAURABH</span>
          <br />
          <span className="text-gradient-cool">PARTHE</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.8 }}
          className="mt-6 max-w-2xl font-display text-lg text-white/80 md:text-xl"
        >
          Distributed Systems & AI Infrastructure Engineer
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8 }}
          className="mt-4 max-w-2xl text-base leading-relaxed text-white/55 md:text-lg"
        >
          Building scalable intelligent systems with{' '}
          <span className="text-white">Golang</span>,{' '}
          <span className="text-white">Python</span>,{' '}
          <span className="text-white">Kubernetes</span>,{' '}
          <span className="text-white">Kafka</span>, and{' '}
          <span className="text-white">Machine Learning</span>. Designing the
          infrastructure layer for real-time, intelligent, fault-tolerant systems.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <LinkButton href="#projects" variant="primary" icon={<ArrowRight size={14} />}>
            View Projects
          </LinkButton>
          <LinkButton href="#research" variant="secondary" icon={<FlaskConical size={14} />}>
            Research Work
          </LinkButton>
          <LinkButton href="#contact" variant="ghost" icon={<Mail size={14} />}>
            Contact
          </LinkButton>
        </motion.div>

        {/* HUD metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.9 }}
          className="mt-16 grid w-full max-w-4xl grid-cols-2 gap-3 md:grid-cols-4"
        >
          {[
            { k: '1000+', v: 'Concurrent Streams' },
            { k: '<50ms', v: 'p99 Latency' },
            { k: '99.99%', v: 'Uptime' },
            { k: '600+', v: 'LeetCode Solved' },
          ].map((m, i) => (
            <motion.div
              key={m.v}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.06 }}
              className="glass rounded-2xl px-4 py-3"
            >
              <div className="font-display text-xl font-semibold text-white md:text-2xl">{m.k}</div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-white/55">
                {m.v}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-16 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-white/40"
        >
          <span className="inline-flex h-5 w-3 items-start justify-center rounded-full border border-white/30">
            <motion.span
              className="mt-1 h-1.5 w-px bg-white/70"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            />
          </span>
          Scroll · Explore Architecture
          <FolderGit2 size={12} className="text-white/40" />
        </motion.div>
      </div>
    </section>
  );
}
