import * as React from 'react';
import { MakeFolderActiveFn, MakeFolderInactiveFn } from '../types';

interface State {
    isOpen: boolean;
}

interface Props {
    isActive: boolean;
    id: number;
    folderName: string;
    makeFolderActive: MakeFolderActiveFn;
    makeFolderInactive: MakeFolderInactiveFn;
}

export default class Folder extends React.Component<Props, State> {
    state: State = {
        isOpen: false
    };

    openFolder = () => {
        this.setState({isOpen: !this.state.isOpen})
    }

    handleFolderClick = () => {
        this.openFolder();

        const { id, isActive } = this.props;

        if (isActive) {
            this.props.makeFolderInactive(id);
        } else {
            this.props.makeFolderActive(id);
        }
    }

    render() {
        const { folderName, children, isActive } = this.props;
        const { isOpen } = this.state;

        const folderIcon = isOpen ? 'folder-open' : 'folder';
        const className = isOpen ? 'open' : 'closed';
        const isActiveClass = isActive ? 'folder_active': '';

        return (
            <div
                className={`folder-container ${className}`}
            >
                <div onClick={this.handleFolderClick} className={`folder ${isActiveClass}`}>
                    <i className={`folder__icon fa fa-${folderIcon} fa-lg`}></i>
                    <span className="folder__name">{folderName}</span>
                </div>
                {children}
            </div>
        );
    }
}
