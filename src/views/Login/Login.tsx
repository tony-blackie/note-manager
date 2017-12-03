import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { TextField, Paper, FlatButton } from 'material-ui';
import { Link } from 'react-router';

import { requestToken, changeLogin, changePassword } from './actions';
import { selectUserLogin, selectPassword } from './selectors';

import '../../sass/login.scss';

interface MappedProps {
    login: string;
    password: string;
}

interface MappedActions {
    requestToken: (username: string, password: string) => Promise<any>;
    changeLogin: (login: string) => void;
    changePassword: (password: string) => void;
}

type Props = MappedActions & MappedProps;

class Login extends React.Component<Props> {
    requestToken = () => {
        const { login, password } = this.props;

        this.props.requestToken(login, password);
    }

    render() {
        const { login, password } = this.props;

        const wrapperStyles = {
            padding: 20,
            margin: '20px auto',
            maxWidth: 700
        };

        return (
            <Paper zDepth={4} style={wrapperStyles}>
                <div className="login">
                    <div className="login__header">Login:</div>
                    <form className="login__form">
                        <div className="login__form-body">
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
                                floatingLabelText="Password"
                                type="password"
                                name="pass"
                                value={password}
                                onChange={(event) => this.props.changePassword(event.target.value)}
                                required
                                className="text-field"
                                fullWidth={true}
                            />
                        </div>
                        <div className="login__buttons">
                            <FlatButton
                                onClick={this.requestToken}
                                primary={true}
                            >
                                Submit
                            </FlatButton>

                            <div className="login-link">
                                <div className="login-link__text">Not registered?</div>
                                <Link className="login-link__link" to="/check-in">Register</Link>
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
    password: selectPassword
});

export const mapDispatchToProps = (dispatch) => bindActionCreators({
    requestToken,
    changeLogin,
    changePassword
}, dispatch);

export default connect<MappedProps, MappedActions, {}>(mapStateToProps, mapDispatchToProps)(Login);
