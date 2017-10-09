import { createSelector } from 'reselect';

export const selectEditNoteView = state => state.editNote;

export const selectIsNoteCreationMode = state => state.isNoteCreationMode;

export const selectEditedNote = createSelector(
    selectEditNoteView,
    editNoteView => editNoteView.editedNote
);