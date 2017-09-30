export interface NoteType {
    id: number;
    parent: number;
    name: string;
    text: string;
}

export type UpdateNoteFilterQueryFn = (text: string) => void;

export type GoToNoteEditFn = (id: number) => void;

export type RemoveNoteFn = (id: number) => void;

export type MakeFolderActiveFn = (id: number) => void;

export type MakeFolderInactiveFn = (id: number) => void;