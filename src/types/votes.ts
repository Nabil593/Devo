import { ProjectDetails } from "./project";

export interface Vote {
    _id: string;
    projectId: string;
    projectDetails?: ProjectDetails;
    userEmail: string;
    createdAt?: string;
}