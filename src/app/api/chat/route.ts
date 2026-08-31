import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are Cornelius Maina's AI portfolio assistant. You help visitors learn about Cornelius:
- Full-Stack Developer specializing in React, Next.js, TypeScript, Node.js
- Cybersecurity Expert (Penetration Testing, SOC, Security Architecture)
- Founder of TIXSYNC SOLUTIONS and TIXSYNC Media
- Based in Kenya

Cornelius's skills: Full-Stack Development, Cybersecurity, Cloud Architecture, DevOps, System Administration

Be helpful and professional. Guide visitors to the right sections. If they want to hire Cornelius, direct them to the contact form.`;

const KNOWLEDGE_BASE: Record<string, string> = {
  skills: "Cornelius is proficient in Full-Stack Development (React, Next.js, TypeScript, Node.js), Cybersecurity (Penetration Testing, SOC, Security Architecture), Cloud Architecture (AWS, Azure), DevOps, and System Administration.",
  experience: "Cornelius is the founder of TIXSYNC SOLUTIONS and TIXSYNC Media. He has extensive experience in full-stack development and cybersecurity, building secure, scalable systems for clients across Africa.",
  projects: "Cornelius has built various projects including enterprise web applications, security tools, and cloud infrastructure solutions. Check the Projects section of this portfolio for detailed showcases.",
  services: "Cornelius offers Full-Stack Development, Cybersecurity Consulting (Penetration Testing, SOC Operations), Cloud Architecture, and DevOps services through TIXSYNC SOLUTIONS.",
  hire: "To hire Cornelius, please use the contact form on this website or reach out at tixsyncsolutions@gmail.com. He's available for freelance projects, consulting, and full-time opportunities.",
  contact: "You can reach Cornelius at tixsyncsolutions@gmail.com or +254704440164. You can also use the contact form on this website.",
  about: "Cornelius Maina Nyaga is a Full-Stack Developer and Security Engineer based in Kenya. He's the founder of TIXSYNC SOLUTIONS and TIXSYNC Media, specializing in building secure, scalable systems.",
  cybersecurity: "Cornelius is a cybersecurity expert with skills in Penetration Testing, SOC Operations, and Security Architecture. He helps organizations identify and mitigate security vulnerabilities.",
  web: "Cornelius is a full-stack developer specializing in React, Next.js, TypeScript, and Node.js. He builds modern, performant, and scalable web applications.",
  tixsync: "TIXSYNC SOLUTIONS is Cornelius's company, providing enterprise-grade web development, cybersecurity, cloud infrastructure, and digital transformation solutions across Africa.",
};

function getFallbackResponse(messages: { role: string; content: string }[]): string {
  const lastMsg = messages[messages.length - 1]?.content.toLowerCase() || "";

  for (const [key, response] of Object.entries(KNOWLEDGE_BASE)) {
    if (lastMsg.includes(key)) return response;
  }

  if (lastMsg.match(/\b(hi|hello|hey|greet|morning|afternoon|evening)\b/)) {
    return "Hello! Welcome to Cornelius Maina's portfolio. I can tell you about his skills, experience, projects, or help you get in touch. What would you like to know?";
  }
  if (lastMsg.match(/\b(who|what|about|介绍)\b/)) {
    return "Cornelius Maina Nyaga is a Full-Stack Developer and Security Engineer based in Kenya. He's the founder of TIXSYNC SOLUTIONS and TIXSYNC Media. Check out the About section for more details!";
  }
  if (lastMsg.match(/\b(thank|thanks|bye|goodbye)\b/)) {
    return "You're welcome! Feel free to reach out anytime at tixsyncsolutions@gmail.com. Have a great day!";
  }
  if (lastMsg.match(/\b(help|what can|how)\b/)) {
    return "I can help you learn about Cornelius's skills, experience, projects, and services. I can also help you get in touch for hiring opportunities. What would you like to know?";
  }
  if (lastMsg.match(/\b(portfolio|work|code|github)\b/)) {
    return "Cornelius's portfolio showcases his work in full-stack development and cybersecurity. Check the Projects section for detailed case studies, or visit his GitHub for open-source contributions.";
  }

  return "Thanks for your question! For the most detailed answer, I'd recommend reaching out directly at tixsyncsolutions@gmail.com or using the contact form. Is there anything specific about Cornelius's skills or experience I can help with?";
}

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ reply: "Please send a message to start the conversation." }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (apiKey) {
      try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              { role: "system", content: SYSTEM_PROMPT },
              ...messages.map((m: { role: string; content: string }) => ({
                role: m.role,
                content: m.content,
              })),
            ],
            max_tokens: 500,
            temperature: 0.7,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          return NextResponse.json({ reply: data.choices[0].message.content });
        }
      } catch {
        // Fall through to fallback
      }
    }

    const reply = getFallbackResponse(messages);
    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({ reply: "Something went wrong. Please try again." }, { status: 500 });
  }
}
