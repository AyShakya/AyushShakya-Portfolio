import { Project } from "../models/Project.js";
import { Experience } from "../models/Experience.js";
import { Journey } from "../models/Journey.js";
import { Note } from "../models/Note.js";

export const seedDatabase = async () => {
  try {
    // Seed Projects
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      console.log("[database]: No projects found. Seeding initial projects...");
      const seedProjects = [
        {
          name: "WatcherAgent",
          tag: "Agentic AI",
          desc: "An intelligent autonomous file watcher and builder agent designed to track modifications and run builds automatically.",
          problem: "Developers lose time waiting for manual compile pipelines and tracking structural file dependency tree updates in dynamic environments.",
          architecture: "Event-driven watcher system leveraging recursive file graph state mappings synced to local llama processing loops.",
          techStack: ["NodeJS", "TypeScript", "Ollama", "Chokidar"],
          metrics: "12ms update latency",
          featured: true,
        },
        {
          name: "Catalyst",
          tag: "Systems",
          desc: "A production-grade reactive builder engine and compilation optimizer built to streamline frontend build pipelines.",
          problem: "Large scale Javascript frontends take upwards of 40 seconds to recompile during development, breaking context flow.",
          architecture: "Vite dev compilation interceptor caching transpiled chunks in WebAssembly-accelerated memory rings.",
          techStack: ["Rust", "Vite", "ESBuild", "WebAssembly"],
          metrics: "40% build speedup",
          featured: true,
        },
        {
          name: "LiveDesk",
          tag: "Distributed",
          desc: "Collaborative real-time remote infrastructure manager allowing full virtual desktop control from the browser.",
          problem: "Standard screen-sharing systems exhibit high packet loss and high latency overhead in constrained network grids.",
          architecture: "High-performance websocket-based connection broker coordinating frame-buffer diffs via optimized Golang relays.",
          techStack: ["WebSockets", "Go", "React", "Docker"],
          metrics: "150k active messages/sec",
          featured: true,
        },
      ];
      await Project.insertMany(seedProjects);
      console.log("[database]: Initial projects seeded successfully!");
    }

    // Seed Experiences
    const experienceCount = await Experience.countDocuments();
    if (experienceCount === 0) {
      console.log("[database]: No experiences found. Seeding initial experiences...");
      const seedExperiences = [
        {
          role: "Full Stack Developer (Freelance)",
          organization: "Independent Consultant / Self-Employed",
          duration: "Jun 2024 - Present",
          responsibilities: [
            "Architected scalable backend web applications for client integrations.",
            "Built responsive interfaces with optimized performance using React and Tailwind."
          ],
          achievements: [
            "Delivered 5+ web applications on time with 100% satisfaction score.",
            "Decreased average database query latency by 35% through indexing optimizations."
          ],
          techUsed: ["React", "Express", "Node.js", "MongoDB", "Tailwind CSS"],
          proofLinks: [
            { label: "Freelance Portfolio Review", url: "https://example.com" }
          ],
          featured: true
        },
        {
          role: "Technical Lead & Event Coordinator",
          organization: "University Computer Science Club",
          duration: "Sep 2023 - May 2024",
          responsibilities: [
            "Coordinated technical events, hackathons, and algorithm study groups.",
            "Mentored junior developers in web development stack fundamentals."
          ],
          achievements: [
            "Successfully organized club hackathon with over 150 active participants.",
            "Guided a team of 4 members in building the club's event registration system."
          ],
          techUsed: ["Git", "React", "NodeJS", "JavaScript"],
          proofLinks: [
            { label: "CS Club Event Link", url: "https://example.com" }
          ],
          featured: true
        }
      ];
      await Experience.insertMany(seedExperiences);
      console.log("[database]: Initial experiences seeded successfully!");
    }

    // Seed Journeys
    const journeyCount = await Journey.countDocuments();
    if (journeyCount === 0) {
      console.log("[database]: No journey records found. Seeding initial journeys...");
      const seedJourneys = [
        {
          year: "2026",
          title: "Agentic AI & Distributed Systems",
          desc: "Architecting autonomous reasoning agents and scaling backend message buses to production levels.",
          featured: true,
        },
        {
          year: "2025",
          title: "Full Stack & DevOps Expansion",
          desc: "Mastering deployment pipelines, Dockerization, state-management frameworks, and advanced system optimization.",
          featured: true,
        },
        {
          year: "2024",
          title: "Frontend Engineering Depth",
          desc: "Creating pixel-perfect components, dynamic user interfaces, micro-animations, and responsive designs.",
          featured: true,
        },
        {
          year: "2023",
          title: "Computer Science Foundation",
          desc: "Initiated deep dives into Data Structures & Algorithms, operating systems, and foundational system designs.",
          featured: true,
        },
      ];
      await Journey.insertMany(seedJourneys);
      console.log("[database]: Initial journeys seeded successfully!");
    }

    // Seed Notes
    const noteCount = await Note.countDocuments();
    if (noteCount === 0) {
      console.log("[database]: No notes found. Seeding initial notes...");
      const seedNotes = [
        {
          title: "BullMQ Internals & Redis Job Queues",
          category: "Backend Systems",
          readTime: "8 min read",
          snippet: "Exploring how BullMQ utilizes Redis hashes, sorted sets, and Lua scripting to guarantee atomicity and job states.",
          featured: true,
        },
        {
          title: "Understanding Agentic Loops in LLMs",
          category: "AI Engineering",
          readTime: "12 min read",
          snippet: "Diving into state management, system-prompt injection, and memory pipelines for running multi-agent orchestrations.",
          featured: true,
        },
        {
          title: "Linux process model and namespaces",
          category: "Systems & OS",
          readTime: "15 min read",
          snippet: "A deep dive into clone() flags, PID namespaces, and how modern container runtimes structure isolated userlands.",
          featured: true,
        },
      ];
      await Note.insertMany(seedNotes);
      console.log("[database]: Initial notes seeded successfully!");
    }
  } catch (error) {
    console.error(`[database seed error]: ${(error as Error).message}`);
  }
};
