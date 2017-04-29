const initialState = {
    folders: [
        {
            id: 0,
            parent: null,
            isActive: true,
            isOpen: false,
            name: 'someName'
        },
        {
            id: 1,
            parent: null,
            isActive: false,
            isOpen: false,
            name: 'someName'
        },
        {
            id: 2,
            parent: 1,
            isActive: false,
            isOpen: false,
            name: 'someName'
        },
        {
            id: 3,
            parent: 1,
            isActive: false,
            isOpen: false,
            name: 'someName'
        },
        {
            id: 4,
            parent: 2,
            isActive: false,
            isOpen: false,
            name: 'someName'
        },
        {
            id: 5,
            parent: 3,
            isActive: false,
            isOpen: false,
            name: 'someName'
        }
    ],
    notes: [
        {
            id: 1,
            parent: 1,
            name: 'firstNote',
            text: 'This is a very nice text'
        },
        {
            id: 2,
            parent: 1,
            name: 'firstNote',
            text: 'This is a very nice text'
        },
        {
            id: 1,
            parent: 0,
            name: 'firstNote',
            text: 'This is a very nice text'
        }
    ],
    editedNote: {
        id: null,
        name: '',
        textFieldValue: '',
        textFieldPlaceholder: ''
    },
    isNoteCreationMode: false,
    activeFolderId: null,
    folderName: ''
};

export default initialState;
