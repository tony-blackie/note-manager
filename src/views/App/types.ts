export interface NoteType {
    id: number;
    parent: number;
    name: string;
    text: string;
}

export type UpdateNoteFilterQueryFn = (text: string) => void;

export type GoToNoteEditFn = () => void;

export type RemoveNoteFn = () => void;