export interface TimelineItem {
  year: string;
  title: string;
  institution: string;
  description: string;
  details: string[];
  type: 'academic' | 'professional' | 'honor';
}

export interface ResearchInterest {
  id: string;
  title: string;
  description: string;
  icon: string;
  directions: string[];
  projects: string[];
  color: string;
}

export interface Publication {
  title: string;
  authors: string;
  journal: string;
  year: string;
  doi: string;
  abstract: string;
  citation: string;
  impactMetrics: {
    label: string;
    value: number;
    color: string;
  }[];
}

export interface Project {
  title: string;
  description: string;
  category: string;
  technologies: string[];
  githubUrl: string;
  keyContributions: string[];
  metrics?: string;
  extendedCaseStudy?: string;
  imageAccent: string; // Tailwind gradient class
}

export interface SkillNode {
  name: string;
  proficiency: number; // 0 to 100
}

export interface SkillCategory {
  title: string;
  skills: SkillNode[];
  icon: string;
  color: string;
}

export interface EducationItem {
  degree: string;
  program: string;
  institution: string;
  duration: string;
  grade?: string;
  courses: string[];
  logoText: string;
}
