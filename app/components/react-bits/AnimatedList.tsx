"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/app/hooks/usePrefersReducedMotion";

type AnimatedListProps<T> = {
  items: T[];
  getKey: (item: T) => string;
  renderItem: (item: T, index: number) => ReactNode;
  initialDelay?: number;
  interval?: number;
  className?: string;
};

/**
 * React Bits AnimatedList reveal logic with deliberately unstyled items.
 * Consumers own the presentation, allowing this section to render real chat
 * bubbles instead of the component demo's notification-card appearance.
 */
export default function AnimatedList<T>({
  items,
  getKey,
  renderItem,
  initialDelay = 320,
  interval = 760,
  className = "",
}: AnimatedListProps<T>) {
  const [visibleCount, setVisibleCount] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const timers = items.map((_, index) =>
      window.setTimeout(() => setVisibleCount(index + 1), initialDelay + index * interval)
    );

    return () => timers.forEach(window.clearTimeout);
  }, [initialDelay, interval, items, reducedMotion]);

  const visibleItems = reducedMotion ? items : items.slice(0, visibleCount);

  return (
    <div className={className} aria-live="polite">
      {visibleItems.map((item, index) => (
        <div key={getKey(item)} className="animated-list-item">
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  );
}