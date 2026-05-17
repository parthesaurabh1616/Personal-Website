import type { ContentBlock } from '@/types';

export const SRE_PRACTICE: ContentBlock[] = [
  {
    t: 'p',
    v: "An SLO is a contract between your team and your users about the quality of service they can expect. Not a target to optimize for in isolation — a commitment you are willing to be held to. The discipline of SRE is built on making that commitment explicit, measurable, and actionable, then using the remaining margin (the error budget) to make deliberate decisions about risk.",
  },
  {
    t: 'h2',
    v: 'Defining Meaningful SLOs',
  },
  {
    t: 'p',
    v: "Start from user experience, not system metrics. CPU utilization at 70% tells you nothing about whether users are getting value from your service. A latency SLO defined at the 99th percentile tells you that 99% of users are getting responses within a time that feels acceptable. The difference is the thing you are actually trying to protect.",
  },
  {
    t: 'p',
    v: 'The three most common SLO dimensions:',
  },
  {
    t: 'ul',
    v: [
      'Availability: the fraction of valid requests that succeed. "99.9% of HTTP requests to /api/orders return a 2xx or 4xx within 30 seconds." 5xx and timeouts are failures.',
      'Latency: the fraction of requests below a threshold. "95% of successful /api/orders responses return within 200ms; 99% within 800ms."',
      'Correctness: the fraction of operations that produce the right result. Harder to measure, usually requires synthetic probing or end-to-end tests you run continuously.',
    ],
  },
  {
    t: 'note',
    v: '4xx responses are not SLO failures — they represent the client making an invalid request, not your service failing. Including them in your failure count makes your SLO fluctuate with attacker traffic and bot floods rather than real user experience degradation.',
  },
  {
    t: 'h2',
    v: 'Error Budgets',
  },
  {
    t: 'p',
    v: "An error budget is the acceptable amount of unreliability derived directly from your SLO. A 99.9% availability target over a 30-day window gives you 43.8 minutes of allowed downtime. That is your budget. Spend it intentionally — on risky deploys, load tests, chaos experiments. The insight that makes error budgets powerful: once the budget is exhausted, engineering incentives shift automatically. You stop shipping features and start fixing reliability, without a negotiation.",
  },
  {
    t: 'code',
    lang: 'text',
    v: `Error budget = (1 - SLO) × window duration

99.9% SLO over 30 days:
  budget = 0.001 × 30 × 24 × 60 = 43.2 minutes

Burn rate = error rate / (1 - SLO)
  If SLO is 99.9% and current error rate is 1%:
  burn rate = 0.01 / 0.001 = 10×
  At 10×, the monthly budget is consumed in 3 days.`,
  },
  {
    t: 'p',
    v: 'Burn-rate-based alerting fires when the budget is being consumed faster than sustainable, giving you time to act before the SLO window closes:',
  },
  {
    t: 'ul',
    v: [
      'Page immediately: 14.4× burn rate over 1h (2% budget consumed)',
      'Page: 6× burn rate over 6h (5% budget consumed)',
      'Ticket: 3× burn rate over 72h (10% budget consumed)',
      'No action: below 1× — budget will survive the window',
    ],
  },
  {
    t: 'h2',
    v: 'Alert Design: Symptoms, Not Causes',
  },
  {
    t: 'p',
    v: "The most common SRE mistake is alerting on causes (CPU high, disk filling, memory elevated) instead of symptoms (users are getting errors, users are getting slow responses). Cause-based alerts produce alert fatigue — you page an engineer for a disk that is 70% full on a service with a 400-day runway. Symptom-based alerts wake you when users are actually experiencing a problem.",
  },
  {
    t: 'ul',
    v: [
      'Alert on: error rate above threshold, latency p99 above SLO, burn rate above threshold',
      'Do NOT alert on: CPU > 70%, memory > 80%, disk > 60% (make these dashboards, not pages)',
      'Alert on: the SLO window closing faster than planned',
      'Do NOT alert on: individual host metrics unless they directly correlate with user-facing symptoms',
    ],
  },
  {
    t: 'h2',
    v: 'Runbook Structure',
  },
  {
    t: 'p',
    v: "A runbook is a script for a 3 AM engineer who has never seen this service. Write it for that person. Not the person who wrote the service — the new hire, half-asleep, who needs to stop the bleeding in under 10 minutes without breaking anything else.",
  },
  {
    t: 'p',
    v: 'Every runbook should contain exactly these sections — no more, no less:',
  },
  {
    t: 'ul',
    v: [
      '1. What is firing and what does it mean to users right now',
      '2. Immediate mitigation steps (rollback, circuit-break, scale up) — copy-pasteable commands',
      '3. How to verify the mitigation worked — what metrics to watch',
      '4. Escalation path: who to call if mitigation fails and after how long',
      '5. Investigation steps: where to look for root cause after the fire is out',
      '6. Links: dashboard, alert query, service owner Slack channel, related incidents',
    ],
  },
  {
    t: 'note',
    v: 'Runbooks rot faster than code. Add a "Last verified" date to every runbook. If an incident reveals that a runbook step is wrong or missing, update it before the postmortem is closed — not in a separate ticket that will sit for months.',
  },
  {
    t: 'h2',
    v: 'Incident Response Lifecycle',
  },
  {
    t: 'p',
    v: 'The OODA loop (Observe, Orient, Decide, Act) maps well onto incident response. In practice, the failure mode is skipping Observe and Orient and jumping straight to Act — deploying a guess rather than a diagnosis.',
  },
  {
    t: 'ul',
    v: [
      'Detect: alert fires or user reports. Acknowledge within your SLO-defined response time.',
      'Declare: if more than one engineer is needed or customer impact is significant, declare formally. Assign an Incident Commander (IC) and a Communications Lead.',
      'Triage: IC gathers signal — what is broken, what is not, what is the blast radius.',
      'Mitigate: restore service first (rollback, failover, traffic shift) before diagnosing root cause. Stop the bleeding.',
      'Communicate: external status page updated every 30 minutes regardless of whether there is news. Silence is worse than "we are still investigating."',
      'Resolve: confirm metrics are recovering. Lift any traffic blocks. Close the incident.',
      'Review: postmortem within 48 hours while the memory is fresh.',
    ],
  },
  {
    t: 'h2',
    v: 'Blameless Postmortems',
  },
  {
    t: 'p',
    v: 'A postmortem that identifies a person as the root cause has failed. Systems fail because of conditions that made failure possible — not because one engineer made one bad decision. The engineer is always the last defense in a chain of deficient systems, missing safeguards, and insufficient tooling. The goal of a postmortem is to find and fix those upstream conditions.',
  },
  {
    t: 'p',
    v: 'A well-structured postmortem covers:',
  },
  {
    t: 'ul',
    v: [
      'Impact summary: who was affected, for how long, what they experienced',
      'Timeline: every significant event in UTC with a link to the evidence (log line, dashboard screenshot)',
      'Root cause: the technical condition that made the incident possible — not the trigger, the pre-condition',
      'Contributing factors: what made detection, diagnosis, or mitigation harder than it should have been',
      'Action items: each with an owner, a due date, and a priority — no open-ended "investigate X"',
      'What went well: acknowledge the things that worked; they need to be preserved, not just the failures fixed',
    ],
  },
  {
    t: 'h2',
    v: 'The SRE Mindset Shift',
  },
  {
    t: 'p',
    v: "The fundamental shift SRE brings is treating reliability as a software problem, not an operations problem. Toil — manual, repetitive, automatable work that scales with service growth — should consume no more than 50% of an SRE's time. The other 50% is engineering: building the automation, tooling, and process that eliminate tomorrow's toil. If you are spending most of your time responding to pages rather than preventing them, the system is not working.",
  },
];
