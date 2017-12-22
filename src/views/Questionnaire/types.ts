import { TypedAction } from '../../generic/types';

export interface QuestionnaireState {
    message: string;
    colors: boolean;
    hashtags: boolean;
    i18n: boolean;
    importance: boolean;
}

export type QuestionnaireAction =
    ChangeMessagePayload &
    ChangeCheckboxPayload;

interface ChangeMessagePayload {
    message: string;
}

interface ChangeCheckboxPayload {
    field: string;
}

export type ChangeMessageFn = (message: string) => TypedAction<ChangeMessagePayload>;
export type ChangeCheckboxFn = (field: string) => TypedAction<ChangeCheckboxPayload>;
