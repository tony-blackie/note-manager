import React, { Component } from 'react';
import Note from './Note.jsx';

export default class NotePanel extends Component {
    render() {
        return (
            <div className="note-panel">
                <div className="note-search">
                    <input type="text" placeholder="search" />
                </div>
                <div>
                    {
                        this.props.notes.map((note) => {
                            if ((note.parent === this.props.activeFolderId) || (note.parent === 0 && this.props.activeFolderId === null)) {
                                return (
                                  <Note
                                      key={note.id}
                                      id={note.id}
                                      name={note.name}
                                      text={note.text}
                                      goToNoteEdit={this.props.goToNoteEdit}
                                      removeNote={this.props.removeNote}
                                  />
                                );
                            }
                        }, this)
                    }
                </div>
            </div>
        );
    }
}
