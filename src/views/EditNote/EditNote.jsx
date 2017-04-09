import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';

import {
  editNoteRequest,
  createNoteRequest
 } from './actions/EditNote.actions.jsx';

export class EditNote extends Component {
    constructor(props) {
        super(props);

        this.state = {
          id: null,
          name: '',
          textFieldValue: '',
          textFieldPlaceholder: ''
        }
        this.handleSaveClick = this.handleSaveClick.bind(this);
        this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleSaveClick() {
        if (!this.props.routeParams.noteId) {
            this.props.createNoteRequest({
                name: this.state.name,
                text: this.state.textFieldValue,
                activeFolderId: this.props.activeFolderId
            });
        } else {
            this.props.editNoteRequest({
                id: this.state.id,
                name: this.state.name,
                text:this.state.textFieldValue
            });
        }
    }

    handleTextFieldChange(event) {

        this.setState({textFieldValue: event.target.value});
    }

    handleNameChange(event) {
        this.setState({name: event.target.value});
    }

    componentDidMount() {
        if (this.props.routeParams.noteId) {
            $.get(`/notes/${this.props.routeParams.noteId}`).then((response) => {
                this.setState({name: response.name});
                this.setState({textFieldValue: response.text});
                this.setState({id: response.id})
            });
        } else {
            return;
        }

    }

    render() {
        return (
            <div>
                <nav className="edit-note__nav">
                    <button>
                        <Link to="/"> Go Back</Link>
                    </button>
                    <button onClick={this.handleSaveClick}>
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
                            value={this.state.name}
                        />
                    </fieldset>
                    <fieldset>
                        <input
                            onChange={this.handleTextFieldChange}
                            className="edit-note__text"
                            type="text"
                            value={this.state.textFieldValue}
                            placeholder={this.state.textFieldPlaceholder}
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
    activeFolderId: state.activeFolderId
});

export const mapDispatchToProps = dispatch => bindActionCreators({
    editNoteRequest,
    createNoteRequest
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EditNote);