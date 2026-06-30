import React from "react";

// --- SectionLabel ---
interface SectionLabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}
export const SectionLabel: React.FC<SectionLabelProps> = ({ children, className = "", ...props }) => {
  return (
    <span
      className={`text-tiny uppercase tracking-[0.12em] text-brand-muted font-mono font-semibold ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

// --- DisplayHeading ---
interface DisplayHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  variant?: "xxl" | "xl";
  as?: "h1" | "h2";
  children: React.ReactNode;
}
export const DisplayHeading: React.FC<DisplayHeadingProps> = ({
  variant = "xl",
  as: Component = "h1",
  children,
  className = "",
  ...props
}) => {
  const styles = variant === "xxl" ? "text-display-xxl" : "text-display-xl";
  return (
    <Component
      className={`${styles} font-display leading-[1.05] tracking-tight text-text-primary ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

// --- Heading ---
interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4;
  variant?: "lg" | "md" | "sm";
  children: React.ReactNode;
}
export const Heading: React.FC<HeadingProps> = ({
  level = 2,
  variant = "md",
  children,
  className = "",
  ...props
}) => {
  const Component = `h${level}` as React.ElementType;
  const styles = {
    lg: "text-heading-lg",
    md: "text-heading-md",
    sm: "text-heading-sm",
  };
  return (
    <Component
      className={`${styles[variant]} font-display font-semibold text-text-primary tracking-tight ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

// --- Paragraph ---
interface ParagraphProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: "lg" | "reg" | "sm";
  children: React.ReactNode;
}
export const Paragraph: React.FC<ParagraphProps> = ({
  variant = "reg",
  children,
  className = "",
  ...props
}) => {
  const styles = {
    lg: "text-body-lg text-text-primary",
    reg: "text-body-reg text-text-secondary leading-relaxed",
    sm: "text-body-sm text-text-secondary leading-normal",
  };
  return (
    <p className={`${styles[variant]} font-sans ${className}`} {...props}>
      {children}
    </p>
  );
};

// --- Caption ---
interface CaptionProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}
export const Caption: React.FC<CaptionProps> = ({ children, className = "", ...props }) => {
  return (
    <span className={`text-body-sm text-text-muted font-sans italic ${className}`} {...props}>
      {children}
    </span>
  );
};

// --- Quote ---
interface QuoteProps extends React.HTMLAttributes<HTMLQuoteElement> {
  children: React.ReactNode;
  author?: string;
}
export const Quote: React.FC<QuoteProps> = ({ children, author, className = "", ...props }) => {
  return (
    <blockquote
      className={`pl-4 border-l-2 border-brand-primary/60 text-body-lg text-text-primary italic font-sans py-1 ${className}`}
      {...props}
    >
      <p>{children}</p>
      {author && (
        <cite className="block text-xs font-mono text-text-muted mt-2 not-italic">
          — {author}
        </cite>
      )}
    </blockquote>
  );
};

// --- InlineCode ---
interface InlineCodeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}
export const InlineCode: React.FC<InlineCodeProps> = ({ children, className = "", ...props }) => {
  return (
    <code
      className={`px-1.5 py-0.5 rounded bg-bg-secondary text-brand-primary border border-border-subtle font-mono text-xs ${className}`}
      {...props}
    >
      {children}
    </code>
  );
};

// --- Metadata ---
interface MetadataProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}
export const Metadata: React.FC<MetadataProps> = ({ children, className = "", ...props }) => {
  return (
    <span className={`text-tiny font-mono text-text-muted ${className}`} {...props}>
      {children}
    </span>
  );
};

// --- Badge ---
interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "brand" | "neutral" | "success" | "warning" | "danger";
  children: React.ReactNode;
}
export const Badge: React.FC<BadgeProps> = ({ variant = "neutral", children, className = "", ...props }) => {
  const styles = {
    brand: "bg-brand-primary/10 border-brand-primary/20 text-brand-primary",
    neutral: "bg-bg-secondary border-border-strong text-text-secondary",
    success: "bg-success/10 border-success/20 text-success",
    warning: "bg-warning/10 border-warning/20 text-warning",
    danger: "bg-danger/10 border-danger/20 text-danger",
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full border text-[10px] font-mono font-medium ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

// --- Tag ---
interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  active?: boolean;
  children: React.ReactNode;
}
export const Tag: React.FC<TagProps> = ({ active = false, children, className = "", ...props }) => {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full border text-xs font-mono font-medium select-none cursor-pointer transition-colors ${
        active
          ? "bg-brand-primary/10 border-brand-primary text-brand-primary"
          : "bg-bg-secondary/40 border-border-subtle text-text-secondary hover:border-brand-primary hover:text-text-primary"
      } ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};
