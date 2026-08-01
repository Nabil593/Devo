import { useSession } from "@/lib/auth-client";
import { useParams } from "next/navigation";
import { useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";

const CommentSection = () => {
  const { id } = useParams();
  const { data: session } = useSession();
  const user = session?.user;

  const [comment, setComment] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const postComment = async (comment: string) => {
    if (!comment.trim()) return;
    setLoading(true);
    const res = await fetch(`http://localhost:5000/api/interactions/comment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userEmail: user?.email,
        commentText: comment,
        projectId: id,
      }),
    });

    const data = await res.json();

    if (data.success) {
      setComment("")
    }
    setLoading(false);
  };

  return (
    <div className="mt-10 max-w-4xl mx-auto p-6 bg-white dark:bg-black rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm">
      {/* Header */}
      <h3 className="text-lg font-semibold text-gray-900 dark:text-zinc-100 mb-6">
        Discussion (1)
      </h3>

      {/* Comment Input Form (Raw) */}
      <div className="mb-8">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your thoughts..."
          rows={3}
          className="w-full p-3 text-sm bg-transparent border border-gray-200 dark:border-zinc-800 rounded-xl text-gray-900 dark:text-zinc-100 placeholder-gray-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-zinc-100 resize-none"
        />
        <div className="flex justify-end mt-2">
          <button
            onClick={() => postComment(comment)}
            disabled={loading || !comment.trim()}
            className="px-3 py-2 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Posting..." : "Post Comment"}
          </button>
        </div>
      </div>

      {/* Comment Card (Raw) */}
      <div className="space-y-5">
        <div className="group relative p-4 bg-gray-50/60 dark:bg-zinc-800/40 rounded-xl border border-gray-100 dark:border-zinc-800">
          {/* Top Section: Avatar, Name, Timestamp and Icons */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gray-300 dark:bg-zinc-700" />{" "}
              {/* Avatar Placeholder */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-zinc-100">
                  {user?.name}
                </h4>
                <span className="text-xs text-gray-400 dark:text-zinc-500">
                  Just now
                </span>
              </div>
            </div>

            {/* Edit and Delete Icons */}
            <div className="flex items-center gap-2 transition-opacity">
              <button className="p-1.5 text-gray-500 dark:text-zinc-400 hover:bg-gray-200 dark:hover:bg-zinc-700 rounded-md">
                <MdEdit />
              </button>
              <button className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/50 rounded-md">
                <MdDelete />
              </button>
            </div>
          </div>

          {/* Comment Text */}
          <p className="text-sm text-gray-700 dark:text-zinc-300 leading-relaxed pl-12">
            Here is the raw comment text. You can map your own data and write
            your own logic here from scratch!
          </p>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
