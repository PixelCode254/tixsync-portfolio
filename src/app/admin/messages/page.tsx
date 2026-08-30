"use client";

import { useEffect, useState } from "react";
import {
  Mail,
  MailOpen,
  Archive,
  Clock,
  Send,
  Reply,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";

type Message = {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  read: boolean;
  archived: boolean;
  replied: boolean;
  createdAt: string;
};

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Message | null>(null);
  const [replyText, setReplyText] = useState("");
  const [replying, setReplying] = useState(false);
  const [replyStatus, setReplyStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  useEffect(() => {
    fetch("/api/contact")
      .then((r) => r.json())
      .then((data) => {
        setMessages(data.messages || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const handleReply = async () => {
    if (!selected || !replyText.trim()) return;
    setReplying(true);
    setReplyStatus("idle");

    try {
      const res = await fetch("/api/contact/reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messageId: selected.id,
          replyMessage: replyText.trim(),
        }),
      });

      if (!res.ok) throw new Error("Failed");

      setReplyStatus("success");
      setReplyText("");
      setMessages((prev) =>
        prev.map((m) =>
          m.id === selected.id ? { ...m, replied: true, read: true } : m
        )
      );
      setSelected((prev) =>
        prev ? { ...prev, replied: true, read: true } : prev
      );
      setTimeout(() => setReplyStatus("idle"), 4000);
    } catch {
      setReplyStatus("error");
      setTimeout(() => setReplyStatus("idle"), 3000);
    } finally {
      setReplying(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Messages</h1>
        <p className="text-sm text-obsidian-500 mt-1">
          Incoming messages from the contact form
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Message list */}
        <div className="lg:col-span-1 space-y-2">
          {loading ? (
            <div className="py-10 text-center text-obsidian-500 text-sm">
              Loading...
            </div>
          ) : messages.length === 0 ? (
            <div className="card-glow p-8 text-center">
              <Mail className="h-8 w-8 mx-auto text-obsidian-600 mb-3" />
              <p className="text-sm text-obsidian-400">No messages yet</p>
            </div>
          ) : (
            messages.map((msg) => (
              <button
                key={msg.id}
                onClick={() => {
                  setSelected(msg);
                  setReplyText("");
                  setReplyStatus("idle");
                }}
                className={`w-full text-left card-glow p-4 transition-all hover:border-white/10 ${
                  selected?.id === msg.id ? "border-cyber-600/30" : ""
                } ${!msg.read ? "border-l-2 border-l-cyber-500" : ""}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-white truncate">
                    {msg.name}
                  </span>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {msg.replied && (
                      <span className="rounded bg-emerald-500/10 px-1.5 py-0.5 text-[9px] font-medium text-emerald-400">
                        Replied
                      </span>
                    )}
                    {!msg.read && (
                      <span className="h-2 w-2 rounded-full bg-cyber-500" />
                    )}
                  </div>
                </div>
                <p className="text-xs text-obsidian-500 truncate">
                  {msg.subject || msg.message}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <Clock className="h-3 w-3 text-obsidian-600" />
                  <span className="text-[10px] text-obsidian-600">
                    {formatDate(msg.createdAt)}
                  </span>
                </div>
              </button>
            ))
          )}
        </div>

        {/* Message detail */}
        <div className="lg:col-span-2">
          {selected ? (
            <div className="card-glow p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-white">
                    {selected.subject || "No Subject"}
                  </h2>
                  <p className="text-sm text-obsidian-400">
                    From{" "}
                    <span className="text-cyber-400">{selected.name}</span>{" "}
                    &lt;{selected.email}&gt;
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {selected.replied && (
                    <span className="flex items-center gap-1 rounded-md bg-emerald-500/10 px-2 py-1 text-xs text-emerald-400">
                      <CheckCircle className="h-3 w-3" />
                      Replied
                    </span>
                  )}
                  <span className="text-xs text-obsidian-600">
                    {formatDate(selected.createdAt)}
                  </span>
                </div>
              </div>

              <div className="rounded-lg border border-white/5 bg-white/[0.02] p-4 mb-6">
                <p className="text-sm text-obsidian-200 leading-relaxed whitespace-pre-wrap">
                  {selected.message}
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2 mb-6">
                <a
                  href={`mailto:${selected.email}?subject=Re: ${selected.subject || "Your inquiry"}`}
                  className="btn-outline text-sm"
                >
                  <Mail className="h-4 w-4" />
                  Reply via Email
                </a>
                <button className="btn-outline text-sm">
                  <Archive className="h-4 w-4" />
                  Archive
                </button>
              </div>

              {/* Inline reply section */}
              <div className="border-t border-white/5 pt-6">
                <div className="flex items-center gap-2 mb-3">
                  <Reply className="h-4 w-4 text-cyber-400" />
                  <span className="text-sm font-medium text-white">
                    Quick Reply
                  </span>
                  <span className="text-xs text-obsidian-500">
                    — sends directly to {selected.email}
                  </span>
                </div>

                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  rows={4}
                  placeholder={`Type your reply to ${selected.name}...`}
                  className="w-full resize-none rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-obsidian-600 outline-none transition-colors focus:border-cyber-600/50 focus:ring-1 focus:ring-cyber-600/20 mb-3"
                />

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleReply}
                    disabled={replying || !replyText.trim()}
                    className="btn-primary text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {replying ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Send Reply
                      </>
                    )}
                  </button>

                  {replyStatus === "success" && (
                    <span className="flex items-center gap-1.5 text-sm text-emerald-400">
                      <CheckCircle className="h-4 w-4" />
                      Reply sent to {selected.email}
                    </span>
                  )}

                  {replyStatus === "error" && (
                    <span className="flex items-center gap-1.5 text-sm text-red-400">
                      <AlertCircle className="h-4 w-4" />
                      Failed to send. Try again.
                    </span>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="card-glow flex h-full items-center justify-center p-12">
              <div className="text-center">
                <MailOpen className="h-12 w-12 mx-auto text-obsidian-700 mb-3" />
                <p className="text-sm text-obsidian-500">
                  Select a message to read
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
