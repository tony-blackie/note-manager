import axios from 'axios';

import { hashHistory } from 'react-router';

import { baseName } from '../../app/config';

import { CHANGE_MSG, CHANGE_CHECKBOX } from './constants';

export const changeMessage = (message: string) => ({
    type: CHANGE_MSG,
    payload: { message }
});

export const changeCheckbox = (field: string) => ({
    type: CHANGE_CHECKBOX,
    payload: { field }
});