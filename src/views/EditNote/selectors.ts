import { createSelector } from 'reselect';
import { find } from 'lodash';

import { EditNoteState, EditedNote } from './types';
import { Store, HashtagType, NoteType } from '../../generic/types';
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

// export const selectEditTags = createSelector(
//     selectEditNoteView,
//     editNoteView => editNoteView.editTags
// );

export const selectNoteWithHashtags = createSelector(
    selectHashtags,
    selectEditedNote,
    (
        hashtags: HashtagType[],
        note: EditedNote<number>
    ): EditedNote<HashtagType> => {
        if (!hashtags.length)
            return {
                ...note,
                hashtags: [],
            };

        const hashtagsInNote: HashtagType[] = note.hashtags.map(
            (hashtagId: number) => {
                return find(hashtags, (hashtag: HashtagType) => {
                    return hashtag.id === hashtagId;
                });
            }
        );

        return {
            ...note,
            hashtags: hashtagsInNote,
        };
    }
);
