import * as actions from '../AppComponent.actions';
import { isFunction } from 'lodash';
import * as router from 'react-router';
import fetchMock from 'fetch-mock';
import {
  GET_ALL_NOTES,
  GET_ALL_NOTES_SUCCESS,
  GET_ALL_NOTES_FAIL,
  GO_TO_NOTE_CREATION,
  GO_TO_NOTE_EDIT,
  GO_TO_EDIT_FOLDER,
  REMOVE_NOTE,
  REMOVE_NOTE_SUCCESS,
  MAKE_FOLDER_ACTIVE,
  MAKE_FOLDER_INACTIVE,
  REQUEST_ALL_FOLDERS,
  REQUEST_ALL_FOLDERS_SUCCESS,
  REMOVE_FOLDER_SUCCESS,
  REMOVE_FOLDER_FAIL,
  GO_TO_FOLDER_CREATION
} from '../../../actionTypes';

describe('AppComponent actions tests', () => {
    describe('#makeFolderActive', () => {
        it('should return a thunk', () => {
            expect(isFunction(actions.makeFolderActive())).toEqual(true);
        });

        it('should dispatch with a specific action', () => {
            let thunk = actions.makeFolderActive(3);
            let dispatch = jest.fn();
            thunk(dispatch);

            expect(dispatch).toHaveBeenCalledWith({ id: 3, type: MAKE_FOLDER_ACTIVE });
        });
    });

    describe('#makeFolderInactive', () => {
        it('should return a thunk', () => {
            expect(isFunction(actions.makeFolderInactive())).toEqual(true);
        });

        it('should dispatch with a specific action', () => {
            let thunk = actions.makeFolderInactive(5);
            let dispatch = jest.fn();
            thunk(dispatch);

            expect(dispatch).toHaveBeenCalledWith({ id: 5, type: MAKE_FOLDER_INACTIVE });
        });
    });

    describe('#goToEditFolder', () => {
        it('should return a thunk', () => {
            expect(isFunction(actions.goToEditFolder())).toEqual(true);
        });

        it('should dispatch with specific action', () => {
            let thunk = actions.goToEditFolder(5);
            let dispatch = jest.fn();
            thunk(dispatch);

            expect(dispatch).toHaveBeenCalledWith({ type: GO_TO_EDIT_FOLDER });
        });

        it('should dispatch with specific action', () => {
            let dispatch = jest.fn();
            router.hashHistory = {
                    push: jest.fn()
            };

            let thunk = actions.goToEditFolder(5);
            thunk(dispatch);

            expect(router.hashHistory.push).toHaveBeenCalledWith("/folder/5");
        });
    });

    describe('#goToFolderCreation', () => {
        it('should return a thunk', () => {
            expect(isFunction(actions.goToFolderCreation())).toEqual(true);
        });

        it('should dispatch with specific action', () => {
            let thunk = actions.goToFolderCreation();
            let dispatch = jest.fn();
            thunk(dispatch);

            expect(dispatch).toHaveBeenCalledWith({ type: GO_TO_FOLDER_CREATION });
        });

        it('should dispatch with specific action', () => {
            let dispatch = jest.fn();
            router.hashHistory = {
                    push: jest.fn()
            };

            let thunk = actions.goToFolderCreation();
            thunk(dispatch);

            expect(router.hashHistory.push).toHaveBeenCalledWith("/folder");
        });
    });

    describe('#goToNoteCreation', () => {
        it('should return a thunk', () => {
            expect(isFunction(actions.goToNoteCreation())).toEqual(true);
        });

        it('should dispatch with specific action', () => {
            let thunk = actions.goToNoteCreation();
            let dispatch = jest.fn();
            thunk(dispatch);

            expect(dispatch).toHaveBeenCalledWith({ type: GO_TO_NOTE_CREATION });
        });

        it('should dispatch with specific action', () => {
            let dispatch = jest.fn();
            router.hashHistory = {
                    push: jest.fn()
            };

            let thunk = actions.goToNoteCreation();
            thunk(dispatch);

            expect(router.hashHistory.push).toHaveBeenCalledWith("/note");
        });
    });

    describe('#goToNoteEdit', () => {
        it('should return a thunk', () => {
            expect(isFunction(actions.goToNoteEdit())).toEqual(true);
        });

        it('should dispatch with specific action', () => {
            let thunk = actions.goToNoteEdit(4);
            let dispatch = jest.fn();
            thunk(dispatch);

            expect(dispatch).toHaveBeenCalledWith({ type: GO_TO_NOTE_EDIT });
        });

        it('should dispatch with specific action', () => {
            let dispatch = jest.fn();
            router.hashHistory = {
                    push: jest.fn()
            };

            let thunk = actions.goToNoteEdit(4);
            thunk(dispatch);

            expect(router.hashHistory.push).toHaveBeenCalledWith("/notes/4");
        });
    });

    describe('#requestAllNotes', () => {
        it('should return a specific action', () => {
            expect(actions.requestAllNotes()).toEqual({ type: 'GET_ALL_NOTES' });
        });
    });

    describe('#handleSuccessfulGetAllNotes', () => {
        it('should return a specific action', () => {
            let notes = [{ id: 0, name: '1337' }];
            expect(actions.handleSuccessfulGetAllNotes(notes))
              .toEqual({ type: 'GET_ALL_NOTES_SUCCESS', payload: notes });
        });
    });

    describe('#handleFailedGetAllNotes', () => {
        it('should return a specific action', () => {
            let error = { message: 'error' };
            expect(actions.handleFailedGetAllNotes(error))
              .toEqual({ type: 'GET_ALL_NOTES_FAIL', payload: error });
        });
    });

    describe('#handleSuccessfulDeleteFolder', () => {
        it('should return a specific action', () => {
            expect(actions.handleSuccessfulDeleteFolder(5))
              .toEqual({ type: 'REMOVE_FOLDER_SUCCESS', id: 5 });
        });
    });

    describe('#handleFailedDeleteFolder', () => {
        it('should return a specific action', () => {
            let error = { message: 'error' };
            expect(actions.handleFailedDeleteFolder(error))
              .toEqual({ type: 'REMOVE_FOLDER_FAIL', error: error });
        });
    });

    describe('#removeFolder', () => {
        it('should dispatch REMOVE_FOLDER_SUCCESS', () => {
            fetchMock.deleteOnce('*', { result: [] });
            window.Headers = jest.fn();

            let dispatch = jest.fn(() => actions.handleSuccessfulDeleteFolder);
            let dispatcher = actions.removeFolder(5);

            return dispatcher(dispatch).then(response => {
                expect(dispatch.mock.calls[0][0]).toEqual({ type: 'REMOVE_FOLDER_SUCCESS', id: 5 });
            });
        });

        it('should dispatch REMOVE_FOLDER_FAIL', () => {
            let mockError = { message: 'Server error' };
            fetchMock.deleteOnce('*', { status: 503, throws: mockError });
            window.Headers = jest.fn();
            let dispatch = jest.fn(() => actions.handleFailedDeleteFolder);
            let dispatcher = actions.removeFolder(5);
            return dispatcher(dispatch).catch(response => {
                expect(dispatch.mock.calls[1][0]).toEqual('');
            })
        });
    });

    describe('#handleSuccessfulDeleteNote', () => {
        it('should return a specific action', () => {
            expect(actions.handleSuccessfulDeleteNote(5))
              .toEqual({ type: 'REMOVE_NOTE_SUCCESS', payload: 5 });
        });
    });

    describe('#handleFailedDeleteNote', () => {
        it('should return a specific action', () => {
            let error = { message: 'error' };
            expect(actions.handleFailedDeleteNote(error))
              .toEqual({ type: 'REMOVE_NOTE_FAIL', error: error });
        });
    });

    describe('#handleSuccessfulGetAllFolders', () => {
        it('should return a specific action', () => {
            expect(actions.handleSuccessfulGetAllFolders([]))
              .toEqual({ type: 'REQUEST_ALL_FOLDERS_SUCCESS', payload: [] });
        });
    });

    describe('#handleFailedGetAllFolders', () => {
        it('should return a specific action', () => {
            let error = { message: 'error' };
            expect(actions.handleFailedGetAllFolders(error))
              .toEqual({ type: 'REQUEST_ALL_FOLDERS_FAIL', error: error });
        });
    });

    describe('#getAllFolders', () => {
        it('should dispatch REQUEST_ALL_FOLDERS_SUCCESS', () => {
            fetchMock.getOnce('*', { result: [] });
            window.Headers = jest.fn();
            let dispatch = jest.fn(() => actions.handleSuccessfulGetAllFolders);
            let dispatcher = actions.getAllFolders([]);
            return dispatcher(dispatch).then(response => {
                expect(dispatch.mock.calls[1][0]).toEqual({ type: 'REQUEST_ALL_FOLDERS_SUCCESS', payload: { result: [] } });
            })
        });

        it('should dispatch REQUEST_ALL_FOLDERS_FAIL', () => {
            let mockError = { message: 'Server error' };
            fetchMock.getOnce('*', { status: 503, throws: mockError });
            window.Headers = jest.fn();
            let dispatch = jest.fn(() => actions.handleFailedGetAllFolders);
            let dispatcher = actions.getAllFolders([]);
            return dispatcher(dispatch).catch(response => {
                expect(dispatch.mock.calls[1][0].type).toEqual('');
            })
        });
    });

    describe('#getAllNotes', () => {
        it('should dispatch GET_ALL_NOTES_SUCCESS', () => {
            fetchMock.getOnce('*', { result: [] });
            window.Headers = jest.fn();
            let dispatch = jest.fn(() => actions.handleSuccessfulGetAllNotes);
            let dispatcher = actions.getAllNotes();
            return dispatcher(dispatch).then(response => {
                expect(dispatch.mock.calls[1][0]).toEqual({ type: 'GET_ALL_NOTES_SUCCESS', payload: { result: [] } });
            })
        });

        it('should dispatch GET_ALL_NOTES_FAIL', () => {
            let mockError = { message: 'Server error' };
            fetchMock.getOnce('*', { status: 503, throws: mockError });
            window.Headers = jest.fn();
            let dispatch = jest.fn(() => actions.handleFailedGetAllNotes);
            let dispatcher = actions.getAllNotes();
            return dispatcher(dispatch).catch(response => {
                expect(dispatch.mock.calls[1][0].type).toEqual('');
            })
        });
    });

    describe('#removeNote', () => {
        it('should dispatch REMOVE_NOTE_SUCCESS', () => {
            fetchMock.deleteOnce('*', { result: [] });
            window.Headers = jest.fn();
            let dispatch = jest.fn(() => actions.handleSuccessfulDeleteNote);
            let dispatcher = actions.removeNote(5);
            return dispatcher(dispatch).then(response => {
                expect(dispatch.mock.calls[1][0]).toEqual({ type: 'REMOVE_NOTE_SUCCESS', payload: 5 });
            })
        });

        it('should dispatch REQUEST_ALL_FOLDERS_FAIL', () => {
            let mockError = { message: 'Server error' };
            fetchMock.deleteOnce('*', { status: 503, throws: mockError });
            window.Headers = jest.fn();
            let dispatch = jest.fn(() => actions.handleFailedDeleteNote);
            let dispatcher = actions.removeNote(5);
            return dispatcher(dispatch).catch(response => {
                expect(dispatch.mock.calls[1][0].type).toEqual('');
            })
        });
    });
});
