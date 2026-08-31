"use client";

import { useState, useRef, useEffect, useCallback, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, X, Bot, User, Minimize2, Sparkles } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

const QUICK_ACTIONS = [
  { label: "About Me", message: "Tell me about Cornelius" },
  { label: "Skills", message: "What are your skills?" },
  { label: "Projects", message: "Show me your projects" },
  { label: "Hire Me", message: "How can I hire you?" },
];

const SUGGESTED_QUESTIONS: Record<string, string[]> = {
  en: ["Tell me about yourself", "What are your skills?", "Show me your projects", "How can I contact you?"],
  es: ["Cuéntame sobre ti", "Cuáles son tus habilidades", "Muéstrame tus proyectos", "¿Cómo puedo contactarte?"],
  fr: ["Parlez-moi de vous", "Quelles sont vos compétences", "Montrez-moi vos projets", "Comment puis-je vous contacter?"],
  pt: ["Fale sobre você", "Quais são suas habilidades", "Mostre seus projetos", "Como posso entrar em contato?"],
  de: "Erzählen Sie von sich selbst. Was sind Ihre Fähigkeiten? Zeigen Sie Ihre Projekte. Wie kann ich Sie kontaktieren?".split(". "),
  ar: "أخبرني عن نفسك. ما هي مهاراتك؟ أرني مشاريعك. كيف يمكنني التواصل معك؟".split("؟ "),
  zh: "告诉我关于你自己。你有什么技能？展示你的项目。我怎么联系你？".split("。"),
  ja: "自己紹介してください。あなたのスキルは何ですか？プロジェクトを見せてください。どうすれば連絡できますか？".split("？"),
  ko: "자기소개 해주세요. 기술이 뭐예요? 프로젝트 보여주세요. 어떻게 연락할 수 있나요?".split("?"),
  hi: "अपने बारे में बताइए। आपकी क्या स्किल्स हैं? अपने प्रोजेक्ट दिखाइए। मैं आपसे कैसे संपर्क कर सकता हूँ?".split("।"),
};

const LANGGreetings: Record<string, string[]> = {
  en: ["hello", "hi", "hey", "good morning", "good afternoon", "good evening"],
  es: ["hola", "buenos días", "buenas tardes"],
  fr: ["bonjour", "salut", "bonsoir"],
  pt: ["olá", "oi", "bom dia"],
  de: ["hallo", "guten morgen", "guten tag"],
  it: ["ciao", "buongiorno", "salve"],
  nl: ["hallo", "goedemorgen"],
  ru: ["привет", "здравствуйте", "доброе утро"],
  zh: ["你好", "您好", "早上好"],
  ja: ["こんにちは", "おはよう", "こんばんは"],
  ko: ["안녕하세요", "안녕하십니까"],
  ar: ["مرحبا", "أهلا", "صباح الخير"],
  hi: ["नमस्ते", "नमस्कार", "शुभ प्रभात"],
  tr: ["merhaba", "iyi günler", "günaydın"],
  pl: ["cześć", "witaj", "dzień dobry"],
  th: ["สวัสดี", "สวัสดีครับ"],
  vi: ["xin chào", "chào bạn"],
  id: ["halo", "hai", "selamat pagi"],
  sw: ["habari", "jambo"],
  tl: ["kamusta", "hello"],
  bn: ["নমস্কার", "হ্যালো"],
  ur: ["السلام علیکم", "ہیلو"],
  fa: ["سلام", "درود"],
  he: ["שלום", "בוקר טוב"],
  el: ["γεια σας", "καλημέρα"],
  cs: ["ahoj", "dobrý den"],
  ro: ["bună ziua", "salut"],
  hu: ["szia", "jó napot"],
  sv: ["hej", "god dag"],
  no: ["hei", "god dag"],
  da: ["hej", "god dag"],
  fi: ["hei", "hyvää päivää"],
  uk: ["привіт", "добрий день"],
  bg: ["здравейте", "здравей"],
  hr: ["zdravo", "dobar dan"],
  sk: ["ahoj", "dobrý deň"],
  lt: ["labas", "laba diena"],
  lv: ["sveiki", "labdien"],
  et: ["tere", "tere hommikust"],
  ka: ["გამარჯობა", "დილა მშვიდობისა"],
  hy: ["բարև", "բարի լույս"],
  az: ["salam", "sabahınız xeyir"],
  kk: ["сәлем", "қайырлы таң"],
  uz: ["salom", "xayrli kun"],
  mn: ["сайн байна уу"],
  ne: ["नमस्ते", "नमस्कार"],
  am: ["ሰላም", "እንኳን ደህና ነጋህ"],
};

const KNOWN_LANGS = Object.keys(LANGGreetings);

