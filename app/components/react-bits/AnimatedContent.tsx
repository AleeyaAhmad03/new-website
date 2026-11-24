"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/app/hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

/*
 * Adapted from React Bits' AnimatedContent (TS + Tailwind variant). The
 * upstream source falls back to `document.getElementById('snap-main-container')`
 * when no `container` prop is given — an id from the React Bits demo site
 * that doesn't exist here, so that lookup is removed; no container prop
 * simply means "use window", matching this component's own documented
 * default.
 */

interface AnimatedContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  container?: Element | string | null;
  distance?: number;
  direction?: "vertical" | "horizontal";
  reverse?: boolean;
  duration?: number;
  ease?: string;
  initialOpacity?: number;
  animateOpacity?: boolean;
  blur?: boolean;
  blurStrength?: number;
  scale?: number;
  threshold?: number;
  delay?: number;
  once?: boolean;
  disappearAfter?: number;
  disappearDuration?: number;
  disappearEase?: string;
  onComplete?: () => void;
  onDisappearanceComplete?: () => void;
}

const AnimatedContent: React.FC<AnimatedContentProps> = ({
  children,
  container,
  distance = 100,
  direction = "vertical",
  reverse = false,
  duration = 0.8,
  ease = "power3.out",
  initialOpacity = 0,
  animateOpacity = true,
  blur = true,
  blurStrength = 6,
  scale = 1,
  threshold = 0.1,
  delay = 0,
  once = false,
  disappearAfter = 0,
  disappearDuration = 0.5,
  disappearEase = "power3.in",
  onComplete,
  onDisappearanceComplete,
  className = "",
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (reducedMotion) {
      gsap.set(el, {
        clearProps: "transform,opacity,filter,willChange",
        visibility: "visible",
      });
      return;
    }

    let scrollerTarget: Element | string | null = container ?? null;

    if (typeof scrollerTarget === "string") {
      scrollerTarget = document.querySelector(scrollerTarget);
    }

    const axis = direction === "horizontal" ? "x" : "y";
    const offset = reverse ? -distance : distance;
    const startPct = (1 - threshold) * 100;
    const endPct = threshold * 100;

    gsap.set(el, {
      [axis]: offset,
      scale,
      opacity: animateOpacity ? initialOpacity : 1,
      filter: blur ? `blur(${blurStrength}px)` : "blur(0px)",
      willChange: "transform, opacity, filter",
      visibility: "visible",
    });

    const tl = gsap.timeline({
      paused: true,
      delay,
      onComplete: () => {
        if (onComplete) onComplete();
        if (disappearAfter > 0) {
          gsap.to(el, {
            [axis]: reverse ? distance : -distance,
            scale: 0.8,
            opacity: animateOpacity ? initialOpacity : 0,
            delay: disappearAfter,
            duration: disappearDuration,
            ease: disappearEase,
            onComplete: () => onDisappearanceComplete?.(),
          });
        }
      },
    });

    tl.to(el, {
      [axis]: 0,
      scale: 1,
      opacity: 1,
      filter: "blur(0px)",
      duration,
      ease,
    });

    const st = ScrollTrigger.create({
      animation: tl,
      trigger: el,
      scroller: scrollerTarget || window,
      start: `top ${startPct}%`,
      end: `bottom ${endPct}%`,
      toggleActions: once ? "play none none none" : "play reverse play reverse",
    });

    return () => {
      st.kill();
      tl.kill();
      gsap.killTweensOf(el);
      gsap.set(el, { clearProps: "transform,opacity,filter,willChange,visibility" });
    };
  }, [
    container,
    distance,
    direction,
    reverse,
    duration,
    ease,
    initialOpacity,
    animateOpacity,
    blur,
    blurStrength,
    scale,
    threshold,
    delay,
    once,
    disappearAfter,
    disappearDuration,
    disappearEase,
    onComplete,
    onDisappearanceComplete,
    reducedMotion,
  ]);

  return (
    <div
      ref={ref}
      className={
        reducedMotion
          ? `react-bits-animated-content ${className}`
          : `react-bits-animated-content invisible ${className}`
      }
      {...props}
    >
      {children}
    </div>
  );
};

export default AnimatedContent;