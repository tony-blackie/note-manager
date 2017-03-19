import React, { Component } from 'react';

export default class ControlPanel extends Component {
    constructor(props) {
      super(props);

      this.removeFolder = this.removeFolder.bind(this);
    }

    removeFolder() {
        this.props.removeFolder(this.props.activeFolderId);
    }

    render() {
        return (
            <div
                className="control-panel"
            >
                <div className="control">
                    <i className="fa fa-plus fa-2x control__icon"></i>
                    <div className="control__text">Add Folder</div>
                </div>
                <div
                    className="control"
                    onClick={this.props.goToNoteCreation}
                >
                    <i className="fa fa-pencil fa-2x control__icon"></i>
                    <div className="control__text">Add Note</div>
                </div>
                <div className="control" onClick={this.removeFolder}>
                    <i className="fa fa-remove fa-2x control__icon"></i>
                    <div className="control__text">Remove</div>
                </div>
                <div className="control-panel__underline">=====</div>
            </div>
        );
    }
}
