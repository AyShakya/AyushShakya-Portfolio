export interface ProjectMetadata {
  id: string;
  name: string;
  tag: string;
  metrics?: string;
  techStack: string[];
  featured?: boolean;
  githubUrl?: string;
  liveDemoUrl?: string;
}

export interface NoteMetadata {
  id: string;
  title: string;
  category: string;
  readTime: string;
  snippet: string;
  featured?: boolean;
}

export interface ExperienceMetadata {
  role: string;
  organization: string;
  duration: string;
  techUsed: string[];
  proofLinkLabel?: string;
  proofLinkUrl?: string;
}

export interface CertificateMetadata {
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  skills: string[];
}

export interface ParseResult<T> {
  metadata: T;
  content: string;
}

// Helper to parse frontmatter from markdown
export function parseMarkdown<T>(rawContent: string): ParseResult<T> {
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
  const match = rawContent.trim().match(frontmatterRegex);

  if (match) {
    const yamlBlock = match[1];
    const content = match[2];
    const metadata: Record<string, any> = {};

    yamlBlock.split('\n').forEach(line => {
      const colIdx = line.indexOf(':');
      if (colIdx !== -1) {
        const key = line.substring(0, colIdx).trim();
        const value = line.substring(colIdx + 1).trim().replace(/^['"]|['"]$/g, '');

        if (value.startsWith('[') && value.endsWith(']')) {
          metadata[key] = value
            .slice(1, -1)
            .split(',')
            .map(item => item.trim().replace(/^['"]|['"]$/g, ''))
            .filter(Boolean);
        } else if (value === 'true') {
          metadata[key] = true;
        } else if (value === 'false') {
          metadata[key] = false;
        } else {
          metadata[key] = value;
        }
      }
    });

    return { metadata: metadata as T, content };
  }

  return { metadata: {} as T, content: rawContent };
}

// Globally import all markdown files from the content directory eagerly
const markdownFiles = import.meta.glob('../content/**/*.md', {
  query: '?raw',
  eager: true,
}) as Record<string, { default: string }>;

// Get about page content
export function getAboutContent() {
  const fileKey = Object.keys(markdownFiles).find(key => key.endsWith('about.md'));
  if (!fileKey) throw new Error('about.md not found');
  return parseMarkdown<Record<string, any>>(markdownFiles[fileKey].default);
}

// Get journey page content
export function getJourneyContent() {
  const fileKey = Object.keys(markdownFiles).find(key => key.endsWith('journey.md'));
  if (!fileKey) throw new Error('journey.md not found');
  return parseMarkdown<Record<string, any>>(markdownFiles[fileKey].default);
}

// Get principles page content
export function getPrinciplesContent() {
  const fileKey = Object.keys(markdownFiles).find(key => key.endsWith('principles.md'));
  if (!fileKey) throw new Error('principles.md not found');
  return parseMarkdown<Record<string, any>>(markdownFiles[fileKey].default);
}

// Get all projects
export function getAllProjects(): ParseResult<ProjectMetadata>[] {
  return Object.entries(markdownFiles)
    .filter(([path]) => path.includes('/projects/'))
    .map(([, module]) => parseMarkdown<ProjectMetadata>(module.default))
    .sort((a, b) => a.metadata.name.localeCompare(b.metadata.name));
}

// Get project by ID
export function getProjectById(id: string): ParseResult<ProjectMetadata> | null {
  const project = getAllProjects().find(p => p.metadata.id === id);
  return project || null;
}

// Get all notes
export function getAllNotes(): ParseResult<NoteMetadata>[] {
  return Object.entries(markdownFiles)
    .filter(([path]) => path.includes('/notes/'))
    .map(([, module]) => parseMarkdown<NoteMetadata>(module.default));
}

// Get note by ID
export function getNoteById(id: string): ParseResult<NoteMetadata> | null {
  const note = getAllNotes().find(n => n.metadata.id === id);
  return note || null;
}

// Get all experiences
export function getAllExperiences(): ParseResult<ExperienceMetadata>[] {
  return Object.entries(markdownFiles)
    .filter(([path]) => path.includes('/experiences/'))
    .map(([, module]) => parseMarkdown<ExperienceMetadata>(module.default));
}

// Get all certificates
export function getAllCertificates(): ParseResult<CertificateMetadata>[] {
  return Object.entries(markdownFiles)
    .filter(([path]) => path.includes('/certificates/'))
    .map(([, module]) => parseMarkdown<CertificateMetadata>(module.default));
}
