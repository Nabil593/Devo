export interface IInteractionComment {
  _id: string;
  projectId: string;
  userEmail: string;
  userName: string;
  userImage: string;
  commentText: string;
  createdAt: Date;
}