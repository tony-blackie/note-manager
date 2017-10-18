import { createSelector } from 'reselect';
import { EditNoteState } from './types';
import { Store } from '../../generic/types';

export const selectEditNoteView = (state: Store) => state.editNote;

export const selectIsNoteCreationMode = createSelector(
    selectEditNoteView,
    editNoteView => editNoteView.isNoteCreationMode
);

export const selectEditedNote = createSelector(
    selectEditNoteView,
    editNoteView => editNoteView.editedNote
);

export const selectFailNote = createSelector(
    selectEditNoteView,
    editNoteView => editNoteView.failNote
);