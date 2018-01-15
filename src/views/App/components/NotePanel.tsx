import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Note from './Note';
import {
    UpdateNoteFilterQueryFn,
    GoToNoteEditFn,
    RemoveNoteFn
} from '../types';
import { NoteType, FolderType } from '../../../generic/types';

interface OwnProps {
    notes: NoteType[];
    folders: FolderType[];
    activeFolderId: number;
    goToNoteEdit: GoToNoteEditFn;
    removeNote: RemoveNoteFn;
}

interface MappedActions {
    // updateNoteFilterQuery: UpdateNoteFilterQueryFn;
}

type Props = OwnProps & MappedActions;

class NotePanel extends React.Component<Props> {
    getActiveFolder = (folders: FolderType[], activeFolderId: number) => {
        return folders.filter(folder => folder.id === activeFolderId)[0];
    }

    render() {
        const { notes, folders, activeFolderId } = this.props;

        return (
            <div className="note-panel">
                <div className="note-container">
                    {
                        notes.map(note => {
                            const { id, text, name, } = note;
                            return (
                                <Note
                                    key={id}
                                    id={id}
                                    text={text}
                                    name={name}
                                    goToNoteEdit={this.props.goToNoteEdit}
                                    removeNote={this.props.removeNote}
                                />
                            );
                        }
                    )}
                </div>
            </div>
        );
    }
}

export const mapDispatchToProps = dispatch => bindActionCreators({
    // updateNoteFilterQuery
}, dispatch);

export default connect<null, MappedActions, OwnProps>(null, mapDispatchToProps)(NotePanel);