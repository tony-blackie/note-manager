const initialState = {
    folders: [
        {
            id: 0,
            parent: null,
            isActive: true,
            isOpen: false
        },
        {
            id: 1,
            parent: null,
            isActive: false,
            isOpen: false
        },
        {
            id: 2,
            parent: 1,
            isActive: false,
            isOpen: false
        },
        {
            id: 3,
            parent: 1,
            isActive: false,
            isOpen: false
        },
        {
            id: 4,
            parent: 2,
            isActive: false,
            isOpen: false
        },
        {
            id: 5,
            parent: 3,
            isActive: false,
            isOpen: false
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
    isNoteCreationMode: false,
    activeFolderId: null
};

export default initialState;
