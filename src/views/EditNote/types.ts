import { FolderType, NoteType, TypedAction, TypedActionNoPayload } from '../../generic/types';

export interface EditedNote {
    id?: number | null;
    name: string;
    textFieldValue: string;
    textFieldPlaceholder: string;
    folderId: number | null;
    date: string;
}

export interface EditNoteState {
    editedNote: EditedNote;
    isNoteCreationMode: boolean;
    errorMessage: string;
    editTags: EditTags;
}

export interface TypedAction {
    type: string;
    payload?: any;
}

export interface EditTags {
    listTags: any
}

interface NoteRequestBody {
    id?: string;
    name: string;
    text: string;
    parent?: number | null;
}

export type CreateNoteRequestFn = (note: NoteRequestBody, activeFolderId: number) => void;

export type EditNoteRequestFn = (note: NoteRequestBody) => void;

export type ChangeTextFieldValueFn = (value: string) => void;

export type FetchNoteFn = (noteId: string) => void;