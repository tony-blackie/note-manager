import { EditNoteState } from '../views/EditNote/types';
import { AppComponentState } from '../views/App/types';
import { EditFolderState } from '../views/EditFolder/types';
import { LoginState } from '../views/Login/types';
import { CheckInState } from '../views/CheckIn/types';

export interface Store {
    editNote: EditNoteState;
    editFolder: EditFolderState;
    app: AppComponentState;
    login: LoginState;
    checkIn: CheckInState;
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
    notes: number[];
}

export interface TypedAction<payload> {
    type: string;
    payload?: payload;
}

export interface TypedActionNoPayload {
    type: string;
}
