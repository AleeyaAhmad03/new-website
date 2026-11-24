"use client";

import * as React from "react";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/app/hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

/*
 * Adapted from React Bits' FadeContent (TS + Tailwind variant). Same
 * change as AnimatedContent.tsx: the upstream `snap-main-container` id
 * fallback is removed since it belongs to the React Bits demo site.
 */

interface FadeContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  container?: Element | string | null;
  blur?: boolean;
  duration?: number;
  ease?: string;
  delay?: number;
  threshold?: number;
  initialOpacity?: number;
  distance?: number;
  once?: boolean;
  disappearAfter?: number;
  disappearDuration?: number;
  disappearEase?: string;
  onComplete?: () => void;
  onDisappearanceComplete?: () => void;
}

const FadeContent: React.FC<FadeContentProps> = ({
  children,
  container,
  blur = false,
  duration = 1000,
  ease = "power2.out",
  delay = 0,
  threshold = 0.1,
  initialOpacity = 0,
  distance = 12,
  once = false,
  disappearAfter = 0,
  disappearDuration = 0.5,
  disappearEase = "power2.in",
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
        clearProps: "transform,opacity,visibility,filter,willChange",
        visibility: "visible",
      });
      return;
    }

    let scrollerTarget: Element | string | null = container ?? null;

    if (typeof scrollerTarget === "string") {
      scrollerTarget = document.querySelector(scrollerTarget);
    }

    const startPct = (1 - threshold) * 100;
    const endPct = threshold * 100;
    const getSeconds = (val: number) => (val > 10 ? val / 1000 : val);

    gsap.set(el, {
      autoAlpha: initialOpacity,
      y: distance,
      filter: blur ? "blur(10px)" : "blur(0px)",
      willChange: "opacity, filter, transform",
    });

    const tl = gsap.timeline({
      paused: true,
      delay: getSeconds(delay),
      onComplete: () => {
        if (onComplete) onComplete();
        if (disappearAfter > 0) {
          gsap.to(el, {
            autoAlpha: initialOpacity,
            y: -distance,
            filter: blur ? "blur(10px)" : "blur(0px)",
            delay: getSeconds(disappearAfter),
            duration: getSeconds(disappearDuration),
            ease: disappearEase,
            onComplete: () => onDisappearanceComplete?.(),
          });
        }
      },
    });

    tl.to(el, {
      autoAlpha: 1,
      y: 0,
      filter: "blur(0px)",
      duration: getSeconds(duration),
      ease: ease,
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
      gsap.set(el, { clearProps: "transform,opacity,visibility,filter,willChange" });
    };
  }, [
    container,
    blur,
    duration,
    ease,
    delay,
    threshold,
    initialOpacity,
    distance,
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
          ? `react-bits-fade-content ${className}`
          : `react-bits-fade-content invisible ${className}`
      }
      {...props}
    >
      {children}
    </div>
  );
};

export default FadeContent;