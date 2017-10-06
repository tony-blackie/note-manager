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
}, action) => {
    let newFoldersArray,
        clickedFolder,
        clickedFolderIndex;

    switch(action.type) {
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
        // TODO: state.folders are not available in this reducer. Fix this
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
        default:
            return state;
    }
};

export default editFolderReducer;
