import { CheckInState, CheckInAction } from './types';
import { TypedAction } from '../../generic/types';
import { CHANGE_LOGIN, CHANGE_EMAIL, CHANGE_PASSWORD, CHANGE_CONFIRM_PASSWORD } from './constants';

const CheckInReducer = (state: CheckInState = {
    userLogin: '',
    email: '',
    password: '',
    confirmPassword: ''
}, action: TypedAction<CheckInAction>) => {
    switch (action.type) {
        case CHANGE_LOGIN: {
            const { login } = action.payload;

            return {
                ...state,
                userLogin: login
            }
        }

        case CHANGE_EMAIL: {
            const { email } = action.payload;

            return {
                ...state,
                email
            }
        }

        case CHANGE_PASSWORD: {
            const { password } = action.payload;

            return {
                ...state,
                password
            }
        }

        case CHANGE_CONFIRM_PASSWORD: {
            const { confirmPassword } = action.payload;

            return {
                ...state,
                confirmPassword
            }
        }
    }
    return state;
}

export default CheckInReducer;
