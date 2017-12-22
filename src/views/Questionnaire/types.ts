import { TypedAction } from '../../generic/types';

export interface QuestionnaireState {
    message: string;
}

export type QuestionnaireAction =
    ChangeMessagePayload;

interface ChangeMessagePayload {
    message: string;
}

export type ChangeMessageFn = (message: string) => TypedAction<ChangeMessagePayload>;
