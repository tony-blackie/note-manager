import { createSelector } from 'reselect';
import { EditNoteState } from './types';
import { Store } from '../../generic/types';
import { selectHashtags } from '../App/selectors';

export const selectEditNoteView = (state: Store) => state.editNote;

export const selectIsNoteCreationMode = createSelector(
    selectEditNoteView,
    editNoteView => editNoteView.isNoteCreationMode
);

export const selectEditedNote = createSelector(
    selectEditNoteView,
    editNoteView => editNoteView.editedNote
);

export const selectErrorMessage = createSelector(
    selectEditNoteView,
    editNoteView => editNoteView.errorMessage
);

export const selectEditTags = createSelector(
    selectEditNoteView,
    editNoteView => editNoteView.editTags
);
