export interface NoteType {
    id: number;
    parent: number;
    name: string;
    text: string;
}

export interface FolderType {
    id: number;
    parent: number;
    isActive: boolean;
    isOpen: boolean;
    name: string;
}

export interface TypedAction {
    type: string;
    payload?: any;
}