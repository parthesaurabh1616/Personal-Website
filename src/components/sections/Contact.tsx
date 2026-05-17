'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, FileText, ArrowUpRight } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { GridBackground } from '@/components/visuals/GridBackground';
import { OrbitRings } from '@/components/visuals/OrbitRings';
import { LinkButton } from '@/components/ui/LinkButton';
import { SOCIAL_LINKS } from '@/constants/nav';

const CHANNELS = [
  {
    label: 'GitHub',
    value: 'parthesaurabh1616',
    href: SOCIAL_LINKS.github,
    icon: Github,
  },
  {
    label: 'LinkedIn',
    value: 'saurabhparthe',
    href: SOCIAL_LINKS.linkedin,
    icon: Linkedin,
  },
  {
    label: 'Email',
    value: 'saurabh.parthe.1@gmail.com',
    href: SOCIAL_LINKS.email,
    icon: Mail,
  },
  {
    label: 'Resume',
    value: 'Download · PDF',
    href: SOCIAL_LINKS.resume,
    icon: FileText,
  },
];

export function Contact() {
  return (
    <section id="contact" className="section relative overflow-hidden">
      <GridBackground />
      <OrbitRings />
      <div className="container-page relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeader
            eyebrow="09 / Contact"
            title="Let's build the infrastructure layer of intelligent systems."
            description="Available for software engineering roles across backend, distributed systems, and SRE — and open to advisory work and high-leverage engineering collaborations."
            align="center"
            className="mx-auto"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="mx-auto mt-12 max-w-4xl"
        >
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {CHANNELS.map((c) => {
              const Icon = c.icon;
              const isExternal = c.href.startsWith('http');
              return (
                <a
                  key={c.label}
                  href={c.href}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] p-5 transition-all hover:border-accent-blue/40 hover:bg-white/[0.05]"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-accent-blue/20 to-accent-purple/20">
                        <Icon size={16} className="text-accent-glow" />
                      </span>
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/50">
                          {c.label}
                        </p>
                        <p className="mt-1 font-display text-base text-white">{c.value}</p>
                      </div>
                    </div>
                    <ArrowUpRight
                      size={16}
                      className="text-white/40 transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent-blue"
                    />
                  </div>
                </a>
              );
            })}
          </div>

          <div className="mt-10 flex flex-col items-center gap-4 text-center">
            <p className="text-sm text-white/55">
              Prefer the direct path? Send a message — I read everything.
            </p>
            <LinkButton href={SOCIAL_LINKS.email} variant="primary" icon={<Mail size={14} />}>
              Start a Conversation
            </LinkButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
