import * as actions from '../EditNote.actions.jsx';
import fetchMock from 'fetch-mock';

describe('EditNote actions', () => {
    describe('#editNoteRequest', () => {
        it('should dispatch EDIT_EXISTING_NOTE', () => {
            let dispatch = jest.fn(() => actions.handleEditNoteSuccess);
            fetchMock.putOnce('*', { result: [] });

            let dispatcher = actions.editNoteRequest(5);
            dispatcher(dispatch);

            expect(dispatch.mock.calls[0][0]).toEqual({ type: 'EDIT_EXISTING_NOTE' });
        });

        it('should dispatch EDIT_EXISTING_NOTE_SUCCESS', () => {
            fetchMock.putOnce('*', { result: [] });
            window.Headers = jest.fn();
            let dispatch = jest.fn(() => actions.handleEditNoteSuccess);
            let dispatcher = actions.editNoteRequest({id: 5});
            return dispatcher(dispatch).then(response => {
                expect(dispatch.mock.calls[1][0].type).toEqual('EDIT_EXISTING_NOTE_SUCCESS');
            })
        });

        it('should dispatch EDIT_EXISTING_NOTE_FAIL', () => {
            let mockError = { message: 'Server error' };
            fetchMock.putOnce('*', { status: 503, throws: mockError });
            window.Headers = jest.fn();
            let dispatch = jest.fn(() => actions.handleEditNoteFail);
            let dispatcher = actions.editNoteRequest({id: 5});
            return dispatcher(dispatch).catch(response => {
                expect(dispatch.mock.calls[1][0].type).toEqual('EDIT_EXISTING_NOTE_FAIL');
            })
        });
    });

    describe('#createNoteRequest', () => {
        it('should dispatch CREATE_NEW_NOTE', () => {
            let dispatch = jest.fn(() => actions.handleSuccessfulNoteCreation);
            fetchMock.postOnce('*', { result: [] });

            let dispatcher = actions.createNoteRequest();
            dispatcher(dispatch);

            expect(dispatch.mock.calls[0][0]).toEqual({ type: 'CREATE_NEW_NOTE' });
        });

        it('should dispatch CREATE_NEW_NOTE_SUCCESS', () => {
            fetchMock.postOnce('*', { result: [] });
            window.Headers = jest.fn();
            let dispatch = jest.fn(() => actions.handleSuccessfulNoteCreation);
            let dispatcher = actions.createNoteRequest({id: 5});
            return dispatcher(dispatch).then(response => {
                expect(dispatch.mock.calls[1][0].type).toEqual('CREATE_NEW_NOTE_SUCCESS');
            })
        });

        it('should dispatch CREATE_NEW_NOTE_FAIL', () => {
            let mockError = { message: 'Server error' };
            fetchMock.postOnce('*', { status: 503, throws: mockError });
            window.Headers = jest.fn();
            let dispatch = jest.fn(() => actions.handleFailedNoteCreation);
            let dispatcher = actions.createNoteRequest({id: 5});
            return dispatcher(dispatch).catch(response => {
                return console.log(dispatch.mock.calls[1][0].type);
                expect(dispatch.mock.calls[1][0].type).toEqual('CREATE_NEW_NOTE_FAIL');
            })
        });
    });

    describe('#changeTextFieldValue', () => {
        it('should dispatch correct action type and value', () => {
            let dispatch = jest.fn();
            let dispatcher = actions.changeTextFieldValue('newValueOfInput');

            dispatcher(dispatch);

            expect(dispatch)
              .toHaveBeenCalledWith({ type: 'CHANGE_TEXT_FIELD_VALUE', textFieldValue: 'newValueOfInput' });
        });
    });

    describe('#changeNoteName', () => {
        it('should dispatch correct action type and value', () => {
            let dispatch = jest.fn();
            let dispatcher = actions.changeNoteName('newName');

            dispatcher(dispatch);

            expect(dispatch)
              .toHaveBeenCalledWith({ type: 'CHANGE_NOTE_NAME', name: 'newName' });
        });
    });

    describe('#handleSuccessfulNoteResponse', () => {
        it('should return an action object', () => {
            expect(actions.handleSuccessfulNoteResponse({}))
              .toEqual({ type: 'GET_NOTE_SUCCESS', note: {} });
        });
    });

    describe('#handleFailedNoteResponse', () => {
        it('should return an action object', () => {
            expect(actions.handleFailedNoteResponse({}))
              .toEqual({ type: 'GET_NOTE_FAIL', error: {} });
        });
    });

    describe('#clearNoteData', () => {
        it('should dispatch with specific action type', () => {
            let dispatch = jest.fn();
            let dispatcher = actions.clearNoteData();
            dispatcher(dispatch);
            expect(dispatch)
              .toHaveBeenCalledWith({ type: 'CLEAR_NOTE_DATA' });
        });
    });

    describe('#fetchNote', () => {
        it('should dispatch REQUEST_NOTE_FETCH', () => {
            let dispatch = jest.fn(() => actions.handleSuccessfulNoteResponse);
            fetchMock.getOnce('*', { result: [] });

            let dispatcher = actions.fetchNote(5);
            dispatcher(dispatch);

            expect(dispatch.mock.calls[0][0]).toEqual({ type: 'REQUEST_NOTE_FETCH' });
        });

        it('should dispatch CREATE_NEW_NOTE_SUCCESS', () => {
            fetchMock.getOnce('*', { result: [] });
            window.Headers = jest.fn();
            let dispatch = jest.fn(() => actions.handleSuccessfulNoteResponse);
            let dispatcher = actions.fetchNote(5);
            return dispatcher(dispatch).then(response => {
                expect(dispatch.mock.calls[1][0].type).toEqual('GET_NOTE_SUCCESS');
            })
        });

        it('should dispatch CREATE_NEW_NOTE_FAIL', () => {
            let mockError = { message: 'Server error' };
            fetchMock.getOnce('*', { status: 503, throws: mockError });
            window.Headers = jest.fn();
            let dispatch = jest.fn(() => actions.handleFailedNoteResponse);
            let dispatcher = actions.fetchNote(5);
            return dispatcher(dispatch).catch(response => {
                return console.log(dispatch.mock.calls[1][0].type);
                expect(dispatch.mock.calls[1][0].type).toEqual('CREATE_NEW_NOTE_FAIL');
            })
        });
    });
});
