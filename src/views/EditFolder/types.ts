import { TypedAction } from '../../generic/types';

export interface EditFolderState {
    folderName: string;
    folderId: number | null;
}

export type GetFolderFn = (id: string) => void;

export type CreateNewFolderFn = (folderName: string) => void;

export type EditFolderFn = (id: number, name: string) => void;

export type HandleFolderNameChangeFn = (text: string) => void;

export type HandleSuccessfulFolderEditFn = (folderId: number | null, folderName: string) => TypedAction;