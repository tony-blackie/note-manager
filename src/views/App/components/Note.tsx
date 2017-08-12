import * as React from 'react';

export default class Note extends React.Component {
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
                <div onClick={this.goToNoteEdit} className="note__icon-wrapper">
                    <i className="fa fa-file-text-o fa-3x note__item"></i>
                    <div className="note__text">
                        <span>{this.props.name}</span>
                    </div>
                </div>
            </div>
        );
    }
}
