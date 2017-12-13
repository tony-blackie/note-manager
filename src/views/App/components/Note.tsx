import * as React from 'react';
import { Paper, Divider, TextField, yellow300, Dialog, FlatButton, FontIcon } from 'material-ui';

import { GoToNoteEditFn, RemoveNoteFn } from '../types';

interface Props {
    name: string;
    text: string;
    id: number;
    goToNoteEdit: GoToNoteEditFn;
    removeNote: RemoveNoteFn;
}

interface State {
    confirmDelete: boolean;
}

export default class Note extends React.Component<Props, State> {
    state: State = {
        confirmDelete: false
    };

    goToNoteEdit = () => {
        const { id } = this.props;

        this.props.goToNoteEdit(id);
    }

    removeNote = () => {
        const { id } = this.props;

        this.props.removeNote(id);
    }

    openConfirmDelete = (event) => {
        event.stopPropagation();

        this.setState({ confirmDelete: true });
    }

    closeConfirmDelete = () => {
        this.setState({ confirmDelete: false });
    }

    handleConfirmDelete = () => {
        this.removeNote();
        this.closeConfirmDelete();
    }

    render() {
        const { name, text } = this.props;
        const { confirmDelete } = this.state;

        const actions = [
            <FlatButton
              label="Cancel"
              primary={true}
              onClick={this.closeConfirmDelete}
            />,
            <FlatButton
              label="Submit"
              primary={true}
              keyboardFocused={true}
              onClick={this.handleConfirmDelete}
            />,
        ];

        const noteStyles = {
            minWidth: 150,
            minHeight: 150,
            padding: 10,
            margin: 20,
            position: 'relative',
            backgroundColor: '#fff9c4'
        };

        // const iconStyle = {
        //     marginRight: 5
        // }

        return (
            <Paper
                zDepth={3}
                style={noteStyles}
                onClick={this.goToNoteEdit}
            >
                <div className="note__remove">
                    <FontIcon
                            className="material-icons"
                            onClick={this.openConfirmDelete}
                    >
                        close
                    </FontIcon>
                </div>
                <TextField
                    name={'name'}
                    value={name}
                    fullWidth={true}
                    underlineShow={false}
                    className="note-header"
                />
                <Divider />
                <TextField
                    name={'text'}
                    value={text}
                    fullWidth={true}
                    multiLine={true}
                    underlineShow={false}
                />
                <Dialog
                    open={confirmDelete}
                    title="Confirm deletion?"
                    actions={actions}
                    modal={false}
                    onRequestClose={this.closeConfirmDelete}
                />
            </Paper>
        );
    }
}
