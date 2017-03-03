import React, { Component } from 'react';

export default class Note extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="note" onClick={this.props.editNote}>
                <i className="fa fa-file-text-o fa-3x"></i>
                <div className="note-text">
                    <span>{this.props.noteText}</span>
                </div>
            </div>
        );
    }
}
