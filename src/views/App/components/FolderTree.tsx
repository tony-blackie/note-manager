import * as React from 'react';
import Folder from './Folder';
import { FolderType } from '../types';

interface Props {
    folders: FolderType[];
}

export default class FolderTree extends React.Component<Props> {
    renderFolder = (folder, folderId) => {
        return (
          <Folder
              isActive={folder.isActive}
              key={folderId}
              id={folderId}
              makeFolderActive={this.props.makeFolderActive}
              makeFolderInactive={this.props.makeFolderInactive}
              folderName={folder.name}
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
                        if (folder.parent === 0) {
                            return this.renderFolder(folder, folder.id)
                        };
                    })
                }
            </div>
        );
    }
}
