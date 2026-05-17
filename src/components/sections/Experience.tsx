'use client';

import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { GlowCard } from '@/components/ui/GlowCard';
import { Tag } from '@/components/ui/Tag';
import { GridBackground } from '@/components/visuals/GridBackground';
import { EXPERIENCES } from '@/constants/experience';
import { fadeUp, staggerContainer } from '@/lib/animations';

export function ExperienceSection() {
  return (
    <section id="experience" className="section relative overflow-hidden">
      <GridBackground withGlow={false} />
      <div className="container-page relative z-10">
        <SectionHeader
          eyebrow="04 / Experience"
          title="Engineering across edge AI, FinTech, and ML systems."
          description="Three industries, one through-line: building distributed systems that hold up under real-world traffic, failure modes, and scale."
        />

        <div className="relative mt-14">
          {/* timeline line */}
          <div className="absolute left-5 top-2 bottom-2 hidden w-px bg-gradient-to-b from-accent-blue/40 via-accent-purple/40 to-transparent md:block" />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="space-y-6"
          >
            {EXPERIENCES.map((exp, idx) => (
              <motion.div key={exp.company} variants={fadeUp} className="relative md:pl-16">
                {/* node */}
                <div className="absolute left-2.5 top-6 hidden h-5 w-5 items-center justify-center rounded-full border border-accent-blue/40 bg-black md:flex">
                  <div className="h-2 w-2 rounded-full bg-accent-blue shadow-[0_0_12px_rgba(59,130,246,0.8)]" />
                </div>

                <GlowCard className="p-7">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-white/10 bg-white/[0.04]">
                          <Briefcase size={13} className="text-accent-glow" />
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/55">
                          0{idx + 1} · {exp.location}
                        </span>
                      </div>
                      <h3 className="mt-3 font-display text-xl font-semibold text-white md:text-2xl">
                        {exp.role}
                      </h3>
                      <p className="mt-1 text-base text-white/70">@ {exp.company}</p>
                    </div>
                    <Tag intent="blue">{exp.period}</Tag>
                  </div>

                  <ul className="mt-5 grid grid-cols-1 gap-2 md:grid-cols-2">
                    {exp.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-sm text-white/65">
                        <span className="mt-1.5 inline-block h-1 w-1 rounded-full bg-accent-blue" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-2 border-t border-white/10 pt-4">
                    {exp.stack.map((s) => (
                      <Tag key={s}>{s}</Tag>
                    ))}
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
