import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../common/Button";
import { Container } from "../common/Container";
import { Heading, Paragraph } from "../common/Typography";

interface PhysicsCardData {
  id: string;
  label: string;
  category: "tech" | "status" | "focus" | "role";
}

const CARDS_DATA: PhysicsCardData[] = [
  { id: "react", label: "React // TS", category: "tech" },
  { id: "golang", label: "Golang // CLI", category: "tech" },
  { id: "docker", label: "Docker // Unix", category: "tech" },
  { id: "ollama", label: "Ollama // LLMs", category: "tech" },
  { id: "ai", label: "Agentic AI Orchestrator", category: "focus" },
  { id: "systems", label: "Distributed Systems", category: "focus" },
  { id: "avail", label: "Available Immediately", category: "status" },
  { id: "loc", label: "HQ // Bangalore", category: "status" },
  { id: "dx", label: "Developer Experience", category: "role" }
];

interface CardPhysicsState {
  id: string;
  element: HTMLDivElement | null;
  // Home position in viewport percentage (0-100)
  homeX: number;
  homeY: number;
  // Current offsets from home in pixels
  x: number;
  y: number;
  rot: number;
  scale: number;
  // Velocities
  vx: number;
  vy: number;
  vrot: number;
  // Sinusoidal float properties
  floatAmpX: number;
  floatAmpY: number;
  floatFreqX: number;
  floatFreqY: number;
  floatPhase: number;
  // Interaction state
  state: "entrance" | "floating" | "hovered" | "dragged" | "returning";
  isKeyboardControlled: boolean;
  // Drag parameters
  dragStartX: number;
  dragStartY: number;
  dragStartDx: number;
  dragStartDy: number;
}

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const textGroupRef = useRef<HTMLDivElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  
  const cardsRef = useRef<CardPhysicsState[]>([]);
  const requestRef = useRef<number | null>(null);
  const prevTimeRef = useRef<number | null>(null);
  
  const [activeCardCount, setActiveCardCount] = useState(9);
  const [entranceCompleted, setEntranceCompleted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Set card counts based on responsive breakpoints
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const mobile = width < 768;
      setIsMobile(mobile);
      if (mobile) {
        setActiveCardCount(4); // Keep it clean on mobile
      } else if (width < 1024) {
        setActiveCardCount(6); // Tablet
      } else {
        setActiveCardCount(9); // Full Desktop
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Layout Generation Engine: computes non-colliding home coordinates on resize or refresh
  const generateLayout = () => {
    if (!containerRef.current) return;
    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = containerRef.current.clientHeight;

    // Bounding Box Safe Areas in percentages (0-100)
    const safeZones = [
      // Top Navigation Safe area
      { xStart: 0, xEnd: 100, yStart: 0, yEnd: 15 },
      // Bottom Scroll Indicator area
      { xStart: 0, xEnd: 100, yStart: 85, yEnd: 100 },
    ];

    // Read bounding boxes of key DOM items to dodge them dynamically
    if (textGroupRef.current) {
      const rect = textGroupRef.current.getBoundingClientRect();
      const parentRect = containerRef.current.getBoundingClientRect();
      const xStart = ((rect.left - parentRect.left) / containerWidth) * 100 - 5;
      const xEnd = ((rect.right - parentRect.left) / containerWidth) * 100 + 5;
      const yStart = ((rect.top - parentRect.top) / containerHeight) * 100 - 5;
      const yEnd = ((rect.bottom - parentRect.top) / containerHeight) * 100 + 5;
      safeZones.push({ xStart, xEnd, yStart, yEnd });
    }

    if (portraitRef.current) {
      const rect = portraitRef.current.getBoundingClientRect();
      const parentRect = containerRef.current.getBoundingClientRect();
      const xStart = ((rect.left - parentRect.left) / containerWidth) * 100 - 5;
      const xEnd = ((rect.right - parentRect.left) / containerWidth) * 100 + 5;
      const yStart = ((rect.top - parentRect.top) / containerHeight) * 100 - 5;
      const yEnd = ((rect.bottom - parentRect.top) / containerHeight) * 100 + 5;
      safeZones.push({ xStart, xEnd, yStart, yEnd });
    }

    if (ctaGroupRef.current) {
      const rect = ctaGroupRef.current.getBoundingClientRect();
      const parentRect = containerRef.current.getBoundingClientRect();
      const xStart = ((rect.left - parentRect.left) / containerWidth) * 100 - 5;
      const xEnd = ((rect.right - parentRect.left) / containerWidth) * 100 + 5;
      const yStart = ((rect.top - parentRect.top) / containerHeight) * 100 - 5;
      const yEnd = ((rect.bottom - parentRect.top) / containerHeight) * 100 + 5;
      safeZones.push({ xStart, xEnd, yStart, yEnd });
    }

    const nextStates: CardPhysicsState[] = [];
    const minDistance = isMobile ? 18 : 14; // min percentage distance between cards

    for (let i = 0; i < activeCardCount; i++) {
      const cardData = CARDS_DATA[i];
      let homeX = 0;
      let homeY = 0;
      let isValid = false;
      let attempts = 0;

      while (!isValid && attempts < 150) {
        // Generate random coordinates in outer grid borders
        homeX = 5 + Math.random() * 90;
        homeY = 12 + Math.random() * 73;
        attempts++;

        // Check if falls in any safe zones
        const insideSafeZone = safeZones.some(
          (zone) =>
            homeX >= zone.xStart &&
            homeX <= zone.xEnd &&
            homeY >= zone.yStart &&
            homeY <= zone.yEnd
        );

        if (insideSafeZone) continue;

        // Check distance collision with already placed cards
        const collidesWithOthers = nextStates.some((other) => {
          const dx = other.homeX - homeX;
          const dy = other.homeY - homeY;
          return Math.sqrt(dx * dx + dy * dy) < minDistance;
        });

        if (collidesWithOthers) continue;

        isValid = true;
      }

      // Default spawn slot if generation engine times out
      if (!isValid) {
        homeX = 5 + (i * 10) % 90;
        homeY = 15 + Math.floor(i / 3) * 20;
      }

      // Look up existing ref state or init new variables
      const existing = cardsRef.current.find((c) => c.id === cardData.id);
      
      nextStates.push({
        id: cardData.id,
        element: existing?.element || null,
        homeX,
        homeY,
        x: existing?.x || 0,
        y: existing?.y || 0,
        rot: existing?.rot || (Math.random() * 12 - 6),
        scale: existing?.scale || 1,
        vx: existing?.vx || 0,
        vy: existing?.vy || 0,
        vrot: existing?.vrot || 0,
        floatAmpX: 3 + Math.random() * 5,
        floatAmpY: 3 + Math.random() * 5,
        floatFreqX: 0.8 + Math.random() * 0.7,
        floatFreqY: 0.8 + Math.random() * 0.7,
        floatPhase: Math.random() * Math.PI * 2,
        state: existing?.state || "entrance",
        isKeyboardControlled: existing?.isKeyboardControlled || false,
        dragStartX: existing?.dragStartX || 0,
        dragStartY: existing?.dragStartY || 0,
        dragStartDx: existing?.dragStartDx || 0,
        dragStartDy: existing?.dragStartDy || 0,
      });
    }

    cardsRef.current = nextStates;
  };

  // Re-generate layout on resize or mount once elements render
  useEffect(() => {
    const timer = setTimeout(() => {
      generateLayout();
    }, 100);
    return () => clearTimeout(timer);
  }, [activeCardCount]);

  // Entrance Timelines: activate floats after page load sequences complete
  useEffect(() => {
    const timer = setTimeout(() => {
      cardsRef.current.forEach((card) => {
        if (card.state === "entrance") {
          card.state = "floating";
        }
      });
      setEntranceCompleted(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, [activeCardCount]);

  // Physics animation loop: computes spring physics and floats at 60 FPS
  useEffect(() => {
    const stiffness = 220; // spring strength
    const damping = 18;    // spring resistance
    const mass = 1.0;

    const animatePhysics = (time: number) => {
      if (!prevTimeRef.current) {
        prevTimeRef.current = time;
        requestRef.current = requestAnimationFrame(animatePhysics);
        return;
      }

      const dt = Math.min((time - prevTimeRef.current) / 1000, 0.03); // Cap dt to prevent spring explosions
      prevTimeRef.current = time;

      cardsRef.current.forEach((card) => {
        if (!card.element) return;

        let targetDx = 0;
        let targetDy = 0;
        let targetRot = 0;
        let targetScale = 1;

        if (card.state === "entrance") {
          // Keep it simple, let CSS handle entry
          targetScale = 0;
        } else if (card.state === "floating") {
          // Smooth independent low-amplitude sinusoidal drifts
          const floatTime = time / 1000;
          targetDx = card.floatAmpX * Math.sin(floatTime * card.floatFreqX + card.floatPhase);
          targetDy = card.floatAmpY * Math.cos(floatTime * card.floatFreqY + card.floatPhase);
          targetRot = 2 * Math.sin(floatTime * 0.5 + card.floatPhase);
          
          // Interpolate to float positions
          card.x += (targetDx - card.x) * 4 * dt;
          card.y += (targetDy - card.y) * 4 * dt;
          card.rot += (targetRot - card.rot) * 4 * dt;
          card.scale += (targetScale - card.scale) * 6 * dt;
        } else if (card.state === "hovered") {
          // Hover state: slight lift, lock scale and rotation
          targetScale = 1.03;
          targetRot = card.rot * 0.9; // Straighten slightly
          card.x += (-card.x) * 8 * dt;
          card.y += (-card.y) * 8 * dt;
          card.rot += (targetRot - card.rot) * 8 * dt;
          card.scale += (targetScale - card.scale) * 12 * dt;
        } else if (card.state === "dragged") {
          // Card follows pointer or arrow keys in dragged state, skip spring updates
          targetScale = 1.05;
          card.scale += (targetScale - card.scale) * 12 * dt;
        } else if (card.state === "returning") {
          // Spring integration equations: -kx - cv
          const forceX = -stiffness * card.x;
          const forceY = -stiffness * card.y;
          const forceRot = -stiffness * card.rot;

          const dampX = -damping * card.vx;
          const dampY = -damping * card.vy;
          const dampRot = -damping * card.vrot;

          const ax = (forceX + dampX) / mass;
          const ay = (forceY + dampY) / mass;
          const arot = (forceRot + dampRot) / mass;

          card.vx += ax * dt;
          card.vy += ay * dt;
          card.vrot += arot * dt;

          card.x += card.vx * dt;
          card.y += card.vy * dt;
          card.rot += card.vrot * dt;
          card.scale += (targetScale - card.scale) * 10 * dt;

          // Check if spring has completely settled
          const dist = Math.sqrt(card.x * card.x + card.y * card.y);
          const velocity = Math.sqrt(card.vx * card.vx + card.vy * card.vy);
          if (dist < 0.2 && velocity < 0.2) {
            card.state = "floating";
            card.vx = 0;
            card.vy = 0;
            card.vrot = 0;
          }
        }

        // Apply visual updates via GPU-accelerated translate3d
        card.element.style.transform = `translate3d(${card.x}px, ${card.y}px, 0) rotate(${card.rot}deg) scale(${card.scale})`;
      });

      requestRef.current = requestAnimationFrame(animatePhysics);
    };

    // Intersection Observer: Suspend animation loop when scrolled offscreen to preserve GPU/CPU performance
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            prevTimeRef.current = null;
            requestRef.current = requestAnimationFrame(animatePhysics);
          } else {
            if (requestRef.current) {
              cancelAnimationFrame(requestRef.current);
              requestRef.current = null;
            }
          }
        });
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [activeCardCount]);

  // Pointer Down Drag Listener
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>, cardId: string) => {
    const card = cardsRef.current.find((c) => c.id === cardId);
    if (!card || card.isKeyboardControlled) return;

    card.state = "dragged";
    card.dragStartX = e.clientX;
    card.dragStartY = e.clientY;
    card.dragStartDx = card.x;
    card.dragStartDy = card.y;
    
    // Set custom grab cursor pointer overlay
    if (card.element) {
      card.element.style.cursor = "grabbing";
    }

    let lastTime = performance.now();
    let lastX = card.x;
    let lastY = card.y;

    const handlePointerMove = (moveEvent: PointerEvent) => {
      const now = performance.now();
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      const diffX = moveEvent.clientX - card.dragStartX;
      const diffY = moveEvent.clientY - card.dragStartY;

      card.x = card.dragStartDx + diffX;
      card.y = card.dragStartDy + diffY;

      // Track drag velocity for momentum physics on release
      if (dt > 0) {
        card.vx = (card.x - lastX) / dt;
        card.vy = (card.y - lastY) / dt;
      }

      lastX = card.x;
      lastY = card.y;
    };

    const handlePointerUp = () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);

      if (card.element) {
        card.element.style.cursor = "grab";
      }

      // Apply drag release momentum limits to prevent excessive flying
      const maxVelocity = 400;
      const speed = Math.sqrt(card.vx * card.vx + card.vy * card.vy);
      if (speed > maxVelocity) {
        card.vx = (card.vx / speed) * maxVelocity;
        card.vy = (card.vy / speed) * maxVelocity;
      }

      card.state = "returning";
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
  };

  // Keyboard accessibility arrow key handlers
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, cardId: string) => {
    const card = cardsRef.current.find((c) => c.id === cardId);
    if (!card) return;

    const step = 15; // move distance in pixels per keydown

    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space", "Enter"].includes(e.key)) {
      e.preventDefault(); // prevent default browser scroll triggers
    }

    if (e.key === "ArrowUp") {
      card.state = "dragged";
      card.isKeyboardControlled = true;
      card.y -= step;
    } else if (e.key === "ArrowDown") {
      card.state = "dragged";
      card.isKeyboardControlled = true;
      card.y += step;
    } else if (e.key === "ArrowLeft") {
      card.state = "dragged";
      card.isKeyboardControlled = true;
      card.x -= step;
    } else if (e.key === "ArrowRight") {
      card.state = "dragged";
      card.isKeyboardControlled = true;
      card.x += step;
    } else if (e.key === "Escape" || e.key === "Enter") {
      card.isKeyboardControlled = false;
      card.state = "returning";
    }
  };

  const handleBlur = (cardId: string) => {
    const card = cardsRef.current.find((c) => c.id === cardId);
    if (card) {
      card.isKeyboardControlled = false;
      card.state = "returning";
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[90vh] md:h-[95vh] lg:h-screen overflow-hidden flex items-center bg-bg-primary select-none border-b border-border-subtle"
    >
      {/* 1. Grid Background Layer */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:5rem_5rem] md:bg-[size:6rem_6rem] pointer-events-none" />

      {/* 2. Abstract Radial Gradient Layer */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,var(--color-bg-primary)_90%)] pointer-events-none" />

      {/* 3. Noise Overlay Layer */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(circle,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:10px_10px]" />

      <Container size="lg" className="relative h-full flex items-center">
        {/* Main Content Layout Grid */}
        <div className="grid grid-cols-12 w-full gap-6 items-center">
          
          {/* 4. Left Columns: Typography & CTAs (Zone A & D & E) */}
          <div className="col-span-12 md:col-span-7 z-10 select-text flex flex-col justify-center gap-6">
            <div ref={textGroupRef} className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-mono select-none">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary/60 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary"></span>
                </span>
                <span>HQ // Bangalore // Open to roles</span>
              </div>

              <Heading level={1} variant="lg" className="text-display-xxl leading-[1.0] tracking-tight font-extrabold select-text">
                Ayush Shakya
              </Heading>

              <Paragraph variant="lg" className="text-text-secondary font-light max-w-lg select-text mt-4">
                Software Engineer specialized in building robust backend architectures, distributed systems, and agentic AI execution pipelines.
              </Paragraph>
            </div>

            {/* CTA buttons */}
            <div ref={ctaGroupRef} className="flex flex-wrap gap-4 pt-4">
              <Button href="#work" variant="primary">
                View My Work
              </Button>
              <Button href="#contact" variant="ghost">
                Contact Me
              </Button>
            </div>
          </div>

          {/* 5. Right Columns: Portrait Graphic (Zone B) */}
          <div className="col-span-12 md:col-span-5 relative flex justify-end md:justify-center">
            <div
              ref={portraitRef}
              className="relative w-[280px] sm:w-[320px] md:w-[350px] lg:w-[380px] aspect-[3/4] bg-bg-secondary border border-border-strong rounded-lg overflow-hidden opacity-90 transition-transform duration-1000 ease-strong-out"
            >
              <img
                src="/portrait.jpg"
                alt="Ayush Shakya workspace rendering"
                className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 transition-all duration-[1200ms]"
                loading="eager"
              />
              {/* Cinematic Vignette Overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_60%,rgba(11,11,11,0.6))] pointer-events-none" />
            </div>
          </div>

        </div>

        {/* 6. Physics Cards Layer (Zone C) */}
        <div className="absolute inset-0 z-20 pointer-events-none select-none">
          {cardsRef.current.slice(0, activeCardCount).map((card) => {
            const cardData = CARDS_DATA.find((d) => d.id === card.id);
            if (!cardData) return null;

            const categoryStyle = {
              tech: "border-border-subtle bg-bg-secondary/40 text-text-primary",
              focus: "border-brand-primary/20 bg-brand-primary/5 text-brand-primary font-semibold",
              status: "border-border-strong bg-bg-elevated/70 text-text-secondary text-[11px]",
              role: "border-border-strong bg-bg-secondary/80 text-text-primary",
            };

            return (
              <div
                key={card.id}
                ref={(el) => {
                  card.element = el;
                }}
                tabIndex={0}
                onKeyDown={(e) => handleKeyDown(e, card.id)}
                onBlur={() => handleBlur(card.id)}
                onPointerDown={(e) => handlePointerDown(e, card.id)}
                onMouseEnter={() => {
                  if (card.state === "floating") card.state = "hovered";
                }}
                onMouseLeave={() => {
                  if (card.state === "hovered") card.state = "floating";
                }}
                style={{
                  left: `${card.homeX}%`,
                  top: `${card.homeY}%`,
                  cursor: "grab",
                  touchAction: "none",
                }}
                className={`absolute px-4 py-2.5 rounded border pointer-events-auto backdrop-blur-xs flex items-center gap-2 text-xs font-mono font-medium shadow-soft select-none transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-brand-primary ${
                  categoryStyle[cardData.category]
                } ${
                  entranceCompleted 
                    ? "" 
                    : "opacity-0 translate-y-6 animate-fade-in-up"
                }`}
              >
                {/* Dynamic Category bullet */}
                <span className={`h-1.5 w-1.5 rounded-full ${
                  cardData.category === "focus" 
                    ? "bg-brand-primary animate-pulse" 
                    : cardData.category === "status"
                    ? "bg-success"
                    : "bg-text-muted"
                }`} />
                <span>{cardData.label}</span>
              </div>
            );
          })}
        </div>

        {/* 7. Scroll Indicator Layer (Zone F) */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none select-none z-10">
          <span className="text-[10px] font-mono text-text-muted uppercase tracking-[0.2em] font-semibold animate-pulse">
            Scroll Down
          </span>
          <div className="h-8 w-[1px] bg-border-strong relative overflow-hidden">
            <motion.div
              animate={{ y: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="absolute top-0 left-0 w-full h-1/2 bg-brand-primary"
            />
          </div>
        </div>

      </Container>
    </div>
  );
};
