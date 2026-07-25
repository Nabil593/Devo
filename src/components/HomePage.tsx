"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Terminal, Layers, Zap, Code } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#FBFBFB] dark:bg-[#060607] text-[#111113] dark:text-[#E3E3E5] transition-colors duration-200">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-24 pb-20 md:pt-36 md:pb-32 border-b border-[#E6E6E8] dark:border-[#1E1F22]">

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#D9D9DC] dark:border-[#232428] bg-white dark:bg-[#111215] text-xs font-medium text-[#606067] dark:text-[#9A9BA6] mb-6 shadow-xs">
            <Sparkles className="h-3.5 w-3.5 text-neutral-900 dark:text-white" />
            <span>Next-gen Developer Showcase Platform</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-medium tracking-tight text-[#09090B] dark:text-white mb-6 leading-[1.08]">
            Build, Share, and Scale <br className="hidden sm:inline" />
            <span className="text-[#606067] dark:text-[#8A8F98]">
              your engineering projects.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#606067] dark:text-[#8A8F98] mb-10 font-normal leading-relaxed">
            A high-performance workspace designed with pixel-perfect minimalism. 
            Showcase your stack, track your progress, and connect globally.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/projects"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium bg-[#09090B] dark:bg-white text-white dark:text-black hover:bg-black/90 dark:hover:bg-neutral-200 transition-all shadow-sm"
            >
              <span>Explore Projects</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/register"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2.5 rounded-full text-sm font-medium border border-[#D9D9DC] dark:border-[#232428] bg-white dark:bg-[#111215] text-[#09090B] dark:text-white hover:bg-[#F4F4F5] dark:hover:bg-[#18191C] transition-all shadow-xs"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* HERO APP PREVIEW MOCKUP */}
        <div className="mt-20 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-[#E6E6E8] dark:border-[#1E1F22] bg-white dark:bg-[#0B0C0E] p-2 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-3 py-2 border-b border-[#E6E6E8] dark:border-[#1E1F22] bg-[#FBFBFB] dark:bg-[#060607] rounded-lg">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <div className="text-xs text-[#606067] dark:text-[#8A8F98] font-mono">devo.workspace / dashboard</div>
              <div className="w-12" />
            </div>
            <div className="p-8 sm:p-12 text-center">
              <Terminal className="h-10 w-10 mx-auto text-[#606067] dark:text-[#8A8F98] mb-4" />
              <h3 className="text-lg font-medium text-[#09090B] dark:text-white mb-2">Designed for elite execution</h3>
              <p className="text-xs sm:text-sm text-[#606067] dark:text-[#8A8F98] max-w-md mx-auto">
                Clean architecture, lightning-fast transitions, and modern developer aesthetics built for speed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES GRID SECTION */}
      <section className="py-24 border-b border-[#E6E6E8] dark:border-[#1E1F22]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#09090B] dark:text-white mb-3">
              Built for modern developers
            </h2>
            <p className="text-sm text-[#606067] dark:text-[#8A8F98]">
              Everything you need to manage your engineering workflow and present your craft professionally.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="p-6 rounded-xl border border-[#E6E6E8] dark:border-[#1E1F22] bg-white dark:bg-[#0B0C0E] transition-all hover:border-neutral-400 dark:hover:border-neutral-700">
              <div className="h-10 w-10 rounded-lg bg-[#F4F4F5] dark:bg-[#151619] flex items-center justify-center text-[#09090B] dark:text-white mb-4 border border-[#E6E6E8] dark:border-[#1E1F22]">
                <Layers className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-semibold text-[#09090B] dark:text-white mb-1.5">Pixel-Perfect UI</h3>
              <p className="text-xs text-[#606067] dark:text-[#8A8F98] leading-relaxed">
                Minimalist components inspired by industry leaders like Vercel, Linear, and Shadcn.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-xl border border-[#E6E6E8] dark:border-[#1E1F22] bg-white dark:bg-[#0B0C0E] transition-all hover:border-neutral-400 dark:hover:border-neutral-700">
              <div className="h-10 w-10 rounded-lg bg-[#F4F4F5] dark:bg-[#151619] flex items-center justify-center text-[#09090B] dark:text-white mb-4 border border-[#E6E6E8] dark:border-[#1E1F22]">
                <Zap className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-semibold text-[#09090B] dark:text-white mb-1.5">Lightning Fast</h3>
              <p className="text-xs text-[#606067] dark:text-[#8A8F98] leading-relaxed">
                Engineered with Next.js App Router for optimal rendering speeds and instant page transitions.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-xl border border-[#E6E6E8] dark:border-[#1E1F22] bg-white dark:bg-[#0B0C0E] transition-all hover:border-neutral-400 dark:hover:border-neutral-700">
              <div className="h-10 w-10 rounded-lg bg-[#F4F4F5] dark:bg-[#151619] flex items-center justify-center text-[#09090B] dark:text-white mb-4 border border-[#E6E6E8] dark:border-[#1E1F22]">
                <Code className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-semibold text-[#09090B] dark:text-white mb-1.5">Stack Management</h3>
              <p className="text-xs text-[#606067] dark:text-[#8A8F98] leading-relaxed">
                Easily organize and showcase your MERN stack, TypeScript, and Next.js projects seamlessly.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}