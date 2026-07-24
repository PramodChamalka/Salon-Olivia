"use client";
import Link from "next/link";
import { Suspense } from "react";
import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { loginAction, type AuthState } from "@/app/auth/actions";

function LoginForm() {
  const [state, formAction, isPending] = useActionState<AuthState, FormData>(
    loginAction,
    {}
  );
  const searchParams = useSearchParams();
  const redirectTo = searchParams?.get("redirect") ?? "";
  const justRegistered = searchParams?.get("registered") === "1";
  return (
    <>
      <style>{`
        @keyframes authFadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes cardSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes decorFloat {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-12px); }
        }
        .dot-pattern {
          background-image: radial-gradient(circle, rgba(183,110,121,0.055) 1px, transparent 1px);
          background-size: 28px 28px;
        }
        .dot-pattern-light {
          background-image: radial-gradient(circle, rgba(183,110,121,0.025) 1px, transparent 1px);
          background-size: 32px 32px;
        }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      <main className="min-h-screen flex items-center justify-center bg-[#FFFDF9] font-['Poppins',Arial,sans-serif] text-[#333333] antialiased">
        {/* ═══ Container ═══ */}
        <div
          className="
          flex flex-col md:flex-row
          w-full max-w-[1100px] min-h-0 md:min-h-[680px] mx-4 md:mx-6
          rounded-none md:rounded-[20px] overflow-hidden
          shadow-none md:shadow-[0_12px_48px_rgba(0,0,0,0.1)]
          animate-[authFadeIn_0.6s_cubic-bezier(0.4,0,0.2,1)_both]
        "
        >
          {/* ═══ Decorative Panel ═══ */}
          <aside
            className="
              relative
              w-full md:w-[440px] md:min-w-[440px] min-h-[160px] md:min-h-0
              bg-gradient-to-br from-[#F8D7DA] via-[#f2c4c9] to-[#ecc0c6]
              overflow-hidden flex items-center justify-center
              order-1 md:order-none
            "
            aria-hidden="true"
          >
            {/* Large circle */}
            <div
              className="
                absolute
                w-[250px] h-[250px] md:w-[420px] md:h-[420px]
                rounded-full
                bottom-[-80px] md:bottom-[-160px] left-[-60px] md:left-[-100px]
                animate-[decorFloat_8s_ease-in-out_infinite]
              "
              style={{
                background:
                  "radial-gradient(circle, rgba(183,110,121,0.12) 0%, transparent 70%)",
              }}
            />

            {/* Medium circle */}
            <div
              className="
                absolute
                w-[120px] h-[120px] md:w-[200px] md:h-[200px]
                rounded-full
                top-[-30px] md:top-[-60px] right-[-20px] md:right-[-50px]
                animate-[decorFloat_10s_ease-in-out_infinite_reverse]
              "
              style={{
                background:
                  "radial-gradient(circle, rgba(212,175,55,0.1) 0%, transparent 70%)",
              }}
            />

            {/* Small ring */}
            <div className="absolute w-[50px] h-[50px] md:w-20 md:h-20 rounded-full border-[1.5px] border-[rgba(183,110,121,0.18)] top-[32%] md:top-[38%] right-[18%] md:right-[12%] animate-[decorFloat_6s_ease-in-out_infinite_1s]" />

            {/* Diagonal line */}
            <div className="absolute w-[200px] md:w-[280px] h-px bg-gradient-to-r from-transparent via-[rgba(212,175,55,0.25)] to-transparent top-[22%] left-[-40px] -rotate-[25deg]" />

            {/* Dot trio */}
            <div className="absolute w-2 h-2 rounded-full bg-[rgba(183,110,121,0.2)] top-[30%] left-[55%]" />
            <div className="absolute w-2 h-2 rounded-full bg-[rgba(183,110,121,0.2)] top-[34%] left-[60%]" />
            <div className="absolute w-2 h-2 rounded-full bg-[rgba(183,110,121,0.2)] top-[32%] left-[57.5%] animate-[decorFloat_4s_ease-in-out_infinite_0.5s]" />

            {/* Dot texture */}
            <div className="absolute inset-0 dot-pattern pointer-events-none" />

            {/* Brand content */}
            <div className="relative z-10 text-center px-10">
              <h2 className="font-['Playfair_Display',Georgia,serif] text-[26px] md:text-[32px] font-bold text-[#333333] tracking-[0.04em] mb-2">
                Salon Olivia
              </h2>
              <span className="block w-12 h-0.5 bg-[#D4AF37] mx-auto my-4 rounded-full" />
              <p className="font-['Playfair_Display',Georgia,serif] text-[15px] md:text-lg font-normal italic text-[#666666] leading-relaxed">
                Where Beauty
                <br />
                Meets Elegance
              </p>
              <p className="hidden md:block mt-8 text-[13px] text-[rgba(183,110,121,0.7)] tracking-[0.08em] uppercase font-medium">
                Est. 2024
              </p>
            </div>
          </aside>

          {/* ═══ Form Panel ═══ */}
          <section className="flex-1 flex items-center justify-center py-8 px-4 md:py-12 md:px-10 bg-[#FFFDF9] relative overflow-hidden order-2 md:order-none">
            {/* Subtle dot texture */}
            <div className="absolute inset-0 dot-pattern-light pointer-events-none" />

            {/* Card */}
            <div
              className="
              relative w-full max-w-[420px] bg-white
              rounded-[16px] md:rounded-[20px] px-6 py-8 md:px-9 md:py-10
              shadow-none md:shadow-[0_4px_20px_rgba(0,0,0,0.08)]
              animate-[cardSlideUp_0.5s_cubic-bezier(0.4,0,0.2,1)_0.15s_both]
            "
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-8 right-8 h-[3px] rounded-b-sm bg-gradient-to-r from-[#B76E79] via-[#D4AF37] to-[#B76E79]" />

              <h1 className="font-['Playfair_Display',Georgia,serif] text-[26px] md:text-[32px] font-bold text-[#333333] leading-[1.2] tracking-[0.02em] mb-1.5">
                Welcome Back
              </h1>
              <p className="text-sm text-[#666666] mb-8 leading-relaxed">
                Sign in to your account to continue
              </p>

              <form action={formAction} noValidate>
                <input type="hidden" name="redirect" value={redirectTo} />

                {justRegistered && (
                  <div className="mb-5 rounded-[10px] border border-green-300 bg-green-50 px-4 py-3 text-sm text-green-800">
                    Account created successfully. Please sign in.
                  </div>
                )}

                {state.error && (
                  <div role="alert" className="mb-5 rounded-[10px] border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {state.error}
                  </div>
                )}
                {/* Email */}
                <div className="mb-5">
                  <label
                    htmlFor="login-email"
                    className="block text-sm font-medium text-[#333333] mb-1.5"
                  >
                    Email Address
                  </label>
                  <input
                    id="login-email"
                    name="email"
                    type="email"
                    className="
                      w-full h-[50px] px-4
                      border border-[#CCCCCC] rounded-[10px]
                      bg-white text-[15px] text-[#333333]
                      placeholder:text-[#666666] placeholder:text-sm
                      outline-none appearance-none
                      transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
                      hover:border-[#b0b0b0]
                      focus:border-[#B76E79] focus:border-2 focus:px-[15px]
                      focus:shadow-[0_0_0_4px_rgba(183,110,121,0.1)]
                    "
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                  />
                </div>

                {/* Password */}
                <div className="mb-5">
                  <label
                    htmlFor="login-password"
                    className="block text-sm font-medium text-[#333333] mb-1.5"
                  >
                    Password
                  </label>
                  <input
                    id="login-password"
                    name="password"
                    type="password"
                    className="
                      w-full h-[50px] px-4
                      border border-[#CCCCCC] rounded-[10px]
                      bg-white text-[15px] text-[#333333]
                      placeholder:text-[#666666] placeholder:text-sm
                      outline-none appearance-none
                      transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
                      hover:border-[#b0b0b0]
                      focus:border-[#B76E79] focus:border-2 focus:px-[15px]
                      focus:shadow-[0_0_0_4px_rgba(183,110,121,0.1)]
                    "
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                  />
                </div>

                {/* Forgot Password */}
                <div className="flex justify-end mb-6">
                  <Link
                    href="/forgot-password"
                    className="
                      bg-transparent border-none text-[#B76E79]
                      text-sm font-medium cursor-pointer p-0
                      transition-colors duration-300
                      hover:text-[#D4AF37] hover:underline
                      focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B76E79] rounded-sm
                    "
                  >
                    Forgot Password?
                  </Link>
                </div>

                {/* Sign In */}
                <button
                  type="submit"
                  disabled={isPending}
                  className="
                    flex items-center justify-center
                    w-full h-[50px] px-8
                    bg-[#B76E79] text-white
                    border-none rounded-[10px]
                    font-['Poppins',Arial,sans-serif] text-base font-medium
                    cursor-pointer
                    shadow-[0_4px_14px_rgba(183,110,121,0.35)]
                    transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
                    hover:bg-[#D4AF37] hover:shadow-[0_4px_14px_rgba(212,175,55,0.35)]
                    active:scale-[0.97]
                    focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37]
                    disabled:opacity-60 disabled:cursor-not-allowed
                  "
                >
                  {isPending ? "Signing in…" : "Sign In"}
                </button>
              </form>

              {/* Divider */}
              <div className="flex items-center gap-4 my-6">
                <div className="flex-1 h-px bg-[#CCCCCC]" />
                <span className="text-[13px] text-[#666666] whitespace-nowrap">
                  or continue with
                </span>
                <div className="flex-1 h-px bg-[#CCCCCC]" />
              </div>

              {/* Social Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  className="
                    flex items-center justify-center gap-2.5
                    flex-1 h-[46px] px-4
                    bg-white text-[#333333]
                    border border-[#CCCCCC] rounded-[10px]
                    font-['Poppins',Arial,sans-serif] text-sm font-medium
                    cursor-pointer
                    transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
                    hover:border-[#B76E79] hover:bg-[#F8D7DA] hover:shadow-[0_2px_8px_rgba(183,110,121,0.1)]
                    active:scale-[0.98]
                    focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B76E79]
                  "
                  aria-label="Continue with Google"
                >
                  <svg
                    className="w-5 h-5 shrink-0"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Google
                </button>

                <button
                  type="button"
                  className="
                    flex items-center justify-center gap-2.5
                    flex-1 h-[46px] px-4
                    bg-white text-[#333333]
                    border border-[#CCCCCC] rounded-[10px]
                    font-['Poppins',Arial,sans-serif] text-sm font-medium
                    cursor-pointer
                    transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
                    hover:border-[#B76E79] hover:bg-[#F8D7DA] hover:shadow-[0_2px_8px_rgba(183,110,121,0.1)]
                    active:scale-[0.98]
                    focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B76E79]
                  "
                  aria-label="Continue with Facebook"
                >
                  <svg
                    className="w-5 h-5 shrink-0"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                      fill="#1877F2"
                    />
                  </svg>
                  Facebook
                </button>
              </div>

              {/* Guest */}
              <div className="text-center mt-5">
                <button
                  type="button"
                  className="
                    bg-transparent border-none text-[#B76E79]
                    text-sm font-medium cursor-pointer p-0
                    transition-colors duration-300
                    hover:text-[#D4AF37] hover:underline
                    focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B76E79] rounded-sm
                  "
                >
                  Continue as Guest
                </button>
              </div>

              {/* Register link */}
              <p className="text-center mt-7 text-sm text-[#666666]">
                Not registered yet?{" "}
                <Link
                  href="/register"
                  className="
                    text-[#B76E79] font-medium no-underline
                    transition-colors duration-300
                    hover:text-[#D4AF37] hover:underline
                    focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B76E79] rounded-sm
                  "
                >
                  Create an account
                </Link>
              </p>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default function Login() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
