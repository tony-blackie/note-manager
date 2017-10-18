import { FolderType, NoteType, TypedAction } from '../../generic/types';

export interface EditedNote {
    id?: number | null;
    name: string;
    textFieldValue: string;
    textFieldPlaceholder: string;
    folderId: number | null;
}

export interface EditNoteState {
    editedNote: EditedNote;
    isNoteCreationMode: boolean;
    failNote: string;
}

export interface TypedAction {
    type: string;
    payload?: any;
}

interface NoteRequestBody {
    id?: string;
    name: string;
    text: string;
    parent?: number | null;
}

export type CreateNoteRequestFn = (note: NoteRequestBody) => void;

export type ChangeTextFieldValueFn = (value: string) => void;

export type FetchNoteFn = (noteId: string) => void;