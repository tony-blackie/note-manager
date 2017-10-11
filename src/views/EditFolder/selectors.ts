import { createSelector } from 'reselect';
import { includes } from 'lodash';

import { Store } from '../../generic/types';

export const selectEditFolder = (state: Store) => state.editFolder;

export const selectFolderName = createSelector(
    selectEditFolder,
    editFolder => editFolder.folderName
);

export const selectFolderId = createSelector(
    selectEditFolder,
    editFolder => editFolder.folderId
);
