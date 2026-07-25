"use client";

import Link from "next/link";
import { 
  ArrowUpRight, 
  Sparkles,
  Zap
} from "lucide-react";

// 1. SVG Icons
const GithubIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={`fill-current ${className}`}>
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const XIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={`fill-current ${className}`}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedinIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={`fill-current ${className}`}>
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.7a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26z" />
  </svg>
);

const Footer = () => {

  return (
    <footer className="relative overflow-hidden border-t border-neutral-800 bg-neutral-950 text-neutral-400">
      
      {/* BACKGROUND GLOW EFFECTS */}
      <div className="absolute top-0 left-1/2 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">

        {/* MIDDLE SECTION: BENTO STYLE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 py-12">
          
          {/* CARD 1: BRAND IDENTITY */}
          <div className="md:col-span-2 rounded-2xl border border-neutral-800/80 bg-neutral-900/40 p-6 flex flex-col justify-between space-y-6 backdrop-blur-sm">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-[28px] font-semibold tracking-tight text-white">Devo.</span>
              </div>
              <p className="text-sm text-neutral-400 leading-relaxed max-w-lg">
                An ecosystem built for developers to publish proof-of-work, gain community validation, and build products in public with real-time feedback.
              </p>
            </div>
          </div>

          {/* CARD 2: QUICK NAVIGATION */}
          <div className="rounded-2xl border border-neutral-800/80 bg-neutral-900/40 p-6 space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-white uppercase tracking-wider">
              <Sparkles className="h-4 w-4 text-indigo-400" />
              <span>Explore</span>
            </div>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/projects" className="text-neutral-400 hover:text-white transition-colors flex items-center justify-between">
                  <span>Projects Grid</span>
                  <ArrowUpRight className="h-4 w-4 text-neutral-600" />
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-neutral-400 hover:text-white transition-colors flex items-center justify-between">
                  <span>Categories</span>
                  <ArrowUpRight className="h-4 w-4 text-neutral-600" />
                </Link>
              </li>
              <li>
                <Link href="/showcase" className="text-neutral-400 hover:text-white transition-colors flex items-center justify-between">
                  <span>Trending Builds</span>
                  <ArrowUpRight className="h-4 w-4 text-neutral-600" />
                </Link>
              </li>
            </ul>
          </div>

          {/* CARD 3: SOCIAL CONNECTIONS */}
          <div className="rounded-2xl border border-neutral-800/80 bg-neutral-900/40 p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-white uppercase tracking-wider">
                <Zap className="h-4 w-4 text-amber-400" />
                <span>Connect</span>
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center p-3 rounded-xl border border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-white hover:border-neutral-700 hover:bg-neutral-900 transition-all"
                  aria-label="GitHub"
                >
                  <GithubIcon className="h-4 w-4" />
                </a>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center p-3 rounded-xl border border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-white hover:border-neutral-700 hover:bg-neutral-900 transition-all"
                  aria-label="X"
                >
                  <XIcon className="h-4 w-4" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center p-3 rounded-xl border border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-white hover:border-neutral-700 hover:bg-neutral-900 transition-all"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM BRAND WATERMARK & COPYRIGHT */}
        <div className="pt-8 border-t border-neutral-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-neutral-400">
          <p>© {new Date().getFullYear()} Devo Platform. Built for developers.</p>
          
          <div className="flex items-center gap-6 text-sm">
            <Link href="/privacy" className="hover:text-neutral-200 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-neutral-200 transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>

      {/* GIANT WATERMARK TEXT AT BOTTOM */}
      <div className="w-full text-center select-none pointer-events-none opacity-[0.03] leading-none text-[15vw] font-black text-white uppercase tracking-wide -mb-6">
        DEVO
      </div>
    </footer>
  );
};

export default Footer;