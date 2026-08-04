import { useSession } from "@/lib/auth-client";
import { IInteractionComment } from "@/types/comment";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";

const CommentSection = () => {
  const { id } = useParams();
  const { data: session } = useSession();
  const user = session?.user;

  const [comment, setComment] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [commentsList, setCommentsList] = useState<IInteractionComment[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState<string>("");

  // Post Add comment
  const postComment = async (comment: string) => {
    if (!comment.trim()) return;
    setLoading(true);
    const res = await fetch(`http://localhost:5000/api/interactions/comment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userEmail: user?.email,
        userName: user?.name,
        userImage: user?.image,
        commentText: comment,
        projectId: id,
      }),
    });

    const data = await res.json();

    if (data.success) {
      setComment("");
      if (data.comment) {
        setCommentsList((prev) => [data.comment, ...prev]);
      }
    }
    setLoading(false);
  };

  // Get All Comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/interactions/comment?projectId=${id}`,
        );
        const data = await res.json();

        if (data.success && Array.isArray(data.comments)) {
          setCommentsList(data.comments);
        } else {
          setCommentsList([]);
        }
      } catch (err) {
        console.error("Error fetching comments:", err);
        setCommentsList([]);
      }
    };

    if (id) {
      fetchComments();
    }
  }, [id]);

  // Delete Comment
  const handleDelete = async (commentId: string) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/interactions/comment/${commentId}`,
        {
          method: "DELETE",
        },
      );
      const data = await res.json();
      if (data.success) {
        setCommentsList((prev) =>
          prev.filter((comment) => comment._id !== commentId),
        );
      }
    } catch (err) {
      console.error("Error deleting comment:", err);
    }
  };

  // Edit Comment
  const handleEdit = async (commentId: string, newCommentText: string) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/interactions/comment/edit/${commentId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ commentText: newCommentText }),
        },
      );
      const data = await res.json();
      if (data.success) {
        setCommentsList((prev) =>
          prev.map((comment) =>
            comment._id === commentId
              ? { ...comment, commentText: newCommentText }
              : comment,
          ),
        );
      }
    } catch (err) {
      console.error("Error editing comment:", err);
    }
  };

  return (
    <div className="mt-10 max-w-4xl mx-auto p-6 bg-white dark:bg-black rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm">
      {/* Header */}
      <h3 className="text-lg font-semibold text-gray-900 dark:text-zinc-100 mb-6">
        Discussion ({commentsList.length})
      </h3>

      {/* Comment Input Form */}
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

      {/* Comment Card List (Dynamic Map) */}
      <div className="space-y-5">
        {commentsList.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-4">
            No comments yet. Be the first to share your thoughts!
          </p>
        ) : (
          commentsList.map((item) => (
            <div
              key={item._id}
              className="group relative p-4 bg-gray-50/60 dark:bg-zinc-800/40 rounded-xl border border-gray-100 dark:border-zinc-800"
            >
              {/* Top Section */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gray-300 dark:bg-zinc-700" />
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-zinc-100">
                      {item?.userName}
                    </h4>
                    <span className="text-xs text-gray-400 dark:text-zinc-500">
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleDateString()
                        : "Just now"}
                    </span>
                  </div>
                </div>

                {/* Edit and Delete Icons */}
                <div className="flex items-center gap-2 transition-opacity">
                  {/* Edit button */}
                  <button
                    onClick={() => {
                      setEditingId(item._id);
                      setEditText(item.commentText);
                    }}
                    className="p-1.5 text-gray-500 dark:text-zinc-400 hover:bg-gray-200 dark:hover:bg-zinc-700 rounded-md cursor-pointer"
                  >
                    <MdEdit />
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/50 rounded-md cursor-pointer"
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>

              {/* Comment Text / Edit Input Box */}
              {editingId === item._id ? (
                <div className="mt-2 pl-12 space-y-2">
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="w-full p-2 text-sm bg-transparent border border-gray-300 dark:border-zinc-700 rounded-lg text-gray-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100 resize-none"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setEditingId(null)}
                      className="px-2.5 py-1 text-xs rounded-md bg-gray-200 dark:bg-zinc-700 text-gray-700 dark:text-zinc-300 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        handleEdit(item._id, editText);
                        setEditingId(null);
                      }}
                      className="px-2.5 py-1 text-xs rounded-md bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 font-medium cursor-pointer"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-700 dark:text-zinc-300 leading-relaxed pl-12">
                  {item.commentText}
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;
