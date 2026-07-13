"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { AIAdvisor } from "./AIAdvisor";

type PageShellProps = {
  children: ReactNode;
};

export function PageShell({ children }: PageShellProps) {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <main className="pt-20">{children}</main>
      <Footer />
      <AIAdvisor />
      <Link
        href="https://wa.me/94771234567"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-24 right-6 z-50 flex items-center rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-2xl transition-transform hover:scale-105"
      >
        <MessageCircle size={18} className="mr-2" />
        WhatsApp
      </Link>
    </div>
  );
}
