import axios from 'axios';

import { hashHistory } from 'react-router';

import { baseName } from '../../app/config';

import { CHANGE_MSG } from './constants';

export const changeMessage = (message: string) => ({
    type: CHANGE_MSG,
    payload: { message }
});