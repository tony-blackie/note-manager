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
        const className = this.state.isOpen ? 'open' : 'closed';

        return (
            <div
                isOpen={this.state.isOpen}
                selected={this.props.selected}
                className={className}
            >
                <div onClick={this.openFolder}>
                    <i className={`fa fa-${folderIcon} fa-lg`}></i>
                </div>
                {
                    this.props.children
                }
            </div>
        );
    }
}
