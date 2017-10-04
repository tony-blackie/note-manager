import * as React from 'react';
import Folder from './Folder';
import { MakeFolderActiveFn, MakeFolderInactiveFn } from '../types';
import { FolderType } from '../../../generic/types';

interface Props {
    folders: FolderType[];
    makeFolderActive: MakeFolderActiveFn;
    makeFolderInactive: MakeFolderInactiveFn;
}

export default class FolderTree extends React.Component<Props> {
    renderFolder = (folder, folderId) => {
        const { folders } = this.props;

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
                  folders.map(folder => {
                        if(folder.parent && folder.parent === folderId) {
                            return this.renderFolder(folder, folder.id);
                        }
                  }, this)
              }
          </Folder>
        );
    }

    render() {
        const { folders } = this.props;
        return (
            <div className="folder-tree">
                {
                    folders.map((folder, index) => {
                        if (folder.parent === 0) {
                            return this.renderFolder(folder, folder.id)
                        };
                    })
                }
            </div>
        );
    }
}
