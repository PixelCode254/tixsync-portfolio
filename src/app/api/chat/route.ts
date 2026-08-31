import { NextResponse } from "next/server";
import { detectLanguage, getNativeGreeting, LangCode } from "@/lib/knowledge/languages";
import { getResponse, matchIntent } from "@/lib/knowledge/portfolio-kb";

function getWelcome(lang: LangCode): string {
  return getNativeGreeting(lang);
}

function getSmartResponse(text: string, lang: LangCode): string {
  const { intent } = matchIntent(text);
  const response = getResponse(lang, intent);
  if (response) return response;
  return getResponse(lang, "fallback");
}

export async function POST(request: Request) {
  try {
    const { messages, language } = await request.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ reply: "Please send a message to start the conversation." }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    const lastMsg = messages[messages.length - 1]?.content || "";
    const detectedLang = detectLanguage(lastMsg);
    const responseLang = (language && language !== "en") ? language : detectedLang;

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
              { role: "system", content: `You are Cornelius Maina Nyaga's AI portfolio assistant. You help visitors learn about Cornelius: Full-Stack Developer, Cybersecurity Expert, Founder of TIXSYNC SOLUTIONS and TIXSYNC Media, based in Kenya. Skills: React, Next.js, TypeScript, Node.js, Python, Cybersecurity, Cloud Architecture, DevOps. Be helpful, professional, and concise. Always respond in the same language the user writes in.` },
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

    const reply = getSmartResponse(lastMsg, responseLang);
    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({ reply: "Something went wrong. Please try again." }, { status: 500 });
  }
}
