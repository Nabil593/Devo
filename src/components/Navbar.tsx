"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Sun,
  Moon,
  Menu,
  X,
  LogOut,
  FolderGit2,
  Plus,
  MessageSquare,
  User,
} from "lucide-react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { authClient, useSession } from "@/lib/auth-client";

const emptySubscribe = () => () => {};
function useIsMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

const Navbar = () => {
  const pathname = usePathname();
  const route = useRouter();

  const { data: session } = useSession();
  const user = session?.user;

  const { theme, setTheme } = useTheme();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isMounted = useIsMounted();

  if (!isMounted) {
    return (
      <div
        className="h-16 w-full border-b border-white/[0.08] bg-[#08090A]"
        aria-hidden="true"
      />
    );
  }

  const isActive = (path: string) => pathname === path;

  const handleLogout = async () => {
    try {
      setIsProfileOpen(false); // ড্রপডাউন বন্ধ করুন
      await authClient.signOut(); // সাইনআউট প্রসেস শেষ হওয়া পর্যন্ত অপেক্ষা করুন
      route.push("/login"); // লগইন পেজে রিডাইরেক্ট করুন
      route.refresh(); // পেজ ক্যাশ রিফ্রেশ করুন যাতে সেশন সাথে সাথে আপডেট হয়
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200/80 dark:border-white/[0.08] bg-white/90 dark:bg-[#08090A]/90 backdrop-blur-md text-neutral-900 dark:text-neutral-200 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-6">
          {/* 1. LEFT: LOGO & NAVIGATION LINKS */}
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="flex justify-center items-center gap-2 group"
            >
              <span className="text-[26px] font-semibold tracking-tight text-neutral-900 dark:text-white">
                Devo.
              </span>
            </Link>

            {/* DESKTOP NAV LINKS (Standard text-sm) */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
              <Link
                href="/"
                className={`transition-colors ${
                  isActive("/")
                    ? "text-neutral-900 dark:text-white font-semibold"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                }`}
              >
                Home
              </Link>

              <Link
                href="/projects"
                className={`transition-colors ${
                  isActive("/projects")
                    ? "text-neutral-900 dark:text-white font-semibold"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                }`}
              >
                Projects
              </Link>

              {user && (
                <>
                  <Link
                    href="/my-projects"
                    className={`transition-colors ${
                      isActive("/my-projects")
                        ? "text-neutral-900 dark:text-white font-semibold"
                        : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                    }`}
                  >
                    My Projects
                  </Link>

                  <Link
                    href="/my-interactions"
                    className={`transition-colors ${
                      isActive("/my-interactions")
                        ? "text-neutral-900 dark:text-white font-semibold"
                        : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                    }`}
                  >
                    My Interactions
                  </Link>
                </>
              )}
            </nav>
          </div>

          {/* 2. RIGHT: ACTIONS & USER PROFILE */}
          <div className="hidden md:flex items-center gap-4 text-sm">
            {/* ADD PROJECT BUTTON */}
            {user && (
              <Link
                href="/add-project"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium bg-neutral-100 dark:bg-white/10 text-neutral-900 dark:text-white hover:bg-neutral-200 dark:hover:bg-white/20 border border-neutral-300/50 dark:border-white/10 transition-all"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Project</span>
              </Link>
            )}

            {/* THEME TOGGLE */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-md text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
              title="Toggle Theme"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4 text-neutral-200" />
              ) : (
                <Moon className="h-4 w-4 text-neutral-700" />
              )}
            </button>

            {/* LINEAR STYLE VERTICAL DIVIDER */}
            <div className="h-4 w-[1px] bg-neutral-200 dark:bg-white/10" />

            {/* USER PROFILE DROPDOWN / AUTH BUTTONS */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-1.5 focus:outline-none cursor-pointer"
                >
                  <div className="h-8 w-8 rounded-full overflow-hidden border border-neutral-300 dark:border-white/20">
                    <Image
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
                      alt="User Profile"
                      width={28}
                      height={28}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </button>

                {/* DROPDOWN MENU */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-3 w-52 rounded-lg border border-neutral-200 dark:border-white/10 bg-white dark:bg-[#08090A] p-1.5 shadow-2xl backdrop-blur-xl transition-all">
                    <div className="px-3 py-2 border-b border-neutral-100 dark:border-white/10 mb-1">
                      <p className="text-xs font-semibold text-neutral-900 dark:text-white">
                        Nabil Reza
                      </p>
                    </div>

                    <Link
                      href="/profile"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-xs rounded-md text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/5 transition-colors"
                    >
                      <User className="h-4 w-4" />
                      Profile Settings
                    </Link>

                    <Link
                      href="/my-projects"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-xs rounded-md text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/5 transition-colors"
                    >
                      <FolderGit2 className="h-4 w-4" />
                      My Projects
                    </Link>

                    <Link
                      href="/my-interactions"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-xs rounded-md text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/5 transition-colors"
                    >
                      <MessageSquare className="h-4 w-4" />
                      Interactions
                    </Link>

                    <div className="my-1 border-t border-neutral-100 dark:border-white/10" />

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-3 py-3 text-xs rounded-md text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  href="/login"
                  className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                >
                  Log in
                </Link>

                {/* LINEAR SIGN UP BUTTON (Pill-shaped Light Button) */}
                <Link
                  href="/register"
                  className="px-4.5 py-2 rounded-full text-xs font-semibold bg-neutral-900 dark:bg-[#EEEEEE] text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-white transition-colors"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>

          {/* MOBILE TOGGLE */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 text-neutral-600 dark:text-neutral-400"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4 text-neutral-700" />
              ) : (
                <Moon className="h-4 w-4 text-neutral-700" />
              )}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-neutral-600 dark:text-neutral-400"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="border-b border-neutral-200 dark:border-white/10 bg-white dark:bg-[#08090A] px-4 py-4 md:hidden">
          <div className="flex flex-col space-y-3 text-sm font-medium">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
              Home
            </Link>
            <Link href="/projects" onClick={() => setIsMobileMenuOpen(false)}>
              Projects
            </Link>
            {user ? (
              <>
                <Link
                  href="/my-projects"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  My Projects
                </Link>
                <Link
                  href="/my-interactions"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  My Interactions
                </Link>
                <Link
                  href="/add-project"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-indigo-400 font-semibold"
                >
                  + Add Project
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-left text-rose-500"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2.5 pt-2 border-t border-neutral-200 dark:border-white/10">
                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  Log in
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="inline-block text-center px-4 py-2 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-black font-semibold"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
