jest.mock('../actions/EditNote.actions.jsx');
import React, { Component } from 'react';
import { shallow, mount } from 'enzyme';
import { EditNote, mapStateToProps, mapDispatchToProps } from '../EditNote.jsx';
import {
  editNoteRequest,
  createNoteRequest,
  changeTextFieldValue,
  changeNoteName,
  fetchNote
} from '../actions/EditNote.actions.jsx';
import * as redux from 'redux';


describe('EditNote tests', () => {
    describe('#mapStateToProps', () => {
        it('should populate props from state', () => {
            const state = { params: {}, isNoteCreationMode: true, activeFolderId: 0 };
            const props = {};

            const mappedProps = mapStateToProps(state, props);

            expect(mappedProps.folderName).toBe(state.folderName);
        });
    });

    describe('#mapDispatchToProps', () => {
        it('should map action creators to props', () => {
            redux.bindActionCreators = jest.fn();
            const dispatch = jest.fn();
            const actionCreators = {
              editNoteRequest,
              createNoteRequest,
              changeTextFieldValue,
              changeNoteName,
              fetchNote
            };

            const mappedDispatch = mapDispatchToProps(dispatch);

            expect(redux.bindActionCreators).toHaveBeenCalledWith(actionCreators, dispatch);
        });
    });
});
