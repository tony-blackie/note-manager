import * as React from 'react';
import { GoToEditFolderFn, RemoveFolderFn, GoToFolderCreationFn, GoToNoteCreationFn } from '../types';
import { Dialog, FlatButton } from 'material-ui';

interface Props {
    activeFolderId: number;
    goToEditFolder: GoToEditFolderFn;
    removeFolder: RemoveFolderFn;
    goToFolderCreation: GoToFolderCreationFn;
    goToNoteCreation: GoToNoteCreationFn;
    isAnyFolderActive: boolean;
}

interface State {
    confirmDelete: boolean;
}

export default class ControlPanel extends React.Component<Props, State> {
    state: State = {
        confirmDelete: false
    }

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

    openConfirmDelete = (event) => {
        event.stopPropagation();

        this.setState({ confirmDelete: true });
    }

    closeConfirmDelete = () => {
        this.setState({ confirmDelete: false });
    }

    handleConfirmDelete = () => {
        this.removeFolder();
        this.closeConfirmDelete();
    }


    render() {
        const { isAnyFolderActive } = this.props;
        const { confirmDelete } = this.state;

        const actions = [
            <FlatButton
              label="Cancel"
              secondary={true}
              onClick={this.closeConfirmDelete}
            />,
            <FlatButton
              label="Submit"
              primary={true}
              onClick={this.handleConfirmDelete}
            />,
        ];

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
                    <div className="control control_remove-folder" onClick={this.openConfirmDelete}>
                        <i className="fa fa-remove fa-2x control__icon"></i>
                        <div className="control__text">Remove Folder</div>
                    </div>
                }
                <Dialog
                    open={confirmDelete}
                    title="Confirm deletion?"
                    actions={actions}
                    modal={false}
                    onRequestClose={this.closeConfirmDelete}
                />
            </div>
        );
    }
}
