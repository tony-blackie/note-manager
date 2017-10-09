import { createSelector } from 'reselect';

export const selectEditNoteView = state => state.editNote;

export const selectEditedNote = createSelector(
    selectEditNoteView,
    editNoteView => editNoteView.editedNote
);

export const selectNoteFromState = state => state.editedNote.note;