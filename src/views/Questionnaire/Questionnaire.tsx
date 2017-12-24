import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { TextField, Paper, FlatButton, Checkbox, RaisedButton, AppBar } from 'material-ui';
import { Link } from 'react-router';

import { changeMessage, changeCheckbox, questionnaireRequest, backToMain } from './actions';
import {
    selectMessage,
    selectColors,
    selectHashtags,
    selectI18n,
    selectImportance,
    selectServerError,
    selectSucces
 } from './selectors';
import '../../sass/questionnaire.scss';

interface MappedProps {
    message: string;
    hashtags: boolean;
    colors: boolean;
    i18n: boolean;
    importance: boolean;
    serverError: boolean;
    success: boolean;
}

interface MappedActions {
    changeMessage: (message: string) => void;
    changeCheckbox: (field: string) => void;
    questionnaireRequest: () => void;
    backToMain: () => void;
}

type Props = MappedActions & MappedProps;

class Questionnaire extends React.Component<Props> {
    render() {
        const { message, serverError, success } = this.props;

        const wrapperStyles = {
            padding: 20,
            margin: '20px auto',
            maxWidth: 700
        };

        const leftButtonStyles = {
            margin: '15px 0 15px 0'
        };

        const rightButtonStyles = {
            margin: '15px 0 15px 15px'
        };

        const checkboxes = [
            {
                label: 'Colored notes',
                name: 'colors'
            },
            {
                label: 'Add hastags to notes and search by them',
                name: 'hashtags'
            },
            {
                label: 'Translation to YOUR language (please, add language as a comment)',
                name: 'i18n'
            },
            {
                label: 'Ability to mark note as important and automatically add to important folder',
                name: 'importance'
            },
        ];

        return (
            <div >
                <AppBar
                    title="Notes &#x3b2;eta"
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                    zDepth={2}
                >
                </AppBar>
                <div>
                    {
                        !serverError && !success &&
                        <div>
                            <Paper zDepth={2} style={wrapperStyles}>
                                <h1>Help us become better</h1>

                                <h4>What feature do you need the most?</h4>

                                {
                                    checkboxes.map(checkbox => {
                                        return (
                                            <Checkbox
                                                key={checkbox.name}
                                                label={checkbox.label}
                                                name={checkbox.name}
                                                checked={this.props[checkbox.name]}
                                                onCheck={(event) => this.props.changeCheckbox(event.target.name)}
                                            />
                                        );
                                    })
                                }

                                <h4>Experiencing problems or found a bug? Tell us</h4>
                                <TextField
                                    hintText="Message"
                                    type="text"
                                    multiLine={true}
                                    name="message"
                                    value={message}
                                    onChange={(event) => this.props.changeMessage(event.target.value)}
                                />
                            </Paper>
                            <nav className="edit-note__nav">
                                <Link to="/">
                                    <RaisedButton
                                        label="Back"
                                        secondary={true}
                                        style={leftButtonStyles}
                                    />
                                </Link>
                                <RaisedButton
                                    label="Send"
                                    primary={true}
                                    style={rightButtonStyles}
                                    className="edit-note__save"
                                    onClick={() => this.props.questionnaireRequest()}
                                />
                            </nav>
                        </div>
                    }
                    {
                        serverError &&
                        <Paper zDepth={2} style={wrapperStyles}>
                            <h1>Something went wrong, please try again later</h1>
                            <RaisedButton label="ok" primary={true} onClick={() => this.props.backToMain()} />
                        </Paper>
                    }
                    {
                        success &&
                        <Paper zDepth={2} style={wrapperStyles}>
                            <h1>Thanks for the feedback!</h1>
                            <RaisedButton label="ok" primary={true} onClick={() => this.props.backToMain()} />
                        </Paper>
                    }
                </div>
            </div>
        );
    }
}

export const mapStateToProps = state => createStructuredSelector({
    message: selectMessage,
    colors: selectColors,
    hashtags: selectHashtags,
    i18n: selectI18n,
    importance: selectImportance,
    serverError: selectServerError,
    success: selectSucces
});

export const mapDispatchToProps = (dispatch) => bindActionCreators({
    changeMessage,
    changeCheckbox,
    questionnaireRequest,
    backToMain
}, dispatch);

export default connect<MappedProps, MappedActions, {}>(mapStateToProps, mapDispatchToProps)(Questionnaire);
