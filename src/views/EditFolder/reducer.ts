import { EditFolderState, ReducerAction } from './types';
import { TypedAction } from '../../generic/types';
import {
  GET_FOLDER_SUCCESS,
  CHANGE_FOLDER_NAME,
  SAVE_EDITED_FOLDER,
  FOLDER_CREATION_SUCCESS,
  FOLDER_CREATION_FAIL,
  CLEAR_FOLDER_FAIL,
  CLEAR_FOLDER_NAME
} from './constants';

const editFolderReducer = (state: EditFolderState = {
    folderName: '',
    folderId: null,
    errorMessage: ''
}, action: TypedAction<ReducerAction>) => {
    switch(action.type) {
        case GET_FOLDER_SUCCESS: {
            const { name, id } = action.payload.folder;

            return {
                ...state,
                folderName: name,
                folderId: id
            };
        }

        case CHANGE_FOLDER_NAME: {
            const { text } = action.payload;

            return {
                ...state,
                folderName: text
            };
        }

        case FOLDER_CREATION_FAIL: {
            return {
                ...state,
                errorMessage: "sorry, try later"
            };
        }

        case CLEAR_FOLDER_FAIL: {
            return {
                ...state,
                errorMessage: ""
            }
        }

        case CLEAR_FOLDER_NAME: {
            return {
                ...state,
                folderName: ""
            }
        }
        
        default:
            return state;
    }
};

export default editFolderReducer;
