import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';

import { selectIsNoteCreationMode, selectEditedNote } from './selectors';
import { NoteType } from '../../generic/types';
import { CreateNoteRequestFn, ChangeTextFieldValueFn, FetchNoteFn, EditNoteState, EditedNote } from './types';

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
    editedNote: EditedNote;
}

interface MappedActions {
    createNoteRequest: CreateNoteRequestFn;
    editNoteRequest: CreateNoteRequestFn;
    changeTextFieldValue: ChangeTextFieldValueFn;
    changeNoteName: ChangeTextFieldValueFn;
    fetchNote: FetchNoteFn;
    clearNoteData: () => void;
}

type Props = OwnProps & MappedActions & MappedProps;

export class EditNote extends React.Component<Props> {
    componentDidMount() {
        if (this.props.routeParams.noteId) {
            this.props.fetchNote(this.props.routeParams.noteId);
        } else {
            this.props.clearNoteData();
        }
    }

    handleSaveClick = () => {
        const { routeParams } = this.props;
        const { name, textFieldValue, folderId } = this.props.editedNote;

        if (!routeParams.noteId) {
            this.props.createNoteRequest({
                name,
                text: textFieldValue,
                parent: folderId
            });
        } else {
            this.props.editNoteRequest({
                id: routeParams.noteId,
                name,
                text: textFieldValue,
                parent: folderId
            });
        }
    }

    handleTextFieldChange = (event) => {
        this.props.changeTextFieldValue(event.target.value);
    }

    handleNameChange = (event) => {
        this.props.changeNoteName(event.target.value);
    }

    render() {
        const { textFieldValue, textFieldPlaceholder, name } = this.props.editedNote;

        return (
            <div>
                <nav className="edit-note__nav">
                    <button>
                        <Link to="/"> Go Back</Link>
                    </button>
                    <button className="edit-note__save" onClick={this.handleSaveClick}>
                        Save changes
                    </button>
                </nav>
                <form>
                    <fieldset>
                        <div>
                            <label>Name:</label>
                        </div>
                        <input
                            onChange={this.handleNameChange}
                            className="edit-note__name"
                            type="text"
                            value={name}
                        />
                    </fieldset>
                    <fieldset>
                        <input
                            onChange={this.handleTextFieldChange}
                            className="edit-note__text"
                            type="text"
                            value={textFieldValue}
                            placeholder={textFieldPlaceholder}
                        />
                    </fieldset>
                </form>
            </div>
        );

    }
}

export const mapStateToProps = (state: EditNoteState) => createStructuredSelector({
    isNoteCreationMode: selectIsNoteCreationMode,
    editedNote: selectEditedNote
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
