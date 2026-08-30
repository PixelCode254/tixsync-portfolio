import Link from "next/link";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  coverImage: string | null;
  createdAt: string;
}

async function getPosts(): Promise<BlogPost[]> {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL || "https://tixsync.com"}/api/blog`, {
      cache: "no-store",
    });
    const data = await res.json();
    return data.posts || [];
  } catch {
    return [];
  }
}

export const metadata = {
  title: "Blog",
  description: "Articles on web development, cybersecurity, and technology by Cornelius Maina.",
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="section-container py-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2">Blog</h1>
        <p className="text-obsidian-400 mb-10">
          Thoughts on development, security, and building things.
        </p>

        {posts.length === 0 ? (
          <div className="card-glow p-12 text-center">
            <p className="text-obsidian-500">No posts yet. Check back soon.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="card-glow block p-6 transition-all hover:border-white/10"
              >
                <h2 className="text-lg font-semibold text-white mb-1">
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p className="text-sm text-obsidian-400 mb-3 line-clamp-2">
                    {post.excerpt}
                  </p>
                )}
                <time className="text-xs text-obsidian-600">
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
