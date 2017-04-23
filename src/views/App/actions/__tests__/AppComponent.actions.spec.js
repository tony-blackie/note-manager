import * as actions from '../AppComponent.actions.jsx';
import { isFunction } from 'lodash';
import * as router from 'react-router';
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
});
