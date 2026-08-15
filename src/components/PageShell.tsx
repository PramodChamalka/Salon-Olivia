"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { AIAdvisor } from "./AIAdvisor";
import { WelcomeTour } from "./WelcomeTour";

type PageShellProps = {
  children: ReactNode;
  hideFloatingChat?: boolean;
};

export function PageShell({ children, hideFloatingChat = false }: PageShellProps) {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-[#1f1f1f] text-gray-900 dark:text-gray-100">
      <WelcomeTour />
      <Navbar />
      <main className="pt-20">{children}</main>
      <Footer />
      {!hideFloatingChat && (
        <AIAdvisor isOpen={chatOpen} setIsOpen={setChatOpen} />
      )}
      <Link
        href="https://wa.me/94773091720"
        target="_blank"
        rel="noreferrer"
        aria-hidden={chatOpen}
        tabIndex={chatOpen ? -1 : 0}
        className={`fixed right-6 z-40 flex items-center rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-2xl transition-all duration-300 ${
          chatOpen
            ? "pointer-events-none translate-y-4 opacity-0"
            : "bottom-24 hover:scale-105"
        }`}
        style={chatOpen ? { bottom: "1.5rem" } : undefined}
      >
        <MessageCircle size={18} className="mr-2" />
        WhatsApp
      </Link>
    </div>
  );
}
