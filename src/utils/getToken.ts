import { localStorageKeys } from './localStorageKeys';

export function getToken() {
    return localStorage.getItem(localStorageKeys.token);
}