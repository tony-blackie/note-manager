import { createSelector } from 'reselect';
import { Store } from '../../generic/types';

export const selectCheckIn = (state: Store) => state.checkIn;

export const selectUserLogin = createSelector(
    selectCheckIn,
    checkIn => checkIn.userLogin
);

export const selectEmail = createSelector(
    selectCheckIn,
    checkIn => checkIn.email
);

export const selectPassword = createSelector(
    selectCheckIn,
    checkIn => checkIn.password
);

export const selectConfirmPassword = createSelector(
    selectCheckIn,
    checkIn => checkIn.confirmPassword
);
