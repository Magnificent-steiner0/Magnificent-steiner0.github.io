// ─── Content Types ─────────────────────────────────────────────────────────────

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  readingTime: string;
  tags: string[];
  coverImage: string;
  excerpt: string;
  content: string;
  // Series fields (optional)
  series?: string;
  seriesOrder?: number;
}

export interface BlogSeries {
  name: string;
  slug: string;
  posts: BlogPost[];
  tags: string[];
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  overview: string;
  problemStatement: string;
  architecture: string[];
  challenges: string[];
  solutions: string[];
  lessonsLearned: string[];
  featured: boolean;
  screenshots: string[];
  githubUrl: string;
  liveUrl: string;
  techStack: string[];
  tags: string[];
  coverImage: string;
}
