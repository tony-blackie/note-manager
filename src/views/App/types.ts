import { FolderType, NoteType, TypedAction } from '../../generic/types';

export interface AppComponentState {
    folders: FolderType[];
    notes: NoteType[];
    activeFolderId: number | null;
    notesQuery: string;
}

export type GoToNoteEditFn = (id: number) => (dispatch: (obj: any) => void) => void;

export type MakeFolderActiveFn = (id: number) => (dispatch: (obj: TypedAction) => void) => void;

export type MakeFolderInactiveFn = (id: number) => (dispatch: (obj: TypedAction) => void) => void;

export type GoToEditFolderFn = (id: number) => (dispatch: (obj: TypedAction) => void) => void;

export type RemoveFolderFn = (id: number) => (dispatch: (obj: TypedAction) => void) => void;

export type GoToFolderCreationFn = () => (dispatch: (obj: TypedAction) => void) => void;

export type GoToNoteCreationFn = () => (dispatch: (obj: any) => void) => void;

export type GetAllFoldersFn = () => (dispatch: (obj: TypedAction) => void) => void;

export type HandleSuccessfulGetAllNotesFn = (response: NoteType[]) => TypedAction<NoteType[]>;

export type HandleFailedGetAllNotesFn = (error: any) => TypedAction;

export type RequestAllNotesFn = () => TypedAction;

export type GetAllNotesFn = () => (dispatch: (callback: any) => void) => void;

export type HandleSuccessfulDeleteNoteFn = (id: number) => TypedAction;

export type HandleFailedDeleteNoteFn = (error: any) => TypedAction;

export type RemoveNoteFn = (id: number) => (dispatch: (callback: any) => void) => void;

export interface HandleSuccessfulGetAllFoldersPayload {
    folders: FolderType[];
}

export type HandleSuccessfulGetAllFoldersFn = (response: FolderType[]) => TypedAction<HandleSuccessfulGetAllFoldersPayload>;

export type HandleFailedGetAllFoldersFn = (error: any) => TypedAction;

export type HandleSuccessfulDeleteFolderFn = (id: number) => TypedAction;

export type HandleFailedDeleteFolderFn = (error: any) => TypedAction;

export type UpdateNoteFilterQueryFn = (query: string) => (dispatch: (obj: TypedAction) => void) => void;