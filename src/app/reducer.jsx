import initialState from './initialState.jsx';
import {
  MAKE_FOLDER_ACTIVE,
  ADD_NEW_NOTE,
  GET_ALL_NOTES,
  GET_ALL_NOTES_SUCCESS,
  GO_TO_NOTE_EDIT,
  EDIT_EXISTING_NOTE,
  EDIT_EXISTING_NOTE_SUCCESS,
  CREATE_NEW_NOTE,
  CREATE_NEW_NOTE_SUCCESS,
  REMOVE_NOTE,
  REMOVE_NOTE_SUCCESS
} from '../actions/actionTypes.jsx';

const reducer = (state, action) => {
    if (typeof state === 'undefined') {
        return initialState;
    }

    switch(action.type) {
        case MAKE_FOLDER_ACTIVE:
            let newFoldersArray = state.folders.slice();

            newFoldersArray.map((folder, index) => {
                folder.isActive = false;
            });

            newFoldersArray = newFoldersArray
                .slice(0, action.id)
                .concat(
                    {
                        id: newFoldersArray[action.id].id,
                        parent: newFoldersArray[action.id].parent,
                        isActive: true,
                        isOpen: newFoldersArray[action.id].isOpen
                    }
                )
                .concat(newFoldersArray.slice(action.id + 1));

            return {
                ...state,
                folders: newFoldersArray
            };

        case ADD_NEW_NOTE:
            return {
                ...state,
                isNoteCreationMode: true
            };
        case GO_TO_NOTE_EDIT:
            return {
                ...state,
                isNoteCreationMode: false
            }
        case GET_ALL_NOTES:
            return state;
        case GET_ALL_NOTES_SUCCESS:
            return {
                ...state,
                notes: action.payload
            };
        case EDIT_EXISTING_NOTE:
            return state;
        case EDIT_EXISTING_NOTE_SUCCESS:
            return state;
        case REMOVE_NOTE_SUCCESS:
            let indexOfNoteInState;
            state.notes.map((note, index) => {
                if(note.id === action.payload) {
                    indexOfNoteInState = index;
                }
            });
            let newNotes = state.notes.slice(0, indexOfNoteInState);
            if (state.notes[indexOfNoteInState + 1]) {
                newNotes = newNotes.concat(state.notes.slice(indexOfNoteInState + 1, state.notes.length));
            }
            return {
                ...state,
                notes: newNotes
            }
        default:
            return state;
    }
};

export default reducer;
