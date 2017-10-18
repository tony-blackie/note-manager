import { TypedAction, TypedActionNoPayload, FolderType } from '../../generic/types';

export interface EditFolderState {
    folderName: string;
    folderId: number | null;
    folderFail: string;
}

export interface HandleSuccessfulFolderEditPayload {
    folderId: number | null;
    folderName: string;
}

export interface HandleSuccessfulFolderCreationPayload {
    folder: string;
}

export interface HandleFailedFolderCreationPayload {
    error: any;
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

export interface HandleFailedFolderEditPayload {
    error: any;
}

export type ReducerAction =
HandleSuccessfulFolderEditPayload &
HandleFailedFolderEditPayload &
HandleSuccessfulFolderCreationPayload &
HandleFailedFolderCreationPayload &
HandleSuccessfulGetFolderPayload &
HandleFailedGetFolderPayload &
HandleFolderNameChangePayload

export type EditFolderFn = (id: number, name: string) => void;

export type HandleSuccessfulFolderEditFn = (folderId: number | null, folderName: string) =>
    TypedAction<HandleSuccessfulFolderEditPayload>;

export type RequestFolderCreationFn = () => TypedActionNoPayload;

export type HandleSuccessfulFolderCreationFn = (folder: string) =>
    TypedAction<HandleSuccessfulFolderCreationPayload>;

export type HandleFailedFolderCreationFn = (error: any) =>
    TypedAction<HandleFailedFolderCreationPayload>;

export type HandleSuccessfulGetFolderFn = (folder: FolderType) =>
    TypedAction<HandleSuccessfulGetFolderPayload>;

export type HandleFailedGetFolderFn = (error: any) =>
    TypedAction<HandleFailedGetFolderPayload>;

export type RequestFolderFn = () => TypedActionNoPayload;

export type GetFolderFn = (id: number) => (dispatch: (callback: any) => void) => void;

export type HandleFolderNameChangeFn = (text: string) =>
    TypedAction<HandleFolderNameChangePayload>;

export type HandleFailedFolderEditFn = (error: any) => TypedAction<HandleFailedFolderEditPayload>;

export type RequestFolderEditFn = () => TypedActionNoPayload;

export type CreateNewFolderFn = (folderName: string) => (dispatch: any) => Promise<any>;