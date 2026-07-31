export interface Project {
  _id: string;
  title: string;
  description: string;
  category?: string;
  thumbnailUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  techStack?: string[];
}