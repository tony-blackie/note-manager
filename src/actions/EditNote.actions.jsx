import { hashHistory } from 'react-router';

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
