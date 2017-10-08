// import initialState from './initialState';
import {
  MAKE_FOLDER_ACTIVE,
  MAKE_FOLDER_INACTIVE,
  GET_ALL_NOTES,
  GET_ALL_NOTES_SUCCESS,
  GO_TO_NOTE_EDIT,
  REMOVE_NOTE,
  REMOVE_NOTE_SUCCESS,
  REQUEST_ALL_FOLDERS_SUCCESS,
  REMOVE_FOLDER_SUCCESS,
  REMOVE_FOLDER_FAIL,
  UPDATE_NOTE_FILTER_QUERY
} from './constants';
import { AppComponentState } from './types';

const appReducer = (state: AppComponentState = {
    folders: [],
    notes: [],
    activeFolderId: null,
    notesQuery: ''
}, action) => {
    let newFoldersArray,
        clickedFolder,
        clickedFolderIndex;

    // if (typeof state === 'undefined') {
    //     return initialState;
    // }

    switch(action.type) {
        case MAKE_FOLDER_ACTIVE:
            newFoldersArray = state.folders.slice();

            state.folders.map((folder, index) => {
                if(folder.id === action.payload.id) {
                    clickedFolder = folder;
                    clickedFolderIndex = index;
                }
            });

            newFoldersArray.map((folder, index) => {
                if(folder.id !== action.payload.id) {
                    folder.isActive = false;
                }
            });

            newFoldersArray[clickedFolderIndex] = clickedFolder;
            newFoldersArray[clickedFolderIndex].isActive = !newFoldersArray[clickedFolderIndex].isActive;

            return {
                ...state,
                folders: newFoldersArray,
                activeFolderId: action.payload.id
            };
        case MAKE_FOLDER_INACTIVE:
            newFoldersArray = state.folders.slice();

            state.folders.map((folder, index) => {
                if(folder.id === action.payload.id) {
                    clickedFolder = folder;
                    clickedFolderIndex = index;
                }
            });

            newFoldersArray.map((folder, index) => {
                if(folder.id !== action.payload.id) {
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
        case REMOVE_NOTE_SUCCESS:
            let indexOfNoteInState;

            state.notes.map((note, index) => {
                if(note.id === action.payload.id) {
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
                    isActive: false,
                    parent: action.payload[index].parent,
                    id: action.payload[index].id,
                    name: action.payload[index].name
                });
            });

            return {
                ...state,
                folders: newFolders,
                activeFolderId: null
            }
        case REMOVE_FOLDER_SUCCESS:
            let indexOfFolderInState;
            state.folders.map((folder, index) => {
                if(folder.id === action.payload.id) {
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
        case UPDATE_NOTE_FILTER_QUERY:
            return {
                ...state,
                notesQuery: action.payload.query
            }
        default:
            return state;
    }
};

export default appReducer;
