import * as React from 'react';

export default class Folder extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        }

        this.openFolder = this.openFolder.bind(this);
        this.handleFolderClick = this.handleFolderClick.bind(this);
    }

    openFolder() {
        this.setState({isOpen: !this.state.isOpen})
    }

    handleFolderClick() {
        this.openFolder();
        if (this.props.isActive) {
            this.props.makeFolderInactive(this.props.id);
        } else {
            this.props.makeFolderActive(this.props.id);
        }
    }

    render() {
        const note = {name: 'someName'};
        const folderIcon = this.state.isOpen ? 'folder-open' : 'folder';
        const className = this.state.isOpen ? 'open' : 'closed';
        const isActiveClass = this.props.isActive ? 'folder_active': '';

        return (
            <div
                className={`folder-container ${className}`}
            >
                <div onClick={this.handleFolderClick} className={`folder ${isActiveClass}`}>
                    <i className={`folder__icon fa fa-${folderIcon} fa-lg`}></i>
                    <span className="folder__name">{this.props.folderName}</span>
                </div>
                {
                    this.props.children
                }
            </div>
        );
    }
}
