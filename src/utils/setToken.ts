import { localStorageKeys } from './localStorageKeys';

export function setToken(token: string) {
    localStorage.setItem(localStorageKeys.token, token);
}