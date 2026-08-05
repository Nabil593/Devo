"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  MessageSquare,
  ThumbsUp,
  Calendar,
  ArrowUpRight,
  Pencil,
  Trash2,
} from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { Vote } from "@/types/votes";
import { Comment } from "@/types/comment";

const MyInteractionsPage = () => {
  const { data: session } = useSession();
  const user = session?.user;

  const [comments, setComments] = useState<Comment[]>([]);
  const [votes, setVotes] = useState<Vote[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | "comments" | "votes">("all");

  // Get All user Comments
  useEffect(() => {
    if (!user?.email) return;
    const fetchComments = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/interactions/comment/user?userEmail=${user?.email}`,
        );
        const data = await res.json();
        if (data.success) {
          // console.log(data)
          setComments(data.comments || []);
        }
      } catch (err) {
        console.error("Error fetching comments:", err);
      }
    };

    fetchComments();
  }, [user?.email]);

  // Get All user Votes
  useEffect(() => {
    if (!user?.email) return;
    const fetchVotes = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/interactions/vote/user?userEmail=${user?.email}`,
        );
        const data = await res.json();
        if (data.success) {
          console.log(data)
          setVotes(data.votes || []);
        }
      } catch (err) {
        console.error("Error fetching votes:", err);
      }
    };

    fetchVotes();
  }, [user?.email]);

  const formatDate = (dateString?: string | Date) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return isNaN(date.getTime())
      ? String(dateString)
      : date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-zinc-900 dark:text-zinc-100 p-8">
      <main className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-5">
          <div>
            <h1 className="text-xl font-medium tracking-tight">Interactions</h1>
            <p className="text-xs text-zinc-500 mt-0.5">Activity history</p>
          </div>

          {/* Filter Tabs */}
          <div className="flex bg-zinc-100 dark:bg-zinc-900 p-1 rounded-lg text-xs">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-3 py-1 rounded-md font-medium transition-all ${
                activeTab === "all"
                  ? "bg-white dark:bg-zinc-800 shadow-sm text-zinc-900 dark:text-white"
                  : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveTab("comments")}
              className={`px-3 py-1 rounded-md font-medium transition-all ${
                activeTab === "comments"
                  ? "bg-white dark:bg-zinc-800 shadow-sm text-zinc-900 dark:text-white"
                  : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              Comments
            </button>
            <button
              onClick={() => setActiveTab("votes")}
              className={`px-3 py-1 rounded-md font-medium transition-all ${
                activeTab === "votes"
                  ? "bg-white dark:bg-zinc-800 shadow-sm text-zinc-900 dark:text-white"
                  : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              Votes
            </button>
          </div>
        </div>

        {/* List Container */}
        <div className="space-y-4">
          {/* Render Comments */}
          {(activeTab === "all" || activeTab === "comments") &&
            comments.map((comment) => (
              <div
                key={comment._id}
                className="group border border-zinc-200 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950 rounded-2xl p-6 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-3 text-xs text-zinc-400">
                    <span className="inline-flex items-center gap-1.5 font-medium px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400">
                      <MessageSquare size={13} />
                      Comment
                    </span>
                    <div className="flex items-center gap-1.5">
                      <Calendar size={13} />
                      <span>{formatDate(comment.createdAt)}</span>
                    </div>
                  </div>

                  {/* Project Title from Lookup */}
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white tracking-tight">
                    {comment.projectDetails?.title || "Untitled Project"}
                  </h3>

                  <div className="pl-3 border-l-2 border-zinc-300 dark:border-zinc-700">
                    <p className="text-sm italic text-zinc-600 dark:text-zinc-400">
                      {comment.commentText}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end md:self-center">
                  <div className="flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                    <button
                      className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-lg text-zinc-600 dark:text-zinc-400 transition-colors"
                      title="Edit"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      className="p-2 hover:bg-red-500/10 rounded-lg text-red-500 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  <Link
                    href={`/projects/${comment.projectId}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-medium text-zinc-900 dark:text-white hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors shadow-sm"
                  >
                    <span>View Concept</span>
                    <ArrowUpRight size={14} className="text-zinc-400" />
                  </Link>
                </div>
              </div>
            ))}

          {/* Render Votes */}
          {(activeTab === "all" || activeTab === "votes") &&
            votes.map((vote) => (
              <div
                key={vote._id}
                className="group border border-zinc-200 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950 rounded-2xl p-6 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-3 text-xs text-zinc-400">
                    <span className="inline-flex items-center gap-1.5 font-medium px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      <ThumbsUp size={13} />
                      Upvote
                    </span>
                    <div className="flex items-center gap-1.5">
                      <Calendar size={13} />
                      <span>{formatDate(vote.createdAt)}</span>
                    </div>
                  </div>

                  {/* Project Title from Lookup */}
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white tracking-tight">
                    {vote.projectDetails?.title || "Untitled Project"}
                  </h3>

                  <div className="pl-3 border-l-2 border-zinc-300 dark:border-zinc-700">
                    <p className="text-sm italic text-zinc-600 dark:text-zinc-400">
                      Upvoted project release.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end md:self-center">
                  <div className="flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                    <button
                      className="p-2 hover:bg-red-500/10 rounded-lg text-red-500 transition-colors"
                      title="Remove Vote"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  <Link
                    href={`/projects/${vote.projectId}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-medium text-zinc-900 dark:text-white hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors shadow-sm"
                  >
                    <span>View Concept</span>
                    <ArrowUpRight size={14} className="text-zinc-400" />
                  </Link>
                </div>
              </div>
            ))}

          {/* Empty State */}
          {activeTab === "all" &&
            comments.length === 0 &&
            votes.length === 0 && (
              <p className="text-sm text-zinc-500 text-center py-10">
                No interactions found.
              </p>
            )}

          {activeTab === "comments" && comments.length === 0 && (
            <p className="text-sm text-zinc-500 text-center py-10">
              No comments found.
            </p>
          )}
          
          {activeTab === "votes" && votes.length === 0 && (
            <p className="text-sm text-zinc-500 text-center py-10">
              No votes found.
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default MyInteractionsPage;