import { EditFolderState, ReducerAction, HandleSuccessfulGetFolderPayload } from './types';
import { TypedAction, FolderTypeAPI, FolderType } from '../../generic/types';
import {
  GET_FOLDER_SUCCESS,
  CHANGE_FOLDER_NAME,
  SAVE_EDITED_FOLDER,
  FOLDER_CREATION_SUCCESS,
  FOLDER_CREATION_FAIL,
  CLEAR_FOLDER_NAME
} from './constants';

const editFolderReducer = (state: EditFolderState = {
    folder: {
        name: '',
        id: 0,
        isRoot: false,
        parent: 0,
        notes: [],
    },
    errorMessage: ''
}, action: TypedAction<ReducerAction>) => {
    switch(action.type) {
        case GET_FOLDER_SUCCESS: {
            const { payload } = action as TypedAction<HandleSuccessfulGetFolderPayload>;
            const { name, id, is_root, notes, parent } = payload.folder as FolderTypeAPI;

            return {
                ...state,
                folder: {
                    isRoot: is_root,
                    name: name,
                    id: id,
                    parent,
                    notes
                }
            };
        }

        case CHANGE_FOLDER_NAME: {
            const { text } = action.payload;

            return {
                ...state,
                folder: {
                    ...state.folder,
                    name: text
                }
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
                folder: {
                    ...state.folder,
                    name: ''
                }
            }
        }

        default:
            return state;
    }
};

export default editFolderReducer;
