import { hashHistory } from 'react-router';
import { EDIT_NOTE } from './actionTypes.jsx';

export function updateNote(note) {
    $.ajax({
      url: `/notes/${note.id}`,
      data: JSON.stringify(note),
      contentType: 'application/json',
      type: 'PUT'
    }).then(response => {
        hashHistory.push('/');
    });
}

export function addNote(note) {
    $.ajax({
      url: `/notes/new`,
      data: JSON.stringify(note),
      contentType: 'application/json',
      type: 'POST'
    }).then(response => {
        hashHistory.push('/');
    });
}

export function editNote() {
    return {
        type: EDIT_NOTE
    }
}
