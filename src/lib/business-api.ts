// ─── TIXSYNC Business API Client ────────────────────────────────
// Secure cross-origin fetch wrapper for calling the TIXSYNC SOLUTIONS
// backend from the personal portfolio site.
//
// Usage:
//   import { businessApi } from "@/lib/business-api";
//   const { services } = await businessApi.get("/services");
//   const { projects } = await businessApi.get("/projects?featured=true");

const BUSINESS_API_URL = process.env.NEXT_PUBLIC_BUSINESS_API_URL || "https://tixsync-business-pixelcode254.vercel.app";
const BUSINESS_API_KEY = process.env.NEXT_PUBLIC_BUSINESS_API_KEY || "";

// ─── Types ─────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  status: number;
}

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

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  coverImage: string | null;
  createdAt: string;
}

// ─── Core fetch wrapper ────────────────────────────────────────

async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${BUSINESS_API_URL}/api${path}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> || {}),
  };

  // Attach API key for server-to-server calls
  if (BUSINESS_API_KEY) {
    headers["X-API-Key"] = BUSINESS_API_KEY;
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000); // 10s timeout

    const response = await fetch(url, {
      ...options,
      headers,
      signal: controller.signal,
      // Never send cookies cross-origin
      credentials: "omit",
      // Ensure browser sends proper CORS preflight
      mode: "cors",
    });

    clearTimeout(timeout);

    // Handle non-JSON responses (e.g., 204 No Content)
    const contentType = response.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      if (response.ok) {
        return { data: null, error: null, status: response.status };
      }
      return { data: null, error: `HTTP ${response.status}`, status: response.status };
    }

    const data = await response.json();

    if (!response.ok) {
      return {
        data: null,
        error: data.error || data.message || `HTTP ${response.status}`,
        status: response.status,
      };
    }

    return { data: data as T, error: null, status: response.status };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error(`[BusinessAPI] ${path}:`, message);
    return { data: null, error: message, status: 0 };
  }
}

// ─── Typed API methods ─────────────────────────────────────────

export const businessApi = {
  /**
   * GET request to the business API
   */
  async get<T>(path: string): Promise<ApiResponse<T>> {
    return apiFetch<T>(path, { method: "GET" });
  },

  /**
   * POST request to the business API (requires auth or API key)
   */
  async post<T>(path: string, body: unknown): Promise<ApiResponse<T>> {
    return apiFetch<T>(path, {
      method: "POST",
      body: JSON.stringify(body),
    });
  },

  // ─── Convenience methods ────────────────────────────────────

  async getServices() {
    return this.get<{ services: Service[] }>("/services");
  },

  async getProjects(featured?: boolean) {
    const params = featured ? "?featured=true" : "";
    return this.get<{ projects: Project[] }>(`/projects${params}`);
  },

  async getTeam() {
    return this.get<{ members: TeamMember[] }>("/team");
  },

  async getBlogPosts() {
    return this.get<{ posts: BlogPost[] }>("/blog");
  },

  async submitContact(data: {
    name: string;
    email: string;
    message: string;
    subject?: string;
    phone?: string;
    company?: string;
    service?: string;
    budget?: string;
  }) {
    return this.post<{ success: boolean; id: string }>("/contact", data);
  },
};

export default businessApi;
