import { FolderType, NoteType, TypedAction, TypedActionNoPayload } from '../../generic/types';
import { HandleSuccessfulFolderEditPayload } from '../EditFolder/types';

export interface AppComponentState {
    folders: FolderType[];
    notes: NoteType[];
    activeFolderId: number | null;
    notesQuery: string;
}

export interface MakeFolderActivePayload {
    id: number;
}

export interface MakeFolderInactivePayload {
    id: number;
}

export interface HandleSuccessfulGetAllNotesPayload {
    notes: NoteType[];
}

export interface HandleFailedGetAllNotesPayload {
    error: any;
}

export interface HandleSuccessfulDeleteNotePayload {
    id: number;
}

export interface HandleSuccessfulGetAllFoldersPayload {
    folders: FolderType[];
}

export interface HandleFailedDeleteNotePayload {
    error: any;
}

export interface HandleFailedGetAllFoldersPayload {
    error: any;
}

export interface HandleSuccessfulDeleteFolderPayload {
    id: number;
}

export interface HandleFailedDeleteFolderPayload {
    error: any;
}

export interface UpdateNoteFilterQueryPayload {
    query: string;
}

export type ReducerAction =
MakeFolderActivePayload &
HandleFailedDeleteFolderPayload &
HandleFailedDeleteNotePayload &
HandleFailedGetAllFoldersPayload &
HandleFailedGetAllNotesPayload &
HandleSuccessfulDeleteFolderPayload &
HandleSuccessfulDeleteNotePayload &
HandleSuccessfulGetAllFoldersPayload &
HandleSuccessfulGetAllNotesPayload &
HandleSuccessfulFolderEditPayload &
UpdateNoteFilterQueryPayload

export type GoToNoteEditFn = (id: number) => (dispatch: (obj: any) => void) => void;

export type MakeFolderActiveFn = (id: number) =>
    (dispatch: (obj: TypedAction<MakeFolderActivePayload>) => void) => void;

export type MakeFolderInactiveFn = (id: number) =>
    (dispatch: (obj: TypedAction<MakeFolderInactivePayload>) => void) => void;

export type GoToEditFolderFn = (id: number) => (dispatch: (obj: TypedAction<any>) => void) => void;

export type RemoveFolderFn = (id: number) => (dispatch: (obj: TypedAction<any>) => void) => void;

export type GoToFolderCreationFn = () => (dispatch: (obj: TypedAction<any>) => void) => void;

export type GoToNoteCreationFn = () => (dispatch: (obj: any) => void) => void;

export type GetAllFoldersFn = () => (dispatch: (obj: TypedAction<any>) => void) => void;

export type HandleSuccessfulGetAllNotesFn = (response: NoteType[]) =>
    TypedAction<HandleSuccessfulGetAllNotesPayload>;

export type HandleFailedGetAllNotesFn = (error: any) =>
    TypedAction<HandleFailedGetAllNotesPayload>;

export type RequestAllNotesFn = () => TypedActionNoPayload;

export type GetAllNotesFn = () => (dispatch: (callback: any) => void) => void;

export type HandleSuccessfulDeleteNoteFn = (id: number) =>
    TypedAction<HandleSuccessfulDeleteNotePayload>;

export type HandleFailedDeleteNoteFn = (error: any) =>
    TypedAction<HandleFailedDeleteNotePayload>;

export type RemoveNoteFn = (id: number) => (dispatch: (callback: any) => void) => void;

export type HandleSuccessfulGetAllFoldersFn = (response: FolderType[]) =>
    TypedAction<HandleSuccessfulGetAllFoldersPayload>;

export type HandleFailedGetAllFoldersFn = (error: any) =>
    TypedAction<HandleFailedGetAllFoldersPayload>;

export type HandleSuccessfulDeleteFolderFn = (id: number) =>
    TypedAction<HandleSuccessfulDeleteFolderPayload>;

export type HandleFailedDeleteFolderFn = (error: any) =>
    TypedAction<HandleFailedDeleteFolderPayload>;

export type UpdateNoteFilterQueryFn = (query: string) =>
    (dispatch: (obj: TypedAction<any>) => void) => void;