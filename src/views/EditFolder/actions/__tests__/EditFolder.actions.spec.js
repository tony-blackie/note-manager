import {
  REQUEST_FOLDER_CREATION,
  FOLDER_CREATION_SUCCESS,
  FOLDER_CREATION_FAIL,
  GET_FOLDER_SUCCESS,
  GET_FOLDER_FAIL
} from '../../../actionTypes.jsx';
import { shallow, mount } from 'enzyme';
import * as actions from '../EditFolder.actions.jsx';

describe('EditFolder actions', () => {
    describe('#requestFolderCreation', () => {
        it('should return an object with proper type', () => {
            expect(actions.requestFolderCreation())
              .toEqual({ type: REQUEST_FOLDER_CREATION });
        });
    });

    describe('#handleSuccessfulFolderCreation', () => {
        it('should return an object with proper type', () => {
            expect(actions.handleSuccessfulFolderCreation({someProp: 'someVal'}))
              .toEqual({ type: FOLDER_CREATION_SUCCESS, folder: {someProp: 'someVal'} });
        });
    });

    describe('#handleSuccessfulGetFolder', () => {
        it('should return an object with proper type', () => {
            expect(actions.handleSuccessfulGetFolder({someProp: 'someVal'}))
              .toEqual({ type: GET_FOLDER_SUCCESS, folder: {someProp: 'someVal'} });
        });
    });

    describe('#handleFailedGetFolder', () => {
        it('should return an object with proper type', () => {
            expect(actions.handleFailedGetFolder({someProp: 'someVal'}))
              .toEqual({ type: GET_FOLDER_FAIL, error: {someProp: 'someVal'} });
        });
    });
});
