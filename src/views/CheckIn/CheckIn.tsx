import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { TextField, Paper, FlatButton } from 'material-ui';
import { Link } from 'react-router';

import { changeLogin, changeEmail, changePassword, changeConfirmPassword, checkInRequest } from './actions';
import { selectUserLogin, selectEmail, selectPassword, selectConfirmPassword } from './selectors';
import '../../sass/check-in.scss';

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

        const wrapperStyles = {
            padding: 20,
            margin: '20px auto',
            maxWidth: 700
        };

        return (
            <Paper zDepth={4} style={wrapperStyles}>
                <div className="register">
                    <div className="register__header">Register:</div>
                    <form className="register__form">
                        <div className="register__form-body">
                            <TextField
                                floatingLabelText="Login"
                                type="text"
                                name="login"
                                value={login}
                                onChange={(event) => this.props.changeLogin(event.target.value)}
                                required
                                className="text-field"
                                fullWidth={true}
                            />
                            <TextField
                                floatingLabelText="Email"
                                type="text"
                                name="email"
                                value={email}
                                onChange={(event) => this.props.changeEmail(event.target.value)}
                                required
                                className="text-field"
                                fullWidth={true}
                            />
                            <TextField
                                floatingLabelText="Password"
                                type="password"
                                name="pass"
                                value={password}
                                onChange={(event) => this.props.changePassword(event.target.value)}
                                required
                                className="text-field"
                                fullWidth={true}
                            />
                            <TextField
                                floatingLabelText="Repeat password"
                                type="password"
                                name="pass_repeat"
                                value={confirmPassword}
                                onChange={(event) => this.props.changeConfirmPassword(event.target.value)}
                                required
                                className="text-field"
                                fullWidth={true}
                            />
                        </div>
                        <div className="register__buttons">
                            <div className="register__submit">
                                    <FlatButton
                                        onClick={() => this.checkData()}
                                        primary={true}
                                    >
                                        Submit
                                    </FlatButton>
                            </div>
                            <div className="register-link">
                                <div className="register-link__text">Already registered?</div>
                                <Link className="register-link__link" to="/login">Log in</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </Paper>
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
