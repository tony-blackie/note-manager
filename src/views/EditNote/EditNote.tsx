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

export class EditNote extends React.Component {
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
    params: state.note,
    isNoteCreationMode: state.isNoteCreationMode,
    activeFolderId: state.activeFolderId,
    textFieldValue: state.editedNote.textFieldValue,
    textFieldPlaceholder: state.editedNote.textFieldPlaceholder,
    name: state.editedNote.name
});

export const mapDispatchToProps = dispatch => bindActionCreators({
    editNoteRequest,
    createNoteRequest,
    changeTextFieldValue,
    changeNoteName,
    fetchNote,
    clearNoteData
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EditNote);
