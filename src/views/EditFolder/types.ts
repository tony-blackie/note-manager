import { TypedAction, TypedActionNoPayload, FolderType } from '../../generic/types';

export interface EditFolderState {
    folderName: string;
    folderId: number | null;
}

export type EditFolderFn = (id: number, name: string) => void;

export interface HandleSuccessfulFolderEditPayload {
    folderId: number | null;
    folderName: string;
}

export type HandleSuccessfulFolderEditFn = (folderId: number | null, folderName: string) =>
    TypedAction<HandleSuccessfulFolderEditPayload>;

export type RequestFolderCreationFn = () => TypedActionNoPayload;

export interface HandleSuccessfulFolderCreationPayload {
    folder: string;
}

export type HandleSuccessfulFolderCreationFn = (folder: string) =>
    TypedAction<HandleSuccessfulFolderCreationPayload>;

export interface HandleFailedFolderCreationPayload {
    error: any;
}

export type HandleFailedFolderCreationFn = (error: any) =>
    TypedAction<HandleFailedFolderCreationPayload>;

export interface HandleSuccessfulGetFolderPayload {
    folder: FolderType;
}

export type HandleSuccessfulGetFolderFn = (folder: FolderType) =>
    TypedAction<HandleSuccessfulGetFolderPayload>;

export interface HandleFailedGetFolderPayload {
    error: any;
}

export type HandleFailedGetFolderFn = (error: any) =>
    TypedAction<HandleFailedGetFolderPayload>;

export type RequestFolderFn = () => TypedActionNoPayload;

export type GetFolderFn = (id: number) => (dispatch: (callback: any) => void) => void;

export interface HandleFolderNameChangePayload {
    text: string;
}

export type HandleFolderNameChangeFn = (text: string) =>
    TypedAction<HandleFolderNameChangePayload>;

export interface HandleFailedFolderEditPayload {
    error: any;
}

export type HandleFailedFolderEditFn = (error: any) => TypedAction<HandleFailedFolderEditPayload>;

export type RequestFolderEditFn = () => TypedActionNoPayload;

export type CreateNewFolderFn = (folderName: string) => (dispatch: any) => Promise<any>;