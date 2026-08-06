"use client";
import React, { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { EditModalProps } from '@/types/modalsType/editModalType';

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, project, onUpdated }) => {
    
    const [loading, setLoading] = useState(false);
    
    const [formData, setFormData] = useState({
        title: project?.title || '',
        description: project?.description || '',
        category: project?.category || '',
        liveUrl: project?.liveUrl || '',
        githubUrl: project?.githubUrl || '',
        thumbnailUrl: project?.thumbnailUrl || '',
    });

    if (!isOpen || !project) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(`http://localhost:5000/api/projects/my-projects/edit/${project._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();

            if (data.success) {
                onUpdated(data.data); 
                onClose();
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="relative w-full max-w-lg bg-white dark:bg-[#121212] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
                
                {/* Close Button */}
                <button onClick={onClose} className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors">
                    <X size={18} />
                </button>

                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-4">
                    Edit Project
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">Project Title</label>
                        <input 
                            type="text" 
                            name="title" 
                            value={formData.title} 
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">Category</label>
                        <input 
                            type="text" 
                            name="category" 
                            value={formData.category} 
                            onChange={handleChange}
                            className="w-full px-3 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">Description</label>
                        <textarea 
                            name="description" 
                            rows={3}
                            value={formData.description} 
                            onChange={handleChange}
                            className="w-full px-3 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 resize-none"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">Live URL</label>
                            <input 
                                type="url" 
                                name="liveUrl" 
                                value={formData.liveUrl} 
                                onChange={handleChange}
                                className="w-full px-3 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">GitHub URL</label>
                            <input 
                                type="url" 
                                name="githubUrl" 
                                value={formData.githubUrl} 
                                onChange={handleChange}
                                className="w-full px-3 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">Thumbnail URL</label>
                        <input 
                            type="url" 
                            name="thumbnailUrl" 
                            value={formData.thumbnailUrl} 
                            onChange={handleChange}
                            className="w-full px-3 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                        <button 
                            type="button"
                            onClick={onClose} 
                            disabled={loading}
                            className="px-4 py-2 rounded-xl text-xs font-medium border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 transition-colors shadow-sm disabled:opacity-50"
                        >
                            {loading && <Loader2 size={14} className="animate-spin" />}
                            <span>{loading ? "Saving..." : "Save Changes"}</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditModal;