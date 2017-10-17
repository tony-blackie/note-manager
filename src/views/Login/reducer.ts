import { LoginState } from './types';

const loginReducer = (state: LoginState = {
    userLogin: 'user1',
    password: 'xcvbXCVB'
}, action) => {
    return state;
}

export default loginReducer;