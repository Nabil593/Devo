"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from '@/lib/auth-client';
import { Project } from '@/types/project';

const MyProjectsPage = () => {
    const { data: session } = useSession();
    const user = session?.user;
    const userEmail = user?.email;

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMyProjects = async () => {
            if (!userEmail) return;

            try {
                const res = await fetch(`http://localhost:5000/api/projects/my-projects?email=${userEmail}`);
                const data = await res.json();

                if (data.success) {
                    setProjects(data.data || []);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchMyProjects();
    }, [userEmail]);

    return (
        <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
            <main className="max-w-6xl mx-auto px-6 py-16">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 border-b border-zinc-200 dark:border-zinc-800/80 pb-6">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
                            My Projects
                        </h1>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                            Manage your deployed applications, view metadata, and track your creations.
                        </p>
                    </div>
                    <Link
                        href="/add-project"
                        className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 font-medium text-sm hover:opacity-90 transition-opacity"
                    >
                        + Add New Project
                    </Link>
                </div>

                {/* Loading State */}
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <p className="text-sm text-zinc-500 animate-pulse">Loading your projects...</p>
                    </div>
                ) : projects.length === 0 ? (
                    /* Empty State */
                    <div className="text-center py-20 border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl">
                        <p className="text-zinc-500 dark:text-zinc-400 mb-4">No projects found.</p>
                        <Link
                            href="/add-project"
                            className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 font-medium text-sm"
                        >
                            Create Your First Project
                        </Link>
                    </div>
                ) : (
                    /* Projects Grid */
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {projects.map((project: Project) => (
                            <div 
                                key={project._id} 
                                className="group rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 p-5 flex flex-col justify-between transition-all hover:border-zinc-300 dark:hover:border-zinc-700"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md bg-zinc-200/60 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                                            {project.category || "Web App"}
                                        </span>
                                        <span className="text-xs text-zinc-400">
                                            {project.createdAt ? new Date(project.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-white group-hover:underline">
                                        {project.title}
                                    </h3>
                                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 line-clamp-2">
                                        {project.description}
                                    </p>
                                    
                                    {/* Tech Stack Tags */}
                                    {project.techStack && project.techStack.length > 0 && (
                                        <div className="flex flex-wrap gap-1.5 mt-4">
                                            {project.techStack.map((tech: string, index: number) => (
                                                <span key={index} className="text-[11px] font-medium px-2 py-0.5 rounded bg-zinc-200/50 dark:bg-zinc-800/60 text-zinc-600 dark:text-zinc-400">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center justify-between pt-5 mt-5 border-t border-zinc-200 dark:border-zinc-800/80">
                                    <div className="flex items-center gap-3 text-xs font-medium text-zinc-600 dark:text-zinc-400">
                                        {project.githubUrl && (
                                            <a href={project.githubUrl} target="_blank" rel="noreferrer" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
                                                GitHub
                                            </a>
                                        )}
                                        {project.githubUrl && project.liveUrl && <span>•</span>}
                                        {project.liveUrl && (
                                            <a href={project.liveUrl} target="_blank" rel="noreferrer" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
                                                Live Demo
                                            </a>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button className="px-3 py-1.5 rounded text-xs font-medium border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                                            Edit
                                        </button>
                                        <button className="px-3 py-1.5 rounded text-xs font-medium bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/20 transition-colors">
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default MyProjectsPage;