jest.mock('../actions/EditNote.actions.jsx');
import React, { Component } from 'react';
import { shallow, mount } from 'enzyme';
import { EditNote, mapStateToProps, mapDispatchToProps } from '../EditNote.jsx';
import {
  editNoteRequest,
  createNoteRequest,
  changeTextFieldValue,
  changeNoteName,
  fetchNote,
  clearNoteData
} from '../actions/EditNote.actions.jsx';
import * as redux from 'redux';


describe('EditNote tests', () => {
    describe('#mapStateToProps', () => {
        it('should populate props from state', () => {
            const state = {
                params: {},
                isNoteCreationMode: true,
                activeFolderId: 0,
                editedNote: {
                    id: null,
                    name: '',
                    textFieldValue: ''
                }
            };
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
              fetchNote,
              clearNoteData
            };

            const mappedDispatch = mapDispatchToProps(dispatch);

            expect(redux.bindActionCreators).toHaveBeenCalledWith(actionCreators, dispatch);
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
              fetchNote,
              clearNoteData
            };

            const mappedDispatch = mapDispatchToProps(dispatch);

            expect(redux.bindActionCreators).toHaveBeenCalledWith(actionCreators, dispatch);
        });
    });

    describe('#render', () => {
        it('should call #handleNameChange when button is clicked', () => {
            // let mockProps = {changeNoteName: jest.fn()};
            let component = shallow(<EditNote />);
            component.instance().handleNameChange = jest.fn();

            component.find('.edit-note__name').simulate('change', { target: { value: 'abc' } });

            // expect(mockProps.changeNoteName).toHaveBeenCalled();
            expect(component.instance().handleNameChange).toHaveBeenCalledWith({ target: { value: 'abc' }});
        });

        it('should call #handleTextFieldChange when the button is clicked', () => {
            let component = shallow(<EditNote />);
            component.instance().handleTextFieldChange = jest.fn();

            component.find('.edit-note__text').simulate('change', { target: { value: 'abc' } });

            expect(component.instance().handleTextFieldChange).toHaveBeenCalledWith({ target: { value: 'abc' }});
        });
    });
});
