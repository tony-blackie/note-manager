import { EditFolderState, ReducerAction, HandleSuccessfulGetFolderPayload } from './types';
import { TypedAction, FolderTypeAPI } from '../../generic/types';
import {
  GET_FOLDER_SUCCESS,
  CHANGE_FOLDER_NAME,
  SAVE_EDITED_FOLDER,
  FOLDER_CREATION_SUCCESS,
  FOLDER_CREATION_FAIL,
  CLEAR_FOLDER_NAME
} from './constants';

const editFolderReducer = (state: EditFolderState = {
    folderName: '',
    folderId: null,
    isRoot: false,
    parent: 0,
    notes: [],
    errorMessage: ''
}, action: TypedAction<ReducerAction>) => {
    switch(action.type) {
        case GET_FOLDER_SUCCESS: {
            const { payload } = action as TypedAction<HandleSuccessfulGetFolderPayload>;
            const { name, id, is_root, notes, parent } = payload.folder;

            return {
                ...state,
                isRoot: is_root,
                folderName: name,
                folderId: id,
                parent,
                notes
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
