import React, { Component } from 'react';
import Folder from './Folder.jsx';

export default class FolderTree extends Component {
    render() {
        return (
            <div>
                <Folder folderIcon="closed"/>
                <Folder folderIcon="open"/>
            </div>
        );
    }
}