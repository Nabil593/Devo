"use client"
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/types/project';
import { useSession } from '@/lib/auth-client';

export default function ProjectDetailsPage() {
  const { id } = useParams();
  const [project, setProject] = useState<Project>();
  const [loading, setLoading] = useState(true);

  const { data: session } = useSession();
  const user = session?.user;

  const [upVotes, setUpVotes] = useState<number>(0);
  const [hasVoted, setHasVoted] = useState<boolean>(false);

  // Fetch Single Project Data
  useEffect(() => {
    if (!id) return;
    
    const fetchProjectDetails = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/projects/${id}`);
        const data = await res.json();
        
        if (data.success) {
          setProject(data.project);
          setUpVotes(data.project.upvotesCount || 0);
        }
      } catch (err) {
        console.error("Error fetching project:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjectDetails();
  }, [id]);

  const handleVote = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/interactions/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId: id,
          userEmail: user?.email,
        })
      });

      const data = await res.json();

      if (data.success) {
        setUpVotes(data.project.upvotesCount); 
        setHasVoted(data.hasVoted);
      }
    } catch (error) {
      console.error("Failed to vote", error);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-zinc-400 text-sm">
        Loading details...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-zinc-400 text-sm">
        Project not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-zinc-900 dark:text-zinc-100 py-16 px-6">
      <main className="max-w-3xl mx-auto space-y-10">
        
        {/* Cetegory & Back button */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800">
            {project.category || "Full Stack"}
          </span>
          <Link href="/projects" className="text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100">
            ← Back to projects
          </Link>
        </div>

        {/* Title & description */}
        <div className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
            {project.title}
          </h1>
          <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Thumbnail Image */}
        {project.thumbnailUrl && (
          <div className="rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
            <Image
              src={project.thumbnailUrl} 
              alt={project.title}
              width={300}
              height={300} 
              className="w-full h-auto object-cover max-h-[400px]"
            />
          </div>
        )}

        {/* Link & Upvote button */}
        <div className="flex items-center justify-between flex-wrap gap-4 pt-2">
          <div className="flex items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 text-xs font-medium hover:opacity-90 transition-opacity"
              >
                Live Preview ↗
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-800 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
              >
                GitHub Repository
              </a>
            )}
          </div>

          {/* Upvote / Like Button */}
          <button
            onClick={handleVote}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium border transition-colors ${
              hasVoted 
                ? "bg-rose-500/10 border-rose-500/30 text-rose-500" 
                : "bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-zinc-400"
            }`}
          >
            <span>{hasVoted ? "❤️ Liked" : "🤍 Like"}</span>
            <span className="font-mono bg-zinc-200 dark:bg-zinc-800 px-2 py-0.5 rounded text-[10px]">
              {upVotes}
            </span>
          </button>
        </div>

        {/* Tech Stack */}
        {project.techStack && project.techStack.length > 0 && (
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech: string, idx: number) => (
                <span 
                  key={idx} 
                  className="px-3 py-1 rounded-md text-xs bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}