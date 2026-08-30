import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { contactSchema } from "@/lib/validations";
import {
  sendEmail,
  buildAutoReplyHtml,
  buildAdminNotificationHtml,
} from "@/lib/email";

// Simple in-memory rate limiter (use Redis in production)
const submissions = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 5;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const timestamps = submissions.get(ip) || [];
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW);
  if (recent.length >= RATE_LIMIT_MAX) return false;
  recent.push(now);
  submissions.set(ip, recent);
  return true;
}

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();

    const result = contactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, phone, subject, message, projectId } = result.data;

    const contactMessage = await prisma.contactMessage.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone?.trim() || null,
        subject: subject?.trim() || null,
        message: message.trim(),
        projectId: projectId || null,
      },
    });

    // Send auto-reply to the user
    const autoReplyResult = await sendEmail({
      to: email.trim().toLowerCase(),
      subject: `We received your message — TIXSYNC SOLUTIONS`,
      html: buildAutoReplyHtml(name.trim()),
    });

    // Notify admin (you) about new message
    const adminEmail = process.env.CONTACT_EMAIL || process.env.SMTP_USER;
    if (adminEmail) {
      await sendEmail({
        to: adminEmail,
        subject: `[New Inquiry] ${subject || name.trim()} — TIXSYNC`,
        html: buildAdminNotificationHtml(
          name.trim(),
          email.trim().toLowerCase(),
          subject ?? null,
          message.trim()
        ),
      });
    }

    return NextResponse.json(
      {
        success: true,
        id: contactMessage.id,
        emailSent: autoReplyResult.success,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const unreadOnly = searchParams.get("unread") === "true";

    const where = unreadOnly
      ? { read: false, archived: false }
      : { archived: false };

    const [messages, total] = await Promise.all([
      prisma.contactMessage.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.contactMessage.count({ where }),
    ]);

    return NextResponse.json({
      messages,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Fetch messages error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
