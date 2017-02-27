import React, { Component } from 'react';
import Folder from './Folder.jsx';

export default class FolderTree extends Component {
    render() {
        return (
            <div className="folder-tree">
                <Folder folderIcon="closed" selected="true"/>
                <Folder folderIcon="open" selected="false"/>
            </div>
        );
    }
}