"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, ArrowRight, BookOpen } from "lucide-react";

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  coverImage: string | null;
  createdAt: string;
};

const fallbackPosts: BlogPost[] = [
  {
    id: "1",
    title: "Securing Your Next.js Application: A Complete Guide",
    slug: "securing-nextjs-app",
    excerpt:
      "Best practices for authentication, authorization, and API security in Next.js applications.",
    coverImage: null,
    createdAt: "2026-08-15",
  },
  {
    id: "2",
    title: "Why Every Business Needs a Cybersecurity Audit",
    slug: "cybersecurity-audit-guide",
    excerpt:
      "Understanding the importance of regular security assessments for small and medium businesses.",
    coverImage: null,
    createdAt: "2026-08-10",
  },
  {
    id: "3",
    title: "The Art of Architectural Photography in Nairobi",
    slug: "nairobi-architectural-photography",
    excerpt:
      "Tips and techniques for capturing Nairobi's stunning urban landscape through your lens.",
    coverImage: null,
    createdAt: "2026-08-05",
  },
];

export function Blog() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [posts, setPosts] = useState<BlogPost[]>(fallbackPosts);

  useEffect(() => {
    fetch("/api/blog")
      .then((r) => r.json())
      .then((data) => {
        if (data.posts && data.posts.length > 0) setPosts(data.posts);
      })
      .catch(() => {});
  }, []);

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  return (
    <section className="section-padding relative">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-2xl"
        >
          <span className="mb-4 block text-xs font-medium uppercase tracking-[0.3em] text-cyber-500">
            Blog
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6">
            <span className="text-gradient">Latest</span>{" "}
            <span className="text-gradient">Articles</span>
          </h2>
          <p className="text-lg text-obsidian-400 leading-relaxed">
            Insights on development, security, and creative technology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {posts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card-glow group hover:border-white/10 transition-all"
            >
              <div className="h-48 rounded-t-xl bg-gradient-to-br from-cyber-600/10 to-cyber-800/5 flex items-center justify-center">
                <BookOpen className="h-10 w-10 text-obsidian-700" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-1.5 mb-3">
                  <Calendar className="h-3 w-3 text-obsidian-600" />
                  <span className="text-[11px] text-obsidian-600">
                    {formatDate(post.createdAt)}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-white mb-2 group-hover:text-cyber-300 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="text-sm text-obsidian-400 leading-relaxed line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>
                )}
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 text-sm text-cyber-400 hover:text-cyber-300 transition-colors group/link"
                >
                  Read more
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
