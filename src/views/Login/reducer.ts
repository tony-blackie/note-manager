import { LoginState, LoginAction } from './types';
import { TypedAction } from '../../generic/types';
import { CHANGE_LOGIN, CHANGE_PASSWORD } from './constants';

const loginReducer = (state: LoginState = {
    userLogin: 'user1',
    password: 'xcvbXCVB'
}, action: TypedAction<LoginAction>) => {
    switch (action.type) {
        case CHANGE_LOGIN: {
            const { login } = action.payload;

            return {
                userLogin: login
            }
        }

        case CHANGE_PASSWORD: {
            const { password } = action.payload;

            return {
                password
            }
        }
    }
    return state;
}

export default loginReducer;