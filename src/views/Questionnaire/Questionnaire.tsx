import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { TextField, Paper, FlatButton, Checkbox, RaisedButton } from 'material-ui';
import { Link } from 'react-router';

import { changeMessage, changeCheckbox } from './actions';
import { selectMessage, selectColors, selectHashtags, selectI18n, selectImportance } from './selectors';
import '../../sass/questionnaire.scss';

interface MappedProps {
    message: string;
    hashtags: boolean;
    colors: boolean;
    i18n: boolean;
    importance: boolean;
}

interface MappedActions {
    changeMessage: (message: string) => void;
    changeCheckbox: (field: string) => void;
}

type Props = MappedActions & MappedProps;

class Questionnaire extends React.Component<Props> {
    state = {
        
    }

    render() {
        const { message, colors, hashtags, i18n, importance } = this.props;

        const wrapperStyles = {
            padding: 20,
            margin: '20px auto',
            maxWidth: 700
        };

        return (
            <div >
                <Paper zDepth={2} style={wrapperStyles}>
                    <h1>Help us become better</h1>

                    <h4>What feature do you need most?</h4>
                    <Checkbox
                        label="colors"
                        name="colors"
                        checked={colors}
                        onCheck={(event) => this.props.changeCheckbox(event.target.name)}
                    />
                    <Checkbox
                        label="hashtags"
                        name="hashtags"
                        checked={hashtags}
                        onCheck={(event) => this.props.changeCheckbox(event.target.name)}
                    />
                    <Checkbox
                        label="i18n"
                        name="i18n"
                        checked={i18n}
                        onCheck={(event) => this.props.changeCheckbox(event.target.name)}
                    />
                    <Checkbox
                        label="importance"
                        name="importance"
                        checked={importance}
                        onCheck={(event) => this.props.changeCheckbox(event.target.name)}
                    />
                    <h4>Have any problems or found any bugs? Tell us.</h4>
                    <TextField
                        hintText="Message"
                        type="text"
                        name="message"
                        value={message}
                        onChange={(event) => this.props.changeMessage(event.target.value)}
                    />
                    <div className="">
                        error
                    </div>
                    <RaisedButton label="Primary" primary={true} />
                </Paper>
            </div>
        );
    }
}

export const mapStateToProps = state => createStructuredSelector({
    message: selectMessage,
    colors: selectColors,
    hashtags: selectHashtags,
    i18n: selectI18n,
    importance: selectImportance
});

export const mapDispatchToProps = (dispatch) => bindActionCreators({
    changeMessage,
    changeCheckbox
}, dispatch);

export default connect<MappedProps, MappedActions, {}>(mapStateToProps, mapDispatchToProps)(Questionnaire);
