"use client";

import { useEffect, useState, type MouseEventHandler } from "react";
import dynamic from "next/dynamic";
import type {
  BeaconRenderProps,
  CallBackProps,
  Step,
  TooltipRenderProps,
} from "react-joyride";
import {
  CalendarCheck,
  Images,
  Scissors,
  Sparkles,
  UserPlus,
  X,
} from "lucide-react";

const Joyride = dynamic(() => import("react-joyride"), { ssr: false });

const STORAGE_KEY = "salon-olivia-tour-completed";

const STEP_ICONS = [Sparkles, Scissors, Images, CalendarCheck, UserPlus];

const steps: Step[] = [
  {
    target: '[data-tour="nav-brand"]',
    title: "Welcome to Salon Olivia",
    content:
      "Take a quick look around, we'll show you where everything is in under a minute.",
    disableBeacon: true,
    placement: "bottom",
  },
  {
    target: '[data-tour="nav-services"]',
    title: "Find your service",
    content: "Browse our full range of hair, skin and nail services here.",
  },
  {
    target: '[data-tour="nav-gallery"]',
    title: "Get inspired",
    content: "See real results from our stylists in the gallery.",
  },
  {
    target: '[data-tour="nav-book-now"]',
    title: "Reserve your spot",
    content: "When you're ready, book your appointment right from here.",
  },
  {
    target: '[data-tour="nav-account"]',
    title: "Make it yours",
    content:
      "Create a free account to book appointments and keep your profile up to date.",
  },
];

function TourTooltip({
  continuous,
  index,
  isLastStep,
  size,
  step,
  backProps,
  closeProps,
  primaryProps,
  skipProps,
  tooltipProps,
}: TooltipRenderProps) {
  const Icon = STEP_ICONS[index] ?? Sparkles;

  return (
    <div
      {...tooltipProps}
      className="tour-tooltip relative w-[320px] max-w-[88vw] overflow-hidden rounded-2xl bg-white shadow-[0_24px_60px_-12px_rgba(183,110,121,0.45)]"
    >
      <div className="h-1.5 w-full bg-gradient-to-r from-[#B76E79] via-[#D4AF37] to-[#B76E79]" />

      <button
        {...closeProps}
        aria-label="Close tour"
        className="absolute right-3 top-4 flex h-7 w-7 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
      >
        <X size={15} />
      </button>

      <div className="p-6">
        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#F8D7DA] to-[#f2c4c9] text-[#B76E79]">
          <Icon size={20} strokeWidth={2} />
        </div>

        {step.title && (
          <h3 className="mb-1.5 font-['Playfair_Display',Georgia,serif] text-lg font-bold text-[#333333]">
            {step.title}
          </h3>
        )}
        <p className="text-sm leading-relaxed text-gray-600">
          {step.content}
        </p>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {Array.from({ length: size }).map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? "w-6 bg-[#D4AF37]" : "w-1.5 bg-gray-200"
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-4">
            {!isLastStep && (
              <button
                {...skipProps}
                className="text-xs font-medium text-gray-400 transition-colors hover:text-gray-600"
              >
                Skip
              </button>
            )}
            {continuous && index > 0 && (
              <button
                {...backProps}
                className="text-xs font-medium text-[#B76E79] transition-colors hover:text-[#D4AF37]"
              >
                Back
              </button>
            )}
            <button
              {...primaryProps}
              className="rounded-full bg-[#B76E79] px-4 py-2 text-xs font-semibold text-white shadow-[0_4px_14px_rgba(183,110,121,0.35)] transition-all duration-300 hover:bg-[#D4AF37] hover:shadow-[0_4px_14px_rgba(212,175,55,0.35)] active:scale-95"
            >
              {isLastStep ? "Let's go" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

type BeaconDomProps = {
  "aria-label"?: string;
  title?: string;
  onClick?: MouseEventHandler<HTMLSpanElement>;
  onMouseEnter?: MouseEventHandler<HTMLSpanElement>;
  ref?: (node: HTMLSpanElement | null) => void;
};

function TourBeacon(props: BeaconRenderProps) {
  // react-joyride passes continuous/index/isLastStep/size/step (typed via
  // BeaconRenderProps) plus aria-label/onClick/onMouseEnter/ref/title at
  // runtime; only the latter belong on the DOM node.
  const { "aria-label": ariaLabel, title, onClick, onMouseEnter, ref } =
    props as unknown as BeaconDomProps;

  return (
    <span
      aria-label={ariaLabel}
      title={title}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      ref={ref}
      className="tour-beacon relative inline-flex h-5 w-5 cursor-pointer items-center justify-center"
    >
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#D4AF37] opacity-75" />
      <span className="relative inline-flex h-3 w-3 rounded-full bg-[#B76E79] ring-2 ring-white" />
    </span>
  );
}

export function WelcomeTour() {
  const [run, setRun] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const alreadySeen = window.localStorage.getItem(STORAGE_KEY);
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    if (alreadySeen || !isDesktop) return;

    const timer = window.setTimeout(() => setRun(true), 800);
    return () => window.clearTimeout(timer);
  }, []);

  const handleCallback = (data: CallBackProps) => {
    const { status } = data;
    if (status === "finished" || status === "skipped" || status === "error") {
      window.localStorage.setItem(STORAGE_KEY, "1");
      setRun(false);
    }
  };

  if (!run) return null;

  return (
    <>
      <style>{`
        @keyframes tourTooltipIn {
          from { opacity: 0; transform: translateY(8px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .tour-tooltip {
          animation: tourTooltipIn 0.28s cubic-bezier(0.4, 0, 0.2, 1) both;
        }
        .react-joyride__overlay {
          backdrop-filter: blur(1.5px);
        }
        @media (prefers-reduced-motion: reduce) {
          .tour-tooltip { animation: none; }
          .tour-beacon .animate-ping { animation: none; }
        }
      `}</style>
      <Joyride
        steps={steps}
        run={run}
        continuous
        showSkipButton
        scrollToFirstStep
        disableScrollParentFix
        tooltipComponent={TourTooltip}
        beaconComponent={TourBeacon}
        callback={handleCallback}
        floaterProps={{ disableAnimation: true }}
        styles={{
          options: {
            arrowColor: "#ffffff",
            overlayColor: "rgba(51, 51, 51, 0.6)",
            spotlightShadow: "0 0 0 4px rgba(212, 175, 55, 0.5)",
            zIndex: 10000,
          },
          spotlight: { borderRadius: 12 },
        }}
      />
    </>
  );
}
