import React from "react";
import { Heading, Paragraph, Badge, Metadata } from "./Typography";

interface BaseCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  lift?: boolean;
}

export const Card: React.FC<BaseCardProps> = ({ children, lift = true, className = "", ...props }) => {
  const baseClasses = "rounded-lg border border-border-subtle bg-bg-secondary/40 backdrop-blur-sm overflow-hidden p-6 transition-all duration-400";
  const liftClass = lift ? "hover-lift" : "";

  return (
    <div className={`${baseClasses} ${liftClass} ${className}`} {...props}>
      {children}
    </div>
  );
};

// --- ProjectCard ---
interface ProjectCardProps {
  id: string;
  name: string;
  tag: string;
  metrics?: string;
  techStack: string[];
  description: string;
  onClick?: () => void;
  imageUrl?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  name,
  tag,
  metrics,
  techStack,
  description,
  onClick,
  imageUrl,
}) => {
  return (
    <Card onClick={onClick} className="flex flex-col h-full cursor-pointer group">
      {imageUrl && (
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-bg-primary rounded-md mb-5 border border-border-subtle">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-800 ease-strong-out group-hover:scale-[1.04]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-overlay opacity-0 group-hover:opacity-10 transition-opacity duration-400" />
        </div>
      )}
      
      <div className="flex-grow flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-3">
            <Badge variant="brand">{tag}</Badge>
            {metrics && <Metadata className="text-[10px]">{metrics}</Metadata>}
          </div>
          <Heading level={3} variant="sm" className="mb-2 transition-colors group-hover:text-brand-primary">
            {name}
          </Heading>
          <Paragraph variant="sm" className="line-clamp-3 mb-4">
            {description}
          </Paragraph>
        </div>

        <div className="pt-4 border-t border-border-subtle">
          <div className="flex flex-wrap gap-1.5 mb-4">
            {techStack.map((tech, idx) => (
              <span key={idx} className="text-[10px] font-mono text-text-muted">
                {tech}{idx < techStack.length - 1 ? " •" : ""}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between text-xs text-brand-primary font-mono font-medium group-hover:translate-x-1 transition-transform duration-300">
            <span>Read Case Study</span>
            <span>→</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

// --- FeaturedProjectCard ---
interface FeaturedProjectCardProps {
  id: string;
  name: string;
  tag: string;
  metrics?: string;
  techStack: string[];
  description: string;
  onClick?: () => void;
  imageUrl?: string;
}

export const FeaturedProjectCard: React.FC<FeaturedProjectCardProps> = ({
  name,
  tag,
  metrics,
  techStack,
  description,
  onClick,
  imageUrl,
}) => {
  return (
    <div
      onClick={onClick}
      className="group w-full rounded-lg border border-border-strong bg-bg-secondary/20 hover:border-brand-primary backdrop-blur-md overflow-hidden p-6 md:p-8 cursor-pointer transition-all duration-400"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-center">
        {imageUrl && (
          <div className="lg:col-span-7 aspect-[16/10] w-full overflow-hidden bg-bg-primary rounded-md border border-border-subtle">
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-1000 ease-strong-out group-hover:scale-[1.03]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-overlay opacity-0 group-hover:opacity-10 transition-opacity duration-400" />
          </div>
        )}
        
        <div className={imageUrl ? "lg:col-span-5 flex flex-col h-full justify-between" : "col-span-12 flex flex-col h-full justify-between"}>
          <div>
            <div className="flex items-center justify-between gap-2 mb-4">
              <Badge variant="brand">{tag}</Badge>
              {metrics && <Metadata className="text-[10px] font-semibold">{metrics}</Metadata>}
            </div>
            <Heading level={3} variant="lg" className="mb-4 transition-colors group-hover:text-brand-primary">
              {name}
            </Heading>
            <Paragraph variant="reg" className="mb-6 leading-relaxed">
              {description}
            </Paragraph>
          </div>

          <div>
            <div className="flex flex-wrap gap-2 mb-6">
              {techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded bg-bg-primary/60 border border-border-subtle text-[10px] font-mono text-text-secondary"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="inline-flex items-center space-x-2 text-sm text-brand-primary font-mono font-semibold">
              <span>Explore Case Study</span>
              <span className="transform transition-transform duration-300 group-hover:translate-x-1.5">→</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- ExperienceCard ---
interface ExperienceCardProps {
  role: string;
  organization: string;
  duration: string;
  techUsed: string[];
  proofLinkLabel?: string;
  proofLinkUrl?: string;
  description: string;
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({
  role,
  organization,
  duration,
  techUsed,
  proofLinkLabel,
  proofLinkUrl,
  description,
}) => {
  return (
    <Card lift={false} className="border-subtle-thin p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 hover:border-border-strong duration-300">
      <div className="md:w-1/3 shrink-0 flex flex-col justify-between">
        <div>
          <Heading level={3} variant="sm" className="mb-1">
            {role}
          </Heading>
          <Paragraph variant="sm" className="text-brand-primary font-mono text-xs font-semibold mb-2">
            {organization}
          </Paragraph>
        </div>
        <Metadata>{duration}</Metadata>
      </div>
      
      <div className="md:w-2/3 flex flex-col justify-between gap-4">
        <div>
          <Paragraph variant="sm" className="text-text-secondary leading-relaxed mb-4">
            {description}
          </Paragraph>
          {proofLinkUrl && (
            <a
              href={proofLinkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-xs font-mono text-brand-primary border-b border-brand-primary/20 hover:border-brand-primary hover:text-brand-primary/80 transition-colors"
            >
              {proofLinkLabel || "Verify Proof of Work"} →
            </a>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border-subtle">
          {techUsed.map((tech, idx) => (
            <Badge key={idx} variant="neutral" className="text-[9px] px-2 py-0">
              {tech}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  );
};

// --- CertificateCard ---
interface CertificateCardProps {
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  skills: string[];
}

export const CertificateCard: React.FC<CertificateCardProps> = ({
  title,
  issuer,
  date,
  credentialUrl,
  skills,
}) => {
  return (
    <Card className="flex flex-col justify-between h-full p-5 hover:border-border-strong select-none">
      <div>
        <Metadata>{date}</Metadata>
        <Heading level={4} variant="sm" className="mt-2 mb-1">
          {title}
        </Heading>
        <Paragraph variant="sm" className="text-text-muted font-mono text-[11px] mb-4">
          {issuer}
        </Paragraph>
      </div>

      <div>
        <div className="flex flex-wrap gap-1 mb-4">
          {skills.map((skill, idx) => (
            <span key={idx} className="text-[9px] font-mono text-text-muted bg-bg-primary/40 px-1.5 py-0.5 rounded border border-border-subtle/50">
              {skill}
            </span>
          ))}
        </div>
        {credentialUrl && (
          <a
            href={credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-[10px] font-mono text-brand-primary hover:text-brand-primary/80"
          >
            Credential Link ↗
          </a>
        )}
      </div>
    </Card>
  );
};

// --- ArticleCard (Brain Note) ---
interface ArticleCardProps {
  id: string;
  title: string;
  category: string;
  readTime: string;
  snippet: string;
  onClick?: () => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  title,
  category,
  readTime,
  snippet,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="group w-full p-5 rounded-lg border border-border-subtle bg-bg-secondary/20 hover:border-border-strong hover:bg-bg-secondary/40 transition-all duration-300 text-left cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4"
    >
      <div className="space-y-1.5">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono text-brand-primary uppercase tracking-wider">{category}</span>
          <span className="h-1 w-1 rounded-full bg-border-strong" />
          <Metadata className="text-[10px]">{readTime}</Metadata>
        </div>
        <Heading level={3} variant="sm" className="transition-colors group-hover:text-brand-primary mt-1">
          {title}
        </Heading>
        <Paragraph variant="sm" className="text-text-secondary mt-1 max-w-2xl">
          {snippet}
        </Paragraph>
      </div>
      <div className="flex items-center justify-end md:justify-center shrink-0">
        <span className="h-8 w-8 rounded-full border border-border-subtle group-hover:border-brand-primary group-hover:bg-brand-primary/10 flex items-center justify-center text-text-secondary group-hover:text-brand-primary transition-all duration-300">
          →
        </span>
      </div>
    </div>
  );
};
