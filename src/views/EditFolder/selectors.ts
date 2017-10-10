import { createSelector } from 'reselect';

export const selectEditFolder = state => state.editFolder;

export const selectFolderName = createSelector(
    selectEditFolder,
    editFolder => editFolder.folderName
);

export const selectFolderId = createSelector(
    selectEditFolder,
    editFolder => editFolder.folderId
);