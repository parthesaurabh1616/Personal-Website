'use client';

import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { GlowCard } from '@/components/ui/GlowCard';
import { GridBackground } from '@/components/visuals/GridBackground';
import { DataStream } from '@/components/visuals/DataStream';
import { IDENTITY_PILLARS } from '@/constants/identity';
import { fadeUp, staggerContainer } from '@/lib/animations';

export function EngineeringIdentity() {
  return (
    <section id="identity" className="section relative overflow-hidden">
      <GridBackground variant="sm" withGlow={false} />
      <DataStream lines={4} />
      <div className="container-page relative z-10">
        <SectionHeader
          eyebrow="01 / Engineering Identity"
          title="Built for scale. Designed for intelligence."
          description="An engineer's discipline applied to distributed systems and AI infrastructure — from event streams and service meshes to GPU-backed inference pipelines."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {IDENTITY_PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <motion.div key={pillar.title} variants={fadeUp}>
                <GlowCard className="h-full">
                  <div className="flex items-center justify-between">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-accent-blue/20 to-accent-purple/20">
                      <Icon size={20} className="text-accent-glow" />
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
                      {pillar.metric}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold text-white">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">
                    {pillar.description}
                  </p>
                  <div className="mt-5 border-t border-white/10 pt-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">
                      {pillar.signal}
                    </p>
                  </div>
                </GlowCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
