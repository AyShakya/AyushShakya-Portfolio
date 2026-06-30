import React from "react";

// --- Container ---
interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "full";
  children: React.ReactNode;
}
export const Container: React.FC<ContainerProps> = ({ size = "md", children, className = "", ...props }) => {
  const containerClasses = {
    sm: "container-reading",
    md: "container-section",
    lg: "container-wide",
    full: "container-bleed",
  };
  return (
    <div className={`${containerClasses[size]} ${className}`} {...props}>
      {children}
    </div>
  );
};

// --- Section ---
interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  spacing?: "sm" | "md" | "lg" | "hero" | "none";
  background?: "primary" | "secondary" | "elevated" | "transparent";
  children: React.ReactNode;
}
export const Section: React.FC<SectionProps> = ({
  spacing = "md",
  background = "transparent",
  children,
  className = "",
  ...props
}) => {
  const paddingClasses = {
    none: "py-0",
    sm: "py-16 md:py-24", // Spacing 64 / 96
    md: "py-24 md:py-32", // Spacing 96 / 120
    lg: "py-32 md:py-40", // Spacing 120 / 160
    hero: "py-40 md:py-60", // Spacing 160 / 240
  };

  const bgClasses = {
    transparent: "bg-transparent",
    primary: "bg-bg-primary",
    secondary: "bg-bg-secondary",
    elevated: "bg-bg-elevated",
  };

  return (
    <section
      className={`w-full ${paddingClasses[spacing]} ${bgClasses[background]} ${className}`}
      {...props}
    >
      {children}
    </section>
  );
};

// --- Grid ---
interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4 | 12;
  gap?: 4 | 8 | 12 | 16 | 24 | 32 | 40 | 48;
  children: React.ReactNode;
}
export const Grid: React.FC<GridProps> = ({ cols = 12, gap = 24, children, className = "", ...props }) => {
  const gapClasses = {
    4: "gap-1",
    8: "gap-2",
    12: "gap-3",
    16: "gap-4",
    24: "gap-6",
    32: "gap-8",
    40: "gap-10",
    48: "gap-12",
  };

  const colClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 md:grid-cols-4",
    12: "grid-cols-12",
  };

  return (
    <div className={`grid ${colClasses[cols]} ${gapClasses[gap]} ${className}`} {...props}>
      {children}
    </div>
  );
};

// --- Stack ---
interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: 4 | 8 | 12 | 16 | 24 | 32 | 40 | 48 | 64 | 80 | 96;
  align?: "start" | "center" | "end" | "stretch";
  children: React.ReactNode;
}
export const Stack: React.FC<StackProps> = ({ gap = 16, align = "stretch", children, className = "", ...props }) => {
  const gapClasses = {
    4: "space-y-1",
    8: "space-y-2",
    12: "space-y-3",
    16: "space-y-4",
    24: "space-y-6",
    32: "space-y-8",
    40: "space-y-10",
    48: "space-y-12",
    64: "space-y-16",
    80: "space-y-20",
    96: "space-y-24",
  };

  const alignClasses = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
    stretch: "items-stretch",
  };

  return (
    <div className={`flex flex-col ${gapClasses[gap]} ${alignClasses[align]} ${className}`} {...props}>
      {children}
    </div>
  );
};

// --- FlexGroup ---
interface FlexGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: 4 | 8 | 12 | 16 | 24 | 32 | 40;
  direction?: "row" | "row-reverse" | "col" | "col-reverse";
  align?: "start" | "center" | "end" | "baseline" | "stretch";
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
  wrap?: "wrap" | "nowrap" | "wrap-reverse";
  children: React.ReactNode;
}
export const FlexGroup: React.FC<FlexGroupProps> = ({
  gap = 8,
  direction = "row",
  align = "center",
  justify = "start",
  wrap = "wrap",
  children,
  className = "",
  ...props
}) => {
  const gapClasses = {
    4: "gap-1",
    8: "gap-2",
    12: "gap-3",
    16: "gap-4",
    24: "gap-6",
    32: "gap-8",
    40: "gap-10",
  };

  const directionClasses = {
    row: "flex-row",
    "row-reverse": "flex-row-reverse",
    col: "flex-col",
    "col-reverse": "flex-col-reverse",
  };

  const alignClasses = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
    baseline: "items-baseline",
    stretch: "items-stretch",
  };

  const justifyClasses = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
    between: "justify-between",
    around: "justify-around",
    evenly: "justify-evenly",
  };

  const wrapClasses = {
    wrap: "flex-wrap",
    nowrap: "flex-nowrap",
    "wrap-reverse": "flex-wrap-reverse",
  };

  return (
    <div
      className={`flex ${directionClasses[direction]} ${alignClasses[align]} ${justifyClasses[justify]} ${wrapClasses[wrap]} ${gapClasses[gap]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

// --- Divider ---
interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "subtle" | "strong";
}
export const Divider: React.FC<DividerProps> = ({ variant = "subtle", className = "", ...props }) => {
  const colorClass = variant === "subtle" ? "border-border-subtle" : "border-border-strong";
  return <hr className={`w-full border-t ${colorClass} ${className}`} {...props} />;
};

// --- Spacer ---
interface SpacerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 4 | 8 | 12 | 16 | 24 | 32 | 40 | 48 | 64 | 80 | 96 | 120 | 160 | 240;
}
export const Spacer: React.FC<SpacerProps> = ({ size = 24, className = "", ...props }) => {
  const heightClasses = {
    4: "h-1",
    8: "h-2",
    12: "h-3",
    16: "h-4",
    24: "h-6",
    32: "h-8",
    40: "h-10",
    48: "h-12",
    64: "h-16",
    80: "h-20",
    96: "h-24",
    120: "h-[7.5rem]",
    160: "h-[10rem]",
    240: "h-[15rem]",
  };
  return <div className={`${heightClasses[size]} w-full shrink-0 ${className}`} {...props} />;
};
