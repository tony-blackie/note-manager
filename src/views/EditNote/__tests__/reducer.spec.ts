import editNoteReducer from '../reducer';

describe('EditNote reducer', () => {
    it('should init with initial state', () => {
        const initialState = {
            "editedNote": {
                "date": "",
                "folderId": null,
                "id": null,
                "name": "",
                "textFieldPlaceholder": "",
                "textFieldValue": "",
                },
                "errorMessage": "",
                "isNoteCreationMode": false
        };
        expect(editNoteReducer(undefined, {} as any)).toEqual(initialState);
    });
});