import { LoginState, ChangeLoginPayload, ChangePasswordPayload } from './types';
import { TypedAction } from '../../generic/types';
import { CHANGE_LOGIN, CHANGE_PASSWORD } from './constants';

const loginReducer = (state: LoginState = {
    userLogin: 'user1',
    password: 'xcvbXCVB'
}, action: TypedAction<any>) => {
    switch (action.type) {
        case CHANGE_LOGIN: {
            const { login } = action.payload as ChangeLoginPayload;

            return {
                ...state,
                userLogin: login
            }
        }

        case CHANGE_PASSWORD: {
            const { password } = action.payload as ChangePasswordPayload;

            return {
                ...state,
                password
            }
        }
    }
    return state;
}

export default loginReducer;