import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { TextField } from 'material-ui';

import { changeLogin, changeEmail, changePassword, changeConfirmPassword, checkInRequest } from './actions';
import { selectUserLogin, selectEmail, selectPassword, selectConfirmPassword } from './selectors';

interface MappedProps {
    login: string;
    email: string;
    password: string;
    confirmPassword: string;
}

// TODO: Create generic type for user and use it as a param for checkInRequest
interface MappedActions {
    changeLogin: (userLogin: string) => void;
    changeEmail: (email: string) => void;
    changePassword: (password: string) => void;
    changeConfirmPassword: (confirmPassword: string) => void;
    checkInRequest: (data: any) => Promise<any>;
}

type Props = MappedActions & MappedProps;

class CheckIn extends React.Component<Props> {
    checkData() {
        const checkData = this.props.password === this.props.confirmPassword;

        if (checkData) {
            this.props.checkInRequest({
                username: this.props.login,
                email: this.props.email,
                password: this.props.password,
            })
        } else {
            alert('passwords do not match');
        }
    }

    render() {
        const { login, email, password, confirmPassword } = this.props;

        return (
            <div>
                <span>Check in:</span>
                <form>
                    <TextField
                        type="text"
                        name="login"
                        value={login}
                        onChange={(event) => this.props.changeLogin(event.target.value)}
                        required
                    />
                    <TextField
                        type="text"
                        name="email"
                        value={email}
                        onChange={(event) => this.props.changeEmail(event.target.value)}
                        required
                    />
                    <TextField
                        type="password"
                        name="pass"
                        value={password}
                        onChange={(event) => this.props.changePassword(event.target.value)}
                        required
                    />
                    <TextField
                        type="password"
                        name="pass_repeat"
                        value={confirmPassword}
                        onChange={(event) => this.props.changeConfirmPassword(event.target.value)}
                        required
                    />

                    <button type="button" onClick={() => this.checkData()}>Submit</button>
                </form>
            </div>
        );
    }
}

export const mapStateToProps = state => createStructuredSelector({
    login: selectUserLogin,
    email: selectEmail,
    password: selectPassword,
    confirmPassword: selectConfirmPassword
});

export const mapDispatchToProps = (dispatch) => bindActionCreators({
    changeLogin,
    changeEmail,
    changePassword,
    changeConfirmPassword,
    checkInRequest
}, dispatch);

export default connect<MappedProps, MappedActions, {}>(mapStateToProps, mapDispatchToProps)(CheckIn);
