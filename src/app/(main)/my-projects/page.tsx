"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "@/lib/auth-client";
import { Project } from "@/types/project";
import { Plus, ExternalLink, Pencil, Trash2, Calendar } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import DeleteModal from "@/components/ModalComponent/DeleteModal";
import EditModal from "@/components/ModalComponent/EditModal";

const MyProjectsPage = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const userEmail = user?.email;

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [selectedProjectTitle, setSelectedProjectTitle] = useState("");

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProjectForEdit, setSelectedProjectForEdit] =
    useState<Project | null>(null);

  // Get User Projects
  useEffect(() => {
    const fetchMyProjects = async () => {
      if (!userEmail) return;

      try {
        const res = await fetch(
          `http://localhost:5000/api/projects/my-projects?email=${userEmail}`,
        );
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
      <main className="max-w-5xl mx-auto px-6 py-16">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 border-b border-zinc-200 dark:border-zinc-800/80 pb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
              My Deployed Projects
            </h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
              Manage your creative concepts, update metadata, and track your
              builds.
            </p>
          </div>
          <Link
            href="/add-project"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 font-medium text-xs hover:opacity-90 transition-all shadow-sm"
          >
            <Plus size={16} />
            <span>Add New Project</span>
          </Link>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-24">
            <p className="text-sm text-zinc-500 animate-pulse">
              Loading your concepts...
            </p>
          </div>
        ) : projects.length === 0 ? (
          /* Empty State */
          <div className="text-center py-24 border border-dashed border-zinc-300 dark:border-zinc-800 rounded-2xl bg-zinc-50/50 dark:bg-zinc-950/50">
            <p className="text-zinc-500 dark:text-zinc-400 mb-4 text-sm">
              {"You haven't published any projects yet."}
            </p>
            <Link
              href="/add-project"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 font-medium text-xs shadow-sm"
            >
              <Plus size={16} />
              <span>Create Your First Project</span>
            </Link>
          </div>
        ) : (
          /* Single Column List Layout (Horizontal Split per Card) */
          <div className="space-y-6">
            {projects.map((project: Project) => (
              <div
                key={project._id}
                className="group border border-zinc-200 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950 rounded-2xl overflow-hidden transition-all flex flex-col md:flex-row justify-between shadow-sm"
              >
                {/* Left Side: Project Details & Tech Stack */}
                <div className="p-6 flex-1 space-y-3 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-xs text-zinc-400">
                      <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md bg-zinc-200/60 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300">
                        {project.category || "Uncategorized"}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <Calendar size={12} />
                        <span>
                          {project.createdAt
                            ? new Date(project.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                },
                              )
                            : ""}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech Stack Tags */}
                    {project.techStack && project.techStack.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {project.techStack.map(
                          (tech: string, index: number) => (
                            <span
                              key={index}
                              className="text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-zinc-200/50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200/40 dark:border-zinc-800"
                            >
                              {tech}
                            </span>
                          ),
                        )}
                      </div>
                    )}
                  </div>

                  {/* Links and Actions Footer inside Left Side */}
                  <div className="flex items-center justify-between pt-4 mt-4 border-t border-zinc-200 dark:border-zinc-800/80">
                    <div className="flex items-center gap-3 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 hover:text-zinc-900 dark:hover:text-white transition-colors"
                        >
                          <FaGithub size={14} />
                          <span>Code</span>
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 hover:text-zinc-900 dark:hover:text-white transition-colors"
                        >
                          <ExternalLink size={14} />
                          <span>Live Demo</span>
                        </a>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          setSelectedProjectForEdit(project);
                          setIsEditModalOpen(true);
                        }}
                        className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-lg text-zinc-600 dark:text-zinc-400 transition-colors"
                        title="Edit Project"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedProjectId(project._id);
                          setSelectedProjectTitle(project.title);
                          setIsDeleteModalOpen(true);
                        }}
                        className="p-2 hover:bg-red-500/10 rounded-lg text-red-500 transition-colors"
                        title="Delete Project"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Side: Thumbnail Image */}
                <div className="relative w-full md:w-72 h-48 md:h-auto bg-zinc-100 dark:bg-zinc-900 border-t md:border-t-0 md:border-l border-zinc-200 dark:border-zinc-800/80 overflow-hidden flex-shrink-0">
                  {project.thumbnailUrl &&
                  !project.thumbnailUrl.includes("jykamugotopewe") ? (
                    <Image
                      src={project.thumbnailUrl}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-xs text-zinc-400">
                      No Thumbnail
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Delete Modal Component */}
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          projectId={selectedProjectId}
          projectTitle={selectedProjectTitle}
          onDeleted={(deletedId) => {
            setProjects(projects.filter((p) => p._id !== deletedId));
          }}
        />

        {/* Edit Modal Component */}
        <EditModal
          key={selectedProjectForEdit?._id}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          project={selectedProjectForEdit}
          onUpdated={(updatedProject) => {
            setProjects((prevProjects) =>
              prevProjects.map((p) =>
                p._id === updatedProject._id ? updatedProject : p,
              ),
            );
          }}
        />
      </main>
    </div>
  );
};

export default MyProjectsPage;
