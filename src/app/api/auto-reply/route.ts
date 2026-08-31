import { NextRequest, NextResponse } from "next/server";

interface AutoReplyRequest {
  channel: "email" | "whatsapp";
  clientName: string;
  clientMessage: string;
  clientEmail?: string;
  clientPhone?: string;
}

function detectIntent(message: string): string {
  const lower = message.toLowerCase();

  const pricingKeywords = [
    "price", "pricing", "cost", "quote", "budget", "how much", "rates",
    "charges", "fee", "affordable", "expensive", "estimate", "invoice",
  ];
  if (pricingKeywords.some((k) => lower.includes(k))) return "pricing";

  const serviceKeywords = [
    "service", "services", "offer", "provide", "what do you do", "capabilities",
    "solutions", "specialize", "expertise", "areas", "do you do", "can you",
  ];
  if (serviceKeywords.some((k) => lower.includes(k))) return "services";

  const jobKeywords = [
    "job", "opportunity", "hiring", "vacancy", "position", "available",
    "freelance", "contract", "project", "work with", "looking for", "need help",
    "need a", "require", "want to build", "want to create", "looking to",
  ];
  if (jobKeywords.some((k) => lower.includes(k))) return "job";

  const partnershipKeywords = [
    "partner", "partnership", "collaborate", "collaboration", "joint venture",
    "together", "alliance", "strategic", "referral", "agency",
  ];
  if (partnershipKeywords.some((k) => lower.includes(k))) return "partnership";

  return "general";
}

function generateEmailReply(clientName: string, intent: string): { subject: string; body: string } {
  const intents: Record<string, { subject: string; body: string }> = {
    pricing: {
      subject: "Custom Quote for Your Project — TIXSYNC SOLUTIONS",
      body: `Hi ${clientName},\n\nThank you for your interest in my services! I'd be happy to provide a tailored quote based on your specific requirements.\n\nEvery project has unique needs, so I like to start with a brief discovery call to understand your goals before providing an estimate. This ensures the quote is accurate and aligned with your vision.\n\nFeel free to share any details about your project — scope, timeline, or specific features — and I'll prepare a detailed proposal.\n\nLooking forward to hearing from you!`,
    },
    services: {
      subject: "My Services at TIXSYNC SOLUTIONS",
      body: `Hi ${clientName},\n\nGreat question! Here's a quick overview of what I offer:\n\n• Web Development — Modern, responsive websites and web applications using React, Next.js, and other cutting-edge technologies\n• Cybersecurity — Security audits, penetration testing, and vulnerability assessments\n• Full-Stack Development — End-to-end application development from database to deployment\n• DevOps & Cloud — CI/CD pipelines, cloud infrastructure, and deployment automation\n• Visual Content — Professional photography and videography for brands\n\nI'd love to discuss which of these services best fits your needs. Want to hop on a quick call?`,
    },
    job: {
      subject: "Let's Build Something Great Together!",
      body: `Hi ${clientName},\n\nThanks for reaching out — I'm excited about the possibility of working together!\n\nI specialize in delivering high-quality digital solutions, from sleek websites to robust security implementations. Here's what you can expect:\n• Clean, maintainable code\n• Transparent communication throughout the project\n• On-time delivery with milestone check-ins\n• Post-launch support\n\nI'd love to hear more about your project. Could we schedule a quick call to discuss the details?\n\nLooking forward to it!`,
    },
    partnership: {
      subject: "Partnership Opportunity — TIXSYNC SOLUTIONS",
      body: `Hi ${clientName},\n\nThank you for considering a partnership! I'm always open to collaborations that create mutual value.\n\nI've worked with agencies, startups, and enterprises on various collaborative projects, and I'd love to explore what we can build together.\n\nLet's connect and discuss the possibilities in more detail. Feel free to reach me via email or WhatsApp at +254 704 440 164.`,
    },
    general: {
      subject: "Thank You for Reaching Out — TIXSYNC",
      body: `Hi ${clientName},\n\nThank you for your message! I've received it and will get back to you within 24 hours.\n\nIn the meantime, feel free to explore my portfolio at tixsync.com or reach me directly at +254 704 440 164 for urgent matters.\n\nTalk soon!`,
    },
  };

  return intents[intent] || intents.general;
}

function generateWhatsappReply(clientName: string, intent: string): string {
  const intents: Record<string, string> = {
    pricing: `Hi ${clientName}! 👋 Thanks for reaching out. I'd love to give you a quote — every project is different, so let's chat about your needs. Drop me an email at tixsyncsolutions@gmail.com and I'll get back with a detailed estimate.`,

    services: `Hi ${clientName}! 👋 Great to hear from you. I offer web dev, cybersecurity, full-stack development, DevOps, and visual content services. Want details on any specific one?`,

    job: `Hi ${clientName}! 🚀 Sounds exciting — I'd love to work on that! Tell me more about the project. For detailed discussions, email me at tixsyncsolutions@gmail.com or call +254 704 440 164.`,

    partnership: `Hi ${clientName}! 👋 Love the collaboration idea. Let's connect — email me at tixsyncsolutions@gmail.com or call +254 704 440 164 to discuss further.`,

    general: `Hi ${clientName}! 👋 Thanks for messaging me. I've got your message and will reply shortly. For anything urgent, reach me at +254 704 440 164.`,
  };

  return intents[intent] || intents.general;
}

export async function POST(request: NextRequest) {
  try {
    const body: AutoReplyRequest = await request.json();
    const { channel, clientName, clientMessage } = body;

    if (!channel || !clientName || !clientMessage) {
      return NextResponse.json(
        { error: "Missing required fields: channel, clientName, clientMessage" },
        { status: 400 }
      );
    }

    const intent = detectIntent(clientMessage);
    const name = clientName.trim() || "there";

    if (channel === "email") {
      const { subject, body: emailBody } = generateEmailReply(name, intent);
      return NextResponse.json({ reply: emailBody, subject });
    }

    const reply = generateWhatsappReply(name, intent);
    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Auto-reply error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
