import React, { Component } from 'react';
import Folder from './Folder.jsx';

export default class FolderTree extends Component {
    constructor(props) {
        super(props);

        this.renderFolder = this.renderFolder.bind(this);
        this.openFolder = this.openFolder.bind(this);
    }

    openFolder(event, folderId) {

    }

    renderFolder(folder, folderId) {
        return (
          <Folder
              folderIcon={folder.isOpen ? 'open' : 'closed'}
              selected={folder.isActive}
              key={folderId}
              onClick={this.openFolder}
          >
              {
                  this.props.folders.map(folder => {
                        if(folder.parent && folder.parent === folderId) {
                            return this.renderFolder(folder, folder.id);
                        }
                  }, this)
              }
          </Folder>
        );
    }

    render() {
        return (
            <div className="folder-tree">
                {
                    this.props.folders.map((folder, index) => {
                        if (folder.parent === null) {
                            return this.renderFolder(folder, folder.id)
                        };
                    })
                }
            </div>
        );
    }
}
