"use client"
import React, { useState } from 'react';

const AddProjectPage = () => {

    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        category: '',
        description: '',
        githubUrl: '',
        liveUrl: '',
        thumbnailUrl: '',
        tags: '',
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        setLoading(true);

        const submissionData = {
            ...formData,
            techStack: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : []
        };

        try {
            const response = await fetch("http://localhost:5000/api/projects", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(submissionData),
            });

            const result = await response.json();

            if (result.success) {
                console.log("Project added successfully!", result.data);
            } else {
                console.log("Failed to add project:", result.message);
            }
        } catch (error) {
            console.error("Error submitting project:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-zinc-900 dark:text-zinc-100 transition-colors duration-300">

            {/* Main Content Container matching Hero style */}
            <main className="max-w-3xl mx-auto px-6 py-16">
                <div className="mb-10">
                    <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
                        Add New Project
                    </h1>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
                        Deploy your creative works to your portfolio with clean, minimalist metadata.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-2">
                                Project Title
                            </label>
                            <input 
                                type="text" 
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="e.g. OpenBook"
                                required
                                className="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100 transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-2">
                                Slug
                            </label>
                            <input 
                                type="text" 
                                name="slug"
                                value={formData.slug}
                                onChange={handleChange}
                                placeholder="e.g. openbook-app"
                                required
                                className="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100 transition-all"
                            />
                        </div>
                    </div>

                    {/* Category Selection Field */}
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-2">
                            Category
                        </label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                            className="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100 transition-all cursor-pointer"
                        >
                            <option value="All">All Categories</option>
                            <option value="Web App">Web App</option>
                            <option value="Mobile App">Mobile App</option>
                            <option value="AI/ML">AI/ML</option>
                            <option value="Developer Tools">Developer Tools</option>
                            <option value="Open Source">Open Source</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-2">
                            Description
                        </label>
                        <textarea 
                            name="description"
                            rows={4}
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Write a brief, punchy overview of the project..."
                            required
                            className="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100 transition-all resize-none"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-2">
                                GitHub URL
                            </label>
                            <input 
                                type="url" 
                                name="githubUrl"
                                value={formData.githubUrl}
                                onChange={handleChange}
                                placeholder="https://github.com/..."
                                className="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100 transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-2">
                                Live Demo URL
                            </label>
                            <input 
                                type="url" 
                                name="liveUrl"
                                value={formData.liveUrl}
                                onChange={handleChange}
                                placeholder="https://..."
                                className="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100 transition-all"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-2">
                                Thumbnail Image URL
                            </label>
                            <input 
                                type="url" 
                                name="thumbnailUrl"
                                value={formData.thumbnailUrl}
                                onChange={handleChange}
                                placeholder="https://..."
                                className="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100 transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-2">
                                Tags (Comma Separated)
                            </label>
                            <input 
                                type="text" 
                                name="tags"
                                value={formData.tags}
                                onChange={handleChange}
                                placeholder="React, Next.js, TypeScript"
                                className="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100 transition-all"
                            />
                        </div>
                    </div>

                    <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800/80 flex justify-end gap-3">
                        <button 
                            type="button"
                            className="px-5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-800 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            disabled={loading}
                            className="px-5 py-2.5 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer"
                        >
                            {loading ? 'Publishing...' : 'Publish Project'}
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default AddProjectPage;