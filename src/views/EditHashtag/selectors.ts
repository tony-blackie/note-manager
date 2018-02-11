import { createSelector } from 'reselect';
import { includes } from 'lodash';

import { Store } from '../../generic/types';

export const selectEditHashtag = (state: Store) => state.editHashtag;

export const selectHashtag = createSelector(
    selectEditHashtag,
    editHashtag => editHashtag.hashtag
);

export const selectErrorMessage = createSelector(
    selectEditHashtag,
    editHashtag => editHashtag.errorMessage
);
