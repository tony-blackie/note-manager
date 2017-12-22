import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { TextField, Paper, FlatButton, Checkbox } from 'material-ui';
import { Link } from 'react-router';

import { changeMessage } from './actions';
import { selectMessage } from './selectors';
import '../../sass/questionnaire.scss';

interface MappedProps {
    message: string;
}

interface MappedActions {
    changeMessage: (message: string) => void;
}

type Props = MappedActions & MappedProps;

class Questionnaire extends React.Component<Props> {
    state = {
        check1: false,
        check2: false,
        check3: false
    }

    updateCheck(e) {
        let check = 'check' + e.target.id;
        console.log(check);
        this.setState({
            [check] : !this.state[check]
        });
    }

    render() {
        const { message } = this.props;

        const wrapperStyles = {
            padding: 20,
            margin: '20px auto',
            maxWidth: 700
        };

        return (
            <Paper zDepth={4} style={wrapperStyles}>
               <h1>Опрос</h1>
               <TextField
                    hintText="Message"
                    type="text"
                    name="message"
                    value={message}
                    onChange={(event) => this.props.changeMessage(event.target.value)}
                />
                <Checkbox
                    label="Angelina"
                    id="1"
                    checked={this.state.check1}
                    onCheck={this.updateCheck.bind(this)}
                />
                <Checkbox
                    label="Liza"
                    id="2"
                    checked={this.state.check2}
                    onCheck={this.updateCheck.bind(this)}
                />
                <Checkbox
                    label="Tanya"
                    id="3"
                    checked={this.state.check3}
                    onCheck={this.updateCheck.bind(this)}
                />
            </Paper>
        );
    }
}

export const mapStateToProps = state => createStructuredSelector({
    message: selectMessage,
});

export const mapDispatchToProps = (dispatch) => bindActionCreators({
    changeMessage
}, dispatch);

export default connect<MappedProps, MappedActions, {}>(mapStateToProps, mapDispatchToProps)(Questionnaire);
