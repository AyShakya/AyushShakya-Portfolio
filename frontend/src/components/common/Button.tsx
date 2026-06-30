import React from "react";
import { motion } from "framer-motion";

type ReactButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart" | "style"
>;

export interface ButtonProps extends ReactButtonProps {
  variant?: "primary" | "secondary" | "ghost" | "icon" | "text" | "external" | "tag";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  href?: string;
  external?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  href,
  external = false,
  className = "",
  disabled,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-mono font-medium rounded-md focus-ring-custom transition-all select-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";
  
  // Design Token variant mapping
  const variants = {
    primary: "bg-brand-primary hover:bg-brand-primary/90 text-text-primary shadow-soft",
    secondary: "bg-bg-secondary hover:bg-bg-elevated text-text-primary border border-border-strong",
    ghost: "bg-transparent hover:bg-bg-secondary/60 text-text-primary border border-border-subtle",
    icon: "p-2 bg-transparent hover:bg-bg-secondary text-text-primary rounded-full",
    text: "p-0 bg-transparent text-text-secondary hover:text-text-primary",
    external: "bg-transparent text-brand-primary hover:text-brand-primary/80 border-b border-brand-primary/40 hover:border-brand-primary",
    tag: "px-3 py-1 bg-bg-secondary/40 border border-border-subtle text-text-secondary text-xs rounded-full hover:border-brand-primary hover:text-text-primary",
  };

  // Size token mapping
  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-5 py-3 text-sm",
    lg: "px-7 py-4 text-base",
  };

  // Adjust sizes for text, icon, and external variants
  const sizeClass = (variant === "text" || variant === "external" || variant === "icon" || variant === "tag") 
    ? "" 
    : sizes[size];

  const content = (
    <>
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {!isLoading && leftIcon && <span className="mr-2 inline-flex items-center">{leftIcon}</span>}
      <span>{children}</span>
      {!isLoading && rightIcon && <span className="ml-2 inline-flex items-center">{rightIcon}</span>}
    </>
  );

  const motionConfig = {
    whileHover: { scale: 1.015, transition: { duration: 0.18, ease: [0.16, 1, 0.3, 1] as any } },
    whileTap: { scale: 0.985 },
  };

  if (href) {
    const linkClasses = `${baseStyles} ${variants[variant]} ${sizeClass} ${className}`;
    if (external) {
      return (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClasses}
          {...(disabled ? {} : (motionConfig as any))}
        >
          {content}
        </motion.a>
      );
    }
    return (
      <motion.a
        href={href}
        className={linkClasses}
        {...(disabled ? {} : (motionConfig as any))}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      disabled={disabled || isLoading}
      className={`${baseStyles} ${variants[variant]} ${sizeClass} ${className}`}
      {...(disabled || isLoading ? {} : motionConfig)}
      {...props}
    >
      {content}
    </motion.button>
  );
};
