import * as React from 'react';
import { Paper, Divider, TextField } from 'material-ui';

import { GoToNoteEditFn, RemoveNoteFn } from '../types';

interface Props {
    name: string;
    text: string;
    id: number;
    goToNoteEdit: GoToNoteEditFn;
    removeNote: RemoveNoteFn;
}

export default class Note extends React.Component<Props> {
    goToNoteEdit = () => {
        const { id } = this.props;

        this.props.goToNoteEdit(id);
    }

    removeNote = () => {
        const { id } = this.props;

        this.props.removeNote(id);
    }

    render() {
        const { name, text } = this.props;

        const noteStyles = {
            minWidth: 150,
            minHeight: 150,
            padding: 10,
            margin: 20,
            position: 'relative'
        };

        const headerStyles = {
            textAlign: 'center !important'
        };

        return (
            <Paper
                zDepth={3}
                style={noteStyles}
                onClick={this.goToNoteEdit}
            >
                <div className="note__remove" onClick={this.removeNote}>X</div>
                <TextField
                    name={'name'}
                    value={name}
                    fullWidth={true}
                    underlineShow={false}
                    textareaStyle={headerStyles}
                />
                <Divider />
                <TextField
                    name={'text'}
                    value={text}
                    fullWidth={true}
                    multiLine={true}
                    underlineShow={false}
                />
            </Paper>
        );
    }
}
