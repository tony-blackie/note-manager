import React, { Component } from 'react';
import Note from './Note.jsx';

export default class Folder extends Component {
    render() {
        const note = {header: 'header', text: 'text'};

        return (
            <div>
                <Note note={note} />
            </div>
        );
    }
}