import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { getAboutContent } from "../utils/markdown";
import { Container, Section, Divider, Spacer, Grid, Stack } from "../components/common/Container";
import { Heading, Paragraph, SectionLabel } from "../components/common/Typography";
import { Button } from "../components/common/Button";
import { Card } from "../components/common/Card";

interface AboutSections {
  intro: string;
  philosophy: string[];
  interests: string[];
  goals: string[];
  trust: string[];
}

export const About: React.FC = () => {
  const about = getAboutContent();
  const meta = about.metadata;

  // Dynamic parser: Slices about.md into clean arrays
  const parseAboutContent = (content: string): AboutSections => {
    const sections: AboutSections = {
      intro: "",
      philosophy: [],
      interests: [],
      goals: [],
      trust: [],
    };

    const parts = content.split("## ");
    
    // Extrapolate introductory paragraphs
    const introPart = parts[0].replace("# About Me", "").trim();
    sections.intro = introPart;

    parts.slice(1).forEach((part) => {
      const lines = part.split("\n");
      const heading = lines[0].trim().toLowerCase();
      const body = lines.slice(1).join("\n").trim();
      
      const bullets = body
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.startsWith("- ") || line.startsWith("* ") || /^\d+\.\s*/.test(line))
        .map((line) => line.replace(/^[-*\d\.]+\s*/, ""));

      if (heading.includes("identity") || heading.includes("philosophy")) {
        sections.philosophy = bullets;
      } else if (heading.includes("areas of interest")) {
        sections.interests = bullets;
      } else if (heading.includes("long-term goals")) {
        sections.goals = bullets;
      } else if (heading.includes("trust signals")) {
        sections.trust = bullets;
      }
    });

    return sections;
  };

  const sections = parseAboutContent(about.content);

  // Helper: Parses "**Key**: Value" markdown lists into object tokens
  const parseBullet = (bullet: string) => {
    const clean = bullet.replace(/\*\*/g, "");
    const colonIdx = clean.indexOf(":");
    if (colonIdx !== -1) {
      return {
        key: clean.substring(0, colonIdx).trim(),
        value: clean.substring(colonIdx + 1).trim(),
      };
    }
    return { key: "", value: clean };
  };

  const shouldReduceMotion = useReducedMotion();

  const revealVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0.05 : 0.8, ease: [0.16, 1, 0.3, 1] as any },
    },
  };

  // Human-centered conversational content overrides
  const conversationalIntro = (
    <div className="space-y-4 text-text-secondary leading-relaxed font-light text-base md:text-lg">
      <p>
        I am a software engineer who lives at the intersection of systems infrastructure and AI automation. I don't just write code that gets the job done; I like to open the hood, trace the syscalls, profile the allocations, and understand exactly why a compile fails or a network socket hangs at 3 AM.
      </p>
      <p>
        My journey is driven by simple curiosity. I believe the best way to master a complex technology is to build a minimal version of it from scratch. Whether that is writing a container runtime in C to learn namespaces, hacking lock-free concurrency rings in Go, or designing custom AI loop pipelines, I write code to learn how systems tick.
      </p>
    </div>
  );

  const conversationalInterests = [
    { title: "Linux & OS Internals", desc: "Writing scratch container runtimes to understand PID namespaces and mount tables at the syscall boundary. It's fascinating how kernel APIs can isolate userlands." },
    { title: "High-Performance Backend", desc: "Profiling WebSocket relays and database queries to see how far throughput can scale before garbage collection pauses degrade latency." },
    { title: "Agentic AI Loops", desc: "Studying local LLM behaviors and state serialization. I'm building sliding-window memory buffers to prevent models from losing track of their goals." },
    { title: "Distributed Systems", desc: "Exploring network consensus protocols, atomic queue state transitions in Redis, and tracing latency across concurrent network tasks." }
  ];

  const conversationalGoals = [
    "Contribute meaningfully to open-source infrastructure tools that make other developers' lives easier.",
    "Solve problems where sub-millisecond response rates are a fundamental product requirement rather than an afterthought.",
    "Build tools that bridge the mechanical sympathy of systems programming with local, private language model orchestrators."
  ];

  return (
    <div className="w-full flex flex-col items-center bg-bg-primary select-text">
      
      {/* SECTION 1: PERSONAL PHILOSOPHY (Header) */}
      <Section spacing="sm" className="border-b border-border-subtle bg-bg-primary">
        <Container size="md">
          <div className="py-8 max-w-3xl space-y-4">
            <SectionLabel>Philosophy</SectionLabel>
            <Heading level={1} variant="lg" className="text-3xl sm:text-4xl md:text-5xl lg:text-display-xl font-extrabold tracking-tight leading-tight text-white select-text">
              "Building is the highest form of understanding."
            </Heading>
            <Paragraph variant="lg" className="text-text-secondary font-light select-text">
              Low-latency backend pipelines, systems engineering, and developer automation written with care.
            </Paragraph>
          </div>
        </Container>
      </Section>

      {/* SECTION 2: BIOGRAPHY & VALUES (Asymmetric Layout) */}
      <Section spacing="lg" className="border-b border-border-subtle bg-bg-secondary/5">
        <Container size="md">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Portrait photo */}
            <div className="md:col-span-5 relative select-none">
              <motion.div
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="w-full aspect-[3/4] rounded-lg overflow-hidden border border-border-strong bg-bg-secondary"
              >
                <img
                  src="/portrait.jpg"
                  alt="Ayush Shakya portrait rendering"
                  className="w-full h-full object-cover grayscale brightness-95 hover:grayscale-0 transition-all duration-[1200ms]"
                />
              </motion.div>
              <div className="mt-4 flex items-center justify-between text-[10px] font-mono text-text-muted">
                <span>IDENTITY // PORTRAIT</span>
                <span>BANGALORE // HQ</span>
              </div>
            </div>

            {/* Right Column: Bio & Core Philosophy */}
            <div className="md:col-span-7 space-y-8 select-text">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-10%" }}
                variants={revealVariants}
                className="space-y-4"
              >
                <SectionLabel>My Story</SectionLabel>
                <Heading level={2} variant="md">
                  Who I Am
                </Heading>
                {conversationalIntro}
              </motion.div>

              <Divider />

              {/* Core values */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-10%" }}
                variants={revealVariants}
                className="space-y-6"
              >
                <SectionLabel>Mindset</SectionLabel>
                <Heading level={2} variant="sm">
                  How I Approach Software
                </Heading>
                
                <Stack gap={16}>
                  {sections.philosophy.map((item, idx) => {
                    const parsed = parseBullet(item);
                    return (
                      <div key={idx} className="flex gap-4 items-start">
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-primary shrink-0 mt-2" />
                        <div className="space-y-1">
                          {parsed.key && (
                            <Heading level={3} variant="sm" className="text-xs font-mono text-text-primary uppercase tracking-wide">
                              {parsed.key}
                            </Heading>
                          )}
                          <Paragraph variant="sm" className="text-text-secondary leading-relaxed font-light">
                            {parsed.value}
                          </Paragraph>
                        </div>
                      </div>
                    );
                  })}
                </Stack>
              </motion.div>
            </div>

          </div>
        </Container>
      </Section>

      {/* SECTION 3: AREAS OF INTEREST (Curiosity Grid) */}
      <Section spacing="lg" className="border-b border-border-subtle">
        <Container size="md">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
            
            {/* Sticky title header */}
            <div className="md:col-span-4 md:sticky md:top-24 h-fit space-y-4 mb-6 md:mb-0">
              <SectionLabel>Curiosity</SectionLabel>
              <Heading level={2} variant="md">
                Technical Playgrounds
              </Heading>
              <Paragraph variant="reg">
                Concepts, architectures, and systems libraries I'm actively profiling, hacking, and testing on weekends.
              </Paragraph>
            </div>

            {/* Right block: Grid of interests */}
            <div className="md:col-span-8">
              <Grid cols={2} gap={24}>
                {conversationalInterests.map((interest, idx) => (
                  <motion.div
                    key={idx}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-6%" }}
                    variants={revealVariants}
                  >
                    <Card className="p-5 border-border-subtle hover:border-border-strong transition-all duration-300 flex flex-col gap-2 h-full">
                      <Heading level={3} variant="sm" className="text-xs font-mono text-brand-primary uppercase tracking-wider">
                        {interest.title}
                      </Heading>
                      <Paragraph variant="sm" className="text-text-secondary leading-relaxed font-light">
                        {interest.desc}
                      </Paragraph>
                    </Card>
                  </motion.div>
                ))}
              </Grid>
            </div>

          </div>
        </Container>
      </Section>

      {/* SECTION 4: BEYOND ENGINEERING (Personality Snapshot) */}
      <Section spacing="lg" className="border-b border-border-subtle bg-bg-secondary/5">
        <Container size="md">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            
            <div className="md:col-span-7 space-y-4">
              <SectionLabel>Dimension</SectionLabel>
              <Heading level={2} variant="md">
                Outside the Terminal
              </Heading>
              <Paragraph variant="lg" className="text-text-secondary font-light leading-relaxed select-text">
                Outside the terminal, I try to disconnect completely. I run long-distance trails to clear my mind, read about history and design philosophy, and tinker with physical motors. I find that the same rules of feedback loops and friction constraints exist in physical designs as they do in source code.
              </Paragraph>
            </div>

            {/* Clean Monospaced stats card */}
            <div className="md:col-span-5 p-6 border border-border-subtle bg-bg-primary rounded-lg space-y-4">
              <SectionLabel className="block mb-2">Algorithmic Crosswords</SectionLabel>
              <p className="text-xs text-text-secondary font-light leading-relaxed">
                I enjoy solving complex programmatic problems for fun—it's like a daily crossword puzzle for system developers.
              </p>
              <div className="space-y-4 font-mono pt-2">
                <div>
                  <span className="text-[10px] text-text-muted block uppercase">Leetcode Solved</span>
                  <span className="text-2xl font-bold text-white">{meta.dsaSolved || "500+"} Challenges</span>
                </div>
                <Divider />
                <div>
                  <span className="text-[10px] text-text-muted block uppercase">Competitor Rating</span>
                  <span className="text-2xl font-bold text-brand-primary">Top 8% ({meta.leetcodeRating || "1700+"})</span>
                </div>
              </div>
            </div>

          </div>
        </Container>
      </Section>

      {/* SECTION 5: LOOKING AHEAD (Future Goals) */}
      <Section spacing="lg" className="border-b border-border-subtle">
        <Container size="md">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
            
            {/* Sticky title header */}
            <div className="md:col-span-4 md:sticky md:top-24 h-fit space-y-4 mb-6 md:mb-0">
              <SectionLabel>Direction</SectionLabel>
              <Heading level={2} variant="md">
                Looking Ahead
              </Heading>
              <Paragraph variant="reg">
                Long-term aspirations and core milestones I hope to build.
              </Paragraph>
            </div>

            {/* Right block: Numbered list */}
            <div className="md:col-span-8 select-text">
              <Stack gap={24}>
                {conversationalGoals.map((goal, idx) => (
                  <motion.div
                    key={idx}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-8%" }}
                    variants={revealVariants}
                    className="flex gap-6 items-start"
                  >
                    <span className="font-display text-4xl font-bold text-brand-primary/20 shrink-0 leading-none">
                      0{idx + 1}
                    </span>
                    <div className="space-y-1">
                      <Paragraph variant="lg" className="text-text-primary font-medium text-base select-text">
                        {goal}
                      </Paragraph>
                    </div>
                  </motion.div>
                ))}
              </Stack>
            </div>

          </div>
        </Container>
      </Section>

      {/* SECTION 6: LET'S CONNECT (Unpromotional CTA) */}
      <Section spacing="hero" id="contact" className="bg-bg-secondary/10 transition-colors relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        <Container size="sm" className="text-center flex flex-col items-center gap-6 relative z-10 select-none">
          <SectionLabel>Connection</SectionLabel>
          <Heading level={2} variant="lg" className="text-display-xl leading-[1.1] tracking-tight">
            Start a Conversation
          </Heading>
          
          <Paragraph variant="lg" className="text-text-secondary max-w-lg mx-auto leading-relaxed select-text">
            If you need a systems backend developer, are looking to hire an engineer in Bangalore, or simply want to debate low-level concurrency patterns in Go and Rust, feel free to drop me a message.
          </Paragraph>
          
          <Spacer size={8} />

          {/* Social button redirects */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            {meta.email && (
              <Button href={`mailto:${meta.email}`} variant="primary" size="lg">
                Email Me
              </Button>
            )}
            {meta.linkedin && (
              <Button href={meta.linkedin} variant="secondary" size="lg" external>
                LinkedIn
              </Button>
            )}
            {meta.leetcode && (
              <Button href={meta.leetcode} variant="ghost" size="lg" external>
                LeetCode
              </Button>
            )}
            {meta.github && (
              <Button href={meta.github} variant="ghost" size="lg" external>
                GitHub
              </Button>
            )}
          </div>
        </Container>
      </Section>

    </div>
  );
};