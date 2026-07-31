"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Project } from '@/types/project';

const AllProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortDate, setSortDate] = useState('newest');

  const [submittedQuery, setSubmittedQuery] = useState('');
  const [submittedCategory, setSubmittedCategory] = useState('All');
  const [submittedSort, setSubmittedSort] = useState('newest');

  // ফেচ ফাংশনটি সাধারণ একটি ফাংশন হিসেবে বাইরে রাখা হলো
  const fetchProjects = async (search: string, category: string, sort: string) => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (category !== 'All') params.append('category', category);
      if (sort) params.append('sortDate', sort);

      const res = await fetch(`http://localhost:5000/api/projects?${params.toString()}`);
      const result = await res.json();
      
      if (result.success) {
        setProjects(result.data);
      }
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadInitialProjects = async () => {
      await fetchProjects('', 'All', 'newest');
    };
    loadInitialProjects();
  }, []);

  const handleSearchClick = () => {
    setSubmittedQuery(searchQuery);
    setSubmittedCategory(selectedCategory);
    setSubmittedSort(sortDate);
    fetchProjects(searchQuery, selectedCategory, sortDate);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSortDate('newest');
    setSubmittedQuery('');
    setSubmittedCategory('All');
    setSubmittedSort('newest');
    fetchProjects('', 'All', 'newest');
  };

  const isFiltered = submittedQuery || submittedCategory !== 'All' || submittedSort !== 'newest';

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">Explore Projects</h1>
          <p className="text-neutral-500 dark:text-neutral-400 mt-1.5 text-sm">Discover what developers are building in public.</p>
        </div>
        
        {!loading && (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-medium text-neutral-600 dark:text-neutral-300 w-fit">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Found <strong className="text-neutral-900 dark:text-white">{projects.length}</strong> {projects.length === 1 ? 'project' : 'projects'}</span>
          </div>
        )}
      </div>

      {/* Search, Filter & Controls Bar */}
      <div className="mb-10">
        <div className="flex flex-col lg:flex-row gap-3 items-center justify-between">
          
          <div className="flex items-center gap-2 w-full lg:w-auto">
            <div className="relative w-full lg:w-80">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-neutral-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search by title or tech stack..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 pl-10 pr-4 py-2.5 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white transition-all shadow-sm"
              />
            </div>

            <button
              onClick={handleSearchClick}
              className="rounded-xl bg-neutral-900 dark:bg-white px-5 py-2.5 text-xs font-medium text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-all whitespace-nowrap shadow-sm cursor-pointer"
            >
              Search
            </button>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full lg:w-auto">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full sm:w-44 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-3 py-2.5 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white transition-all shadow-sm cursor-pointer"
            >
              <option value="All">All Categories</option>
              <option value="Web App">Web App</option>
              <option value="Mobile App">Mobile App</option>
              <option value="AI/ML">AI/ML</option>
              <option value="Developer Tools">Developer Tools</option>
              <option value="Open Source">Open Source</option>
            </select>

            <select
              value={sortDate}
              onChange={(e) => setSortDate(e.target.value)}
              className="w-full sm:w-36 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-3 py-2.5 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white transition-all shadow-sm cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>

            <button
              onClick={handleReset}
              disabled={!isFiltered}
              className={`rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-800 px-4 py-2.5 text-xs font-medium transition-all whitespace-nowrap shadow-sm ${
                isFiltered 
                  ? 'text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer' 
                  : 'text-neutral-300 dark:text-neutral-600 cursor-not-allowed opacity-50'
              }`}
            >
              Reset
            </button>
          </div>

        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-24">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neutral-900 dark:border-white"></div>
        </div>
      ) : projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div 
              key={project._id}
              className="group rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden flex flex-col transition-all duration-300 hover:border-neutral-300 dark:hover:border-neutral-700 hover:shadow-lg"
            >
              <div className="aspect-video w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800 relative">
                <Image 
                  src={project.thumbnailUrl || "" } 
                  alt={project.title}
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-5 flex flex-col flex-grow justify-between">
                <div>
                  {project.category && (
                    <div className="mb-2.5">
                      <span className="inline-flex items-center rounded-md bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 text-[11px] font-medium text-neutral-600 dark:text-neutral-300 border border-neutral-200/60 dark:border-neutral-700/60">
                        {project.category}
                      </span>
                    </div>
                  )}

                  <h3 className="text-base font-semibold text-neutral-900 dark:text-white line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1.5 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800/60 flex items-center justify-between">
                  {project.liveUrl ? (
                    <a 
                      href={project.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
                    >
                      Live Preview ↗
                    </a>
                  ) : <span />}
                  <Link 
                    href={`/projects/${project._id}`}
                    className="inline-flex items-center justify-center rounded-lg bg-neutral-900 dark:bg-white px-3.5 py-1.5 text-xs font-medium text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border border-dashed border-neutral-200 dark:border-neutral-800 rounded-2xl bg-neutral-50/30 dark:bg-neutral-900/30">
          <p className="text-neutral-500 dark:text-neutral-400 text-sm">No projects found matching your search criteria.</p>
        </div>
      )}
    </div>
  );
};

export default AllProjectsPage;