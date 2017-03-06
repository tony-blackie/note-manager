import React, { Component } from 'react';
import { Link } from 'react-router';

import { editNote } from '../actions/EditNote.actions.jsx';

export default class Note extends Component {
    constructor(props) {
        super(props);
    }

    goToNote() {
        dispatch(editNote);
        hashHistory.push(`/notes/${this.props.id}`);
    }

    render() {
        return (
            <Link className="note" onClick={this.goToNote}>
                <i className="fa fa-file-text-o fa-3x"></i>
                <div className="note-text">
                    <span>{this.props.name}</span>
                </div>
            </Link>
        );
    }
}
