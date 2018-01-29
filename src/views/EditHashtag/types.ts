import {
    TypedAction,
    TypedActionNoPayload,
    HashtagType,
    HashtagTypeAPI,
} from '../../generic/types';

export interface EditHashtagState {
    hashtag: HashtagType;
    errorMessage: string;
}

export interface HandleSuccessfulHashtagEditPayload {
    hashtagId: number | null;
    hashtagName: string;
}

export interface HandleSuccessfulHashtagCreationPayload {
    hashtag: string;
}

export interface HandleFailedHashtagCreationPayload {}

export interface HandleClearFailedHashtagCreationPayload {}

export interface HandleSuccessfulGetHashtagPayload {
    hashtag: HashtagTypeAPI;
}

export interface HandleFailedGetHashtagPayload {
    error: any;
}

export interface HandleHashtagNameChangePayload {
    text: string;
}

export interface HandleHashtagNameClearPayload {}

export interface HandleFailedHashtagEditPayload {
    error: any;
}

export type ReducerAction = HandleSuccessfulHashtagEditPayload &
    HandleFailedHashtagEditPayload &
    HandleSuccessfulHashtagCreationPayload &
    HandleClearFailedHashtagCreationPayload &
    HandleFailedHashtagCreationPayload &
    HandleSuccessfulGetHashtagPayload &
    HandleFailedGetHashtagPayload &
    HandleHashtagNameChangePayload &
    HandleHashtagNameClearPayload;

export type EditHashtagFn = (hashtag: HashtagType) => void;

export type HandleSuccessfulHashtagEditFn = (
    hashtagId: number | null,
    hashtagName: string
) => TypedAction<HandleSuccessfulHashtagEditPayload>;

export type RequestHashtagCreationFn = () => TypedActionNoPayload;

export type HandleSuccessfulHashtagCreationFn = (
    hashtag: string
) => TypedAction<HandleSuccessfulHashtagCreationPayload>;

export type HandleFailedHashtagCreationFn = () => TypedAction<
    HandleFailedHashtagCreationPayload
>;

export type HandleClearFailedHashtagCreationFn = () => TypedAction<
    HandleClearFailedHashtagCreationPayload
>;

export type HandleSuccessfulGetHashtagFn = (
    hashtag: HashtagTypeAPI
) => TypedAction<HandleSuccessfulGetHashtagPayload>;

export type HandleFailedGetHashtagFn = (
    error: any
) => TypedAction<HandleFailedGetHashtagPayload>;

export type RequestHashtagFn = () => TypedActionNoPayload;

export type GetHashtagFn = (
    id: number
) => (dispatch: (callback: any) => void) => void;

export type HandleHashtagNameChangeFn = (
    text: string
) => TypedAction<HandleHashtagNameChangePayload>;

export type HandleHashtagNameClearFn = () => TypedAction<
    HandleHashtagNameClearPayload
>;

export type HandleFailedHashtagEditFn = (
    error: any
) => TypedAction<HandleFailedHashtagEditPayload>;

export type RequestHashtagEditFn = () => TypedActionNoPayload;

export type CreateNewHashtagFn = (
    hashtagName: string,
    activeHashtagId: number
) => (dispatch: any) => Promise<any>;
