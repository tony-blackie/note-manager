import * as React from 'react';

export default class ControlPanel extends React.Component {
    constructor(props) {
      super(props);

      this.removeFolder = this.removeFolder.bind(this);
      this.goToEditFolder = this.goToEditFolder.bind(this);
    }

    goToEditFolder() {
        if (this.props.activeFolderId) {
            this.props.goToEditFolder(this.props.activeFolderId);
        }
    }

    removeFolder() {
        this.props.removeFolder(this.props.activeFolderId);
    }

    render() {
        return (
            <div
                className="control-panel"
            >
                <div className="control control_create-folder" onClick={this.props.goToFolderCreation}>
                    <i className="fa fa-plus fa-2x control__icon"></i>
                    <div className="control__text">Add Folder</div>
                </div>
                <div className="control control_edit-folder" onClick={this.goToEditFolder}>
                    <i className="fa fa-folder-open fa-2x control__icon"></i>
                    <div className="control__text">Edit Folder</div>
                </div>
                <div
                    className="control control_create-note"
                    onClick={this.props.goToNoteCreation}
                >
                    <i className="fa fa-pencil fa-2x control__icon"></i>
                    <div className="control__text">Add Note</div>
                </div>
                <div className="control control_remove-folder" onClick={this.removeFolder}>
                    <i className="fa fa-remove fa-2x control__icon"></i>
                    <div className="control__text">Remove Folder</div>
                </div>
            </div>
        );
    }
}
