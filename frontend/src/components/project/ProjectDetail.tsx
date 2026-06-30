import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MarkdownRenderer } from "../MarkdownRenderer";
import { Container, Section, Divider, Spacer } from "../common/Container";
import { Heading, Paragraph, SectionLabel } from "../common/Typography";
import { Button } from "../common/Button";

interface ProjectDetailProps {
  project: {
    metadata: {
      id: string;
      name: string;
      tag: string;
      metrics?: string;
      techStack: string[];
      githubUrl?: string;
      liveDemoUrl?: string;
    };
    content: string;
  };
  nextProject?: {
    id: string;
    name: string;
  } | null;
  onBack: () => void;
  onSelectProject: (id: string) => void;
}

interface ProjectSections {
  executiveSummary: string;
  motivation: string;
  goals: string;
  productDesign: string;
  architecture: string;
  architectureChart: string;
  engineeringDecisions: string;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({
  project,
  nextProject,
  onBack,
  onSelectProject,
}) => {
  // Dynamically parses raw markdown body into structured sections
  const parseProjectContent = (content: string): ProjectSections => {
    const sections: ProjectSections = {
      executiveSummary: "",
      motivation: "",
      goals: "",
      productDesign: "",
      architecture: "",
      architectureChart: "",
      engineeringDecisions: "",
    };

    const parts = content.split("## ");
    parts.forEach((part) => {
      const lines = part.split("\n");
      const heading = lines[0].trim().toLowerCase();
      const body = lines.slice(1).join("\n").trim();

      if (heading.includes("executive summary")) {
        sections.executiveSummary = body;
      } else if (heading.includes("motivation")) {
        sections.motivation = body;
      } else if (heading.includes("goals")) {
        sections.goals = body;
      } else if (heading.includes("product design")) {
        sections.productDesign = body;
      } else if (heading.includes("architecture")) {
        const codeBlockStart = body.indexOf("```");
        if (codeBlockStart !== -1) {
          sections.architecture = body.substring(0, codeBlockStart).trim();
          const codeBlockEnd = body.indexOf("```", codeBlockStart + 3);
          if (codeBlockEnd !== -1) {
            let chart = body.substring(codeBlockStart + 3, codeBlockEnd).trim();
            chart = chart.replace(/^[a-zA-Z0-9_-]+\n/, "");
            sections.architectureChart = chart;
          }
        } else {
          sections.architecture = body;
        }
      } else if (heading.includes("engineering decisions")) {
        sections.engineeringDecisions = body;
      }
    });

    return sections;
  };

  const sections = parseProjectContent(project.content);

  // Image mapping helper
  const getCoverImage = (id: string) => {
    if (id === "watcher-agent") return "/watcher.jpg";
    if (id === "catalyst") return "/catalyst.jpg";
    return "/livedesk.jpg";
  };

  const shouldReduceMotion = useReducedMotion();

  const revealVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0.05 : 0.8, ease: [0.16, 1, 0.3, 1] as any },
    },
  };

  return (
    <div className="w-full select-text bg-bg-primary">
      
      {/* 1. CINEMATIC FULL-BLEED BANNER HERO */}
      <div className="relative w-full h-[55vh] md:h-[65vh] overflow-hidden border-b border-border-strong bg-bg-secondary select-none">
        
        {/* Cover Graphic Image with subtle zoom trigger */}
        <motion.img
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.75 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          src={getCoverImage(project.metadata.id)}
          alt={`${project.metadata.name} cover`}
          className="w-full h-full object-cover grayscale brightness-90 contrast-105"
        />

        {/* Ambient Dark Gradient Vignette overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/20 to-black/50 z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg-primary/80 via-transparent to-transparent z-10 pointer-events-none" />

        {/* Glassmorphic back navigation link */}
        <div className="absolute top-6 left-6 md:left-12 z-20">
          <Button
            onClick={onBack}
            variant="ghost"
            size="sm"
            className="backdrop-blur-md bg-bg-primary/30 border border-border-subtle/50 hover:bg-bg-primary/60 px-4 py-2 rounded-full text-xs font-mono tracking-wider text-text-primary"
          >
            ← BACK TO WORK
          </Button>
        </div>

        {/* Floating details overlay anchored at bottom */}
        <div className="absolute bottom-8 left-6 md:left-12 right-6 z-20 select-text">
          <Container size="md" className="p-0 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded text-[10px] font-mono font-medium border border-brand-primary/20 bg-brand-primary/10 text-brand-primary">
                {project.metadata.tag}
              </span>
              <Heading level={1} variant="lg" className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05] text-white">
                {project.metadata.name}
              </Heading>
              {project.metadata.metrics && (
                <Paragraph variant="lg" className="text-text-secondary font-mono text-sm tracking-tight font-light">
                  Key Metric // <span className="text-brand-primary font-semibold">{project.metadata.metrics}</span>
                </Paragraph>
              )}
            </div>

            {/* CTAs */}
            <div className="flex gap-3">
              {project.metadata.githubUrl && (
                <Button href={project.metadata.githubUrl} variant="secondary" size="sm" className="bg-bg-primary/80 hover:bg-bg-primary" external>
                  ⌨ CODEBASE
                </Button>
              )}
              {project.metadata.liveDemoUrl && (
                <Button href={project.metadata.liveDemoUrl} variant="primary" size="sm" external>
                  ↗ LIVE DEMO
                </Button>
              )}
            </div>
          </Container>
        </div>
      </div>

      {/* 2. EXECUTIVE SUMMARY & SPECS CARD (Rhythmic Alignment) */}
      <Section spacing="md" className="border-b border-border-subtle">
        <Container size="md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Executive Summary paragraph */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10%" }}
              variants={revealVariants}
              className="lg:col-span-8 space-y-4"
            >
              <SectionLabel>Summary</SectionLabel>
              <Heading level={2} variant="md">
                Executive Synthesis
              </Heading>
              <div className="max-w-reading text-text-secondary leading-relaxed text-base md:text-lg font-light pt-2 select-text">
                <MarkdownRenderer content={sections.executiveSummary} />
              </div>
            </motion.div>

            {/* Spec stats block */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-8%" }}
              variants={revealVariants}
              className="lg:col-span-4 space-y-6 p-6 border border-border-subtle bg-bg-secondary/20 rounded-lg"
            >
              <div>
                <SectionLabel className="block mb-1">Architecture Role</SectionLabel>
                <Paragraph variant="sm" className="font-mono text-text-primary text-xs">
                  Lead Systems Architect
                </Paragraph>
              </div>
              <Divider />
              <div>
                <SectionLabel className="block mb-1">Timeline</SectionLabel>
                <Paragraph variant="sm" className="font-mono text-text-primary text-xs">
                  Completed Q3 2024
                </Paragraph>
              </div>
              <Divider />
              <div>
                <SectionLabel className="block mb-1">Core Tech Stack</SectionLabel>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.metadata.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded bg-bg-primary border border-border-subtle text-[10px] font-mono text-text-secondary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

          </div>
        </Container>
      </Section>

      {/* 3. CORE CHALLENGE BLOCK (Elevated Contrast Surface) */}
      {(sections.motivation || sections.goals) && (
        <Section spacing="md" className="border-b border-border-subtle bg-bg-secondary/10 transition-colors">
          <Container size="md">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              {/* Left Column: Motivation */}
              {sections.motivation && (
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-10%" }}
                  variants={revealVariants}
                  className="lg:col-span-6 space-y-4"
                >
                  <SectionLabel>Motivation</SectionLabel>
                  <Heading level={3} variant="sm">
                    Core Bottlenecks Identified
                  </Heading>
                  <div className="max-w-reading text-text-secondary leading-relaxed text-sm md:text-base">
                    <MarkdownRenderer content={sections.motivation} />
                  </div>
                </motion.div>
              )}

              {/* Right Column: Goals */}
              {sections.goals && (
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-10%" }}
                  variants={revealVariants}
                  className="lg:col-span-6 space-y-4"
                >
                  <SectionLabel>Target Objectives</SectionLabel>
                  <Heading level={3} variant="sm">
                    Design Benchmarks
                  </Heading>
                  <div className="max-w-reading text-text-secondary leading-relaxed text-sm md:text-base">
                    <MarkdownRenderer content={sections.goals} />
                  </div>
                </motion.div>
              )}

            </div>
          </Container>
        </Section>
      )}

      {/* 4. ARCHITECTURE SCHEMA (Center Stage Visual Anchor) */}
      {sections.architecture && (
        <Section spacing="md" className="border-b border-border-subtle">
          <Container size="md">
            <div className="space-y-8">
              
              {/* Text header block */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-10%" }}
                variants={revealVariants}
                className="max-w-2xl space-y-3"
              >
                <SectionLabel>Architecture</SectionLabel>
                <Heading level={2} variant="md">
                  System Schematics & Execution Path
                </Heading>
                <div className="text-text-secondary leading-relaxed max-w-reading text-sm md:text-base">
                  <MarkdownRenderer content={sections.architecture} />
                </div>
              </motion.div>

              {/* Graphical Terminal Code Window */}
              {sections.architectureChart && (
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-8%" }}
                  variants={revealVariants}
                  className="w-full bg-slate-950 border border-border-strong rounded-lg p-6 shadow-2xl relative"
                >
                  {/* Mock Terminal Control Buttons */}
                  <div className="flex space-x-2 absolute top-4 left-6 select-none">
                    <span className="w-2.5 h-2.5 rounded-full bg-error/30" />
                    <span className="w-2.5 h-2.5 rounded-full bg-success/20" />
                    <span className="w-2.5 h-2.5 rounded-full bg-border-strong" />
                  </div>
                  
                  {/* Status header indicator */}
                  <div className="text-text-muted font-mono text-[9px] absolute top-3.5 right-6 select-none uppercase tracking-widest">
                    ACTIVE RELAY MODEL // CONSOLE
                  </div>
                  
                  <Spacer size={8} />
                  
                  <pre className="font-mono text-[10px] sm:text-xs text-brand-primary/80 overflow-x-auto leading-relaxed pt-5 scrollbar-thin select-text">
                    <code>{sections.architectureChart}</code>
                  </pre>
                </motion.div>
              )}

            </div>
          </Container>
        </Section>
      )}

      {/* 5. ENGINEERING DECISIONS (Sticky Title editorial block) */}
      {sections.engineeringDecisions && (
        <Section spacing="md" className="border-b border-border-subtle bg-bg-secondary/5">
          <Container size="md">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              
              {/* Left Column (Sticky Title on Desktop) */}
              <div className="lg:col-span-4 lg:sticky lg:top-24 h-fit space-y-3 mb-8 lg:mb-0">
                <SectionLabel>Trade-offs</SectionLabel>
                <Heading level={2} variant="md">
                  Engineering Decisions
                </Heading>
                <Paragraph variant="reg">
                  Important design choices, trade-offs analyzed, and local optimizations.
                </Paragraph>
              </div>

              {/* Right Column (Parsed Markdown) */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-10%" }}
                variants={revealVariants}
                className="lg:col-span-8 max-w-reading text-text-secondary leading-relaxed select-text"
              >
                <MarkdownRenderer content={sections.engineeringDecisions} />
              </motion.div>

            </div>
          </Container>
        </Section>
      )}

      {/* 6. NEXT PROJECT REDIRECT BANNER (Seamless Loop exploration) */}
      {nextProject && (
        <Section spacing="lg" className="bg-bg-secondary/15 relative overflow-hidden transition-all duration-700 hover:bg-bg-secondary/35 group py-24 select-none">
          {/* Background overlay glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(215,38,46,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
          
          <Container size="sm" className="relative z-10 text-center flex flex-col items-center gap-6">
            <SectionLabel>CONTINUE EXPLORING</SectionLabel>
            <div className="space-y-2">
              <span className="text-text-muted font-mono text-[10px] tracking-widest uppercase">UP NEXT</span>
              <Heading level={2} variant="lg" className="text-4xl md:text-5xl font-bold tracking-tight text-white transition-colors group-hover:text-brand-primary duration-300">
                {nextProject.name}
              </Heading>
            </div>
            
            <Paragraph variant="reg" className="text-text-secondary max-w-xs mx-auto">
              Continue reading to evaluate my other systems architectures.
            </Paragraph>
            
            <Spacer size={4} />
            
            <Button onClick={() => onSelectProject(nextProject.id)} variant="primary" size="md">
              Read Next Case Study →
            </Button>
          </Container>
        </Section>
      )}

    </div>
  );
};
