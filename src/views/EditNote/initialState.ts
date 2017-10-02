import { EditNoteState } from './types';

const initialState: EditNoteState = {
    editedNote: {
        id: null,
        name: '',
        textFieldValue: '',
        textFieldPlaceholder: '',
        folderId: null
    },
    isNoteCreationMode: false
};

export default initialState;
