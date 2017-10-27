import { TypedAction } from '../../generic/types';

export interface CheckInState {
    userLogin: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export type CheckInAction =
    ChangeLoginPayload &
    ChangeEmailPayload &
    ChangePasswordPayload &
    ChangeConfirmPasswordPayload;

interface ChangeLoginPayload {
    login: string;
}

interface ChangeEmailPayload {
    email: string;
}

interface ChangePasswordPayload {
    password: string;
}

interface ChangeConfirmPasswordPayload {
    confirmPassword: string;
}

export type ChangeLoginFn = (login: string) => TypedAction<ChangeLoginPayload>;

export type ChangeEmailFn = (email: string) => TypedAction<ChangeEmailPayload>;

export type ChangePasswordFn = (password: string) => TypedAction<ChangePasswordPayload>;

export type ChangeConfirmPasswordFn = (confirmPassword: string) => TypedAction<ChangeConfirmPasswordPayload>;
