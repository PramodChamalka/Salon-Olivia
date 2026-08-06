"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import type { CallBackProps, Step } from "react-joyride";

const Joyride = dynamic(() => import("react-joyride"), { ssr: false });

const STORAGE_KEY = "salon-olivia-tour-completed";

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
    content: "Browse our full range of hair, skin and nail services here.",
  },
  {
    target: '[data-tour="nav-gallery"]',
    content: "See real results from our stylists in the gallery.",
  },
  {
    target: '[data-tour="nav-book-now"]',
    content: "When you're ready, book your appointment right from here.",
  },
  {
    target: '[data-tour="nav-account"]',
    content:
      "Create a free account to book appointments and keep your profile up to date.",
  },
];

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
    <Joyride
      steps={steps}
      run={run}
      continuous
      showProgress
      showSkipButton
      scrollToFirstStep
      disableScrollParentFix
      callback={handleCallback}
      locale={{
        back: "Back",
        close: "Close",
        last: "Done",
        next: "Next",
        skip: "Skip tour",
      }}
      styles={{
        options: {
          primaryColor: "#D4AF37",
          textColor: "#333333",
          arrowColor: "#FFFDF9",
          backgroundColor: "#FFFDF9",
          overlayColor: "rgba(51, 51, 51, 0.55)",
          zIndex: 10000,
        },
        tooltip: { borderRadius: 12 },
        buttonNext: { borderRadius: 8, backgroundColor: "#B76E79" },
        buttonBack: { color: "#B76E79" },
      }}
    />
  );
}
