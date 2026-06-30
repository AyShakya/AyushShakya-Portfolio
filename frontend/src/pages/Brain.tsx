import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { getAllNotes, getNoteById } from "../utils/markdown";
import { MarkdownRenderer } from "../components/MarkdownRenderer";
import { Container, Section, Divider, Spacer, Grid } from "../components/common/Container";
import { Heading, Paragraph, SectionLabel, Tag, Badge } from "../components/common/Typography";
import { Button } from "../components/common/Button";
import { Card } from "../components/common/Card";

export const Brain: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeNoteId = searchParams.get("note");
  
  // Navigation & Search states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(6); // Paginate to avoid endless scrolling

  const notes = getAllNotes();

  // Scroll to top when opening a note details sheet
  useEffect(() => {
    if (activeNoteId) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [activeNoteId]);

  const handleNoteSelect = (id: string) => {
    setSearchParams({ note: id });
  };

  const handleCloseNote = () => {
    searchParams.delete("note");
    setSearchParams(searchParams);
  };

  // Compile list of categories dynamically from notes metadata
  const categoriesList = ["All", ...Array.from(new Set(notes.map((n) => n.metadata.category)))];

  // Static snapshot of current active exploration topics
  const exploringTopics = [
    { title: "Linux Kernel Namespaces", desc: "Experimenting with clone() flags and mount isolation trees in isolated container userspace." },
    { title: "Low-Latency Go WS Relays", desc: "Optimizing lock-free queues and event loops to handle high concurrency multiplexing." },
    { title: "Embedded Control Systems", desc: "Analyzing drone flight dynamics, sensor updates, and soft feedback loop latency." },
    { title: "Agent Memory Buffers", desc: "Designing sliding window context summarizing to handle state bloat in AI runtimes." }
  ];

  // Filter notes by search input and category tag
  const filteredNotes = notes.filter((note) => {
    const matchesCategory = selectedCategory === "All" || note.metadata.category === selectedCategory;
    
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = query === "" ||
      note.metadata.title.toLowerCase().includes(query) ||
      note.metadata.snippet.toLowerCase().includes(query) ||
      note.content.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  // Extract featured notes (only render in landing view mode)
  const featuredNotes = notes.filter((n) => n.metadata.featured === true);

  // Pagination controls
  const paginatedNotes = filteredNotes.slice(0, visibleCount);
  const hasMoreNotes = filteredNotes.length > visibleCount;

  // Map note IDs to visual assets for cohesive imagery reuse
  const getNoteImage = (id: string) => {
    if (id === "agentic-loops") return "/watcher.jpg";
    if (id === "bullmq-internals") return "/catalyst.jpg";
    return "/livedesk.jpg";
  };

  const shouldReduceMotion = useReducedMotion();

  const revealVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0.05 : 0.8, ease: [0.16, 1, 0.3, 1] as any },
    },
  };

  // --- NOTE DETAIL VIEW MODE (Distraction-free Reading layout) ---
  if (activeNoteId) {
    const note = getNoteById(activeNoteId);
    if (note) {
      return (
        <Section spacing="sm" className="animate-fade-in-up select-text">
          <Container size="sm">
            {/* Back breadcrumb */}
            <div className="mb-10 select-none">
              <Button onClick={handleCloseNote} variant="text" size="sm" className="group">
                <span className="inline-block transform group-hover:-translate-x-1.5 transition-transform duration-200 mr-2">
                  ←
                </span>
                [ BACK TO KNOWLEDGE BASE ]
              </Button>
            </div>

            {/* Note metadata details */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 select-none">
                <Badge variant="brand">{note.metadata.category}</Badge>
                <span className="text-[11px] font-mono text-text-muted">{note.metadata.readTime}</span>
              </div>
              <Heading level={1} variant="lg" className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                {note.metadata.title}
              </Heading>
            </div>

            <Divider className="my-8" />

            {/* Cover image illustration */}
            <div className="w-full aspect-[21/10] rounded-lg overflow-hidden border border-border-subtle bg-bg-secondary select-none mb-10">
              <img
                src={getNoteImage(note.metadata.id)}
                alt={note.metadata.title}
                className="w-full h-full object-cover grayscale brightness-90 contrast-105"
              />
            </div>

            {/* Reading width container prose */}
            <div className="max-w-reading py-2 text-text-secondary select-text prose prose-invert font-light text-base md:text-lg leading-relaxed">
              <MarkdownRenderer content={note.content} />
            </div>
          </Container>
        </Section>
      );
    }
  }

  // Check if filtering is active
  const isFiltering = selectedCategory !== "All" || searchQuery.trim() !== "";

  // --- OVERVIEW MODE ---
  return (
    <div className="w-full flex flex-col items-center bg-bg-primary">
      
      {/* HEADER SECTION */}
      <Section spacing="sm" className="border-b border-border-subtle">
        <Container size="md">
          <div className="space-y-4 py-6 max-w-xl">
            <SectionLabel>Knowledge Space</SectionLabel>
            <Heading level={1} variant="lg" className="text-4xl md:text-5xl lg:text-display-xl tracking-tight font-extrabold text-white">
              The Brain
            </Heading>
            <Paragraph variant="lg">
              A curated collection of developer logs, architectural experiments, and raw system notes.
            </Paragraph>
          </div>
        </Container>
      </Section>

      {/* SECTION 1: WHAT'S ON MY MIND (Personal Reflection) */}
      {!isFiltering && (
        <Section spacing="md" className="border-b border-border-subtle">
          <Container size="md">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-4">
                <SectionLabel>Status</SectionLabel>
                <Heading level={2} variant="md" className="mt-2">
                  On My Mind
                </Heading>
              </div>
              <div className="lg:col-span-8 relative">
                {/* Handcrafted quotes outline indicator */}
                <span className="absolute -top-10 -left-6 font-display text-8xl font-black text-brand-primary opacity-[0.08] select-none">
                  “
                </span>
                <Paragraph variant="lg" className="text-text-primary font-light leading-relaxed select-text italic">
                  Currently designing compiled local LLM automation watcher agents, evaluating low-latency message relay backplanes in Golang, and debugging Vite compilation loops. I am obsessed with achieving absolute minimal latency overhead across developer toolchains.
                </Paragraph>
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* SECTION 2: CURRENTLY EXPLORING (Active Learning) */}
      {!isFiltering && (
        <Section spacing="md" className="border-b border-border-subtle bg-bg-secondary/5">
          <Container size="md">
            <div className="space-y-4 mb-12">
              <SectionLabel>Active Research</SectionLabel>
              <Heading level={2} variant="md">
                Currently Exploring
              </Heading>
            </div>
            
            <Grid cols={2} gap={24}>
              {exploringTopics.map((topic, i) => (
                <motion.div
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-6%" }}
                  variants={revealVariants}
                >
                  <Card className="p-6 border-border-subtle hover:border-border-strong transition-all flex flex-col gap-3 h-full">
                    <span className="text-[10px] font-mono text-brand-primary uppercase tracking-widest font-semibold">
                      LOG // 0{i + 1}
                    </span>
                    <Heading level={3} variant="sm" className="text-text-primary">
                      {topic.title}
                    </Heading>
                    <Paragraph variant="sm" className="text-text-secondary leading-relaxed font-light">
                      {topic.desc}
                    </Paragraph>
                  </Card>
                </motion.div>
              ))}
            </Grid>
          </Container>
        </Section>
      )}

      {/* STICKY SEARCH & FILTER SUBHEADER (Optimized for Mobile/Tablet) */}
      <div className="sticky top-[53px] md:top-[61px] w-full z-30 bg-bg-primary/95 backdrop-blur-md border-b border-border-subtle/50 py-3 transition-all duration-300">
        <Container size="md" className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          
          {/* Swipeable Dynamic Categories Tray (non-wrapping mobile list) */}
          <div className="w-full sm:w-auto overflow-x-auto scrollbar-none whitespace-nowrap -mx-4 px-4 sm:mx-0 sm:px-0 py-0.5">
            <div className="flex gap-1.5 items-center">
              {categoriesList.map((cat) => (
                <Tag
                  key={cat}
                  active={selectedCategory === cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setVisibleCount(6); // Reset pagination gate
                  }}
                >
                  {cat}
                </Tag>
              ))}
            </div>
          </div>

          {/* Search Box Widget with real-time match metrics */}
          <div className="relative flex items-center justify-between sm:justify-end w-full sm:w-auto">
            {isFiltering && (
              <span className="text-[10px] font-mono text-text-muted mr-3 bg-bg-secondary border border-border-subtle px-1.5 py-0.5 rounded select-none">
                {filteredNotes.length} MATCHES
              </span>
            )}
            
            <div className="relative flex items-center">
              <span className="text-text-muted font-mono text-xs mr-2">[</span>
              <input
                type="text"
                placeholder="SEARCH INSIGHTS"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisibleCount(6); // Reset pagination gate
                }}
                className="bg-transparent text-xs font-mono text-text-primary focus:text-brand-primary placeholder:text-text-muted outline-none w-36 sm:w-40 focus:w-48 sm:focus:w-56 transition-all duration-300 uppercase py-0.5"
              />
              <span className="text-text-muted font-mono text-xs">]</span>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 text-[10px] font-mono text-text-muted hover:text-brand-primary ml-2 select-none cursor-pointer"
                >
                  ×
                </button>
              )}
            </div>
          </div>

        </Container>
      </div>

      {/* SECTION 3: FEATURED INSIGHTS (Highlight Grid) */}
      {!isFiltering && featuredNotes.length > 0 && (
        <Section spacing="md" className="border-b border-border-subtle">
          <Container size="md">
            <div className="space-y-4 mb-12">
              <SectionLabel>Curations</SectionLabel>
              <Heading level={2} variant="md">
                Featured Insights
              </Heading>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredNotes.map((note) => (
                <motion.div
                  key={note.metadata.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-8%" }}
                  variants={revealVariants}
                  onClick={() => handleNoteSelect(note.metadata.id)}
                  className="group flex flex-col gap-4 border border-border-subtle hover:border-border-strong rounded-lg overflow-hidden bg-bg-secondary/20 p-5 transition-all duration-300 cursor-pointer"
                >
                  {/* Aspect Ratio Image wrapper */}
                  <div className="w-full aspect-[16/9] rounded overflow-hidden border border-border-subtle/50 bg-bg-secondary select-none">
                    <img
                      src={getNoteImage(note.metadata.id)}
                      alt={note.metadata.title}
                      className="w-full h-full object-cover grayscale brightness-90 group-hover:scale-[1.03] group-hover:grayscale-0 transition-all duration-700"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-mono text-text-muted select-none">
                      <span>{note.metadata.category}</span>
                      <span>{note.metadata.readTime}</span>
                    </div>
                    <Heading level={3} variant="sm" className="text-text-primary group-hover:text-brand-primary transition-colors duration-300">
                      {note.metadata.title}
                    </Heading>
                    <Paragraph variant="sm" className="text-text-secondary leading-relaxed font-light line-clamp-3">
                      {note.metadata.snippet}
                    </Paragraph>
                  </div>

                  <div className="mt-auto pt-2 border-t border-border-subtle/50 flex items-center justify-between text-[11px] font-mono text-brand-primary/80 group-hover:text-brand-primary select-none">
                    <span>READ LOG</span>
                    <span>→</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* SECTION 4: ALL NOTES GRID */}
      <Section spacing="md" className="bg-bg-secondary/5">
        <Container size="md">
          {/* Section label overlay */}
          <div className="space-y-4 mb-12">
            <SectionLabel>
              {isFiltering ? `Filtered Logs` : "Knowledge Base Archive"}
            </SectionLabel>
          </div>

          {filteredNotes.length > 0 ? (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {paginatedNotes.map((note) => (
                  <motion.div
                    key={note.metadata.id}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-6%" }}
                    variants={revealVariants}
                    onClick={() => handleNoteSelect(note.metadata.id)}
                    className="group flex flex-col justify-between border border-border-subtle hover:border-border-strong hover:bg-bg-secondary/35 rounded-lg p-5 transition-all duration-300 cursor-pointer"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-[9px] font-mono text-text-muted select-none">
                        <span className="uppercase">{note.metadata.category}</span>
                        <span>{note.metadata.readTime}</span>
                      </div>
                      <Heading level={3} variant="sm" className="text-sm md:text-base font-bold text-text-primary group-hover:text-brand-primary transition-colors duration-300 leading-tight">
                        {note.metadata.title}
                      </Heading>
                      <Paragraph variant="sm" className="text-xs md:text-sm text-text-secondary leading-relaxed font-light line-clamp-3">
                        {note.metadata.snippet}
                      </Paragraph>
                    </div>

                    <div className="mt-6 pt-3 border-t border-border-subtle/50 flex items-center justify-between text-[10px] font-mono text-text-muted group-hover:text-brand-primary transition-colors select-none">
                      <span>EXPLORE NOTE</span>
                      <span>→</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Pagination Controls Gate to prevent infinite scrolling fatigue */}
              {hasMoreNotes && (
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={revealVariants}
                  className="flex justify-center pt-8"
                >
                  <Button
                    onClick={() => setVisibleCount((prev) => prev + 6)}
                    variant="secondary"
                    size="md"
                  >
                    Load More Notes (+{filteredNotes.length - visibleCount})
                  </Button>
                </motion.div>
              )}
            </div>
          ) : (
            /* Fallback empty results */
            <div className="text-center py-16 space-y-4 max-w-sm mx-auto">
              <span className="text-3xl">📭</span>
              <Heading level={3} variant="sm" className="text-text-secondary">
                No matching insights found
              </Heading>
              <Paragraph variant="sm" className="max-w-xs mx-auto">
                Check syntax or click another category filter tag.
              </Paragraph>
              <Spacer size={8} />
              <Button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                variant="ghost"
                size="sm"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </Container>
      </Section>

    </div>
  );
};
