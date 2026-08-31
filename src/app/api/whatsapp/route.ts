import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

function detectIntent(message: string): string {
  const lower = message.toLowerCase();
  if (["price","pricing","cost","quote","budget","how much","rates","charges","fee","affordable","expensive","estimate"].some((k) => lower.includes(k))) return "pricing";
  if (["service","services","offer","provide","what do you do","capabilities","solutions","specialize","expertise"].some((k) => lower.includes(k))) return "services";
  if (["job","opportunity","hiring","vacancy","project","work with","looking for","need help","need a","want to build","want to create"].some((k) => lower.includes(k))) return "job";
  if (["partner","partnership","collaborate","collaboration","joint venture","together","alliance","referral"].some((k) => lower.includes(k))) return "partnership";
  return "general";
}

function generateSmartReply(clientName: string, message: string): string {
  const intent = detectIntent(message);
  const name = clientName || "there";
  const replies: Record<string, string> = {
    pricing: `Hi ${name}! 👋 Thanks for reaching out. I'd love to give you a quote — every project is different, so let's chat about your needs. Drop me an email at tixsyncsolutions@gmail.com and I'll get back with a detailed estimate.`,
    services: `Hi ${name}! 👋 Great to hear from you. I offer web dev, cybersecurity, full-stack development, DevOps, and visual content services. Want details on any specific one?`,
    job: `Hi ${name}! 🚀 Sounds exciting — I'd love to work on that! Tell me more about the project. For detailed discussions, email me at tixsyncsolutions@gmail.com or call +254 704 440 164.`,
    partnership: `Hi ${name}! 👋 Love the collaboration idea. Let's connect — email me at tixsyncsolutions@gmail.com or call +254 704 440 164 to discuss further.`,
    general: `Hi ${name}! 👋 Thanks for messaging me. I've got your message and will reply shortly. For anything urgent, reach me at +254 704 440 164.`,
  };
  return replies[intent] || replies.general;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { From, Body, ProfileName } = body;

    const phone = From?.replace("whatsapp:", "") || "";
    const name = ProfileName || "WhatsApp User";
    const message = Body || "";

    if (!phone || !message) {
      return NextResponse.json({ error: "Missing From or Body" }, { status: 400 });
    }

    await prisma.contactMessage.create({
      data: {
        name,
        email: `${phone}@whatsapp.placeholder`,
        message,
        source: "whatsapp",
      },
    });

    const reply = generateSmartReply(name, message);

    const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Message>${reply.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</Message>
</Response>`;

    return new NextResponse(twiml, {
      status: 200,
      headers: { "Content-Type": "text/xml" },
    });
  } catch (error) {
    console.error("WhatsApp webhook error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    status: "ok",
    message: "TIXSYNC WhatsApp webhook is active",
  });
}
