const initialState = {
    folders: [
        {
            id: 0,
            children: [],
            isActive: false,
            isOpen: false
        },
        {
            id: 1,
            children: [],
            isActive: false,
            isOpen: false
        },
        {
            id: 2,
            children: [],
            isActive: false,
            isOpen: false
        }
    ],
    notes: [
        {
            id: 1,
            name: 'firstNote',
            text: 'This is a very nice text'
        }
    ],
    isNoteCreationMode: false
};

export default initialState;
