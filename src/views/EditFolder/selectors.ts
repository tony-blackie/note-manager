import { createSelector } from 'reselect';
import { includes } from 'lodash';

import { Store } from '../../generic/types';

export const selectEditFolder = (state: Store) => state.editFolder;

export const selectFolder = createSelector(
    selectEditFolder,
    editFolder => editFolder.folder
);

export const selectErrorMessage = createSelector(
    selectEditFolder,
    editFolder => editFolder.errorMessage
);