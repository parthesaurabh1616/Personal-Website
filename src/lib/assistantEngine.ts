import { PROJECTS } from '@/constants/projects';
import { SKILLS } from '@/constants/skills';
import { EXPERIENCES } from '@/constants/experience';
import { IDENTITY_PILLARS } from '@/constants/identity';
import { SOCIAL_LINKS } from '@/constants/nav';
import type { Project } from '@/types';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

/* -------------------------------------------------------------------------- */
/*  Portfolio context — single source of truth handed to the LLM (and engine)  */
/* -------------------------------------------------------------------------- */

export function buildPortfolioContext(): string {
  const identity = IDENTITY_PILLARS.map(
    (p) => `- ${p.title} (${p.signal}; ${p.metric}): ${p.description}`,
  ).join('\n');

  const experience = EXPERIENCES.map((e) => {
    const hl = e.highlights.map((h) => `    • ${h}`).join('\n');
    return `- ${e.role} @ ${e.company} (${e.period})${
      e.location ? ` — ${e.location}` : ''
    }\n    Stack: ${e.stack.join(', ')}\n${hl}`;
  }).join('\n');

  const skillsByCat = SKILLS.reduce<Record<string, string[]>>((acc, s) => {
    (acc[s.category] ??= []).push(`${s.name} (${s.level})`);
    return acc;
  }, {});
  const skills = Object.entries(skillsByCat)
    .map(([cat, list]) => `- ${cat}: ${list.join(', ')}`)
    .join('\n');

  const projects = PROJECTS.map((p) => projectDossier(p)).join('\n\n');

  return `PORTFOLIO CONTEXT — Saurabh Parthe
Site: ${SOCIAL_LINKS.domain} · GitHub: ${SOCIAL_LINKS.github} · LinkedIn: ${SOCIAL_LINKS.linkedin} · Email: saurabh.parthe.1@gmail.com · Resume: /resume.pdf

ENGINEERING IDENTITY
${identity}

EXPERIENCE
${experience}

SKILLS
${skills}

PROJECTS (${PROJECTS.length})
${projects}`;
}

function projectDossier(p: Project): string {
  return `### ${p.title} [${p.domain} · ${p.status}]
Tagline: ${p.tagline}
Summary: ${p.description}
Detail: ${p.longDescription}
Stack: ${p.stack.join(', ')}
Key metrics: ${p.metrics.map((m) => `${m.label} ${m.value}`).join(' · ')}
Features:
${p.features.map((f) => `  - ${f}`).join('\n')}
Architecture / flow:
${p.architecture.map((a) => `  -> ${a}`).join('\n')}${p.githubUrl ? `\nRepo: ${p.githubUrl}` : ''}`;
}

/* -------------------------------------------------------------------------- */
/*  Local retrieval engine — grounded answers when no LLM key is configured    */
/* -------------------------------------------------------------------------- */

const STOP = new Set([
  'the', 'a', 'an', 'and', 'or', 'of', 'to', 'in', 'on', 'for', 'is', 'are', 'how', 'does',
  'do', 'what', 'why', 'me', 'about', 'with', 'this', 'that', 'it', 'his', 'your', 'you',
  'can', 'tell', 'show', 'explain', 'walk', 'through', 'give', 'i', 'work', 'works', 'use',
  'used', 'using', 'system', 'project', 'projects',
]);

function tokenize(s: string): string[] {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9+#./ ]/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOP.has(t));
}

function projectHaystack(p: Project): string {
  return [
    p.id,
    p.title,
    p.tagline,
    p.description,
    p.longDescription,
    p.domain,
    p.stack.join(' '),
    p.features.join(' '),
    p.architecture.join(' '),
  ]
    .join(' ')
    .toLowerCase();
}

function scoreProject(tokens: string[], p: Project): number {
  const hay = projectHaystack(p);
  let score = 0;
  for (const t of tokens) {
    if (hay.includes(t)) score += 1;
    if (p.title.toLowerCase().includes(t)) score += 2;
    if (p.stack.some((s) => s.toLowerCase() === t)) score += 1;
  }
  return score;
}

