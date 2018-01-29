import {
    EDIT_EXISTING_NOTE,
    EDIT_EXISTING_NOTE_SUCCESS,
    CREATE_NEW_NOTE,
    CREATE_NEW_NOTE_SUCCESS,
    CHANGE_TEXT_FIELD_VALUE,
    CHANGE_NOTE_NAME,
    GET_NOTE_SUCCESS,
    GET_NOTE_FAIL,
    CLEAR_NOTE_DATA,
    CREATE_NEW_NOTE_FAIL,
    CLEAR_ERROR_MESSAGE,
} from './constants';
import { EditNoteState, TypedAction } from './types';
import { NoteType } from '../../generic/types';

const editNoteReducer = (
    state: EditNoteState = {
        editedNote: {
            id: null,
            name: '',
            textFieldValue: '',
            textFieldPlaceholder: '',
            hashtags: [],
            date: '',
        },
        isNoteCreationMode: false,
        errorMessage: '',
    },
    action: TypedAction
) => {
    let newHashtagsArray, clickedHashtag, clickedHashtagIndex;

    switch (action.type) {
        case EDIT_EXISTING_NOTE: {
            return state;
        }

        case EDIT_EXISTING_NOTE_SUCCESS: {
            return state;
        }

        case CHANGE_TEXT_FIELD_VALUE: {
            return {
                ...state,
                editedNote: {
                    ...state.editedNote,
                    textFieldValue: action.payload.textFieldValue,
                },
            };
        }

        case CHANGE_NOTE_NAME: {
            return {
                ...state,
                editedNote: {
                    ...state.editedNote,
                    name: action.payload.name,
                },
            };
        }

        case GET_NOTE_SUCCESS: {
            const { name, id, text, hashtags, date } = action.payload
                .note as NoteType;

            return {
                ...state,
                editedNote: {
                    ...state.editedNote,
                    name,
                    id,
                    textFieldValue: text,
                    hashtags,
                    date,
                },
            };
        }

        case CLEAR_NOTE_DATA: {
            return {
                ...state,
                editedNote: {
                    id: null,
                    name: '',
                    textFieldValue: '',
                    hashtags: [],
                },
            };
        }

        case CREATE_NEW_NOTE_FAIL: {
            return {
                ...state,
                errorMessage: 'sorry, try later :(',
            };
        }

        case CLEAR_ERROR_MESSAGE: {
            return {
                ...state,
                errorMessage: '',
            };
        }

        default:
            return state;
    }
};

export default editNoteReducer;
