import { findIndex } from 'lodash';

import {
    MAKE_HASHTAG_ACTIVE,
    MAKE_HASHTAG_INACTIVE,
    GET_ALL_NOTES,
    GET_ALL_NOTES_SUCCESS,
    GO_TO_NOTE_EDIT,
    REMOVE_NOTE,
    REMOVE_NOTE_SUCCESS,
    REQUEST_ALL_HASHTAGS_SUCCESS,
    REMOVE_HASHTAG_SUCCESS,
    REMOVE_HASHTAG_FAIL,
    UPDATE_NOTE_FILTER_QUERY,
} from './constants';
import { SAVE_EDITED_HASHTAG } from '../EditHashtag/constants';
import { AppComponentState, ReducerAction } from './types';
import {
    HashtagType,
    HashtagTypeAPI,
    NoteType,
    TypedAction,
} from '../../generic/types';

const appReducer = (
    state: AppComponentState = {
        hashtags: [],
        notes: [],
        activeHashtagId: null,
        notesQuery: '',
    },
    action: TypedAction<ReducerAction>
) => {
    switch (action.type) {
        case SAVE_EDITED_HASHTAG: {
            const { hashtagId, hashtagName } = action.payload;

            const newHashtags = state.hashtags.slice();

            newHashtags.map((hashtag, index) => {
                if (hashtag.id === hashtagId) {
                    hashtag.name = hashtagName;
                }
            });

            return {
                ...state,
                hashtags: newHashtags,
            };
        }

        case MAKE_HASHTAG_ACTIVE: {
            const { id } = action.payload;
            const newHashtags = state.hashtags.slice();

            newHashtags.map((hashtag, index) => {
                if (hashtag.id === id) {
                    newHashtags[index].isActive = true;
                } else {
                    newHashtags[index].isActive = false;
                }
            });

            return {
                ...state,
                hashtags: newHashtags,
                activeHashtagId: id,
            };
        }

        case MAKE_HASHTAG_INACTIVE: {
            const { id } = action.payload;
            const newHashtags = state.hashtags.slice();
            let rootHashtagId: number;

            newHashtags.map((hashtag, index) => {
                newHashtags[index].isActive = false;

                if (hashtag.isRoot) {
                    rootHashtagId = hashtag.id;
                }
            });

            return {
                ...state,
                hashtags: newHashtags,
                activeHashtagId: rootHashtagId,
            };
        }

        case GO_TO_NOTE_EDIT: {
            return {
                ...state,
                isNoteCreationMode: false,
            };
        }

        case GET_ALL_NOTES_SUCCESS: {
            const { notes } = action.payload;

            return {
                ...state,
                notes,
            };
        }

        case REMOVE_NOTE_SUCCESS: {
            let indexOfNoteInState: number;
            const { id } = action.payload;

            state.notes.map((note, index) => {
                if (note.id === id) {
                    indexOfNoteInState = index;
                }
            });

            let newNotes = state.notes.slice(0, indexOfNoteInState);

            if (state.notes[indexOfNoteInState + 1]) {
                newNotes = newNotes.concat(
                    state.notes.slice(
                        indexOfNoteInState + 1,
                        state.notes.length
                    )
                );
            }

            return {
                ...state,
                notes: newNotes,
            };
        }

        case REQUEST_ALL_HASHTAGS_SUCCESS: {
            const newHashtags: HashtagType[] = [];
            const { hashtags } = action.payload;

            if (hashtags.length === 0) {
                return {
                    ...state,
                    hashtags: [],
                    activeHashtagId: null,
                };
            }

            let firstHashtagId: number = hashtags[0].id;
            let activeHashtagId: null | number = null;

            hashtags.map((hashtag, index) => {
                const { parent, id, name, notes, is_root } = hashtag;

                if (is_root) {
                    activeHashtagId = id;
                }

                newHashtags.push({
                    isOpen: false,
                    isActive: false,
                    parent,
                    id,
                    name,
                    notes,
                    isRoot: is_root,
                });
            });

            return {
                ...state,
                hashtags: newHashtags,
                activeHashtagId,
            };
        }

        case REMOVE_HASHTAG_SUCCESS: {
            let indexOfHashtagInState;

            state.hashtags.map((hashtag, index) => {
                if (hashtag.id === action.payload.id) {
                    indexOfHashtagInState = index;
                }
            });

            let newHashtags = state.hashtags.slice(0, indexOfHashtagInState);

            if (state.hashtags[indexOfHashtagInState + 1]) {
                newHashtags = newHashtags.concat(
                    state.hashtags.slice(
                        indexOfHashtagInState + 1,
                        state.hashtags.length
                    )
                );
            }

            return {
                ...state,
                hashtags: newHashtags,
            };
        }

        case UPDATE_NOTE_FILTER_QUERY: {
            return {
                ...state,
                notesQuery: action.payload.query,
            };
        }

        default:
            return state;
    }
};

export default appReducer;
