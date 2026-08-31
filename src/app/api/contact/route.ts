import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { contactSchema } from "@/lib/validations";
import {
  sendEmail,
  buildAdminNotificationHtml,
} from "@/lib/email";
import { detectIntent } from "@/lib/detect-intent";

function buildSmartAutoReplyHtml(name: string, message: string): string {
  const intent = detectIntent(message);
  const responses: Record<string, { title: string; body: string }> = {
    pricing: { title: "Your Custom Quote", body: `I'd love to provide a tailored quote based on your specific requirements. Every project is unique, so I'll review your needs and prepare a detailed proposal within <span class="highlight">24 hours</span>. Feel free to share any additional details about scope, timeline, or features.` },
    services: { title: "My Services", body: `I offer web development, cybersecurity, full-stack development, DevOps & cloud, and visual content services. Each is tailored to your needs. I'll reach out within <span class="highlight">24 hours</span> to discuss the best fit for your goals.` },
    job: { title: "Let's Build Something Great!", body: `I'm excited about the possibility of working together! I specialize in delivering high-quality digital solutions with clean code, transparent communication, and on-time delivery. I'll connect within <span class="highlight">24 hours</span> to discuss the details.` },
    partnership: { title: "Partnership Opportunity", body: `I love exploring collaboration opportunities! Whether it's joint projects, referrals, or co-development, I'm open to creating mutual value. I'll reach out within <span class="highlight">24 hours</span> to discuss the possibilities.` },
    general: { title: "Thank You!", body: `I've received your message and will get back to you within <span class="highlight">24 hours</span>. In the meantime, feel free to explore my portfolio at tixsync.com.` },
  };
  const { title, body } = responses[intent];
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
    body{font-family:'Segoe UI',Arial,sans-serif;background:#0d1117;color:#e6e6e6;margin:0;padding:0}
    .container{max-width:600px;margin:0 auto;padding:40px 20px}
    .header{text-align:center;margin-bottom:32px}
    .logo{display:inline-flex;align-items:center;gap:10px;margin-bottom:16px}
    .logo-box{background:rgba(26,92,245,0.1);border:1px solid rgba(26,92,245,0.2);border-radius:10px;width:40px;height:40px;display:flex;align-items:center;justify-content:center}
    .logo-text{font-family:monospace;font-weight:bold;font-size:18px;color:#59a0ff}
    .brand{font-size:16px;font-weight:600;color:#fff}
    .tagline{font-size:10px;text-transform:uppercase;letter-spacing:3px;color:#868e96}
    .title{font-size:24px;font-weight:700;color:#fff;margin-bottom:8px}
    .divider{height:1px;background:rgba(255,255,255,0.05);margin:24px 0}
    .message{font-size:15px;line-height:1.7;color:#adb5bd}
    .highlight{color:#59a0ff;font-weight:500}
    .footer{text-align:center;margin-top:32px;padding-top:24px;border-top:1px solid rgba(255,255,255,0.05)}
    .footer-text{font-size:12px;color:#495057}
    .cta{display:inline-block;background:#1a5cf5;color:#fff;text-decoration:none;padding:12px 28px;border-radius:8px;font-weight:500;font-size:14px;margin:16px 0}
  </style></head><body><div class="container"><div class="header"><div class="logo"><div class="logo-box"><span class="logo-text">T</span></div><div><div class="brand">TIXSYNC SOLUTIONS</div><div class="tagline">Digital Solutions & Visual Narratives</div></div></div></div>
  <div class="title">${title}</div><div class="divider"></div>
  <div class="message"><p>Hi <span class="highlight">${name}</span>,</p><p>${body}</p><p>For urgent matters, reach me at <span class="highlight">+254 704 440 164</span>.</p></div>
  <div style="text-align:center"><a href="https://tixsync.com" class="cta">View Portfolio</a></div>
  <div class="footer"><p class="footer-text">Cornelius Maina Nyaga — TIXSYNC SOLUTIONS<br>Web Development · Cybersecurity · Photography · Videography</p></div></div></body></html>`;
}

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
        source: "form",
      },
    });

    // Smart auto-reply to the user based on message content
    const autoReplyResult = await sendEmail({
      to: email.trim().toLowerCase(),
      subject: `We received your message — TIXSYNC SOLUTIONS`,
      html: buildSmartAutoReplyHtml(name.trim(), message.trim()),
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
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
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
