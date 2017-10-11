import { findIndex } from 'lodash';

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
import { SAVE_EDITED_FOLDER } from '../EditFolder/constants';
import { AppComponentState } from './types';
import { FolderType, NoteType } from '../../generic/types';

const appReducer = (state: AppComponentState = {
    folders: [],
    notes: [],
    activeFolderId: null,
    notesQuery: ''
}, action) => {
    switch(action.type) {
        case SAVE_EDITED_FOLDER: {
            const { folderId, folderName } = action.payload;

            const newFolders = state.folders.slice();

            newFolders.map((folder, index) => {
                if(folder.id === folderId) {
                    folder.name = folderName;
                }
            });

            return {
                ...state,
                folders: newFolders
            };
        }

        case MAKE_FOLDER_ACTIVE: {
            const { id } = action.payload;
            const newFolders = state.folders.slice();

            newFolders.map((folder, index) => {
                if(folder.id === id) {
                    newFolders[index].isActive = true;
                } else {
                    newFolders[index].isActive = false;
                }
            });

            return {
                ...state,
                folders: newFolders,
                activeFolderId: id
            };
        }

        case MAKE_FOLDER_INACTIVE: {
            const { id } = action.payload;
            const newFolders = state.folders.slice();

            newFolders.map((folder, index) => {
                newFolders[index].isActive = false;
            });

            return {
                ...state,
                folders: newFolders,
                activeFolderId: null
            };
        }


        case GO_TO_NOTE_EDIT: {
            return {
                ...state,
                isNoteCreationMode: false
            }
        }

        case GET_ALL_NOTES_SUCCESS: {
            const { notes } = action.payload;

            return {
                ...state,
                notes
            };
        }

        case REMOVE_NOTE_SUCCESS: {
            let indexOfNoteInState: number;
            const { id } = action.payload;

            state.notes.map((note, index) => {
                if(note.id === id) {
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
        }

        case REQUEST_ALL_FOLDERS_SUCCESS: {
            const newFolders: FolderType[] = [];
            const { folders } = action.payload;
            let firstFolderId: number = folders[0].id;

            folders.map((folder, index) => {
                const { parent, id, name } = folder;

                newFolders.push({
                    isOpen: false,
                    isActive: false,
                    parent,
                    id,
                    name
                });
            });

            return {
                ...state,
                folders: newFolders,
                activeFolderId: null
            }
        }


        case REMOVE_FOLDER_SUCCESS: {
            let indexOfFolderInState;

            state.folders.map((folder, index) => {
                if(folder.id === action.payload.id) {
                    indexOfFolderInState = index;
                }
            });

            let newFolders = state.folders.slice(0, indexOfFolderInState);

            if (state.folders[indexOfFolderInState + 1]) {
                newFolders = newFolders.concat(
                    state.folders.slice(indexOfFolderInState + 1,
                    state.folders.length
                ));
            }

            return {
                ...state,
                folders: newFolders
            }
        }

        case UPDATE_NOTE_FILTER_QUERY: {
            return {
                ...state,
                notesQuery: action.payload.query
            }
        }

        default:
            return state;
    }
};

export default appReducer;