function detectLanguage(text: string): string {
  const lower = text.toLowerCase().trim();
  for (const lang of KNOWN_LANGS) {
    const greetings = LANGGreetings[lang] || [];
    for (const g of greetings) {
      if (lower === g || lower.startsWith(g + " ") || lower.endsWith(" " + g) || lower.includes(g)) {
        return lang;
      }
    }
  }
  if (/[\u4e00-\u9fff]/.test(text)) return "zh";
  if (/[\u3040-\u309f\u30a0-\u30ff]/.test(text)) return "ja";
  if (/[\uac00-\ud7af]/.test(text)) return "ko";
  if (/[\u0600-\u06ff]/.test(text)) return "ar";
  if (/[\u0900-\u097f]/.test(text)) return "hi";
  if (/[\u0e00-\u0e7f]/.test(text)) return "th";
  if (/[\u0400-\u04ff]/.test(text)) return "ru";
  if (/[\u0590-\u05ff]/.test(text)) return "he";
  if (/[\u0370-\u03ff]/.test(text)) return "el";
  const wordHits: [string, string[]][] = [
    ["es", ["que", "como", "donde", "para", "con", "puedo", "quiero", "habilidades", "proyectos", "cuanto"]],
    ["fr", ["comment", "pourquoi", "pour", "avec", "dans", "mais", "je", "nous", "competences", "projets"]],
    ["pt", ["como", "onde", "para", "com", "mas", "eu", "nos", "posso", "habilidades", "projetos", "quanto"]],
    ["de", ["wie", "was", "wo", "warum", "fur", "mit", "aber", "ich", "wir", "fahigkeiten", "projekte"]],
    ["it", ["come", "dove", "perche", "per", "con", "io", "noi", "posso", "competenze", "progetti"]],
    ["nl", ["wat", "hoe", "waar", "waarom", "voor", "met", "maar", "ik", "wij", "vaardigheden", "projecten"]],
    ["tr", ["ne", "nasil", "nerede", "neden", "icin", "ile", "ama", "ben", "biz", "beceriler", "projeler"]],
  ];
  for (const [lang, words] of wordHits) {
    let hits = 0;
    for (const w of words) { if (lower.includes(w)) hits++; }
    if (hits >= 2) return lang;
  }
  return "en";
}

const WELCOME_MESSAGES: Record<string, string> = {
  en: "Hi! I'm Cornelius's AI portfolio assistant. I can tell you about his skills, experience, projects, or help you get in touch. What would you like to know?",
  es: "¡Hola! Soy el asistente de portafolio de Cornelius. Puedo contarte sobre sus habilidades, experiencia, proyectos o ayudarte a ponerte en contacto. ¿Qué te gustaría saber?",
  fr: "Bonjour ! Je suis l'assistant de portfolio de Cornelius. Je peux vous parler de ses compétences, de son expérience, de ses projets ou vous aider à le contacter. Que souhaitez-vous savoir ?",
  pt: "Olá! Sou o assistente de portfólio do Cornelius. Posso falar sobre suas habilidades, experiência, projetos ou ajudá-lo a entrar em contato. O que você gostaria de saber?",
  de: "Hallo! Ich bin Cornelius' Portfolio-Assistent. Ich kann Ihnen über seine Fähigkeiten, Erfahrung, Projekte erzählen oder Ihnen helfen, ihn zu kontaktieren. Was möchten Sie wissen?",
  ar: "مرحبا! أنا مساعد معرض أعمال كورنيليوس. يمكنني إخبارك بمهاراته وخبراته ومشاريعه أو مساعدتك للتواصل معه. ماذا تريد أن تعرف؟",
  zh: "你好！我是Cornelius的AI作品集助手。我可以告诉你关于他的技能、经验、项目，或者帮你联系他。你想了解什么？",
  ja: "こんにちは！Corneliusのポートフォリオアシスタントです。スキル、経験、プロジェクトについてお話ししたり、連絡のお手伝いをしたりできます。何を知りたいですか？",
  ko: "안녕하세요! Cornelius의 포트폴리오 어시스턴트입니다. 기술, 경험, 프로젝트에 대해 알려드리거나 연락을 도와드릴 수 있습니다. 무엇을 알고 싶으신가요?",
  hi: "नमस्ते! मैं Cornelius का पोर्टफोलियो सहायक हूँ। मैं आपको उनकी स्किल्स, अनुभव, प्रोजेक्ट्स के बारे में बता सकता हूँ या संपर्क करने में मदद कर सकता हूँ। आप क्या जानना चाहेंगे?",
  ru: "Привет! Я AI-ассистент портфолио Cornelius. Я могу рассказать о его навыках, опыте, проектах или помочь связаться. Что вы хотите узнать?",
};

function getWelcome(lang: string): string {
  return WELCOME_MESSAGES[lang] || WELCOME_MESSAGES.en;
}

