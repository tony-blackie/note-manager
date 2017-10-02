export interface EditFolderState {
    folderName: string;
}

export type GetFolderFn = (id: string) => void;

export type CreateNewFolderFn = (folderName: string) => void;

export type EditFolderFn = (id: number, name: string) => void;

export type HandleFolderNameChangeFn = (text: string) => void;