function rankProjects(query: string): { project: Project; score: number }[] {
  const tokens = tokenize(query);
  return PROJECTS.map((project) => ({ project, score: scoreProject(tokens, project) }))
    .sort((a, b) => b.score - a.score);
}

const RECRUITER_SIGNALS = [
  'recruiter', 'hire', 'hiring', 'role', 'fit', 'background', 'summary', 'resume', 'cv',
  'experience', 'availability', 'available', 'contact', 'reach', 'email', 'who is', 'who are',
  'about saurabh', 'candidate', 'looking for', 'overview', 'strength', 'strengths', 'salary',
];

const RECRUITER_MODE = (q: string) => {
  const l = q.toLowerCase();
  return RECRUITER_SIGNALS.some((s) => l.includes(s));
};

function projectDeepAnswer(p: Project, recruiter: boolean): string {
  if (recruiter) {
    return `**${p.title}** — ${p.tagline}\n\n${p.description}\n\nScale signals: ${p.metrics
      .map((m) => `${m.label} ${m.value}`)
      .join(' · ')}.\nStack: ${p.stack.join(', ')}.\n\nThis sits under ${p.domain}. ${
      p.githubUrl ? `Code: ${p.githubUrl}. ` : ''
    }See more in the Projects section (#projects).`;
  }
  const flow = p.architecture.map((a) => `- ${a}`).join('\n');
  const feats = p.features.slice(0, 4).map((f) => `- ${f}`).join('\n');
  return `**${p.title}** — ${p.tagline}\n\n${p.longDescription}\n\nRequest / data flow:\n${flow}\n\nWhat makes it hold up under load:\n${feats}\n\nNumbers it targets: ${p.metrics
    .map((m) => `${m.label} ${m.value}`)
    .join(' · ')}. Built with ${p.stack.join(', ')}.${
    p.githubUrl ? `\n\nSource: ${p.githubUrl}` : ''
  }`;
}

function recruiterSummary(): string {
  const top = EXPERIENCES[0];
  return `Here's the fast version of Saurabh Parthe.

He's a Distributed Systems & AI Infrastructure Engineer. Currently ${top.role} at ${top.company} (${top.period}) — ${top.location}. Core strengths: Go and Python backend at scale, Kafka/NATS event-driven pipelines, Kubernetes/cloud-native operations, and production AI infrastructure (edge inference, model serving).

Representative scale across his work: 1,000+ concurrent video/RTSP streams at sub-50ms latency, NATS cross-node WebSocket fanout, price-time-priority financial matching with a four-rule risk engine, and multi-agent LangGraph pipelines using Claude.

Six engineering projects are in the Projects section (#projects), full history in Experience (#experience), and the stack in #stack. Reach him at saurabh.parthe.1@gmail.com or via LinkedIn (${SOCIAL_LINKS.linkedin}); resume at /resume.pdf.`;
}

function experienceAnswer(): string {
  const lines = EXPERIENCES.map(
    (e) =>
      `**${e.role} · ${e.company}** (${e.period})${e.location ? ` — ${e.location}` : ''}\n${e.highlights
        .slice(0, 3)
        .map((h) => `- ${h}`)
        .join('\n')}\nStack: ${e.stack.join(', ')}`,
  ).join('\n\n');
  return `Saurabh's experience:\n\n${lines}\n\nFull detail lives in the Experience section (#experience).`;
}

function skillsAnswer(): string {
  const byCat = SKILLS.reduce<Record<string, string[]>>((acc, s) => {
    (acc[s.category] ??= []).push(s.name);
    return acc;
  }, {});
  const body = Object.entries(byCat)
    .map(([c, list]) => `- **${c}:** ${list.join(', ')}`)
    .join('\n');
  return `Saurabh's stack spans:\n\n${body}\n\nDepth is concentrated in distributed systems (Kafka, gRPC, NATS), cloud-native (Kubernetes, Docker), and AI infrastructure. See #stack.`;
}

