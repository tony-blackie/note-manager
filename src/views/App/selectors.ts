import { createSelector } from 'reselect';
import { includes } from 'lodash';

import { Store, HashtagType } from '../../generic/types';
import utils from '../../utils';

const { truncateText } = utils;

export const selectAppView = (state: Store) => state.app;

export const selectQuery = createSelector(
    selectAppView,
    appView => appView.notesQuery
);

export const selectNotes = createSelector(
    selectAppView,
    appView => appView.notes
);

export const selectHashtags = createSelector(
    selectAppView,
    appView => appView.hashtags
);

export const selectActiveHashtagId = createSelector(
    selectAppView,
    appView => appView.activeHashtagId
);

export const selectNotesByQuery = createSelector(
    selectNotes,
    selectQuery,
    (notes, query) => {
        const lowerCaseQuery = query.toLowerCase();

        const filteredNotes = notes.filter(note => {
            const lowerCaseName = note.name.toLowerCase();
            const lowerCaseText = note.text.toLowerCase();

            return (
                includes(lowerCaseName, lowerCaseQuery) ||
                includes(lowerCaseText, lowerCaseQuery)
            );
        });

        return filteredNotes;
    }
);

export const selectTruncatedNotes = createSelector(
    selectNotesByQuery,
    notes => {
        const truncatedNotes = notes.map(note => {
            return {
                ...note,
                text: truncateText(note.text),
            };
        });

        return truncatedNotes;
    }
);
