import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';

import {
  editNoteRequest,
  createNoteRequest,
  changeTextFieldValue,
  changeNoteName,
  fetchNote,
  clearNoteData
 } from './actions/EditNote.actions';

 interface RouteParams {
     noteId: string;
 }

 interface OwnProps {
     routeParams: RouteParams
 }

interface MappedProps {
    name: string;
    textFieldValue: string;
    activeFolderId: number;
    textFieldPlaceholder: string;
}

interface Note {
    id?: string;
    name: string;
    text: string;
    activeFolderId?: number | null;
}

interface MappedActions {
    createNoteRequest: (note: Note) => void;
    editNoteRequest: (note: Note) => void;
    changeTextFieldValue: (value: string) => void;
    changeNoteName: (value: string) => void;
    fetchNote: (noteId: string) => void;
    clearNoteData: () => void;
}

type Props = OwnProps & MappedActions & MappedProps;

export class EditNote extends React.Component<Props> {
    handleSaveClick() {
        if (!this.props.routeParams.noteId) {
            this.props.createNoteRequest({
                name: this.props.name,
                text: this.props.textFieldValue,
                activeFolderId: this.props.activeFolderId
            });
        } else {
            this.props.editNoteRequest({
                id: this.props.routeParams.noteId,
                name: this.props.name,
                text: this.props.textFieldValue
            });
        }
    }

    handleTextFieldChange(event) {
        this.props.changeTextFieldValue(event.target.value);
    }

    handleNameChange(event) {
        this.props.changeNoteName(event.target.value);
    }

    componentDidMount() {
        if (this.props.routeParams.noteId) {
            this.props.fetchNote(this.props.routeParams.noteId);
        } else {
            this.props.clearNoteData();
        }
    }

    render() {
        debugger;
        return (
            <div>
                <nav className="edit-note__nav">
                    <button>
                        <Link to="/"> Go Back</Link>
                    </button>
                    <button className="edit-note__save" onClick={() => this.handleSaveClick()}>
                        Save changes
                    </button>
                </nav>
                <form>
                    <fieldset>
                        <div>
                            <label>Name:</label>
                        </div>
                        <input
                            onChange={event => this.handleNameChange(event)}
                            className="edit-note__name"
                            type="text"
                            value={this.props.name}
                        />
                    </fieldset>
                    <fieldset>
                        <input
                            onChange={event => this.handleTextFieldChange(event)}
                            className="edit-note__text"
                            type="text"
                            value={this.props.textFieldValue}
                            placeholder={this.props.textFieldPlaceholder}
                        />
                    </fieldset>
                </form>
            </div>
        );

    }
}

export const mapStateToProps = state => ({
    params: state.editNote.note,
    isNoteCreationMode: state.editNote.isNoteCreationMode,
    activeFolderId: state.editNote.activeFolderId,
    textFieldValue: state.editNote.editedNote.textFieldValue,
    textFieldPlaceholder: state.editNote.editedNote.textFieldPlaceholder,
    name: state.editNote.editedNote.name
});

export const mapDispatchToProps = dispatch => bindActionCreators({
    editNoteRequest,
    createNoteRequest,
    changeTextFieldValue,
    changeNoteName,
    fetchNote,
    clearNoteData
}, dispatch);

export default connect<MappedProps, MappedActions, {}>(mapStateToProps, mapDispatchToProps)(EditNote);