function contactAnswer(): string {
  return `You can reach Saurabh directly:\n\n- Email: saurabh.parthe.1@gmail.com\n- LinkedIn: ${SOCIAL_LINKS.linkedin}\n- GitHub: ${SOCIAL_LINKS.github}\n- Resume: /resume.pdf\n\nThe Contact section (#contact) has these too.`;
}

function projectsListAnswer(): string {
  const list = PROJECTS.map(
    (p) => `- **${p.title}** — ${p.tagline} _(${p.domain})_`,
  ).join('\n');
  return `Saurabh has six engineering projects:\n\n${list}\n\nAsk me to go deep on any one — architecture, tradeoffs, and how it behaves under load. Or open the Projects section (#projects).`;
}

function identityAnswer(): string {
  return `Saurabh Parthe is a Distributed Systems & AI Infrastructure Engineer. He builds scalable, intelligent systems in Go, Python, and Java — Kafka-first event pipelines, Kubernetes-native services, and production AI/ML infrastructure.

His engineering identity rests on: ${IDENTITY_PILLARS.map((p) => p.title).join(', ')}. The throughline is systems that stay consistent, observable, and reliable as they scale across nodes and failure domains.

Explore Projects (#projects), Experience (#experience), or the About section (#about).`;
}

const GREETING_RE = /^(hi|hey|hello|yo|sup|good (morning|evening|afternoon)|greetings)\b/i;

/**
 * Deterministic, fully grounded answer used when no LLM API key is set.
 * Never invents data — composes from the portfolio constants only.
 */
export function localAnswer(messages: ChatMessage[]): string {
  const last = [...messages].reverse().find((m) => m.role === 'user');
  const q = (last?.content ?? '').trim();
  if (!q) return identityAnswer();

  const l = q.toLowerCase();
  const recruiter = RECRUITER_MODE(q);

  if (GREETING_RE.test(q) && q.length < 24) {
    return `Hey — I'm Atlas, Saurabh's engineering assistant. I can go deep on any of his six distributed-systems / AI-infra projects, or give a quick recruiter-friendly summary. What are you after?`;
  }

  if (/(recruiter summary|quick summary|tldr|tl;dr|fast version|elevator|in short|who (is|are) (he|saurabh|you))/.test(l)) {
    return recruiterSummary();
  }
  if (/(contact|reach|email|hire|get in touch|connect)/.test(l)) {
    return recruiter || /contact|reach|email|get in touch|connect/.test(l)
      ? contactAnswer()
      : recruiterSummary();
  }
  if (/(experience|worked|employer|career|history|companies|background)/.test(l)) {
    return experienceAnswer();
  }
  if (/(skill|stack|technolog|languages?|tools|tech)\b/.test(l) && rankProjects(q)[0].score < 3) {
    return skillsAnswer();
  }
  if (/(list|all|which|what) .*(projects?)|projects?\b.*(have|built|list|all)|portfolio/.test(l)) {
    return projectsListAnswer();
  }
  if (/(who (is|are)|about|introduce|tell me about) /.test(l) && /(saurabh|you|he|him)/.test(l)) {
    return identityAnswer();
  }

  // Project-targeted retrieval.
  const ranked = rankProjects(q);
  if (ranked[0].score >= 2) {
    const primary = ranked[0].project;
    let answer = projectDeepAnswer(primary, recruiter);
    const related = ranked[1];
    if (related && related.score >= 2 && related.project.id !== primary.id) {
      answer += `\n\nRelated: **${related.project.title}** also touches this space (${related.project.domain}). Ask if you want that breakdown.`;
    }
    return answer;
  }

  if (recruiter) return recruiterSummary();

  // Fallback: grounded overview, no invention.
  return `I keep my answers grounded in what's actually on Saurabh's portfolio, and I don't have a specific match for that. Here's what I can go deep on:

${PROJECTS.map((p) => `- **${p.title}** — ${p.tagline}`).join('\n')}

I can also cover his experience (#experience), stack (#stack), or give a recruiter summary. What would help?`;
}
