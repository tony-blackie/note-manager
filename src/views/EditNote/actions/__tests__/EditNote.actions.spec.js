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
});
