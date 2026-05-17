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

export interface ResearchPost {
  title: string;
  summary: string;
  category: string;
  readTime: string;
  topics: string[];
}
