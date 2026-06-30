import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- MasonryGrid ---
interface MasonryGridProps {
  children: React.ReactNode;
  columns?: {
    sm?: number;
    md?: number;
    lg?: number;
  };
  gap?: number;
}

export const MasonryGrid: React.FC<MasonryGridProps> = ({
  children,
  columns = { sm: 1, md: 2, lg: 3 },
  gap = 24,
}) => {
  // Translate columns config to Tailwind columns classes
  const colClass = `columns-${columns.sm} md:columns-${columns.md} lg:columns-${columns.lg}`;
  const gapClass = gap === 16 ? "gap-4" : "gap-6";

  return (
    <div className={`${colClass} ${gapClass} w-full [column-fill:_balance]`}>
      {children}
    </div>
  );
};

// --- GalleryItem ---
interface GalleryItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const GalleryItem: React.FC<GalleryItemProps> = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`break-inside-avoid mb-6 w-full ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

// --- GalleryImage ---
interface GalleryImageProps {
  src: string;
  alt: string;
  onClick?: () => void;
  aspectRatio?: "square" | "video" | "portrait" | "auto" | "wide";
  className?: string;
}

export const GalleryImage: React.FC<GalleryImageProps> = ({
  src,
  alt,
  onClick,
  aspectRatio = "auto",
  className = "",
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const aspectClasses = {
    square: "aspect-square",
    video: "aspect-video",
    portrait: "aspect-[3/4]",
    wide: "aspect-[16/10]",
    auto: "aspect-auto",
  };

  return (
    <div
      onClick={onClick}
      className={`relative w-full overflow-hidden bg-bg-secondary rounded-lg border border-border-subtle cursor-pointer group ${aspectClasses[aspectRatio]} ${className}`}
    >
      {/* Skeleton / Placeholder state */}
      <div
        className={`absolute inset-0 bg-bg-secondary flex items-center justify-center transition-opacity duration-500 ${
          isLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className="h-5 w-5 rounded-full border border-border-strong border-t-brand-primary animate-spin" />
      </div>

      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        loading="lazy"
        className={`w-full h-full object-cover transition-all duration-[1200ms] ease-strong-out ${
          isLoaded ? "opacity-100 scale-100 animate-reveal" : "opacity-0 scale-[1.04]"
        } group-hover:scale-[1.03]`}
      />

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-overlay opacity-0 group-hover:opacity-10 transition-opacity duration-400" />
    </div>
  );
};

// --- ImageModal (Lightbox) ---
interface ImageModalProps {
  isOpen: boolean;
  src: string;
  alt: string;
  onClose: () => void;
  title?: string;
  description?: string;
}

export const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  src,
  alt,
  onClose,
  title,
  description,
}) => {
  // Prevent background scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center">
          {/* Overlay backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm cursor-zoom-out"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 max-w-5xl max-h-[85vh] w-full px-6 flex flex-col items-center justify-center gap-4"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute -top-12 right-6 p-2 text-text-secondary hover:text-text-primary hover:bg-bg-secondary/40 rounded-full font-mono text-xs cursor-pointer"
            >
              [CLOSE]
            </button>

            {/* Main Image */}
            <div className="relative max-w-full overflow-hidden rounded-lg border border-border-strong bg-bg-secondary select-none">
              <img src={src} alt={alt} className="max-h-[70vh] object-contain w-auto h-auto" />
            </div>

            {/* Captions */}
            {(title || description) && (
              <div className="text-center max-w-xl px-4 py-2">
                {title && (
                  <h4 className="font-display font-medium text-base text-text-primary mb-1">
                    {title}
                  </h4>
                )}
                {description && (
                  <p className="font-sans text-xs text-text-secondary">
                    {description}
                  </p>
                )}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
