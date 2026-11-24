"use client";

import { useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import FoldText from "./components/react-bits/Foldtext";

type Pillar = {
  readonly title: string;
  readonly tagline: string;
  readonly image: string;
  readonly count: number;
  readonly biomarkers: readonly string[];
};

type DragState = {
  active: boolean;
  startX: number;
  scrollLeft: number;
  moved: boolean;
};

const PILLARS: readonly Pillar[] = [
  {
    title: "Smart Health Screening",
    tagline: "Real-time Health Insights.",
    image: "/try.jpeg",
    count: 8,
    biomarkers: ["Blood Pressure", "Sp0₂","Glucose", "Cholesterol", "Uric Acid", "Temperature", "BMI & Body Composition"],
  },
  {
    title: "MyHealth",
    tagline: "Health Records.",
    image: "/try.jpeg",
    count: 3,
    biomarkers: ["Complete Health Records", "Personalized Insights", "Access Anytime & Anywhere"],
  },
  {
    title: "AI Face Scan",
    tagline: "60-Second Contactless Health Scan.",
    image: "/try.jpeg",
    count: 3,
    biomarkers: ["20+ Facial Biomarkers", "Accessible Anywhere", "Instant Insights"],
  },
  {
    title: "AI Sihat Chat",
    tagline: "The Conversational Layer, Your AI Health Companion.",
    image: "/try.jpeg",
    count: 4,
    biomarkers: ["Multi-Language Support", "24/7 Support", "Instant Health Advice"],
  },
  {
    title: "Mental Wellness and VR",
    tagline: "Immersive Support for Mental Wellness.",
    image: "/try.jpeg",
    count: 3,
    biomarkers: ["Stress Assessment", "Mood & Wellbeing", "Personalized Guidance"],
  },
  {
    title: "Telehealth & Medical Advice",
    tagline: "Replenish your essentials.",
    image: "/try.jpeg",
    count: 3,
    biomarkers: ["Healthcare Professionals Consultation", "Convenient & Accessible", "Follow-up Care & Referrals"],
  },
];

const COLLAPSED_COUNT = 3;

function PillarCard({ pillar }: { pillar: Pillar }) {
  const [expanded, setExpanded] = useState<boolean>(false);
  const hasOverflow: boolean = pillar.biomarkers.length > COLLAPSED_COUNT;
  const visible: readonly string[] =
    expanded || !hasOverflow
      ? pillar.biomarkers
      : pillar.biomarkers.slice(0, COLLAPSED_COUNT);

  return (
    <article className="group relative flex min-h-[560px] w-[82vw] max-w-[420px] shrink-0 snap-center flex-col justify-between overflow-hidden rounded-[28px] border border-white/40 bg-[#0a20c5] shadow-[0_20px_50px_-20px_rgba(9,36,213,0.45)] transition-transform duration-300 hover:-translate-y-1 sm:w-[360px]">
      <img
        src={pillar.image}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a20c5]/55 via-[#0a20c5]/10 to-[#050f5e]/90" />

      <header className="relative z-10 p-6 sm:p-8">
        <h3 className="text-2xl font-medium leading-tight tracking-[-0.03em] text-white sm:text-[28px]">
          {pillar.title}
        </h3>
        <p className="mt-2 text-base font-medium text-[#ffd23f] sm:text-lg">
          {pillar.tagline}
        </p>
      </header>

      <div className="relative z-10 p-6 pt-0 sm:p-8 sm:pt-0">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
          Key biomarkers ({pillar.count})
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          {visible.map((marker) => (
            <span
              key={marker}
              className="rounded-full border border-white/20 bg-white/15 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm"
            >
              {marker}
            </span>
          ))}
          {hasOverflow && (
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              className="px-2 text-sm text-white underline underline-offset-4 transition-colors hover:text-[#ffd23f]"
            >
              {expanded ? "Show less" : "View all"}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

export default function SihatAIEcosystem() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef<DragState>({
    active: false,
    startX: 0,
    scrollLeft: 0,
    moved: false,
  });
  const [dragging, setDragging] = useState<boolean>(false);

  // Click-and-drag scrolling for mouse users (touch/trackpad scroll natively)
  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>): void => {
    if (e.pointerType !== "mouse") return;
    const el = scrollerRef.current;
    if (!el) return;
    dragRef.current = {
      active: true,
      startX: e.clientX,
      scrollLeft: el.scrollLeft,
      moved: false,
    };
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>): void => {
    const d = dragRef.current;
    const el = scrollerRef.current;
    if (!d.active || !el) return;
    const dx = e.clientX - d.startX;
    if (!d.moved && Math.abs(dx) > 5) {
      d.moved = true;
      setDragging(true);
    }
    if (d.moved) el.scrollLeft = d.scrollLeft - dx;
  };

  const endDrag = (): void => {
    dragRef.current.active = false;
    setDragging(false);
  };

  return (
    <main className="relative min-h-screen bg-white">
      {/* Ecosystem Section */}
      <section
        id="ecosystem"
        className="relative z-10 scroll-mt-24 px-5 sm:px-8 lg:px-[60px]"
      >
        <div className="mx-auto w-full max-w-[1810px] py-14 sm:py-16 md:py-20 lg:py-24 xl:py-28">
          {/* Heading */}
          <div className="mx-auto max-w-[1100px] text-center">
            <h2 className="text-[clamp(3rem,9vw,6.5rem)] leading-[1.08] tracking-[-0.04em] text-[#0047AB]">
              <FoldText
                text="Sihat AI Ecosystem"
                trigger="scroll"
                fontSize="inherit"
                fontWeight={500}
                style={{ lineHeight: 1.08 }}
              />
            </h2>
            <p className="mx-auto mt-6 max-w-[720px] text-center text-base leading-relaxed text-[#3852bc] sm:mt-8 sm:text-lg lg:text-[19px] lg:leading-[1.55]">
              Four pillars of preventive wellness, each tracked through key
              biomarkers and translated into insights you can act on.
            </p>
          </div>

          {/* Cards: interactive horizontal scroller on all screen sizes */}
          <div
            ref={scrollerRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerLeave={endDrag}
            onPointerCancel={endDrag}
            className={`-mx-5 mt-10 flex gap-5 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8 lg:mx-0 lg:mt-14 lg:gap-6 lg:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
              dragging
                ? "cursor-grabbing select-none snap-none"
                : "cursor-grab snap-x snap-mandatory scroll-smooth"
            }`}
          >
            {PILLARS.map((pillar) => (
              <PillarCard key={pillar.title} pillar={pillar} />
            ))}
          </div>

          {/* CTA */}
          <div className="mt-10 flex flex-wrap gap-4 sm:mt-12">
            <a
              href="#contact"
              className="flex min-h-[52px] items-center justify-center rounded-[10px] border border-[#0924d5] bg-[#0924d5] px-6 py-3 text-base font-medium text-white transition-colors duration-200 hover:bg-white hover:text-[#0924d5] sm:min-h-[58px] sm:px-8 sm:text-lg"
            >
              Explore the Ecosystem
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}