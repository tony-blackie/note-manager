import * as React from 'react';
import { GoToEditFolderFn, RemoveFolderFn, GoToFolderCreationFn, GoToNoteCreationFn } from '../types';

interface Props {
    activeFolderId: number;
    goToEditFolder: GoToEditFolderFn;
    removeFolder: RemoveFolderFn;
    goToFolderCreation: GoToFolderCreationFn;
    goToNoteCreation: GoToNoteCreationFn;
    isAnyFolderActive: boolean;
}

export default class ControlPanel extends React.Component<Props> {
    goToEditFolder = () => {
        const { activeFolderId } = this.props;

        if (activeFolderId) {
            this.props.goToEditFolder(activeFolderId);
        }
    }

    removeFolder = () => {
        const { activeFolderId } = this.props;

        this.props.removeFolder(activeFolderId);
    }

    render() {
        const { isAnyFolderActive } = this.props;

        return (
            <div
                className="control-panel"
            >
                <div
                    className="control control_create-note"
                    onClick={this.props.goToNoteCreation}
                >
                    <i className="fa fa-pencil fa-2x control__icon"></i>
                    <div className="control__text">Add Note</div>
                </div>
                <div className="control control_create-folder" onClick={this.props.goToFolderCreation}>
                    <i className="fa fa-plus fa-2x control__icon"></i>
                    <div className="control__text">Add Folder</div>
                </div>
                {
                    isAnyFolderActive &&
                    <div className="control control_edit-folder" onClick={this.goToEditFolder}>
                        <i className="fa fa-folder-open fa-2x control__icon"></i>
                        <div className="control__text">Edit Folder</div>
                    </div>
                }
                {
                    isAnyFolderActive &&
                    <div className="control control_remove-folder" onClick={this.removeFolder}>
                        <i className="fa fa-remove fa-2x control__icon"></i>
                        <div className="control__text">Remove Folder</div>
                    </div>
                }
            </div>
        );
    }
}
