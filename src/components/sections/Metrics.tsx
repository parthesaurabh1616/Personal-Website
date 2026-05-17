'use client';

import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { GridBackground } from '@/components/visuals/GridBackground';
import { METRICS } from '@/constants/metrics';
import { fadeUp, staggerContainer } from '@/lib/animations';

function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const value = useMotionValue(0);
  const rounded = useTransform(value, (v) => {
    const isFloat = !Number.isInteger(to);
    return isFloat ? v.toFixed(2) : Math.floor(v).toString();
  });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(value, to, { duration: 1.8, ease: [0.22, 1, 0.36, 1] });
    return () => controls.stop();
  }, [inView, to, value]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

export function Metrics() {
  return (
    <section className="section relative overflow-hidden">
      <GridBackground withGlow />
      <div className="container-page relative z-10">
        <SectionHeader
          eyebrow="06 / Engineering Metrics"
          title="Operational numbers, not vanity numbers."
          description="The metrics below describe the systems I've owned in production — what they handled, what they delivered, and what they survived."
          align="center"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3"
        >
          {METRICS.map((m) => (
            <motion.div
              key={m.label}
              variants={fadeUp}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] p-6 backdrop-blur-xl"
            >
              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-accent-blue/10 blur-3xl" />
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/50">
                {m.label}
              </div>
              <div className="mt-3 flex items-baseline gap-1 font-display text-4xl font-semibold tracking-tight text-white md:text-5xl">
                <CountUp to={Number(m.value)} />
                {m.suffix && (
                  <span className="text-accent-glow">{m.suffix}</span>
                )}
              </div>
              <p className="mt-3 text-sm text-white/55">{m.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
