const filterNotes = (state) => {
    const notes = state.app.notes;
    const query = state.app.notesQuery;

    const filteredNotes = notes.filter(note => note.name.includes(query))
    
    return filteredNotes;
}

export default filterNotes;
