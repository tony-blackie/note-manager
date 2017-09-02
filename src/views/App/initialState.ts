const initialState = {
    folders: [
        {
            id: 1,
            parent: 0,
            isActive: true,
            isOpen: false,
            name: 'someName'
        },
        {
            id: 2,
            parent: 0,
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
            parent: 1,
            isActive: false,
            isOpen: false,
            name: 'someName'
        },
        {
            id: 5,
            parent: 2,
            isActive: false,
            isOpen: false,
            name: 'someName'
        },
        {
            id: 6,
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
    activeFolderId: null,
    notesQuery: ''
};

export default initialState;