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
import { updateNoteFilterQuery } from '../actions/AppComponent.actions';

interface OwnProps {
    notes: NoteType[];
    folders: FolderType[];
    activeFolderId: number;
    goToNoteEdit: GoToNoteEditFn;
    removeNote: RemoveNoteFn;
}

interface MappedActions {
    updateNoteFilterQuery: UpdateNoteFilterQueryFn;
}

type Props = OwnProps & MappedActions;

class NotePanel extends React.Component<Props> {
    updateNoteFilterQuery = (event) => {
        const text = event.target.value;

        this.props.updateNoteFilterQuery(text);
    }

    getActiveFolder = (folders: FolderType[], activeFolderId: number) => {
        return folders.filter(folder => folder.id === activeFolderId)[0];
    }

    render() {
        const { notes, folders, activeFolderId } = this.props;

        debugger;

        const activeFolder = this.getActiveFolder(folders, activeFolderId);

        const notesToShow = notes.filter(note => (activeFolder.notes as any).includes(note.id));
        console.log(notesToShow);

        return (
            <div className="note-panel">
                <div className="note-search">
                    <input type="text" placeholder="search" onChange={this.updateNoteFilterQuery} />
                </div>
                <div>
                    {notesToShow.map(note =>
                        <Note
                            key={note.id}
                            id={note.id}
                            name={note.name}
                            goToNoteEdit={this.props.goToNoteEdit}
                            removeNote={this.props.removeNote}
                        />
                    )}
                </div>
            </div>
        );
    }
}

export const mapDispatchToProps = dispatch => bindActionCreators({
    updateNoteFilterQuery
}, dispatch);

export default connect<null, MappedActions, OwnProps>(null, mapDispatchToProps)(NotePanel);