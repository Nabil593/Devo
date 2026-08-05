import { ProjectDetails } from "./project";

export interface Comment {
  _id: string;
  projectId: string;
  projectDetails?: ProjectDetails;
  userEmail: string;
  userName: string;
  userImage: string;
  commentText: string;
  createdAt?: Date;
}