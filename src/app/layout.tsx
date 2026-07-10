import type { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: "Salon Olivia",
  description: "Salon Olivia website and admin dashboard",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
