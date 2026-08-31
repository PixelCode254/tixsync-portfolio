import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");
    const all = searchParams.get("all");
    const slug = searchParams.get("slug");
    const limit = parseInt(searchParams.get("limit") || "50");

    const selectFields = {
      id: true,
      title: true,
      slug: true,
      description: true,
      content: true,
      category: true,
      techStack: true,
      imageUrl: true,
      liveUrl: true,
      githubUrl: true,
      featured: true,
      published: true,
      order: true,
      createdAt: true,
    };

    // Slug lookup: return single project
    if (slug) {
      const project = await prisma.project.findUnique({
        where: { slug },
        select: selectFields,
      });
      if (!project) {
        return NextResponse.json({ project: null }, { status: 404 });
      }
      return NextResponse.json({ project });
    }

    const where: Record<string, unknown> = {};

    // Admin "all" mode shows everything including drafts
    if (all !== "true") {
      where.published = true;
    }

    if (category && category !== "ALL") {
      where.category = category;
    }
    if (featured === "true") {
      where.featured = true;
    }

    const projects = await prisma.project.findMany({
      where,
      orderBy: { order: "asc" },
      take: limit,
      select: selectFields,
    });

    return NextResponse.json({ projects });
  } catch (error) {
    console.error("Fetch projects error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, slug, description, content, category, techStack, imageUrl, videoUrl, liveUrl, githubUrl, featured, published, order } = body;

    if (!title || !slug || !description || !category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const existing = await prisma.project.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
    }

    const project = await prisma.project.create({
      data: {
        title: title.trim(),
        slug: slug.trim(),
        description: description.trim(),
        content: content || null,
        category,
        techStack: techStack || [],
        imageUrl: imageUrl || null,
        videoUrl: videoUrl || null,
        liveUrl: liveUrl || null,
        githubUrl: githubUrl || null,
        featured: featured || false,
        published: published || false,
        order: order || 0,
      },
    });

    return NextResponse.json({ success: true, project }, { status: 201 });
  } catch (error) {
    console.error("Create project error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { id, ...data } = body;

    if (!id) {
      return NextResponse.json({ error: "Project ID required" }, { status: 400 });
    }

    if (data.title) data.title = data.title.trim();
    if (data.slug) data.slug = data.slug.trim();
    if (data.description) data.description = data.description.trim();

    const project = await prisma.project.update({
      where: { id },
      data,
    });

    return NextResponse.json({ success: true, project });
  } catch (error) {
    console.error("Update project error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Project ID required" }, { status: 400 });
    }

    await prisma.project.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete project error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
