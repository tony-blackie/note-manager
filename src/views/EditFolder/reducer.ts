import { EditFolderState, ReducerAction } from './types';
import { TypedAction } from '../../generic/types';
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

        default:
            return state;
    }
};

export default editFolderReducer;
