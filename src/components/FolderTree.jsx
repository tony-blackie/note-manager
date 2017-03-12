import React, { Component } from 'react';
import Folder from './Folder.jsx';

export default class FolderTree extends Component {
    constructor(props) {
        super(props);

        this.renderFolder = this.renderFolder.bind(this);
    }

    renderFolder(folderId) {
        return (
          <Folder folderIcon="closed" selected="false" key={folderId}>
              {
                  this.props.folders.map(folder => {
                        if(folder.parent && folder.parent === folderId) {
                            return this.renderFolder(folder.id);
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
                            return this.renderFolder(folder.id)
                        };
                    })
                }
            </div>
        );
    }
}
