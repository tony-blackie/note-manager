import React, { Component } from 'react';
import Note from './Note.jsx';

export default class NotePanel extends Component {
    constructor(props) {
        super(props);
    }

    mapNotes() {
        this.props.notes.map((note) => {
            return <Note />
        });
    }

    render() {
        return (
            <div className="note-panel">
                <div className="note-search">
                    <input type="text" placeholder="search" />
                </div>
                <Note />
                <Note />
                <Note />
            </div>
        );
    }
}
