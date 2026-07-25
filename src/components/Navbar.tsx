"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  
  // Mock States
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const { theme, setTheme } = useTheme();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const isMounted = useIsMounted();

  if (!isMounted) {
    return <button className="p-2 rounded-md h-8 w-8 opacity-0" aria-hidden="true" />;
  }

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 dark:border-neutral-800/80 bg-white dark:bg-black backdrop-blur-md text-neutral-900 dark:text-neutral-200 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-18 items-center justify-between gap-6">
          {/* 1. LEFT: LOGO & MAIN NAV */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-[28px] font-semibold tracking-tight">
                Devo.
              </span>
            </Link>

            {/* NAV LINKS */}
            <nav className="hidden md:flex items-center gap-1">
              <Link
                href="/"
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  isActive("/")
                    ? "border-b-2 border-neutral-900 dark:border-white font-semibold"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white"
                }`}
              >
                Home
              </Link>

              <Link
                href="/projects"
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  isActive("/projects")
                    ? "border-b-2 border-neutral-900 dark:border-white font-semibold"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white"
                }`}
              >
                Projects
              </Link>

              {isLoggedIn && (
                <>
                  <Link
                    href="/my-projects"
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      isActive("/my-projects")
                        ? "border-b-2 border-neutral-900 dark:border-white font-semibold"
                        : "text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white"
                    }`}
                  >
                    My Projects
                  </Link>

                  <Link
                    href="/my-interactions"
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      isActive("/my-interactions")
                        ? "border-b-2 border-neutral-900 dark:border-white font-semibold"
                        : "text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white"
                    }`}
                  >
                    My Interactions
                  </Link>
                </>
              )}
            </nav>
          </div>

          {/* 2. RIGHT: ACTIONS & USER MENU */}
          <div className="hidden md:flex items-center gap-3">
            {/* ADD PROJECT BUTTON */}
            {isLoggedIn && (
              <Link
                href="/add-project"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors shadow-sm"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Project</span>
              </Link>
            )}

            {/* THEME TOGGLE */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="cursor-pointer p-2 rounded-md text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
              title="Toggle Theme"
            >
              {theme === "dark" ? (
                <Sun className="h-4.5 w-4.5 text-yellow-500" />
              ) : (
                <Moon className="h-4.5 w-4.5 text-neutral-700" />
              )}
            </button>

            {/* USER PROFILE DROPDOWN */}
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="cursor-pointer flex items-center justify-center h-9 w-9 rounded-full border border-neutral-300 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors overflow-hidden focus:outline-none"
                >
                  <Image
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
                    alt="User Profile"
                    width={32}
                    height={32}
                    className="h-full w-full rounded-full object-cover"
                  />
                </button>

                {/* DROPDOWN MENU */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-4 w-48 rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-1 shadow-xl backdrop-blur-xl transition-colors">
                    <div className="px-3 py-2 border-b border-neutral-100 dark:border-neutral-800/80 mb-1">
                      <p className="text-sm font-medium text-neutral-900 dark:text-white">
                        Nabil Reza
                      </p>
                    </div>

                    <Link
                      href="/profile"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2 px-2.5 py-1.5 text-sm rounded-md text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
                    >
                      <User className="h-3.5 w-3.5 text-neutral-500 dark:text-neutral-400" />
                      Profile Settings
                    </Link>

                    <Link
                      href="/my-projects"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2 px-2.5 py-1.5 text-sm rounded-md text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
                    >
                      <FolderGit2 className="h-3.5 w-3.5 text-neutral-500 dark:text-neutral-400" />
                      My Projects
                    </Link>

                    <Link
                      href="/my-interactions"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2 px-2.5 py-1.5 text-sm rounded-md text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
                    >
                      <MessageSquare className="h-3.5 w-3.5 text-neutral-500 dark:text-neutral-400" />
                      Interactions
                    </Link>

                    <div className="my-1 border-t border-neutral-100 dark:border-neutral-800/80" />

                    <button
                      onClick={() => {
                        setIsLoggedIn(false);
                        setIsProfileOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 text-sm rounded-md text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors cursor-pointer"
                    >
                      <LogOut className="h-3.5 w-3.5" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-3 py-1.5 rounded-md text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-3 py-1.5 rounded-md text-sm font-medium bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* MOBILE TOGGLE */}
          <div className="flex md:hidden items-center gap-2">
            {/* THEME TOGGLE */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="cursor-pointer p-2 rounded-md text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
              title="Toggle Theme"
            >
              {theme === "dark" ? (
                <Sun className="h-4.5 w-4.5 text-yellow-500" />
              ) : (
                <Moon className="h-4.5 w-4.5 text-neutral-700" />
              )}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 rounded-md text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white cursor-pointer"
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
      <div
        onClick={() => setIsMobileMenuOpen(false)}
        className={`fixed z-40 transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      <div
        className={`absolute top-full left-0 right-0 z-50 w-full border-b border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-neutral-950/95 p-4 shadow-2xl backdrop-blur-xl transition-all duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="flex flex-col space-y-1">
          <Link
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
          >
            Home
          </Link>

          <Link
            href="/projects"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
          >
            Projects
          </Link>

          {isLoggedIn ? (
            <>
              <Link
                href="/my-projects"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
              >
                My Projects
              </Link>

              <Link
                href="/my-interactions"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
              >
                My Interactions
              </Link>

              <Link
                href="/add-project"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-2 block text-center px-3 py-2 rounded-lg text-sm font-medium bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
              >
                + Add Project
              </Link>

              <button
                onClick={() => {
                  setIsLoggedIn(false);
                  setIsMobileMenuOpen(false);
                }}
                className="mt-2 block w-full text-center px-3 py-2 rounded-lg text-sm font-medium bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/60 transition-colors cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            /* LOGGED OUT STATE */
            <div className="pt-3 mt-2 border-t border-neutral-200 dark:border-neutral-800/80 grid grid-cols-2 gap-2">
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center px-3 py-2 rounded-lg text-sm font-medium border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center px-3 py-2 rounded-lg text-sm font-medium bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;