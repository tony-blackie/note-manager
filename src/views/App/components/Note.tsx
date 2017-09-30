import * as React from 'react';
import { GoToNoteEditFn, RemoveNoteFn } from '../types';

interface Props {
    name: string;
    id: number;
    goToNoteEdit: GoToNoteEditFn;
    removeNote: RemoveNoteFn;
}

export default class Note extends React.Component<Props> {
    goToNoteEdit = () => {
        const { id } = this.props;

        this.props.goToNoteEdit(id);
    }

    removeNote = () => {
        const { id } = this.props;

        this.props.removeNote(id);
    }

    render() {
        const { name } = this.props;

        return (
            <div className="note">
                <div className="note__remove" onClick={this.removeNote}>X</div>
                <div onClick={this.goToNoteEdit} className="note__icon-wrapper">
                    <i className="fa fa-file-text-o fa-3x note__item"></i>
                    <div className="note__text">
                        <span>{name}</span>
                    </div>
                </div>
            </div>
        );
    }
}
