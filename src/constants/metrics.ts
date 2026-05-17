export interface Metric {
  label: string;
  value: string;
  suffix?: string;
  description: string;
}

export const METRICS: Metric[] = [
  {
    label: 'Concurrent Streams',
    value: '1000',
    suffix: '+',
    description: 'Live camera feeds processed in real time.',
  },
  {
    label: 'End-to-End Latency',
    value: '50',
    suffix: 'ms',
    description: 'Sub-50ms inference pipelines under load.',
  },
  {
    label: 'Uptime',
    value: '99.99',
    suffix: '%',
    description: 'Across distributed production systems.',
  },
  {
    label: 'LeetCode Problems',
    value: '600',
    suffix: '+',
    description: 'Solved across DS, graphs, DP, and concurrency.',
  },
  {
    label: 'Events Processed Daily',
    value: '20',
    suffix: 'M+',
    description: 'Across event-driven backend platforms.',
  },
  {
    label: 'Microservices Owned',
    value: '30',
    suffix: '+',
    description: 'Across Golang, Java, and Python stacks.',
  },
];
