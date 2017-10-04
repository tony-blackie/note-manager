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
import { EditNoteState, TypedAction } from './types';

const editNoteReducer = (state: EditNoteState, action: TypedAction) => {
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
                    textFieldValue: action.payload.textFieldValue
                }
            };
        case CHANGE_NOTE_NAME:
            return {
                ...state,
                editedNote: {
                    ...state.editedNote,
                    name: action.payload.name
                }
            };
        case GET_NOTE_SUCCESS:
        const { name, id, text, parent_id } = action.payload;
            return {
                ...state,
                editedNote: {
                    ...state.editedNote,
                    name,
                    id,
                    textFieldValue: text,
                    folderId: parent_id
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
