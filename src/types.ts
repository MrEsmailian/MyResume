export interface TimelineEvent {
  year: string;
  title: string;
  organization: string;
  description: string;
  category: 'education' | 'experience' | 'achievement' | 'research';
  tags?: string[];
}

export interface ResearchInterest {
  id: string;
  title: string;
  directions: string[];
  projects: string[];
  description: string;
  iconName: string; // lucide icon name
}

export interface Publication {
  title: string;
  journal: string;
  year: string;
  authors: string[];
  doi: string;
  citation: string;
  abstract: string;
  impactMetrics: {
    label: string;
    value: string;
    description: string;
  }[];
}

export interface Project {
  id: string;
  title: string;
  technologies: string[];
  description: string;
  longDescription: string;
  githubUrl?: string;
  links?: { label: string; url: string }[];
  category: string;
  imagePlaceholderColor: string; // for high-tech svg or CSS graphics
  images?: string[]; // can support actual mock visual grids or carousel URLs
  keyFeatures: string[];
  researchImpact?: string;
}

export interface SkillNode {
  name: string;
  category: 'programming' | 'aiml' | 'data' | 'tools';
  proficiency: number; // 0 to 100 for connection density / pulse duration
}

export interface SkillLink {
  source: string;
  target: string;
  strength?: number;
}
