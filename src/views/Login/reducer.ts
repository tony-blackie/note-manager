import { LoginState } from './types';

const loginReducer = (state: LoginState = {
    login: '',
    password: ''
}, action) => {
    return state;
}

export default loginReducer;