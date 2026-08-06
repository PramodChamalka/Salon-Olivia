"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { User as UserIcon, ChevronDown } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<{ email: string; firstName: string } | null>(
    null,
  );
  const [loadingUser, setLoadingUser] = useState(true);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    const loadUser = async () => {
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();
      if (!authUser) {
        setUser(null);
        setLoadingUser(false);
        return;
      }
      const { data: profile } = await supabase
        .from("profiles")
        .select("first_name")
        .eq("id", authUser.id)
        .single();
      setUser({
        email: authUser.email ?? "",
        firstName: profile?.first_name ?? "Account",
      });
      setLoadingUser(false);
    };

    loadUser();

    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      loadUser();
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-md py-3" : "bg-white/90 backdrop-blur-sm py-5"}`}
    >
      <div className="mx-auto max-w-7xl px-4 py-5 bg-stone-100 rounded-lg sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex-shrink-0">
            <span className="font-serif text-2xl font-bold text-salon-dark">
              Salon Olivia
            </span>
          </Link>

          <div className="hidden items-center space-x-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium uppercase tracking-wider text-gray-600 transition-colors hover:text-salon-gold"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/appointment"
              className="rounded-full bg-salon-gold px-6 py-2 font-medium text-white shadow-sm transition-colors hover:bg-yellow-600"
            >
              Book Now
            </Link>
            {!loadingUser &&
              (user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-salon-gold"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-salon-gold text-xs font-semibold uppercase text-white">
                      {user.firstName.charAt(0)}
                    </span>
                    <span className="max-w-[120px] truncate">
                      {user.firstName}
                    </span>
                    <ChevronDown size={16} />
                  </button>
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-3 w-52 overflow-hidden rounded-lg border border-gray-100 bg-white shadow-lg">
                      <div className="border-b border-gray-100 px-4 py-3">
                        <p className="truncate text-xs text-gray-500">
                          {user.email}
                        </p>
                      </div>
                      <a
                        href="/logout"
                        className="block px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-salon-cream hover:text-salon-gold"
                      >
                        Logout
                      </a>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-gray-600 transition-colors hover:text-salon-gold"
                >
                  <UserIcon size={16} />
                  Sign In
                </Link>
              ))}
          </div>

          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-600 hover:text-salon-dark focus:outline-none"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="absolute w-full border-t border-gray-100 bg-white shadow-lg md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-salon-cream hover:text-salon-gold"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/appointment"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-4 block w-full rounded-md bg-salon-gold px-6 py-3 text-center font-medium text-white transition-colors hover:bg-yellow-600"
            >
              Book Now
            </Link>
            {!loadingUser &&
              (user ? (
                <>
                  <div className="mt-4 border-t border-gray-100 px-3 pt-3">
                    <p className="truncate text-xs text-gray-500">
                      {user.email}
                    </p>
                  </div>
                  <a
                    href="/logout"
                    className="mt-2 block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-salon-cream hover:text-salon-gold"
                  >
                    Logout
                  </a>
                </>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-4 block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-salon-cream hover:text-salon-gold"
                >
                  Sign In
                </Link>
              ))}
          </div>
        </div>
      )}
    </nav>
  );
}
