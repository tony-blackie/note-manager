import { FolderType, NoteType, TypedAction, TypedActionNoPayload } from '../../generic/types';

export interface AppComponentState {
    folders: FolderType[];
    notes: NoteType[];
    activeFolderId: number | null;
    notesQuery: string;
}

export type GoToNoteEditFn = (id: number) => (dispatch: (obj: any) => void) => void;

export type MakeFolderActiveFn = (id: number) => (dispatch: (obj: TypedAction<any>) => void) => void;

export type MakeFolderInactiveFn = (id: number) => (dispatch: (obj: TypedAction<any>) => void) => void;

export type GoToEditFolderFn = (id: number) => (dispatch: (obj: TypedAction<any>) => void) => void;

export type RemoveFolderFn = (id: number) => (dispatch: (obj: TypedAction<any>) => void) => void;

export type GoToFolderCreationFn = () => (dispatch: (obj: TypedAction<any>) => void) => void;

export type GoToNoteCreationFn = () => (dispatch: (obj: any) => void) => void;

export type GetAllFoldersFn = () => (dispatch: (obj: TypedAction<any>) => void) => void;

export interface HandleSuccessfulGetAllNotesPayload {
    notes: NoteType[];
}

export type HandleSuccessfulGetAllNotesFn = (response: NoteType[]) =>
    TypedAction<HandleSuccessfulGetAllNotesPayload>;

export interface HandleFailedGetAllNotesPayload {
    error: any;
}

export type HandleFailedGetAllNotesFn = (error: any) =>
    TypedAction<HandleFailedGetAllNotesPayload>;

export type RequestAllNotesFn = () => TypedActionNoPayload;

export type GetAllNotesFn = () => (dispatch: (callback: any) => void) => void;

export interface HandleSuccessfulDeleteNotePayload {
    id: number;
}

export type HandleSuccessfulDeleteNoteFn = (id: number) =>
    TypedAction<HandleSuccessfulDeleteNotePayload>;

export interface HandleFailedDeleteNotePayload {
    error: any;
}

export type HandleFailedDeleteNoteFn = (error: any) =>
    TypedAction<HandleFailedDeleteNotePayload>;

export type RemoveNoteFn = (id: number) => (dispatch: (callback: any) => void) => void;

export interface HandleSuccessfulGetAllFoldersPayload {
    folders: FolderType[];
}

export type HandleSuccessfulGetAllFoldersFn = (response: FolderType[]) =>
    TypedAction<HandleSuccessfulGetAllFoldersPayload>;

export interface HandleFailedGetAllFoldersPayload {
    error: any;
}

export type HandleFailedGetAllFoldersFn = (error: any) =>
    TypedAction<HandleFailedGetAllFoldersPayload>;

export interface HandleSuccessfulDeleteFolderPayload {
    id: number;
}

export type HandleSuccessfulDeleteFolderFn = (id: number) =>
    TypedAction<HandleSuccessfulDeleteFolderPayload>;

export interface HandleFailedDeleteFolderPayload {
    error: any;
}

export type HandleFailedDeleteFolderFn = (error: any) =>
    TypedAction<HandleFailedDeleteFolderPayload>;

export type UpdateNoteFilterQueryFn = (query: string) =>
    (dispatch: (obj: TypedAction<any>) => void) => void;