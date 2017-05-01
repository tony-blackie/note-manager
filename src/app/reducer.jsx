import initialState from './initialState.jsx';
import {
  MAKE_FOLDER_ACTIVE,
  MAKE_FOLDER_INACTIVE,
  ADD_NEW_NOTE,
  GET_ALL_NOTES,
  GET_ALL_NOTES_SUCCESS,
  GO_TO_NOTE_EDIT,
  EDIT_EXISTING_NOTE,
  EDIT_EXISTING_NOTE_SUCCESS,
  CREATE_NEW_NOTE,
  CREATE_NEW_NOTE_SUCCESS,
  REMOVE_NOTE,
  REMOVE_NOTE_SUCCESS,
  REQUEST_ALL_FOLDERS_SUCCESS,
  REMOVE_FOLDER,
  GET_FOLDER_SUCCESS,
  CHANGE_FOLDER_NAME,
  SAVE_EDITED_FOLDER,
  FOLDER_CREATION_SUCCESS,
  FOLDER_CREATION_FAIL
} from '../views/actionTypes.jsx';

const reducer = (state, action) => {
    let newFoldersArray,
        clickedFolder,
        clickedFolderIndex;

    if (typeof state === 'undefined') {
        return initialState;
    }

    switch(action.type) {
        case MAKE_FOLDER_ACTIVE:
            newFoldersArray = state.folders.slice();

            state.folders.map((folder, index) => {
                if(folder.id === action.id) {
                    clickedFolder = folder;
                    clickedFolderIndex = index;
                }
            });

            newFoldersArray.map((folder, index) => {
                if(folder.id !== action.id) {
                    folder.isActive = false;
                }
            });

            newFoldersArray[clickedFolderIndex] = clickedFolder;
            newFoldersArray[clickedFolderIndex].isActive = !newFoldersArray[clickedFolderIndex].isActive;

            return {
                ...state,
                folders: newFoldersArray,
                activeFolderId: action.id
            };
        case MAKE_FOLDER_INACTIVE:
            newFoldersArray = state.folders.slice();

            state.folders.map((folder, index) => {
                if(folder.id === action.id) {
                    clickedFolder = folder;
                    clickedFolderIndex = index;
                }
            });

            newFoldersArray.map((folder, index) => {
                if(folder.id !== action.id) {
                    folder.isActive = false;
                }
            });

            newFoldersArray[clickedFolderIndex] = clickedFolder;
            newFoldersArray[clickedFolderIndex].isActive = !newFoldersArray[clickedFolderIndex].isActive;

            return {
                ...state,
                folders: newFoldersArray,
                activeFolderId: null
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
        case REQUEST_ALL_FOLDERS_SUCCESS:
            let newFolders = [];
            let firstFolderId = action.payload[0].id;
            action.payload.map((folder, index) => {
                newFolders.push({
                    isOpen: false,
                    isActive: index === 0,
                    parent: action.payload[index].parent_id,
                    id: action.payload[index].id,
                    name: action.payload[index].name
                });
            });

            return {
                ...state,
                folders: newFolders,
                activeFolderId: firstFolderId
            }
        case REMOVE_FOLDER:
            let indexOfFolderInState;
            state.folders.map((folder, index) => {
                if(folder.id === action.id) {
                    indexOfFolderInState = index;
                }
            });
            newFolders = state.folders.slice(0, indexOfFolderInState);
            if (state.folders[indexOfFolderInState + 1]) {
                newFolders = newFolders.concat(state.folders.slice(indexOfFolderInState + 1, state.folders.length));
            }
            return {
                ...state,
                folders: newFolders
            }
        case GET_FOLDER_SUCCESS:
            return {
                ...state,
                folderName: action.folder.name
            };
        case CHANGE_FOLDER_NAME:
            return {
                ...state,
                folderName: action.text
            };
        case SAVE_EDITED_FOLDER:
            let newFolderArray = state.folders.slice();
            newFolderArray.map((folder, index) => {
                if(folder.id === action.folder.id) {
                    folder.name = state.folderName;
                }
            });
            return {
                ...state,
                folderName: '',
                folders: newFolderArray
            };
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
        default:
            return state;
    }
};

export default reducer;
