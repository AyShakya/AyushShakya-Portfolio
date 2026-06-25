import React from "react";

export const Uses: React.FC = () => {
  const categories = [
    {
      title: "Hardware",
      items: [
        { item: "Laptop", detail: "Lenovo ThinkPad — Linux daily driver" },
        { item: "Monitor", detail: "Dell 27\" 4K — primary display" },
        { item: "Keyboard", detail: "Custom mechanical — Gateron Browns" },
        { item: "Mouse", detail: "Logitech MX Master 3S" },
      ],
    },
    {
      title: "Development",
      items: [
        { item: "Editor", detail: "VS Code with custom keybinds and theme" },
        { item: "Terminal", detail: "Kitty terminal with Zsh + Starship prompt" },
        { item: "Shell", detail: "Zsh with Oh My Zsh" },
        { item: "Browser", detail: "Firefox Developer Edition" },
      ],
    },
    {
      title: "Linux Setup",
      items: [
        { item: "OS", detail: "Fedora Linux — primary OS" },
        { item: "WM/DE", detail: "GNOME with custom extensions" },
        { item: "Package Manager", detail: "DNF, Flatpak, and Homebrew" },
        { item: "Containers", detail: "Docker + Podman for isolation" },
      ],
    },
    {
      title: "AI & Productivity",
      items: [
        { item: "AI Tools", detail: "Claude, ChatGPT, Ollama (local models)" },
        { item: "Notes", detail: "Obsidian for knowledge management" },
        { item: "Git Client", detail: "CLI-first — lazygit for interactive staging" },
        { item: "API Testing", detail: "Bruno / curl for API debugging" },
      ],
    },
    {
      title: "Learning Tools",
      items: [
        { item: "DSA Practice", detail: "LeetCode, NeetCode.io" },
        { item: "System Design", detail: "System Design Interview — Alex Xu" },
        { item: "Courses", detail: "Udemy, YouTube, MIT OCW" },
        { item: "Reading", detail: "Technical blogs, Rust book, Linux docs" },
      ],
    },
  ];

  return (
    <div className="space-y-10 py-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight text-white">Uses</h1>
        <p className="text-slate-400 font-light">
          My current tools, hardware, and development setup.
        </p>
      </div>

      <div className="space-y-8">
        {categories.map((cat) => (
          <div key={cat.title} className="p-6 rounded-xl bg-slate-900/30 border border-slate-900/80">
            <h2 className="text-sm font-semibold tracking-wider text-purple-400 uppercase font-mono mb-4">
              {cat.title}
            </h2>
            <div className="space-y-3">
              {cat.items.map((item, i) => (
                <div key={i} className="flex items-start justify-between border-b border-slate-900/60 pb-2 last:border-0">
                  <span className="text-sm font-medium text-white">{item.item}</span>
                  <span className="text-sm text-slate-400 text-right max-w-xs">{item.detail}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};