function getSuggested(lang: string): string[] {
  return SUGGESTED_QUESTIONS[lang] || SUGGESTED_QUESTIONS.en;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [language, setLanguage] = useState("en");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const browserLang = navigator.language?.split("-")[0] || "en";
    const lang = KNOWN_LANGS.includes(browserLang) ? browserLang : "en";
    setLanguage(lang);
    setMessages([{ role: "assistant", content: getWelcome(lang), timestamp: Date.now() }]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const detectedLang = detectLanguage(trimmed);
    if (detectedLang !== language) setLanguage(detectedLang);

    const userMsg: Message = { role: "user", content: trimmed, timestamp: Date.now() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg], language: detectedLang }),
      });
      const data = await res.json();
      setTimeout(() => {
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply, timestamp: Date.now() }]);
        setIsTyping(false);
      }, 600 + Math.random() * 800);
    } catch {
      setTimeout(() => {
        setMessages((prev) => [...prev, { role: "assistant", content: "Sorry, something went wrong. Please try again.", timestamp: Date.now() }]);
        setIsTyping(false);
      }, 500);
    }
  }, [messages, language]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!input.trim() || isTyping) return;
    sendMessage(input);
  }

  function formatTime(ts: number): string {
    return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-24 right-5 z-50 w-[380px] h-[560px] rounded-2xl border border-white/10 bg-obsidian-900/95 backdrop-blur-xl shadow-2xl shadow-black/40 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="relative flex items-center justify-between px-4 py-3 border-b border-white/10 bg-gradient-to-r from-obsidian-800/80 to-obsidian-800/60">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-cyber-600/20 text-cyber-400">
                    <Bot size={20} />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-obsidian-800" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Cornelius AI Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                    <p className="text-[10px] text-emerald-400">Online</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-obsidian-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <Minimize2 size={15} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-obsidian-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2 px-4 py-2.5 border-b border-white/5 overflow-x-auto scrollbar-none">
              {QUICK_ACTIONS.map((action) => (
                <button
                  key={action.label}
                  onClick={() => sendMessage(action.message)}
                  className="shrink-0 px-3 py-1.5 text-[11px] font-medium rounded-full bg-cyber-600/10 text-cyber-400 border border-cyber-500/20 hover:bg-cyber-600/20 hover:border-cyber-500/40 transition-all"
                >
                  {action.label}
                </button>
              ))}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-cyber-600/20 text-cyber-400 shrink-0 mr-2 mt-1">
                      <Bot size={14} />
                    </div>
                  )}
                  <div className="max-w-[75%]">
                    <div
                      className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-cyber-600 text-white rounded-br-md"
                          : "bg-obsidian-800 text-obsidian-100 border border-white/5 rounded-bl-md"
                      }`}
                    >
                      <span className="whitespace-pre-wrap">{msg.content}</span>
                    </div>
                    <p className={`text-[10px] text-obsidian-500 mt-1 ${msg.role === "user" ? "text-right" : "text-left"}`}>
                      {formatTime(msg.timestamp)}
                    </p>
                  </div>
                  {msg.role === "user" && (
                    <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-cyber-600/20 text-cyber-400 shrink-0 ml-2 mt-1">
                      <User size={14} />
                    </div>
                  )}
                </motion.div>
              ))}

              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-cyber-600/20 text-cyber-400 shrink-0 mr-2">
                    <Bot size={14} />
                  </div>
                  <div className="bg-obsidian-800 border border-white/5 rounded-2xl rounded-bl-md px-4 py-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-cyber-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                      <span className="w-2 h-2 bg-cyber-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                      <span className="w-2 h-2 bg-cyber-400 rounded-full animate-bounce" />
                    </div>
                  </div>
                </motion.div>
              )}

              {messages.length <= 1 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {getSuggested(language).map((q) => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      className="px-3 py-1.5 text-[11px] rounded-full bg-obsidian-800 text-obsidian-300 border border-white/10 hover:bg-obsidian-700 hover:text-white transition-all"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="px-3 py-3 border-t border-white/10 bg-obsidian-800/40">
              <div className="flex items-center gap-2 bg-obsidian-900/80 rounded-xl border border-white/10 px-3 py-1.5 focus-within:border-cyber-500/50 transition-colors">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  disabled={isTyping}
                  className="flex-1 bg-transparent text-sm text-white placeholder:text-obsidian-500 outline-none py-1.5"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="p-2 rounded-lg bg-cyber-600 text-white hover:bg-cyber-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  <Send size={14} />
                </button>
              </div>
            </form>

            {/* Footer */}
            <div className="px-4 py-2 border-t border-white/5 bg-obsidian-900/60">
              <p className="text-[9px] text-center text-obsidian-500 flex items-center justify-center gap-1">
                <Sparkles size={10} className="text-cyber-400" />
                Powered by TIXSYNC AI • Available 24/7
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-colors duration-300 bg-cyber-600 text-white hover:bg-cyber-500 hover:shadow-cyber-600/30"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X size={22} />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <MessageCircle size={22} />
            </motion.div>
          )}
        </AnimatePresence>
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500" />
          </span>
        )}
      </motion.button>
    </>
  );
}
