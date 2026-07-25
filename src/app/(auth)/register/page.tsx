"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Eye, EyeOff } from "lucide-react";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] w-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black text-neutral-900 dark:text-neutral-100 transition-colors">
      <div className="w-full max-w-[400px] space-y-8">
        
        {/* HEADER */}
        <div className="space-y-2 text-center sm:text-left">
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Create an account
          </h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Enter your details below to join Devo
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* FULL NAME */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
              Full Name
            </label>
            <input
              type="text"
              required
              placeholder="Nabil Reza"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-3.5 py-2.5 rounded-lg bg-transparent border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 text-sm focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors"
            />
          </div>

          {/* EMAIL */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
              Email
            </label>
            <input
              type="email"
              required
              placeholder="name@example.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-3.5 py-2.5 rounded-lg bg-transparent border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 text-sm focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors"
            />
          </div>

          {/* PASSWORD */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full pl-3.5 pr-10 py-2.5 rounded-lg bg-transparent border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 text-sm focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="w-full py-2.5 px-4 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-black font-medium text-sm hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors shadow-xs cursor-pointer pt-3 flex items-center justify-center gap-2 group"
          >
            <span>Sign Up</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </form>

        {/* DIVIDER */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-neutral-200 dark:border-neutral-800" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white dark:bg-black px-2 text-neutral-500">
              Or
            </span>
          </div>
        </div>

        {/* FOOTER SWITCH */}
        <div className="text-center">
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-neutral-900 dark:text-white underline underline-offset-4 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
            >
              Log in
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default RegisterPage;