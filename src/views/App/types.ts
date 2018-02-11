import {
    HashtagType,
    HashtagTypeAPI,
    NoteType,
    TypedAction,
    TypedActionNoPayload,
} from '../../generic/types';
import { HandleSuccessfulHashtagEditPayload } from '../EditHashtag/types';

export interface AppComponentState {
    hashtags: HashtagType[] | null;
    notes: NoteType[];
    activeHashtagId: number | null;
    notesQuery: string;
}

export interface MakeHashtagActivePayload {
    id: number;
}

export interface MakeHashtagInactivePayload {
    id: number;
}

export interface HandleSuccessfulGetAllNotesPayload {
    notes: NoteType[];
}

export interface HandleFailedGetAllNotesPayload {
    error: any;
}

export interface HandleSuccessfulDeleteNotePayload {
    id: number;
}

export interface HandleSuccessfulGetAllHashtagsPayload {
    hashtags: HashtagTypeAPI[];
}

export interface HandleFailedDeleteNotePayload {
    error: any;
}

export interface HandleFailedGetAllHashtagsPayload {
    error: any;
}

export interface HandleSuccessfulDeleteHashtagPayload {
    id: number;
}

export interface HandleFailedDeleteHashtagPayload {
    error: any;
}

export interface UpdateNoteFilterQueryPayload {
    query: string;
}

export type ReducerAction = MakeHashtagActivePayload &
    HandleFailedDeleteHashtagPayload &
    HandleFailedDeleteNotePayload &
    HandleFailedGetAllHashtagsPayload &
    HandleFailedGetAllNotesPayload &
    HandleSuccessfulDeleteHashtagPayload &
    HandleSuccessfulDeleteNotePayload &
    HandleSuccessfulGetAllHashtagsPayload &
    HandleSuccessfulGetAllNotesPayload &
    HandleSuccessfulHashtagEditPayload &
    UpdateNoteFilterQueryPayload;

export type GoToNoteEditFn = (
    id: number
) => (dispatch: (obj: any) => void) => void;

export type MakeHashtagActiveFn = (
    id: number
) => (dispatch: (obj: TypedAction<MakeHashtagActivePayload>) => void) => void;

export type MakeHashtagInactiveFn = (
    id: number
) => (dispatch: (obj: TypedAction<MakeHashtagInactivePayload>) => void) => void;

export type GoToEditHashtagFn = (
    id: number
) => (dispatch: (obj: TypedAction<any>) => void) => void;

export type RemoveHashtagFn = (
    id: number
) => (dispatch: (obj: TypedAction<any>) => void) => void;

export type GoToHashtagCreationFn = () => (
    dispatch: (obj: TypedAction<any>) => void
) => void;

export type GoToNoteCreationFn = () => (dispatch: (obj: any) => void) => void;

export type GetAllHashtagsFn = () => (
    dispatch: (obj: TypedAction<any>) => void
) => void;

export type HandleSuccessfulGetAllNotesFn = (
    response: NoteType[]
) => TypedAction<HandleSuccessfulGetAllNotesPayload>;

export type HandleFailedGetAllNotesFn = (
    error: any
) => TypedAction<HandleFailedGetAllNotesPayload>;

export type RequestAllNotesFn = () => TypedActionNoPayload;

export type GetAllNotesFn = () => (dispatch: (callback: any) => void) => void;

export type HandleSuccessfulDeleteNoteFn = (
    id: number
) => TypedAction<HandleSuccessfulDeleteNotePayload>;

export type HandleFailedDeleteNoteFn = (
    error: any
) => TypedAction<HandleFailedDeleteNotePayload>;

export type RemoveNoteFn = (
    id: number
) => (dispatch: (callback: any) => void) => void;

export type HandleSuccessfulGetAllHashtagsFn = (
    response: HashtagTypeAPI[]
) => TypedAction<HandleSuccessfulGetAllHashtagsPayload>;

export type HandleFailedGetAllHashtagsFn = (
    error: any
) => TypedAction<HandleFailedGetAllHashtagsPayload>;

export type HandleSuccessfulDeleteHashtagFn = (
    id: number
) => TypedAction<HandleSuccessfulDeleteHashtagPayload>;

export type HandleFailedDeleteHashtagFn = (
    error: any
) => TypedAction<HandleFailedDeleteHashtagPayload>;

export type UpdateNoteFilterQueryFn = (
    query: string
) => TypedAction<UpdateNoteFilterQueryPayload>;

export type CreateInitialHashtagFn = () => Promise<any>;
