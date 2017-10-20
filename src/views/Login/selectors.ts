import { createSelector } from 'reselect';
import { Store } from '../../generic/types';

export const selectLogin = (state: Store) => state.login;

export const selectUserLogin = createSelector(
    selectLogin,
    login => login.userLogin
);

export const selectPassword = createSelector(
    selectLogin,
    login => login.password
)