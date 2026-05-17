export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  stack: string[];
  features: string[];
  metrics: { label: string; value: string }[];
  architecture: string[];
  domain: string;
  status: 'production' | 'research' | 'experimental';
  githubUrl?: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  location?: string;
  highlights: string[];
  stack: string[];
}

export interface Skill {
  name: string;
  category: string;
  level: 'core' | 'advanced' | 'expert';
}

export interface NavItem {
  label: string;
  href: string;
}

export type ContentBlock =
  | { t: 'p'; v: string }
  | { t: 'h2'; v: string }
  | { t: 'h3'; v: string }
  | { t: 'code'; lang: string; v: string }
  | { t: 'ul'; v: string[] }
  | { t: 'note'; v: string };

export interface ResearchPost {
  slug: string;
  title: string;
  summary: string;
  category: string;
  readTime: string;
  publishedAt: string;
  topics: string[];
  content: ContentBlock[];
}
