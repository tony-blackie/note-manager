import {
    HashtagType,
    NoteType,
    TypedAction,
    TypedActionNoPayload,
} from '../../generic/types';

export interface EditedNote<Hashtag> {
    id?: number | null;
    name: string;
    textFieldValue: string;
    textFieldPlaceholder: string;
    hashtags: Hashtag[];
    date: string;
}

export interface EditNoteState {
    editedNote: EditedNote<HashtagType | number>;
    isNoteCreationMode: boolean;
    errorMessage: string;
}

export interface TypedAction {
    type: string;
    payload?: any;
}

export interface EditedTags {
    listTags: any;
}

interface NoteRequestBody {
    id?: string;
    name: string;
    text: string;
    parent?: number | null;
}

export type CreateNoteRequestFn = (
    note: NoteRequestBody,
    allHashtags: HashtagType[],
    hashtagsToAdd: HashtagType[]
) => void;

export type EditNoteRequestFn = (
    note: NoteRequestBody,
    allHashtags: HashtagType[],
    hashtagsToAdd: HashtagType[]
) => void;

export type ChangeTextFieldValueFn = (value: string) => void;

export type FetchNoteFn = (noteId: string) => void;
