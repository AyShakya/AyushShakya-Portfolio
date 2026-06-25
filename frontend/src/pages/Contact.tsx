import React, { useState } from "react";
import { submitContactMessage } from "../api";

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setStatus(null);
    try {
      await submitContactMessage(formData);
      setStatus({ type: "success", text: "Message sent successfully! I'll get back to you soon." });
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setStatus({ type: "error", text: "Failed to send message. Please try again or email me directly." });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="space-y-10 py-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight text-white">Contact</h1>
        <p className="text-slate-400 font-light">
          Let's connect. I'm always open to interesting conversations and opportunities.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact Info */}
        <div className="space-y-6">
          <div className="p-5 rounded-xl bg-slate-900/30 border border-slate-900/80 space-y-4">
            <h2 className="text-sm font-semibold tracking-wider text-slate-500 uppercase font-mono">
              Direct Links
            </h2>
            <div className="space-y-3">
              <a
                href="mailto:ayushshakya.dev@gmail.com"
                className="flex items-center space-x-3 text-sm text-slate-300 hover:text-purple-300 transition-colors"
              >
                <span className="text-purple-400">✉</span>
                <span>ayushshakya.dev@gmail.com</span>
              </a>
              <a
                href="https://github.com/AyShakya"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-sm text-slate-300 hover:text-purple-300 transition-colors"
              >
                <span className="text-purple-400">⌘</span>
                <span>github.com/AyShakya</span>
              </a>
              <a
                href="https://linkedin.com/in/ayush-shakya"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-sm text-slate-300 hover:text-purple-300 transition-colors"
              >
                <span className="text-purple-400">◆</span>
                <span>linkedin.com/in/ayush-shakya</span>
              </a>
              <a
                href="https://leetcode.com/u/ayush_shakya/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-sm text-slate-300 hover:text-purple-300 transition-colors"
              >
                <span className="text-purple-400">⚡</span>
                <span>leetcode.com/u/ayush_shakya</span>
              </a>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-slate-900/30 border border-slate-900/80">
            <h2 className="text-sm font-semibold tracking-wider text-slate-500 uppercase font-mono mb-3">
              Availability
            </h2>
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-sm text-slate-300">Open to opportunities</span>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Open for internships, full-time roles, and freelance projects.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="p-6 rounded-xl bg-slate-900/30 border border-slate-900/80">
          <h2 className="text-sm font-semibold tracking-wider text-slate-500 uppercase font-mono mb-6">
            Send a Message
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-xs font-mono text-slate-500 mb-1">
                Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-300 focus:outline-none focus:border-purple-500/50 transition-colors"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-xs font-mono text-slate-500 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-300 focus:outline-none focus:border-purple-500/50 transition-colors"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-xs font-mono text-slate-500 mb-1">
                Message
              </label>
              <textarea
                id="message"
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-300 focus:outline-none focus:border-purple-500/50 transition-colors resize-none"
                placeholder="Tell me about your project or opportunity..."
              />
            </div>
            <button
              type="submit"
              disabled={sending}
              className="w-full px-6 py-3 bg-purple-600 hover:bg-purple-500 disabled:bg-purple-600/50 text-white font-medium rounded-lg transition-all duration-200 cursor-pointer disabled:cursor-not-allowed"
            >
              {sending ? "Sending..." : "Send Message"}
            </button>
            {status && (
              <p
                className={`text-sm font-mono ${
                  status.type === "success" ? "text-emerald-400" : "text-rose-400"
                }`}
              >
                {status.text}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};