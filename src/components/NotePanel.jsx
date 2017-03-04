import React, { Component } from 'react';
import Note from './Note.jsx';

export default class NotePanel extends Component {
    constructor(props) {
        super(props);
    }

    mapNotes(notes) {
      debugger;
      return (
        <div>
          {
            notes.map((note) => {
              return <Note key={note.id} name={note.name} text={note.text} />
            })
          }
        </div>);
    }

    render() {
        return (
            <div className="note-panel">
                <div className="note-search">
                    <input type="text" placeholder="search" />
                </div>
                {this.mapNotes(this.props.notes)}
            </div>
        );
    }
}
