import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { requestToken } from './actions';

interface MappedProps {
    requestToken: (username: string, password: string) => Promise<any>;
}

type Props = MappedProps;

// interface Props {
    // login: string;
    // password: string;
// }

class Login extends React.Component<Props> {
    render() {
        return (
            <div>
                <span>Login:</span>
                <form>
                    <input type="text" value={'user1'} />
                    <input type="password" value={'xcvbXCVB'} />

                    <button onClick={() => this.props.requestToken('user1', 'xcvbXCVB')}>Submit</button>
                </form>
            </div>
        );
    }
}

export const mapDispatchToProps = (dispatch) => bindActionCreators({
    requestToken
}, dispatch);

export default connect<null, MappedProps, {}>(null, mapDispatchToProps)(Login);