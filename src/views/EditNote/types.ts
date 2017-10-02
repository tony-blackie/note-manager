export interface EditedNote {
    id: number | null;
    name: string;
    textFieldValue: string;
    textFieldPlaceholder: string;
    folderId: number | null;
}

export interface EditNoteState {
    editedNote: EditedNote;
    isNoteCreationMode: boolean;
}

export interface TypedAction {
    type: string;
    payload?: any;
}