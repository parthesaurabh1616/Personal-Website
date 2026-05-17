import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft, BookOpen, Clock, Calendar } from 'lucide-react';
import { RESEARCH_POSTS } from '@/constants/research';
import type { ContentBlock } from '@/types';

export async function generateStaticParams() {
  return RESEARCH_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = RESEARCH_POSTS.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
  };
}

function Block({ block }: { block: ContentBlock }) {
  switch (block.t) {
    case 'h2':
      return (
        <h2 className="mt-12 mb-4 font-display text-2xl font-semibold text-white first:mt-0">
          {block.v}
        </h2>
      );
    case 'h3':
      return (
        <h3 className="mt-8 mb-3 font-display text-lg font-semibold text-white/90">
          {block.v}
        </h3>
      );
    case 'p':
      return (
        <p className="mb-5 text-[15px] leading-[1.85] text-white/70">
          {block.v}
        </p>
      );
    case 'ul':
      return (
        <ul className="mb-5 space-y-2.5">
          {block.v.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-[15px] leading-relaxed text-white/70">
              <span className="mt-[9px] inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent-blue" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case 'code':
      return (
        <div className="mb-6 overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
          {block.lang && block.lang !== 'text' && (
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                {block.lang}
              </span>
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
              </div>
            </div>
          )}
          <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-[1.7] text-white/80">
            <code>{block.v}</code>
          </pre>
        </div>
      );
    case 'note':
      return (
        <div className="mb-6 flex gap-4 rounded-xl border border-accent-blue/20 bg-accent-blue/[0.06] px-5 py-4">
          <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-accent-blue/40 text-accent-blue">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
              <path d="M5 0a5 5 0 100 10A5 5 0 005 0zm.5 7.5h-1v-3h1v3zm0-4h-1v-1h1v1z" />
            </svg>
          </span>
          <p className="text-[14px] leading-relaxed text-white/65">{block.v}</p>
        </div>
      );
    default:
      return null;
  }
}

export default async function NotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = RESEARCH_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-background">
      {/* Top nav */}
      <div className="sticky top-0 z-50 border-b border-white/[0.06] bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <Link
            href="/#research"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/50 transition-colors hover:text-white"
          >
            <ArrowLeft size={14} />
            Back
          </Link>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/30">
            saurabhparthe.in
          </span>
        </div>
      </div>

      {/* Article */}
      <article className="mx-auto max-w-3xl px-6 pb-24 pt-14">
        {/* Category + meta */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-accent-purple/30 bg-accent-purple/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-accent-purple">
            {post.category}
          </span>
          <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
            <Clock size={11} />
            {post.readTime}
          </span>
          <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
            <Calendar size={11} />
            {post.publishedAt}
          </span>
        </div>

        {/* Title */}
        <h1 className="mb-6 font-display text-4xl font-semibold leading-tight text-white md:text-5xl">
          {post.title}
        </h1>

        {/* Summary lead */}
        <p className="mb-10 border-b border-white/10 pb-10 text-[16px] leading-relaxed text-white/55">
          {post.summary}
        </p>

        {/* Topics */}
        <div className="mb-10 flex flex-wrap gap-2">
          {post.topics.map((t) => (
            <span
              key={t}
              className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[11px] text-white/55"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Article body */}
        <div>
          {post.content.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </div>

        {/* Footer nav */}
        <div className="mt-16 border-t border-white/10 pt-10">
          <Link
            href="/#research"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/55 transition-all hover:border-accent-blue/30 hover:bg-accent-blue/[0.05] hover:text-white"
          >
            <ArrowLeft size={14} />
            All Notes
          </Link>
        </div>
      </article>

      {/* Bottom gradient fade */}
      <div className="fixed bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </div>
  );
}
