import React, { Component } from 'react';
import { Link } from 'react-router';

import { editNote } from '../actions/EditNote.actions.jsx';

export default class Note extends Component {
    constructor(props) {
        super(props);
        this.goToNoteEdit = this.goToNoteEdit.bind(this);
        this.removeNote = this.removeNote.bind(this);
    }

    goToNoteEdit() {
        this.props.goToNoteEdit(this.props.id);
    }

    removeNote() {
        this.props.removeNote(this.props.id);
    }

    render() {
        return (
            <div className="note">
                <div className="note__remove" onClick={this.removeNote}>X</div>
                <div onClick={this.goToNoteEdit}>
                    <i className="fa fa-file-text-o fa-3x"></i>
                    <div className="note-text">
                        <span>{this.props.name}</span>
                    </div>
                </div>
            </div>
        );
    }
}
