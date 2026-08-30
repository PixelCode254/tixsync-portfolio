// ─── Client-Safe Business API Helper ────────────────────────────
// This module is safe to import in "use client" components.
// It calls the portfolio's own /api/venture/ proxy route, which
// forwards requests to the business API with the API key attached
// server-side (never exposed to the browser).
//
// Usage in client components:
//   import { ventureApi } from "@/lib/venture-client";
//   const { services } = await ventureApi.getServices();

// ─── Types ─────────────────────────────────────────────────────

export interface Service {
  id: string;
  title: string;
  slug: string;
  icon: string | null;
  description: string;
  features: string[];
  price: string | null;
  order: number;
  published: boolean;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  techStack: string[];
  imageUrl: string | null;
  liveUrl: string | null;
  githubUrl: string | null;
  featured: boolean;
  published: boolean;
  order: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string | null;
  email: string | null;
  linkedin: string | null;
  imageUrl: string | null;
  order: number;
}

interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  status: number;
}

// ─── Core fetch via local proxy ────────────────────────────────

async function proxyFetch<T>(path: string): Promise<ApiResponse<T>> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(`/api/venture/${path}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      // Use no-store to prevent stale proxy cache
      cache: "no-store",
    });

    clearTimeout(timeout);

    if (!response.ok) {
      const err = await response.json().catch(() => ({ error: `HTTP ${response.status}` }));
      return { data: null, error: err.error || `HTTP ${response.status}`, status: response.status };
    }

    const data = await response.json();
    return { data: data as T, error: null, status: response.status };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Network error";
    console.error(`[VentureClient] ${path}:`, message);
    return { data: null, error: message, status: 0 };
  }
}

// ─── Typed API methods ─────────────────────────────────────────

export const ventureApi = {
  async getServices() {
    return proxyFetch<{ services: Service[] }>("services");
  },

  async getProjects(featured?: boolean) {
    const query = featured ? "?featured=true" : "";
    return proxyFetch<{ projects: Project[] }>(`projects${query}`);
  },

  async getTeam() {
    return proxyFetch<{ members: TeamMember[] }>("team");
  },

  async getBlogPosts() {
    return proxyFetch<{ posts: Array<{ id: string; title: string; slug: string; excerpt: string | null; coverImage: string | null; createdAt: string }> }>("blog");
  },
};

export default ventureApi;
