"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  Scissors,
  Images,
  Users,
  LogOut,
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

const NAV_ITEMS = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Bookings", href: "/admin/bookings", icon: Calendar },
  { label: "Services", href: "/admin/services", icon: Scissors },
  { label: "Gallery", href: "/admin/gallery", icon: Images },
  { label: "Customers", href: "/admin/customers", icon: Users },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-salon-dark text-white flex flex-col hidden md:flex">
      <div className="p-6 border-b border-gray-800">
        <span className="font-serif text-2xl font-bold text-salon-gold">
          Salon Olivia
        </span>
        <p className="text-xs text-gray-400 mt-1">Admin Portal</p>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
          const isActive = href !== "#" && pathname === href;
          return (
            <Link
              key={label}
              href={href}
              className={`flex items-center px-4 py-3 rounded-lg font-medium transition-colors ${
                isActive
                  ? "bg-salon-gold/20 text-salon-gold"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <Icon size={20} className="mr-3" /> {label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-800 space-y-2">
        <Link
          href="/"
          className="flex items-center px-4 py-3 text-red-400 hover:bg-gray-800 hover:text-red-300 rounded-lg transition-colors"
        >
          <LogOut size={20} className="mr-3" /> Back to Site
        </Link>
        <div className="flex items-center px-4 py-2">
          <ThemeToggle className="text-gray-300 hover:bg-gray-800" />
        </div>
      </div>
    </aside>
  );
}
