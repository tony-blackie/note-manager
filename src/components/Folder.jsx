import React, { Component } from 'react';

export default class Folder extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        }

        this.openFolder = this.openFolder.bind(this);
    }

    openFolder(event) {
        this.setState({isOpen: !this.state.isOpen})
    }

    render() {
        const note = {name: 'someName'};
        const folderIcon = this.state.isOpen ? 'folder-open': 'folder';

        return (
            <div
                isOpen={this.state.isOpen}
                selected={this.props.selected}
                onClick={this.openFolder}
            >
                <div>
                    <i className={`fa fa-${folderIcon} fa-lg`}></i>
                </div>
                {
                    this.props.children
                }
            </div>
        );
    }
}
