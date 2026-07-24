"use client";

import { PageShell } from "../../components/PageShell";
import { AIAdvisor } from "../../components/AIAdvisor";

export default function AIChatPage() {
  return (
    <PageShell hideFloatingChat>
      <section className="bg-salon-cream/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-salon-gold">Style Advisor</p>
            <h1 className="mb-4 font-serif text-4xl font-bold text-salon-dark md:text-5xl">Get personalised recommendations in minutes.</h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">Use our stylist assistant to discover looks that match your features, occasion, and budget.</p>
          </div>
          <div className="mx-auto max-w-3xl rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
            <AIAdvisor isOpen setIsOpen={() => {}} variant="embedded" />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
