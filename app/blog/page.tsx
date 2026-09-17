import type { Metadata } from "next";
import { getAllBlogPosts, getAllBlogTags, getAllSeries } from "@/lib/content";
import BlogClient from "@/components/BlogClient";

export const metadata: Metadata = {
  title: "Articles — Asif Mahmud",
  description:
    "Technical writing on AI, machine learning, computer vision, and software engineering by Asif Mahmud.",
};

export default function BlogPage() {
  const blogPosts = getAllBlogPosts();
  const allTags = getAllBlogTags();
  const allSeries = getAllSeries();

  return <BlogClient blogPosts={blogPosts} allTags={allTags} allSeries={allSeries} />;
}
