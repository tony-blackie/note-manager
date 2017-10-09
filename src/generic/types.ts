import { EditNoteState } from '../views/EditNote/types';
import { AppComponentState } from '../views/App/types';
import { EditFolderState } from '../views/EditFolder/types';

export interface Store {
    editNote: EditNoteState;
    editFolder: EditFolderState;
    app: AppComponentState;
}

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