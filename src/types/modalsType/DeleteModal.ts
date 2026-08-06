export interface DeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    projectId: string;
    projectTitle: string;
    onDeleted: (deletedId: string) => void;
}