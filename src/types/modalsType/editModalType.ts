import { Project } from "../project";

export interface EditModalProps {
    isOpen: boolean;
    onClose: () => void;
    project: Project | null;
    onUpdated: (updatedProject: Project) => void;
}