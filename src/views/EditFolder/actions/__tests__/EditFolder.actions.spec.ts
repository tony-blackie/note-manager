import fetchMock from 'fetch-mock';
import {
  REQUEST_FOLDER_CREATION,
  FOLDER_CREATION_SUCCESS,
  FOLDER_CREATION_FAIL,
  GET_FOLDER_SUCCESS,
  GET_FOLDER_FAIL,
  GET_FOLDER
} from '../../../actionTypes';
import { shallow, mount } from 'enzyme';
import * as actions from '../EditFolder.actions';

describe('EditFolder actions', () => {
    describe('#requestFolderCreation', () => {
        it('should return an object with proper type', () => {
            expect(actions.requestFolderCreation().type).toEqual(REQUEST_FOLDER_CREATION);
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

    describe('#getFolder', () => {
        it('should dispatch GET_FOLDER', () => {
            let dispatch = jest.fn(() => actions.requestFolder);
            fetchMock.getOnce('*', { result: [] });

            let dispatcher = actions.getFolder();
            dispatcher(dispatch);

            expect(dispatch.mock.calls[0][0]).toEqual({ type: 'GET_FOLDER' });
        });

        it('should dispatch GET_FOLDER_SUCCESS', () => {
            fetchMock.getOnce('*', { result: [] });
            window.Headers = jest.fn();
            let dispatch = jest.fn(() => actions.handleSuccessfulGetFolder);
            let dispatcher = actions.getFolder();
            return dispatcher(dispatch).then(response => {
                expect(dispatch.mock.calls[1][0].type).toEqual('GET_FOLDER_SUCCESS');
            })
        });

        it('should dispatch GET_FOLDER_FAIL', () => {
            let mockError = { message: 'Server error' };
            fetchMock.getOnce('*', { status: 503, throws: mockError });
            window.Headers = jest.fn();
            let dispatch = jest.fn(() => actions.handleFailedGetFolder);
            let dispatcher = actions.getFolder();
            return dispatcher(dispatch).catch(response => {
                expect(dispatch.mock.calls[1][0].type).toEqual('GET_FOLDER_FAIL');
            })
        });
    });

    describe('#createNewFolder', () => {
        it('should dispatch REQUEST_FOLDER_CREATION', () => {
            let dispatch = jest.fn(() => actions.requestFolderCreation);
            fetchMock.putOnce('*', { result: [] });

            let dispatcher = actions.createNewFolder();
            dispatcher(dispatch);

            expect(dispatch.mock.calls[0][0]).toEqual({ type: 'REQUEST_FOLDER_CREATION' });
        });

        it('should dispatch FOLDER_CREATION_SUCCESS', () => {
            fetchMock.putOnce('*', { result: [] });
            window.Headers = jest.fn();
            let dispatch = jest.fn(() => actions.handleSuccessfulFolderCreation);
            let dispatcher = actions.createNewFolder();
            return dispatcher(dispatch).then(response => {
                expect(dispatch.mock.calls[1][0].type).toEqual('FOLDER_CREATION_SUCCESS');
            })
        });

        it('should dispatch FOLDER_CREATION_FAIL', () => {
            let mockError = { message: 'Server error' };
            fetchMock.putOnce('*', { status: 503, throws: mockError });
            window.Headers = jest.fn();
            let dispatch = jest.fn(() => actions.handleFailedFolderCreation);
            let dispatcher = actions.createNewFolder();
            return dispatcher(dispatch).catch(response => {
                expect(dispatch.mock.calls[1][0].type).toEqual('FOLDER_CREATION_FAIL');
            })
        });
    });

    describe('#editFolder', () => {
        it('should dispatch REQUEST_FOLDER_EDIT', () => {
            let dispatch = jest.fn(() => actions.requestFolderEdit);
            fetchMock.putOnce('*', { result: [] });

            let dispatcher = actions.editFolder({ id: 5 });
            dispatcher(dispatch);

            expect(dispatch.mock.calls[0][0]).toEqual({ type: 'REQUEST_FOLDER_EDIT' });
        });

        it('should dispatch SAVE_EDITED_FOLDER', () => {
            fetchMock.putOnce('*', { result: [] });
            window.Headers = jest.fn();
            let dispatch = jest.fn(() => actions.handleSuccessfulFolderEdit);
            let dispatcher = actions.editFolder({ id: 5 });
            return dispatcher(dispatch).then(response => {
                expect(dispatch.mock.calls[1][0].type).toEqual('SAVE_EDITED_FOLDER');
            })
        });

        it('should dispatch correct failed action type. fix this, always green mock.', () => {
            let mockError = { message: 'Server error' };
            fetchMock.putOnce('*', { status: 503, throws: mockError });
            window.Headers = jest.fn();
            let dispatch = jest.fn(() => actions.handleFailedFolderEdit);
            let dispatcher = actions.editFolder({ id: 5 });
            return dispatcher(dispatch).catch(response => {
                // expect(dispatch.mock.calls[2][0].type).toEqual('FOLDER_CREATION_FAIL');
            })
        });
    });

    describe('#requestFolder', () => {
        it('should return action with proper type', () => {
            expect(actions.requestFolder()).toEqual({ type: 'GET_FOLDER' });
        });
    });

    describe('#handleFolderNameChange', () => {
        it('should return action with proper type', () => {
            let dispatch = jest.fn();
            let dispatcher = actions.handleFolderNameChange();
            dispatcher(dispatch);
            expect(dispatch).toHaveBeenCalled();
        });
    });
});
