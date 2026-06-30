import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  getAllProjects,
  getProjectById,
  getAllExperiences,
  getAllCertificates,
} from "../utils/markdown";
import { MarkdownRenderer } from "../components/MarkdownRenderer";
import { Container, Section, Stack, Divider, Spacer } from "../components/common/Container";
import { Heading, Paragraph, SectionLabel, Tag, Badge } from "../components/common/Typography";
import { FeaturedProjectCard, ProjectCard, ExperienceCard, CertificateCard } from "../components/common/Card";
import { MasonryGrid, GalleryItem } from "../components/common/Gallery";
import { Button } from "../components/common/Button";

export const Work: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeProjectId = searchParams.get("project");
  
  // Dynamic state filters
  const [selectedTag, setSelectedTag] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(6); // Default page size for high volume scale

  const projects = getAllProjects();
  const experiences = getAllExperiences();
  const certificates = getAllCertificates();

  // Scroll to top when loading a detailed case study
  useEffect(() => {
    if (activeProjectId) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [activeProjectId]);

  const handleProjectSelect = (id: string) => {
    setSearchParams({ project: id });
  };

  const handleCloseProject = () => {
    searchParams.delete("project");
    setSearchParams(searchParams);
  };

  // Compile list of tags dynamically from existing projects
  const projectTags = ["All", ...Array.from(new Set(projects.map((p) => p.metadata.tag)))];

  // Helper: Parses the first paragraph description from markdown body
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

  // Check if user is actively searching or filtering
  const isFiltering = selectedTag !== "All" || searchQuery.trim() !== "";

  // Filter & Search Execution
  const filteredAndSearchedProjects = projects.filter((p) => {
    const matchesTag = selectedTag === "All" || p.metadata.tag === selectedTag;
    
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = query === "" ||
      p.metadata.name.toLowerCase().includes(query) ||
      p.metadata.tag.toLowerCase().includes(query) ||
      p.metadata.techStack.some((tech) => tech.toLowerCase().includes(query)) ||
      getProjectDescription(p.content).toLowerCase().includes(query);

    return matchesTag && matchesSearch;
  });

  // Spotlight is active ONLY when not filtering to keep search results uniform
  const featured = isFiltering
    ? null
    : filteredAndSearchedProjects.find((p) => p.metadata.featured === true);

  // Gallery items are whatever is left after spotlighting
  const galleryItems = featured
    ? filteredAndSearchedProjects.filter((p) => p.metadata.id !== featured.metadata.id)
    : filteredAndSearchedProjects;

  // Slice gallery list for pagination to avoid scroll lag with 100+ projects
  const paginatedGalleryItems = galleryItems.slice(0, visibleCount);
  const hasMore = galleryItems.length > visibleCount;

  // Image mapping based on project ID
  const getProjectImage = (id: string) => {
    if (id === "watcher-agent") return "/watcher.jpg";
    if (id === "catalyst") return "/catalyst.jpg";
    return "/livedesk.jpg";
  };

  const revealVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any },
    },
  };

  // --- DETAIL VIEW MODE ---
  if (activeProjectId) {
    const project = getProjectById(activeProjectId);
    if (project) {
      const coverImage = getProjectImage(project.metadata.id);
      return (
        <Section spacing="sm" className="animate-fade-in-up">
          <Container size="md">
            {/* Back indicator link */}
            <div className="mb-10">
              <Button onClick={handleCloseProject} variant="text" size="sm" className="group">
                <span className="inline-block transform group-hover:-translate-x-1.5 transition-transform duration-200 mr-2">
                  ←
                </span>
                [ BACK TO SELECTED WORK ]
              </Button>
            </div>

            {/* Side-by-side Case Study Product Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Left Column (Sticky Metabar on Large Screen) */}
              <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6 select-text border border-border-subtle bg-bg-secondary/20 p-6 rounded-lg">
                <div>
                  <Badge variant="brand" className="mb-3">
                    {project.metadata.tag}
                  </Badge>
                  <Heading level={1} variant="lg" className="mb-2">
                    {project.metadata.name}
                  </Heading>
                  {project.metadata.metrics && (
                    <Paragraph variant="sm" className="font-mono text-brand-primary font-semibold text-xs mt-1">
                      {project.metadata.metrics}
                    </Paragraph>
                  )}
                </div>

                <Divider />

                {/* Tech specifications */}
                <div>
                  <SectionLabel className="block mb-3">Specifications</SectionLabel>
                  <div className="flex flex-wrap gap-1.5">
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

                <Divider />

                {/* Case study direct links */}
                <div className="flex flex-col gap-3">
                  {project.metadata.githubUrl && (
                    <Button href={project.metadata.githubUrl} variant="secondary" size="sm" external>
                      ⌨ View Repository
                    </Button>
                  )}
                  {project.metadata.liveDemoUrl && (
                    <Button href={project.metadata.liveDemoUrl} variant="primary" size="sm" external>
                      ↗ Live Demonstration
                    </Button>
                  )}
                </div>
              </div>

              {/* Right Column: Case study content bodies */}
              <div className="lg:col-span-8 space-y-8 select-text">
                {/* Cinematic Header Image */}
                <div className="w-full aspect-video rounded-lg overflow-hidden border border-border-strong bg-bg-secondary">
                  <img
                    src={coverImage}
                    alt={`${project.metadata.name} system cover`}
                    className="w-full h-full object-cover grayscale brightness-90 contrast-105"
                  />
                </div>

                {/* Document Body wrapped inside reading-width limit */}
                <div className="max-w-reading py-2 select-text prose prose-invert">
                  <MarkdownRenderer content={project.content} />
                </div>
              </div>

            </div>
          </Container>
        </Section>
      );
    }
  }

  // --- OVERVIEW MODE ---
  return (
    <div className="w-full flex flex-col items-center">
      
      {/* SECTION 1: WORK HEADER */}
      <Section spacing="sm" className="border-b border-border-subtle bg-bg-primary">
        <Container size="md">
          <div className="space-y-4 py-6 max-w-xl">
            <SectionLabel>Portfolio</SectionLabel>
            <Heading level={1} variant="lg" className="text-display-xl tracking-tight">
              Selected Work
            </Heading>
            <Paragraph variant="lg">
              Curated collection of software compilation engines, systems agents, and distributed relays.
            </Paragraph>
          </div>
        </Container>
      </Section>

      {/* SECTION 1B: STICKY FILTER & SEARCH SUBHEADER */}
      <div className="sticky top-[53px] md:top-[61px] w-full z-30 bg-bg-primary/95 backdrop-blur-md border-b border-border-subtle/50 py-3 transition-all duration-300">
        <Container size="md" className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Tag filters list */}
          {projectTags.length > 1 && (
            <div className="flex flex-wrap gap-1.5 items-center">
              {projectTags.map((tag) => (
                <Tag
                  key={tag}
                  active={selectedTag === tag}
                  onClick={() => {
                    setSelectedTag(tag);
                    setVisibleCount(6); // Reset page size limit
                  }}
                >
                  {tag}
                </Tag>
              ))}
            </div>
          )}

          {/* Interactive Search input */}
          <div className="relative flex items-center self-start sm:self-auto">
            <span className="text-text-muted font-mono text-xs mr-2">[</span>
            <input
              type="text"
              placeholder="SEARCH PROJECTS"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(6); // Reset pagination on search inputs
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
        </Container>
      </div>

      {/* SECTION 2: FEATURED PROJECT SPOTLIGHT */}
      {featured && (
        <Section spacing="md" className="border-b border-border-subtle transition-colors">
          <Container size="md">
            <div className="space-y-4 mb-10">
              <SectionLabel>Spotlight</SectionLabel>
            </div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10%" }}
              variants={revealVariants}
            >
              <FeaturedProjectCard
                id={featured.metadata.id}
                name={featured.metadata.name}
                tag={featured.metadata.tag}
                metrics={featured.metadata.metrics}
                techStack={featured.metadata.techStack}
                description={getProjectDescription(featured.content)}
                imageUrl={getProjectImage(featured.metadata.id)}
                onClick={() => handleProjectSelect(featured.metadata.id)}
              />
            </motion.div>
          </Container>
        </Section>
      )}

      {/* SECTION 3: MASONRY PROJECT GALLERY */}
      {filteredAndSearchedProjects.length > 0 ? (
        <Section spacing="md" className="border-b border-border-subtle bg-bg-secondary/5 transition-colors">
          <Container size="md">
            {/* Spotlight label overlay */}
            {!featured && (
              <div className="space-y-4 mb-12">
                <SectionLabel>
                  Results ({filteredAndSearchedProjects.length})
                </SectionLabel>
              </div>
            )}
            
            <MasonryGrid columns={{ sm: 1, md: 2, lg: 2 }}>
              {paginatedGalleryItems.map((project) => (
                <GalleryItem key={project.metadata.id}>
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-8%" }}
                    variants={revealVariants}
                  >
                    <ProjectCard
                      id={project.metadata.id}
                      name={project.metadata.name}
                      tag={project.metadata.tag}
                      metrics={project.metadata.metrics}
                      techStack={project.metadata.techStack}
                      description={getProjectDescription(project.content)}
                      imageUrl={getProjectImage(project.metadata.id)}
                      onClick={() => handleProjectSelect(project.metadata.id)}
                    />
                  </motion.div>
                </GalleryItem>
              ))}
            </MasonryGrid>

            {/* Pagination Trigger: Load More for High Volume projects */}
            {hasMore && (
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={revealVariants}
                className="flex justify-center pt-12"
              >
                <Button
                  onClick={() => setVisibleCount((prev) => prev + 6)}
                  variant="secondary"
                  size="md"
                >
                  Load More Projects (+{galleryItems.length - visibleCount})
                </Button>
              </motion.div>
            )}
          </Container>
        </Section>
      ) : (
        /* Empty search results fallback */
        <Section spacing="lg" className="border-b border-border-subtle">
          <Container size="sm" className="text-center py-16 space-y-4">
            <span className="text-3xl">📭</span>
            <Heading level={3} variant="sm" className="text-text-secondary">
              No matching compiler works or systems projects found
            </Heading>
            <Paragraph variant="sm" className="max-w-xs mx-auto">
              Verify spelling or try clicking another filter tag to clear this state.
            </Paragraph>
            <Spacer size={8} />
            <Button
              onClick={() => {
                setSelectedTag("All");
                setSearchQuery("");
              }}
              variant="ghost"
              size="sm"
            >
              Reset Filters
            </Button>
          </Container>
        </Section>
      )}

      {/* SECTION 4: PROFESSIONAL TIMELINE (Hidden during searches) */}
      {!isFiltering && experiences.length > 0 && (
        <Section spacing="md" className="border-b border-border-subtle transition-colors">
          <Container size="md">
            {/* Left-right editorial layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
              <div className="md:col-span-4 space-y-4 mb-6 md:mb-0">
                <SectionLabel>Timeline</SectionLabel>
                <Heading level={2} variant="lg">
                  Professional Experience
                </Heading>
                <Paragraph variant="reg">
                  Practical deployment records and systems support histories.
                </Paragraph>
              </div>

              <div className="md:col-span-8">
                <Stack gap={24}>
                  {experiences.map((exp, idx) => {
                    const bullets = exp.content
                      .split("\n")
                      .map((line) => line.trim().replace(/^-\s*/, ""))
                      .filter(Boolean);
                    const summaryText = bullets.join(" ");

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
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* SECTION 5: VERIFIED CREDENTIALS (Hidden during searches) */}
      {!isFiltering && certificates.length > 0 && (
        <Section spacing="md" className="bg-bg-secondary/10 transition-colors">
          <Container size="md">
            <div className="space-y-4 mb-12">
              <SectionLabel>Credentials</SectionLabel>
              <Heading level={2} variant="lg">
                Verified Certificates
              </Heading>
              <Paragraph variant="reg">
                Professional accreditation credentials from cloud services and developer boards.
              </Paragraph>
            </div>

            {/* Responsive grid of compact certificates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {certificates.map((cert, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-8%" }}
                  variants={revealVariants}
                >
                  <CertificateCard
                    title={cert.metadata.title}
                    issuer={cert.metadata.issuer}
                    date={cert.metadata.date}
                    credentialUrl={cert.metadata.credentialUrl}
                    skills={cert.metadata.skills}
                  />
                </motion.div>
              ))}
            </div>
          </Container>
        </Section>
      )}

    </div>
  );
};
