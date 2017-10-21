import { TypedAction } from '../../generic/types';

export interface LoginState {
    userLogin: string;
    password: string;
}

export type LoginAction =
    ChangeLoginPayload &
    ChangePasswordPayload;

interface ChangeLoginPayload {
    login: string;
}

interface ChangePasswordPayload {
    password: string;
}

export type ChangeLoginFn = (login: string) => TypedAction<ChangeLoginPayload>;

export type ChangePasswordFn = (password: string) => TypedAction<ChangePasswordPayload>;