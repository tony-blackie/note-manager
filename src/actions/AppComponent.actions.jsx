import {
  ADD_NEW_NOTE,
  GET_ALL_NOTES
} from './actionTypes.jsx';

export const addNote = () => ({
    type: ADD_NEW_NOTE
});

export const getAllNotes = () => {
    return $.get('/notes').then(response => {
        return {
          type: 'GET_ALL_NOTES',
          payload: response
        };
    });
};
