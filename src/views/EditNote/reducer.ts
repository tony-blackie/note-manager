import initialState from './initialState';
import {
  EDIT_EXISTING_NOTE,
  EDIT_EXISTING_NOTE_SUCCESS,
  CREATE_NEW_NOTE,
  CREATE_NEW_NOTE_SUCCESS,
  CHANGE_TEXT_FIELD_VALUE,
  CHANGE_NOTE_NAME,
  GET_NOTE_SUCCESS,
  GET_NOTE_FAIL,
  CLEAR_NOTE_DATA
} from './constants';

const editNoteReducer = (state, action) => {
    let newFoldersArray,
        clickedFolder,
        clickedFolderIndex;

    if (typeof state === 'undefined') {
        return initialState;
    }

    switch(action.type) {
        case EDIT_EXISTING_NOTE:
            return state;
        case EDIT_EXISTING_NOTE_SUCCESS:
            return state;
        case CHANGE_TEXT_FIELD_VALUE:
            return {
                ...state,
                editedNote: {
                    ...state.editedNote,
                    textFieldValue: action.textFieldValue
                }
            };
        case CHANGE_NOTE_NAME:
            return {
                ...state,
                editedNote: {
                    ...state.editedNote,
                    name: action.name
                }
            };
        case GET_NOTE_SUCCESS:
            return {
                ...state,
                editedNote: {
                    ...state.editedNote,
                    name: action.note.name,
                    id: action.note.id,
                    textFieldValue: action.note.text,
                    folderId: action.note.parent_id
                }
            };
        case CLEAR_NOTE_DATA:
            return {
                ...state,
                editedNote: {
                    id: null,
                    name: '',
                    textFieldValue: '',
                    folderId: null
                }
            };
        default:
            return state;
    }
};

export default editNoteReducer;
