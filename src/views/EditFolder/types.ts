import { TypedAction, TypedActionNoPayload, FolderType } from '../../generic/types';

export interface EditFolderState {
    folderName: string;
    folderId: number | null;
    errorMessage: string;
}

export interface HandleSuccessfulFolderEditPayload {
    folderId: number | null;
    folderName: string;
}

export interface HandleSuccessfulFolderCreationPayload {
    folder: string;
}

export interface HandleFailedFolderCreationPayload {
}

export interface HandleClearFailedFolderCreationPayload {
}

export interface HandleSuccessfulGetFolderPayload {
    folder: FolderType;
}

export interface HandleFailedGetFolderPayload {
    error: any;
}

export interface HandleFolderNameChangePayload {
    text: string;
}

export interface HandleFolderNameClearPayload {
}

export interface HandleFailedFolderEditPayload {
    error: any;
}

export type ReducerAction =
HandleSuccessfulFolderEditPayload &
HandleFailedFolderEditPayload &
HandleSuccessfulFolderCreationPayload &
HandleClearFailedFolderCreationPayload &
HandleFailedFolderCreationPayload &
HandleSuccessfulGetFolderPayload &
HandleFailedGetFolderPayload &
HandleFolderNameChangePayload &
HandleFolderNameClearPayload

export type EditFolderFn = (id: number, name: string) => void;

export type HandleSuccessfulFolderEditFn = (folderId: number | null, folderName: string) =>
    TypedAction<HandleSuccessfulFolderEditPayload>;

export type RequestFolderCreationFn = () => TypedActionNoPayload;

export type HandleSuccessfulFolderCreationFn = (folder: string) =>
    TypedAction<HandleSuccessfulFolderCreationPayload>;

export type HandleFailedFolderCreationFn = () =>
    TypedAction<HandleFailedFolderCreationPayload>;

export type HandleClearFailedFolderCreationFn = () =>
    TypedAction<HandleClearFailedFolderCreationPayload>;

export type HandleSuccessfulGetFolderFn = (folder: FolderType) =>
    TypedAction<HandleSuccessfulGetFolderPayload>;

export type HandleFailedGetFolderFn = (error: any) =>
    TypedAction<HandleFailedGetFolderPayload>;

export type RequestFolderFn = () => TypedActionNoPayload;

export type GetFolderFn = (id: number) => (dispatch: (callback: any) => void) => void;

export type HandleFolderNameChangeFn = (text: string) =>
    TypedAction<HandleFolderNameChangePayload>;

    export type HandleFolderNameClearFn = () =>
TypedAction<HandleFolderNameClearPayload>;

export type HandleFailedFolderEditFn = (error: any) => TypedAction<HandleFailedFolderEditPayload>;

export type RequestFolderEditFn = () => TypedActionNoPayload;

export type CreateNewFolderFn = (folderName: string, activeFolderId: number) => (dispatch: any) => Promise<any>;