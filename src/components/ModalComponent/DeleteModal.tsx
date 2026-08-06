"use client"
import React, { useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { DeleteModalProps } from '@/types/modalsType/DeleteModal';


const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onClose, projectId, projectTitle, onDeleted }) => {
    
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleDelete = async () => {
        setLoading(true);
        try {
            const res = await fetch(`http://localhost:5000/api/projects/my-projects/${projectId}`, {
                method: 'DELETE',
            });
            const data = await res.json();

            if (data.success) {
                onDeleted(projectId);
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
            <div className="relative w-full max-w-md bg-white dark:bg-[#121212] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-2xl">
                
                {/* Close Button */}
                <button onClick={onClose} className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors">
                    <X size={18} />
                </button>

                {/* Warning Icon */}
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-500/10 text-red-500 mb-4">
                    <AlertTriangle size={24} />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">
                    Delete Project
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
                    Are you sure you want to delete <span className="font-semibold text-zinc-900 dark:text-white">{projectTitle}</span>? This action cannot be undone.
                </p>

                {/* Buttons */}
                <div className="flex items-center justify-end gap-3">
                    <button 
                        onClick={onClose} 
                        disabled={loading}
                        className="px-4 py-2 rounded-xl text-xs font-medium border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition-colors"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleDelete} 
                        disabled={loading}
                        className="px-4 py-2 rounded-xl text-xs font-medium bg-red-600 hover:bg-red-700 text-white transition-colors shadow-sm disabled:opacity-50"
                    >
                        {loading ? "Deleting..." : "Yes, Delete"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;