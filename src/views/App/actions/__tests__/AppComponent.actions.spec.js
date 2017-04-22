import * as actions from '../AppComponent.actions.jsx';
import { isFunction } from 'lodash';
import {
  GET_ALL_NOTES,
  GET_ALL_NOTES_SUCCESS,
  GO_TO_NOTE_CREATION,
  GO_TO_NOTE_EDIT,
  GO_TO_EDIT_FOLDER,
  REMOVE_NOTE,
  REMOVE_NOTE_SUCCESS,
  MAKE_FOLDER_ACTIVE,
  MAKE_FOLDER_INACTIVE,
  REQUEST_ALL_FOLDERS,
  REQUEST_ALL_FOLDERS_SUCCESS,
  REMOVE_FOLDER,
  GO_TO_FOLDER_CREATION
} from '../../../actionTypes.jsx';

describe('AppComponent actions tests', () => {
    describe('#makeFolderActive', () => {
        it('should return a thunk', () => {
            expect(isFunction(actions.makeFolderActive())).toEqual(true);
        });

        it('should return a specific action', () => {
            let thunk = actions.makeFolderActive(3);
            let dispatch = jest.fn();
            thunk(dispatch);

            expect(dispatch).toHaveBeenCalledWith({ id: 3, type: MAKE_FOLDER_ACTIVE });
        });
    });
});
