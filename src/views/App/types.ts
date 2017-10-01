export interface NoteType {
    id: number;
    parent: number;
    name: string;
    text: string;
}

export interface FolderType {
    id: number;
    parent: number;
    isActive: boolean;
    isOpen: boolean;
    name: string;
}

export interface TypedAction {
    type: string;
    payload?: any;
}

export type GoToNoteEditFn = (id: number) => (dispatch: (obj: any) => void) => void;

export type MakeFolderActiveFn = (id: number) => (dispatch: (obj: TypedAction) => void) => void;

export type MakeFolderInactiveFn = (id: number) => (dispatch: (obj: TypedAction) => void) => void;

export type GoToEditFolderFn = (id: number) => (dispatch: (obj: TypedAction) => void) => void;

export type RemoveFolderFn = (id: number) => (dispatch: (obj: TypedAction) => void) => void;

export type GoToFolderCreationFn = () => (dispatch: (obj: TypedAction) => void) => void;

export type GoToNoteCreationFn = () => (dispatch: (obj: any) => void) => void;

export type GetAllFoldersFn = () => (dispatch: (obj: TypedAction) => void) => void;

export type HandleSuccessfulGetAllNotesFn = (response: NoteType[]) => TypedAction;

export type HandleFailedGetAllNotesFn = (error: any) => TypedAction;

export type RequestAllNotesFn = () => TypedAction;

export type GetAllNotesFn = () => (dispatch: (callback: any) => void) => void;

export type HandleSuccessfulDeleteNoteFn = (id: number) => TypedAction;

export type HandleFailedDeleteNoteFn = (error: any) => TypedAction;

export type RemoveNoteFn = (id: number) => (dispatch: (callback: any) => void) => void;

export type HandleSuccessfulGetAllFoldersFn = (response: FolderType[]) => TypedAction;

export type HandleFailedGetAllFoldersFn = (error: any) => TypedAction;

export type HandleSuccessfulDeleteFolderFn = (id: number) => TypedAction;

export type HandleFailedDeleteFolderFn = (error: any) => TypedAction;

export type UpdateNoteFilterQueryFn = (query: string) => (dispatch: (obj: TypedAction) => void) => void;