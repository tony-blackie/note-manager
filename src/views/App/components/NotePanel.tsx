import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Note from './Note';
import {
    UpdateNoteFilterQueryFn,
    GoToNoteEditFn,
    RemoveNoteFn
} from '../types';
import { NoteType } from '../../../generic/types';
import { updateNoteFilterQuery } from '../actions/AppComponent.actions';

interface OwnProps {
    notes: NoteType[];
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

    render() {
        const { notes, activeFolderId } = this.props;

        return (
            <div className="note-panel">
                <div className="note-search">
                    <input type="text" placeholder="search" onChange={this.updateNoteFilterQuery} />
                </div>
                <div>
                    {
                        notes.map(note => {
                            if ((note.parent === activeFolderId) || (note.parent === 0 && activeFolderId === null)) {
                                return (
                                  <Note
                                      key={note.id}
                                      id={note.id}
                                      name={note.name}
                                      goToNoteEdit={this.props.goToNoteEdit}
                                      removeNote={this.props.removeNote}
                                  />
                                );
                            }
                        }, this)
                    }
                </div>
            </div>
        );
    }
}

export const mapDispatchToProps = dispatch => bindActionCreators({
    updateNoteFilterQuery
}, dispatch);

export default connect<null, MappedActions, OwnProps>(null, mapDispatchToProps)(NotePanel);