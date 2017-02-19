import React, { Component } from 'react';

export default class NoteComponent extends Component {
    render() {
        return (
            <div className="note-panel">
                <div className="note-search">
                    <input type="text" placeholder="search" />
                </div>
                <div className="note">
                    <i className="fa fa-file-text-o fa-3x"></i>
                    <div className="note-text">
                        <span></span>
                    </div>
                </div>
                <div>Note</div>
                <div>Note</div>
            </div>
        );
    }
}