import { hashHistory } from 'react-router';

export function updateNoteRequest(note) {
    $.ajax({
      url: `/notes/${note.id}`,
      data: JSON.stringify(note),
      contentType: 'application/json',
      type: 'PUT'
    }).then(response => {
        hashHistory.push('/');
    });
}

export function addNoteRequest(note) {
    $.ajax({
      url: `/notes/new`,
      data: JSON.stringify(note),
      contentType: 'application/json',
      type: 'POST'
    }).then(response => {
        hashHistory.push('/');
    });
}
