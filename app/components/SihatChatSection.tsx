"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import {
  BrainCircuit,
  ChevronRight,
  CircleUserRound,
  HeartPulse,
  Languages,
  Link2,
  Send,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import AnimatedContent from "@/app/components/react-bits/AnimatedContent";
import AnimatedList from "@/app/components/react-bits/AnimatedList";
import BlurText from "@/app/components/react-bits/BlurText";
import FadeContent from "@/app/components/react-bits/FadeContent";
import { usePrefersReducedMotion } from "@/app/hooks/usePrefersReducedMotion";
import {
  CHAT_LANGUAGES,
  CHAT_LANGUAGE_ORDER,
  type ChatLanguageCode,
  type ChatMessage,
} from "@/app/components/sihatChatData";

type Capability = {
  label: string;
  detail: string;
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
};

const CAPABILITIES: Capability[] = [
  {
    label: "Health-aware context",
    detail: "Guidance shaped by your connected health journey",
    icon: BrainCircuit,
  },
  {
    label: "Multilingual conversations",
    detail: "Natural support in the language you prefer",
    icon: Languages,
  },
  {
    label: "Connected between screenings",
    detail: "A continuous thread between health touchpoints",
    icon: Link2,
  },
];

function LanguageSelector({
  activeLanguage,
  onLanguageChange,
}: {
  activeLanguage: ChatLanguageCode;
  onLanguageChange: (code: ChatLanguageCode) => void;
}) {
  return (
    <div
      className="flex w-full items-center gap-1 rounded-2xl border border-white/8 bg-white/[0.035] p-1 sm:w-auto"
      aria-label="Conversation language"
    >
      {CHAT_LANGUAGE_ORDER.map((code) => {
        const language = CHAT_LANGUAGES[code];
        const isActive = code === activeLanguage;

        return (
          <button
            key={code}
            type="button"
            aria-label={`Switch conversation to ${language.name}`}
            aria-pressed={isActive}
            onClick={() => onLanguageChange(code)}
            className={`min-w-0 flex-1 rounded-xl px-3 py-2 text-xs font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 sm:flex-none sm:px-4 ${
              isActive
                ? "bg-cyan-300 text-slate-950 shadow-[0_0_20px_rgba(103,232,249,0.16)]"
                : "text-slate-400 hover:bg-white/[0.05] hover:text-slate-100"
            }`}
          >
            {language.label}
          </button>
        );
      })}
    </div>
  );
}

function ChatBubble({ message }: { message: ChatMessage }) {
  const isAssistant = message.role === "assistant";

  return (
    <div
      role="listitem"
      className={`flex items-end gap-2.5 ${isAssistant ? "justify-start" : "justify-end"}`}
    >
      {isAssistant && (
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-200">
          <HeartPulse className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
        </span>
      )}

      <div
        className={`max-w-[82%] rounded-2xl px-4 py-3 text-[13px] leading-relaxed sm:max-w-[78%] sm:text-sm ${
          isAssistant
            ? "rounded-bl-md border border-cyan-300/15 bg-gradient-to-br from-cyan-300/[0.15] to-blue-400/[0.07] text-cyan-50 shadow-[0_12px_30px_rgba(8,145,178,0.08)]"
            : "rounded-br-md border border-white/8 bg-white/[0.075] text-slate-200"
        }`}
      >
        {message.text}
      </div>

      {!isAssistant && (
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-white/8 bg-white/[0.06] text-slate-400">
          <CircleUserRound className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
        </span>
      )}
    </div>
  );
}

function ChatConversation({
  languageCode,
  replayKey,
  isSwitching,
}: {
  languageCode: ChatLanguageCode;
  replayKey: string;
  isSwitching: boolean;
}) {
  const language = CHAT_LANGUAGES[languageCode];

  return (
    <div
      lang={language.locale}
      className={`min-h-[338px] transition-opacity duration-200 sm:min-h-[370px] ${
        isSwitching ? "opacity-0" : "opacity-100"
      }`}
    >
      <AnimatedList
        key={`${languageCode}-${replayKey}`}
        items={language.messages}
        getKey={(message) => message.id}
        renderItem={(message) => <ChatBubble message={message} />}
        initialDelay={650}
        interval={900}
        className="space-y-3.5"
      />
    </div>
  );
}

