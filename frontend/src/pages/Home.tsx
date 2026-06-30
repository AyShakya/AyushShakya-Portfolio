import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Hero } from "../components/hero/Hero";
import { Container, Section, Stack, Spacer, Grid } from "../components/common/Container";
import { Heading, Paragraph, SectionLabel } from "../components/common/Typography";
import { FeaturedProjectCard, ProjectCard, ExperienceCard } from "../components/common/Card";
import { Button } from "../components/common/Button";
import { getAllProjects, getAllExperiences, getPrinciplesContent } from "../utils/markdown";

export const Home: React.FC = () => {
  const navigate = useNavigate();

  // 1. Fetch data from markdown files using global utility functions
  const projects = getAllProjects();
  const experiences = getAllExperiences();
  const principlesRaw = getPrinciplesContent();

  // Find the primary featured project (Catalyst is selected as featured, otherwise default to first)
  const featuredProject = projects.find((p) => p.metadata.id === "catalyst") || projects[0];
  const otherProjects = projects.filter((p) => p.metadata.id !== featuredProject.metadata.id);

  // Helper: Dynamically parses the first description sentence out of project markdown body
  const getProjectDescription = (content: string) => {
    const lines = content.split("\n");
    const descLine = lines.find((line) => {
      const trimmed = line.trim();
      return (
        trimmed.length > 0 &&
        !trimmed.startsWith("#") &&
        !trimmed.startsWith("---") &&
        !trimmed.startsWith("`") &&
        !trimmed.startsWith("[")
      );
    });
    return descLine ? descLine.trim() : "";
  };

  // Helper: Parses principles.md headings and paragraphs into object tokens
  const parsePrinciples = (rawContent: string) => {
    const sections = rawContent.split("### ");
    return sections.slice(1).map((sec) => {
      const lines = sec.split("\n");
      const title = lines[0].trim();
      const desc = lines.slice(1).join(" ").trim().replace(/\s+/g, " ");
      return { title, desc };
    });
  };

  const principlesList = parsePrinciples(principlesRaw.content);

  // Animation reveal settings matching motion system specifications
  const revealVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as any, // ease-strong-out
      },
    },
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* SECTION 1: IDENTITY (Hero Engine System) */}
      <Hero />

      {/* SECTION 2: PROOF (Featured Projects & Asymmetrical Gallery) */}
      <Section spacing="lg" id="work" className="border-b border-border-subtle transition-colors">
        <Container size="md">
          {/* Section Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-12%" }}
            variants={revealVariants}
            className="space-y-4 mb-20 max-w-2xl"
          >
            <SectionLabel>Proof</SectionLabel>
            <Heading level={2} variant="lg">
              Featured Projects
            </Heading>
            <Paragraph variant="lg">
              System tools, compiling engines, and distributed networks engineered for performance and efficiency.
            </Paragraph>
          </motion.div>

          {/* Primary project spotlight */}
          {featuredProject && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10%" }}
              variants={revealVariants}
              className="mb-16"
            >
              <FeaturedProjectCard
                id={featuredProject.metadata.id}
                name={featuredProject.metadata.name}
                tag={featuredProject.metadata.tag}
                metrics={featuredProject.metadata.metrics}
                techStack={featuredProject.metadata.techStack}
                description={getProjectDescription(featuredProject.content)}
                imageUrl="/catalyst.jpg"
                onClick={() => navigate(`/work?project=${featuredProject.metadata.id}`)}
              />
            </motion.div>
          )}

          {/* Handcrafted staggered masonry columns (offset layout) */}
          <div className="mb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {otherProjects.map((project, idx) => (
                <motion.div
                  key={project.metadata.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-8%" }}
                  variants={revealVariants}
                  // Stagger heights asymmetrically by shifting the second project card downward
                  className={`${idx % 2 === 1 ? "md:translate-y-16" : ""}`}
                >
                  <ProjectCard
                    id={project.metadata.id}
                    name={project.metadata.name}
                    tag={project.metadata.tag}
                    metrics={project.metadata.metrics}
                    techStack={project.metadata.techStack}
                    description={getProjectDescription(project.content)}
                    imageUrl={project.metadata.id === "watcher-agent" ? "/watcher.jpg" : "/livedesk.jpg"}
                    onClick={() => navigate(`/work?project=${project.metadata.id}`)}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          <Spacer size={24} className="hidden md:block" />

          {/* Curated CTA transition */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={revealVariants}
            className="flex justify-center pt-8"
          >
            <Button onClick={() => navigate("/work")} variant="secondary">
              View All Projects & Credentials
            </Button>
          </motion.div>
        </Container>
      </Section>

      {/* SECTION 3: CREDIBILITY (Sticky Experience Timeline) */}
      <Section spacing="lg" className="border-b border-border-subtle bg-bg-secondary/5 transition-colors">
        <Container size="md">
          {/* Handcrafted Pinned Side-Panel Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            
            {/* Left Column: Sticky Section Header on Desktop */}
            <div className="md:col-span-4 md:sticky md:top-24 h-fit space-y-4 mb-8 md:mb-0">
              <SectionLabel>Credibility</SectionLabel>
              <Heading level={2} variant="lg">
                Professional Experience
              </Heading>
              <Paragraph variant="reg">
                Applying engineering discipline and systems knowledge to production infrastructure.
              </Paragraph>
              <Spacer size={8} />
              <div className="hidden md:block">
                <Button onClick={() => navigate("/about")} variant="ghost" size="sm">
                  View Full Timeline →
                </Button>
              </div>
            </div>

            {/* Right Column: Experience cards stream */}
            <div className="md:col-span-8">
              <Stack gap={32} className="mb-12">
                {experiences.map((exp, idx) => {
                  const bullets = exp.content
                    .split("\n")
                    .map((line) => line.trim().replace(/^-\s*/, ""))
                    .filter(Boolean);
                  const summaryText = bullets.slice(0, 2).join(" ");

                  return (
                    <motion.div
                      key={idx}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-10%" }}
                      variants={revealVariants}
                    >
                      <ExperienceCard
                        role={exp.metadata.role}
                        organization={exp.metadata.organization}
                        duration={exp.metadata.duration}
                        techUsed={exp.metadata.techUsed}
                        proofLinkLabel={exp.metadata.proofLinkLabel}
                        proofLinkUrl={exp.metadata.proofLinkUrl}
                        description={summaryText}
                      />
                    </motion.div>
                  );
                })}
              </Stack>

              {/* Mobile CTA */}
              <div className="flex md:hidden justify-center pt-4">
                <Button onClick={() => navigate("/about")} variant="ghost">
                  Read My Timeline & Background
                </Button>
              </div>
            </div>

          </div>
        </Container>
      </Section>

      {/* SECTION 4: MINDSET (Engineering Philosophy) */}
      <Section spacing="lg" className="border-b border-border-subtle transition-colors">
        <Container size="md">
          {/* Section Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-12%" }}
            variants={revealVariants}
            className="space-y-4 mb-20 max-w-2xl"
          >
            <SectionLabel>Philosophy</SectionLabel>
            <Heading level={2} variant="lg">
              How I Build
            </Heading>
            <Paragraph variant="lg">
              The core principles driving my architecture decisions and engineering quality.
            </Paragraph>
          </motion.div>

          {/* Staggered double-column grid with custom large typography numerals */}
          <Grid cols={2} gap={48} className="mb-8">
            {principlesList.map((p, idx) => (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-8%" }}
                variants={revealVariants}
                className="flex gap-6 items-start p-2"
              >
                {/* Handcrafted Outline Number Index */}
                <span
                  style={{ WebkitTextStroke: "1.5px rgba(215, 38, 46, 0.25)" }}
                  className="font-display text-6xl md:text-7xl font-extrabold text-transparent leading-none shrink-0 select-none"
                >
                  0{idx + 1}
                </span>
                
                <div className="space-y-2">
                  <Heading level={3} variant="sm" className="text-text-primary transition-colors hover:text-brand-primary">
                    {p.title.replace(/^\d+\.\s*/, "")}
                  </Heading>
                  <Paragraph variant="reg" className="text-text-secondary leading-relaxed text-sm md:text-base">
                    {p.desc}
                  </Paragraph>
                </div>
              </motion.div>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* SECTION 5: CONNECTION (Premium Call-to-Action) */}
      <Section spacing="hero" id="contact" className="bg-bg-secondary/15 transition-colors relative overflow-hidden">
        {/* Subtle decorative grid lines overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(215,38,46,0.03)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

        <Container size="sm" className="relative z-10 text-center flex flex-col items-center gap-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={revealVariants}
            className="space-y-6 flex flex-col items-center"
          >
            <SectionLabel>Connection</SectionLabel>
            <Heading level={2} variant="lg" className="text-display-xl leading-[1.1] tracking-tight">
              Let's Build Something Meaningful
            </Heading>
            <Paragraph variant="lg" className="text-text-secondary max-w-lg mx-auto">
              I am currently open to full-time opportunities or technical consultations. If you need a systems engineer, distributed backend developer, or LLM integrations architect, let's talk.
            </Paragraph>
            
            <Spacer size={8} />
            
            {/* Recruiter direct shortcuts */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button href="mailto:ayushshakya.dev@gmail.com" variant="primary" size="lg">
                Email Me
              </Button>
              <Button href="https://linkedin.com/in/ayush-shakya" variant="secondary" size="lg" external>
                LinkedIn
              </Button>
              <Button href="https://github.com/AyShakya" variant="ghost" size="lg" external>
                GitHub
              </Button>
            </div>
          </motion.div>
        </Container>
      </Section>
    </div>
  );
};