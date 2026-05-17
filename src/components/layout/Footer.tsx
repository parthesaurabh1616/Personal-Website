'use client';

import { Github, Linkedin, Mail, FileText, ExternalLink } from 'lucide-react';
import { SOCIAL_LINKS } from '@/constants/nav';

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-black/60 py-12">
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-3">
              <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-md border border-white/15 bg-gradient-to-br from-accent-blue/30 to-accent-purple/30">
                <span className="font-display text-sm font-bold tracking-tight text-white">SP</span>
              </span>
              <div>
                <p className="font-display text-base text-white">Saurabh Parthe</p>
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/50">
                  Distributed Systems · AI Infrastructure
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-md text-sm text-white/50">
              Building scalable intelligent systems with Golang, Python, Kubernetes, and Kafka.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <FooterLink href={SOCIAL_LINKS.github} icon={<Github size={14} />}>
              GitHub
            </FooterLink>
            <FooterLink href={SOCIAL_LINKS.linkedin} icon={<Linkedin size={14} />}>
              LinkedIn
            </FooterLink>
            <FooterLink href={SOCIAL_LINKS.email} icon={<Mail size={14} />}>
              Email
            </FooterLink>
            <FooterLink href={SOCIAL_LINKS.resume} icon={<FileText size={14} />}>
              Resume
            </FooterLink>
            <FooterLink href={SOCIAL_LINKS.domain} icon={<ExternalLink size={14} />}>
              saurabhparthe.in
            </FooterLink>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-white/5 pt-6 text-xs text-white/40 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Saurabh Parthe. All rights reserved.</p>
          <p className="font-mono uppercase tracking-[0.22em]">
            Engineered with Next.js · TypeScript · Three.js
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  icon,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  const isExternal = href.startsWith('http');
  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-white/70 transition-all hover:border-accent-blue/40 hover:bg-white/[0.06] hover:text-white"
    >
      {icon}
      {children}
    </a>
  );
}
