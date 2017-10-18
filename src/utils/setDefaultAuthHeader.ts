import axios from 'axios';

import { getToken } from './getToken';

export function setDefaultAuthHeader() {
    axios.defaults.headers.common['Authorization'] = getToken();
}