function SihatChatDevice({ viewportReplayKey }: { viewportReplayKey: number }) {
  const [activeLanguage, setActiveLanguage] = useState<ChatLanguageCode>("en");
  const [displayLanguage, setDisplayLanguage] = useState<ChatLanguageCode>("en");
  const [isSwitching, setIsSwitching] = useState(false);
  const [replayKey, setReplayKey] = useState(0);
  const swapTimer = useRef<number | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(
    () => () => {
      if (swapTimer.current !== null) window.clearTimeout(swapTimer.current);
    },
    []
  );

  const changeLanguage = (code: ChatLanguageCode) => {
    if (code === activeLanguage) return;

    setActiveLanguage(code);
    if (swapTimer.current !== null) window.clearTimeout(swapTimer.current);

    if (reducedMotion) {
      setDisplayLanguage(code);
      setReplayKey((key) => key + 1);
      return;
    }

    setIsSwitching(true);
    swapTimer.current = window.setTimeout(() => {
      setDisplayLanguage(code);
      setReplayKey((key) => key + 1);
      setIsSwitching(false);
      swapTimer.current = null;
    }, 190);
  };

  return (
    <div className="relative mx-auto w-full max-w-[calc(100vw-3rem)] lg:max-w-[760px]">
      <div className="mb-4 flex items-center justify-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500 sm:text-xs lg:justify-end">
        <span>Health data</span>
        <ChevronRight className="h-3.5 w-3.5 text-cyan-400/70" aria-hidden="true" />
        <span>AI context</span>
        <ChevronRight className="h-3.5 w-3.5 text-cyan-400/70" aria-hidden="true" />
        <span className="text-cyan-200">Conversation</span>
      </div>

      <div className="sihat-chat-device-shell relative overflow-hidden rounded-[28px] border border-cyan-200/15 bg-[#07111f]/95 p-2 shadow-[0_40px_100px_-35px_rgba(34,211,238,0.35)] sm:rounded-[36px] sm:p-3">
        <div className="overflow-hidden rounded-[22px] border border-white/8 bg-[#07101d] sm:rounded-[29px]">
          <header className="flex items-center justify-between border-b border-white/[0.07] px-4 py-4 sm:px-6 sm:py-5">
            <div className="flex items-center gap-3">
              <span className="relative flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-200">
                <HeartPulse className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
                <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#07101d] bg-emerald-400" />
              </span>
              <div>
                <p className="text-sm font-semibold tracking-tight text-white sm:text-base">Sihat Chat</p>
                <p className="mt-0.5 text-[10px] text-slate-500 sm:text-xs">Your connected health companion</p>
              </div>
            </div>
          </header>

          <div className="px-4 pb-4 pt-4 sm:px-6 sm:pb-6 sm:pt-5">
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2 text-[11px] font-medium text-slate-500">
                <Sparkles className="h-3.5 w-3.5 text-cyan-300/80" aria-hidden="true" />
                Live health check-in
              </div>
              <LanguageSelector activeLanguage={activeLanguage} onLanguageChange={changeLanguage} />
            </div>

            <ChatConversation
              languageCode={displayLanguage}
              replayKey={`${viewportReplayKey}-${replayKey}`}
              isSwitching={isSwitching}
            />

            <div className="mt-4 flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.035] px-4 py-3 text-xs text-slate-600 sm:text-sm">
              <span className="flex-1">Ask about your health…</span>
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-300 text-slate-950 shadow-[0_0_20px_rgba(103,232,249,0.2)]">
                <Send className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SihatChatSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const hasEnteredViewport = useRef(false);
  const wasInViewport = useRef(false);
  const [viewportReplayKey, setViewportReplayKey] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reducedMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!wasInViewport.current) {
            if (hasEnteredViewport.current) {
              setViewportReplayKey((key) => key + 1);
            } else {
              hasEnteredViewport.current = true;
            }
          }
          wasInViewport.current = true;
        } else if (entry.intersectionRatio === 0) {
          wasInViewport.current = false;
        }
      },
      { threshold: 0.18 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="sihat-chat"
      data-navbar-theme="dark"
      aria-labelledby="sihat-chat-title"
      className="sihat-chat-section relative isolate w-full max-w-[100vw] overflow-hidden bg-[#020712] py-24 text-white sm:py-28 lg:min-h-screen lg:py-32"
    >
      <div aria-hidden="true" className="sihat-chat-ambient pointer-events-none absolute inset-0 -z-10" />

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 px-6 sm:px-8 lg:grid-cols-[40fr_60fr] lg:gap-14 xl:gap-20">
        <div className="w-full min-w-0 max-w-[calc(100vw-3rem)] sm:max-w-xl lg:max-w-none">
          <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-300 sm:text-xs">
            <span className="h-px w-8 bg-cyan-300/70" />
            The conversational layer
          </div>

          <div
            id="sihat-chat-title"
            role="heading"
            aria-level={2}
            className="mt-7 text-[2.65rem] font-semibold leading-[1.04] tracking-[-0.045em] sm:text-6xl lg:text-[3.35rem] xl:text-[3.5rem]"
          >
            <BlurText
              key={`primary-${viewportReplayKey}`}
              text="Meet Sihat Chat."
              className="text-white"
              delay={85}
              animateBy="words"
              direction="bottom"
              threshold={0.25}
              animationFrom={
                reducedMotion
                  ? { filter: "blur(0px)", opacity: 1, y: 0 }
                  : { filter: "blur(10px)", opacity: 0, y: 12 }
              }
              animationTo={[
                reducedMotion
                  ? { filter: "blur(0px)", opacity: 1, y: 0 }
                  : { filter: "blur(4px)", opacity: 0.65, y: 3 },
                { filter: "blur(0px)", opacity: 1, y: 0 },
              ]}
              stepDuration={reducedMotion ? 0 : 0.35}
            />
            <BlurText
              key={`secondary-${viewportReplayKey}`}
              text="Your AI health companion."
              className="mt-3 block text-[0.72em] leading-[1.12] tracking-[-0.035em] text-slate-300"
              delay={70}
              animateBy="words"
              direction="bottom"
              threshold={0.25}
              animationFrom={
                reducedMotion
                  ? { filter: "blur(0px)", opacity: 1, y: 0 }
                  : { filter: "blur(10px)", opacity: 0, y: 12 }
              }
              animationTo={[
                reducedMotion
                  ? { filter: "blur(0px)", opacity: 1, y: 0 }
                  : { filter: "blur(4px)", opacity: 0.65, y: 3 },
                { filter: "blur(0px)", opacity: 1, y: 0 },
              ]}
              stepDuration={reducedMotion ? 0 : 0.35}
            />
          </div>

          <FadeContent duration={760} delay={230} distance={12} threshold={0.25}>
            <p className="mt-7 max-w-lg text-base leading-7 text-slate-400 sm:text-lg sm:leading-8">
              Sihat Chat turns health data into an ongoing conversation—helping users understand their health, check symptoms, receive guidance, and stay engaged between screenings.
            </p>
          </FadeContent>

          <FadeContent duration={760} delay={400} distance={14} threshold={0.2}>
            <div className="mt-9 border-t border-white/[0.08]">
              {CAPABILITIES.map((capability) => (
                <div key={capability.label} className="flex items-start gap-4 border-b border-white/[0.08] py-4">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-cyan-300/15 bg-cyan-300/[0.06] text-cyan-200">
                    <capability.icon className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-slate-100">{capability.label}</p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">{capability.detail}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-5 flex items-start gap-2.5 text-xs leading-5 text-slate-500">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300/70" strokeWidth={1.7} aria-hidden="true" />
              More than a generic chatbot—every conversation is informed by the user’s connected Sihat AI health journey.
            </p>
          </FadeContent>
        </div>

        <AnimatedContent
          distance={38}
          duration={0.85}
          threshold={0.18}
          blur={false}
          scale={0.98}
          className="w-full min-w-0 max-w-[calc(100vw-3rem)] lg:max-w-none lg:rotate-[1.25deg] motion-reduce:transform-none"
        >
          <SihatChatDevice viewportReplayKey={viewportReplayKey} />
        </AnimatedContent>
      </div>
    </section>
  );
}