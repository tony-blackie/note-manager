import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';

import { requestToken, changeLogin, changePassword } from './actions';
import { selectUserLogin, selectPassword } from './selectors';

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
        this.props.requestToken('user1', 'xcvbXCVB');
    }

    render() {
        const { login, password } = this.props;

        return (
            <div>
                <span>Login:</span>
                <form>
                    <input
                        type="text"
                        value={login}
                        onChange={(event) => this.props.changeLogin(event.target.value)}
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(event) => this.props.changePassword(event.target.value)}
                    />

                    <button type="button" onClick={this.requestToken}>Submit</button>
                </form>
            </div>
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
