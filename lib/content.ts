import fs from "fs";
import path from "path";
import matter from "gray-matter";

import type { BlogPost, BlogSeries, Project } from "./types";
export type { BlogPost, BlogSeries, Project };

// ─── Directory Paths ─────────────────────────────────────────────────────────

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

// ─── Blog Helpers ────────────────────────────────────────────────────────────

export function getAllBlogPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((filename): BlogPost => {
    const filePath = path.join(BLOG_DIR, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);

    const slug = filename.replace(/\.mdx$/, "");

    return {
      slug,
      title: (data.title ?? "") as string,
      date: (data.date ?? "") as string,
      readingTime: (data.readingTime ?? "") as string,
      tags: (Array.isArray(data.tags) ? data.tags : []) as string[],
      coverImage: (data.coverImage ?? "") as string,
      excerpt: (data.excerpt ?? "") as string,
      content: content.trim(),
      series: data.series ? String(data.series) : undefined,
      seriesOrder: typeof data.seriesOrder === "number" ? data.seriesOrder : undefined,
    };
  });

  // Sort by date descending (newest first)
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return getAllBlogPosts().find((p) => p.slug === slug);
}

export function getRecentBlogs(count: number = 4): BlogPost[] {
  return getAllBlogPosts().slice(0, count);
}

// ─── Series Helpers ──────────────────────────────────────────────────────────

export function getAllSeries(): BlogSeries[] {
  const posts = getAllBlogPosts().filter((p) => p.series);

  // Group posts by series name
  const seriesMap = new Map<string, BlogPost[]>();
  for (const post of posts) {
    const name = post.series!;
    if (!seriesMap.has(name)) {
      seriesMap.set(name, []);
    }
    seriesMap.get(name)!.push(post);
  }

  // Build series objects
  const seriesList: BlogSeries[] = [];
  for (const [name, seriesPosts] of seriesMap) {
    // Sort by seriesOrder, then by date
    seriesPosts.sort((a, b) => {
      if (a.seriesOrder !== undefined && b.seriesOrder !== undefined) {
        return a.seriesOrder - b.seriesOrder;
      }
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const tags = Array.from(new Set(seriesPosts.flatMap((p) => p.tags)));

    seriesList.push({ name, slug, posts: seriesPosts, tags });
  }

  return seriesList;
}

export function getSeriesBySlug(seriesSlug: string): BlogSeries | undefined {
  return getAllSeries().find((s) => s.slug === seriesSlug);
}

export function getSeriesForPost(
  post: BlogPost
): { series: BlogSeries; currentIndex: number } | undefined {
  if (!post.series) return undefined;

  const allSeries = getAllSeries();
  const series = allSeries.find((s) => s.name === post.series);
  if (!series) return undefined;

  const currentIndex = series.posts.findIndex((p) => p.slug === post.slug);
  return { series, currentIndex };
}

// ─── Project Helpers ─────────────────────────────────────────────────────────

export function getAllProjects(): Project[] {
  if (!fs.existsSync(PROJECTS_DIR)) return [];

  const files = fs
    .readdirSync(PROJECTS_DIR)
    .filter((f) => f.endsWith(".mdx"));

  return files.map((filename): Project => {
    const filePath = path.join(PROJECTS_DIR, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent);

    const slug = data.slug ? String(data.slug) : filename.replace(/\.mdx$/, "");

    return {
      slug,
      title: (data.title ?? "") as string,
      description: (data.description ?? "") as string,
      overview: (data.overview ?? "") as string,
      problemStatement: (data.problemStatement ?? "") as string,
      architecture: (Array.isArray(data.architecture) ? data.architecture : []) as string[],
      challenges: (Array.isArray(data.challenges) ? data.challenges : []) as string[],
      solutions: (Array.isArray(data.solutions) ? data.solutions : []) as string[],
      lessonsLearned: (Array.isArray(data.lessonsLearned) ? data.lessonsLearned : []) as string[],
      featured: Boolean(data.featured),
      screenshots: (Array.isArray(data.screenshots) ? data.screenshots : []) as string[],
      githubUrl: (data.githubUrl ?? "") as string,
      liveUrl: (data.liveUrl ?? "") as string,
      techStack: (Array.isArray(data.techStack) ? data.techStack : []) as string[],
      tags: (Array.isArray(data.tags) ? data.tags : []) as string[],
      coverImage: (data.coverImage ?? "") as string,
    };
  });
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getAllProjects().find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((p) => p.featured);
}

export function getAllProjectTags(): string[] {
  return [
    "All",
    ...Array.from(new Set(getAllProjects().flatMap((p) => p.tags))),
  ];
}

export function getAllBlogTags(): string[] {
  return [
    "All",
    ...Array.from(new Set(getAllBlogPosts().flatMap((p) => p.tags))),
  ];
}
