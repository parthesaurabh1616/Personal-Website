'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS, SOCIAL_LINKS } from '@/constants/nav';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed left-0 right-0 top-0 z-50 transition-all duration-500',
        scrolled ? 'py-3' : 'py-5',
      )}
    >
      <div className="container-page">
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            'flex items-center justify-between rounded-full border border-white/10 px-4 py-2.5 backdrop-blur-xl transition-all duration-500',
            scrolled ? 'bg-black/60 shadow-glow' : 'bg-white/[0.025]',
          )}
        >
          <a href="#top" className="group flex items-center gap-3 px-2">
            <span className="relative inline-flex h-7 w-7 items-center justify-center rounded-md border border-white/15 bg-gradient-to-br from-accent-blue/30 to-accent-purple/30">
              <span className="font-display text-sm font-bold tracking-tight text-white">SP</span>
            </span>
            <span className="hidden font-mono text-[11px] uppercase tracking-[0.24em] text-white/70 group-hover:text-white sm:inline">
              Saurabh Parthe
            </span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-full px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-white/60 transition-colors hover:bg-white/[0.05] hover:text-white"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={SOCIAL_LINKS.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-full bg-gradient-to-r from-accent-blue to-accent-purple px-4 py-2 font-mono text-[11px] uppercase tracking-[0.22em] text-white shadow-glow transition-all hover:brightness-110 sm:inline-flex"
            >
              Resume
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/80 transition-colors hover:bg-white/[0.05] lg:hidden"
              aria-label="Toggle menu"
            >
              {open ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </motion.nav>

        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 overflow-hidden rounded-3xl border border-white/10 bg-black/80 p-4 backdrop-blur-2xl lg:hidden"
          >
            <ul className="grid grid-cols-2 gap-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-white/80 transition-colors hover:bg-white/[0.06]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </header>
  );
}
