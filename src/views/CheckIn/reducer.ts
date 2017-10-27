import { CheckInState, CheckInAction } from './types';
import { TypedAction } from '../../generic/types';
import { CHANGE_LOGIN, CHANGE_EMAIL, CHANGE_PASSWORD, CHANGE_CONFIRM_PASSWORD } from './constants';

const CheckInReducer = (state: CheckInState, action: TypedAction<CheckInAction>) => {
    switch (action.type) {
        case CHANGE_LOGIN: {
            const { login } = action.payload;

            return {
                userLogin: login
            }
        }

        case CHANGE_EMAIL: {
            const { email } = action.payload;

            return {
                email
            }
        }

        case CHANGE_PASSWORD: {
            const { password } = action.payload;

            return {
                password
            }
        }

        case CHANGE_CONFIRM_PASSWORD: {
            const { confirmPassword } = action.payload;

            return {
                confirmPassword
            }
        }
    }
    return state;
}

export default CheckInReducer;
