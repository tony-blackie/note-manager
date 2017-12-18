import { localStorageKeys } from './localStorageKeys';

function deleteToken() {
    localStorage.removeItem(localStorageKeys.token);
}

export default deleteToken;