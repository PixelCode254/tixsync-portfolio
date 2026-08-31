"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  FolderOpen,
  X,
  Save,
  Loader2,
  ExternalLink,
  Github,
} from "lucide-react";

type Project = {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  category: string;
  techStack: string[];
  imageUrl: string | null;
  liveUrl: string | null;
  githubUrl: string | null;
  featured: boolean;
  published: boolean;
  order: number;
};

const categories = [
  "WEB_DEVELOPMENT",
  "CYBERSECURITY",
  "FULL_STACK",
  "SECURITY_OPERATION",
  "DEVOPS",
];

const categoryLabels: Record<string, string> = {
  WEB_DEVELOPMENT: "Web Dev",
  CYBERSECURITY: "Security",
  FULL_STACK: "Full Stack",
  SECURITY_OPERATION: "SOC/Operations",
  DEVOPS: "DevOps",
};

const emptyProject = {
  title: "",
  slug: "",
  description: "",
  content: "",
  category: "FULL_STACK",
  techStack: [] as string[],
  imageUrl: "",
  liveUrl: "",
  githubUrl: "",
  featured: false,
  published: false,
  order: 0,
};

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState(emptyProject);
  const [techInput, setTechInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fetchProjects = () => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then((data) => {
        setProjects(data.projects || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyProject);
    setTechInput("");
    setError("");
    setShowForm(true);
  };

  const openEdit = (p: Project) => {
    setEditing(p);
    setForm({
      title: p.title,
      slug: p.slug,
      description: p.description,
      content: p.content || "",
      category: p.category,
      techStack: [...p.techStack],
      imageUrl: p.imageUrl || "",
      liveUrl: p.liveUrl || "",
      githubUrl: p.githubUrl || "",
      featured: p.featured,
      published: p.published,
      order: p.order,
    });
    setTechInput("");
    setError("");
    setShowForm(true);
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    try {
      const payload = {
        ...(editing ? { id: editing.id } : {}),
        ...form,
        techStack: form.techStack,
      };

      const res = await fetch("/api/projects", {
        method: editing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");

      setShowForm(false);
      fetchProjects();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    try {
      await fetch(`/api/projects?id=${id}`, { method: "DELETE" });
      fetchProjects();
    } catch {}
  };

  const addTech = () => {
    if (techInput.trim() && !form.techStack.includes(techInput.trim())) {
      setForm({ ...form, techStack: [...form.techStack, techInput.trim()] });
      setTechInput("");
    }
  };

  const removeTech = (t: string) => {
    setForm({ ...form, techStack: form.techStack.filter((x) => x !== t) });
  };

  const autoSlug = (title: string) =>
    title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .slice(0, 50);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Projects</h1>
          <p className="text-sm text-obsidian-500 mt-1">
            Manage your portfolio projects
          </p>
        </div>
        <button onClick={openCreate} className="btn-primary text-sm">
          <Plus className="h-4 w-4" />
          New Project
        </button>
      </div>

      {/* Project form modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="card-glow w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 scrollbar-thin">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-white">
                {editing ? "Edit Project" : "New Project"}
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="p-1.5 rounded-lg text-obsidian-400 hover:text-white hover:bg-white/5"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-xs font-medium text-obsidian-400">
                    Title *
                  </label>
                  <input
                    value={form.title}
                    onChange={(e) => {
                      const t = e.target.value;
                      setForm({
                        ...form,
                        title: t,
                        slug: editing ? form.slug : autoSlug(t),
                      });
                    }}
                    className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-white outline-none focus:border-cyber-600/50"
                    placeholder="Project title"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-obsidian-400">
                    Slug *
                  </label>
                  <input
                    value={form.slug}
                    onChange={(e) =>
                      setForm({ ...form, slug: e.target.value })
                    }
                    className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-white outline-none focus:border-cyber-600/50"
                    placeholder="project-slug"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-obsidian-400">
                  Description *
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  rows={3}
                  className="w-full resize-none rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-white outline-none focus:border-cyber-600/50"
                  placeholder="Describe the project..."
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-obsidian-400">
                  Content
                </label>
                <textarea
                  value={form.content}
                  onChange={(e) =>
                    setForm({ ...form, content: e.target.value })
                  }
                  rows={6}
                  className="w-full resize-none rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-white outline-none focus:border-cyber-600/50"
                  placeholder="Full project content (optional)..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-xs font-medium text-obsidian-400">
                    Category *
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) =>
                      setForm({ ...form, category: e.target.value })
                    }
                    className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-white outline-none focus:border-cyber-600/50"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c} className="bg-obsidian-900">
                        {categoryLabels[c]}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-obsidian-400">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={form.order}
                    onChange={(e) =>
                      setForm({ ...form, order: parseInt(e.target.value) || 0 })
                    }
                    className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-white outline-none focus:border-cyber-600/50"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-obsidian-400">
                  Image URL
                </label>
                <input
                  value={form.imageUrl}
                  onChange={(e) =>
                    setForm({ ...form, imageUrl: e.target.value })
                  }
                  className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-white outline-none focus:border-cyber-600/50"
                  placeholder="/images/project.jpg or https://..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-xs font-medium text-obsidian-400">
                    Live URL
                  </label>
                  <input
                    value={form.liveUrl}
                    onChange={(e) =>
                      setForm({ ...form, liveUrl: e.target.value })
                    }
                    className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-white outline-none focus:border-cyber-600/50"
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-obsidian-400">
                    GitHub URL
                  </label>
                  <input
                    value={form.githubUrl}
                    onChange={(e) =>
                      setForm({ ...form, githubUrl: e.target.value })
                    }
                    className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-white outline-none focus:border-cyber-600/50"
                    placeholder="https://github.com/..."
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-obsidian-400">
                  Tech Stack
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTech())}
                    className="flex-1 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-white outline-none focus:border-cyber-600/50"
                    placeholder="Add technology..."
                  />
                  <button
                    type="button"
                    onClick={addTech}
                    className="btn-outline text-sm px-3"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {form.techStack.map((t) => (
                    <span
                      key={t}
                      className="flex items-center gap-1 rounded-md bg-cyber-600/10 border border-cyber-600/20 px-2.5 py-1 text-xs text-cyber-400"
                    >
                      {t}
                      <button
                        onClick={() => removeTech(t)}
                        className="ml-0.5 hover:text-white"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) =>
                      setForm({ ...form, featured: e.target.checked })
                    }
                    className="h-4 w-4 rounded border-white/20 bg-white/[0.03] text-cyber-600 focus:ring-cyber-600/20"
                  />
                  <span className="text-sm text-obsidian-300">Featured</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.published}
                    onChange={(e) =>
                      setForm({ ...form, published: e.target.checked })
                    }
                    className="h-4 w-4 rounded border-white/20 bg-white/[0.03] text-cyber-600 focus:ring-cyber-600/20"
                  />
                  <span className="text-sm text-obsidian-300">Published</span>
                </label>
              </div>

              {error && (
                <p className="text-sm text-red-400">{error}</p>
              )}

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="btn-primary text-sm disabled:opacity-50"
                >
                  {saving ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  {editing ? "Update" : "Create"}
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="btn-outline text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Project list */}
      {loading ? (
        <div className="py-20 text-center text-obsidian-500">Loading...</div>
      ) : projects.length === 0 ? (
        <div className="card-glow p-12 text-center">
          <FolderOpen className="h-12 w-12 mx-auto text-obsidian-600 mb-4" />
          <p className="text-obsidian-400">No projects yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="card-glow flex items-center gap-4 p-4 transition-all hover:border-white/10"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-semibold text-white truncate">
                    {project.title}
                  </h3>
                  <span className="shrink-0 rounded-md bg-white/5 px-2 py-0.5 text-[10px] text-obsidian-400">
                    {categoryLabels[project.category]}
                  </span>
                  {project.featured && (
                    <span className="shrink-0 rounded-md bg-cyber-600/10 px-2 py-0.5 text-[10px] text-cyber-400">
                      Featured
                    </span>
                  )}
                </div>
                <p className="text-xs text-obsidian-500 truncate">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {project.techStack.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="rounded bg-white/5 px-1.5 py-0.5 text-[10px] text-obsidian-500"
                    >
                      {t}
                    </span>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className="text-[10px] text-obsidian-600">
                      +{project.techStack.length - 4}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                {project.published ? (
                  <span className="rounded-md bg-emerald-500/10 px-2 py-0.5 text-[10px] text-emerald-400">
                    Live
                  </span>
                ) : (
                  <span className="rounded-md bg-obsidian-700/50 px-2 py-0.5 text-[10px] text-obsidian-500">
                    Draft
                  </span>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-md p-1.5 text-obsidian-500 hover:text-cyber-400 hover:bg-white/5 transition-colors"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-md p-1.5 text-obsidian-500 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <Github className="h-3.5 w-3.5" />
                  </a>
                )}
                <button
                  onClick={() => openEdit(project)}
                  className="rounded-md p-1.5 text-obsidian-500 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="rounded-md p-1.5 text-obsidian-500 hover:text-red-400 hover:bg-red-500/5 transition-colors"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
