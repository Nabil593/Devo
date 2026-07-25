"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

// Hydration safe year hook
const emptySubscribe = () => () => {};
function useCurrentYear() {
  return useSyncExternalStore(
    emptySubscribe,
    () => new Date().getFullYear(),
    () => 2026
  );
}

const Footer = () => {
  const currentYear = useCurrentYear();

  return (
    <footer className="w-full border-t border-neutral-200 dark:border-neutral-800/80 bg-white dark:bg-black text-neutral-600 dark:text-neutral-400 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        
        {/* MAIN LAYOUT WITH MAXIMUM CLEAN SPACE */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-12 md:gap-8">
          
          {/* BRAND & SOCIAL */}
          <div className="space-y-6 max-w-xs">
            <div className="space-y-2">
              <Link href="/" className="inline-block">
                <span className="text-[28px] font-medium tracking-tight text-neutral-900 dark:text-white">
                  Devo.
                </span>
              </Link>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                The platform for developers to build in public.
              </p>
            </div>

            {/* MINIMAL SOCIAL ICONS */}
            <div className="flex items-center gap-4 text-neutral-400 dark:text-neutral-500">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-neutral-900 dark:hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <FaGithub className="h-5 w-5" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-neutral-900 dark:hover:text-white transition-colors"
                aria-label="X"
              >
                <FaXTwitter className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-neutral-900 dark:hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* ESSENTIAL NAVIGATION */}
          <div className="flex flex-wrap gap-12 sm:gap-16 text-sm">
            <div className="space-y-3">
              <p className="text-xs font-semibold text-neutral-900 dark:text-white uppercase tracking-wider">
                Product
              </p>
              <ul className="space-y-2.5">
                <li>
                  <Link href="/projects" className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link href="/my-projects" className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
                    Showcase
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-semibold text-neutral-900 dark:text-white uppercase tracking-wider">
                Account
              </p>
              <ul className="space-y-2.5">
                <li>
                  <Link href="/login" className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
                    Log In
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
                    Sign Up
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-semibold text-neutral-900 dark:text-white uppercase tracking-wider">
                Legal
              </p>
              <ul className="space-y-2.5">
                <li>
                  <Link href="/privacy" className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT */}
        <div className="mt-16 pt-8 border-t border-neutral-100 dark:border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400 dark:text-neutral-500">
          <p>© {currentYear} Devo. All rights reserved.</p>
          <p>Designed with focus and precision.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;