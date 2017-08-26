const filterNotes = (state) => {
    let notes = state.notes;
    let query = state.notesQuery;

    const filteredNotes = notes.filter(note => note.name.includes(query))
    
    return filteredNotes;
}

export default filterNotes;
