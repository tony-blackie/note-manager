import { EditFolderState } from './types';
import {
  GET_FOLDER_SUCCESS,
  CHANGE_FOLDER_NAME,
  SAVE_EDITED_FOLDER,
  FOLDER_CREATION_SUCCESS,
  FOLDER_CREATION_FAIL
} from './constants';

const editFolderReducer = (state: EditFolderState = {
    folderName: '',
    folderId: null
}, action) => {
    let newFoldersArray,
        clickedFolder,
        clickedFolderIndex;

    switch(action.type) {
        case GET_FOLDER_SUCCESS: {
            return {
                ...state,
                folderName: action.payload.folder.name,
                folderId: action.payload.folder.id
            };
        }

        case CHANGE_FOLDER_NAME: {
            const { text } = action.payload;

            return {
                ...state,
                folderName: text
            };
        }

        default:
            return state;
    }
};

export default editFolderReducer;
