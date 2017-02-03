import React, { Component } from 'react';
import Note from './Note.jsx';

export default class Folder extends Component {
    render() {
        const note = {name: 'someName'};

        return (
            <div>
                <NoteIcon note={note} />
                <NoteIcon note={note} />
                <NoteIcon note={note} />
            </div>
        );
    }
}