jest.mock('../actions/EditNote.actions');
import React, { Component } from 'react';
import { shallow, mount } from 'enzyme';
import { EditNote, mapStateToProps, mapDispatchToProps } from '../EditNote';
import {
  editNoteRequest,
  createNoteRequest,
  changeTextFieldValue,
  changeNoteName,
  fetchNote,
  clearNoteData
} from '../actions/EditNote.actions';
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

        it('should call #handleSaveClick', () => {
            let mockProps = {
                routeParams: {
                    noteId: 2
                },
                editNoteRequest: jest.fn()
            };
            let component = shallow(<EditNote {...mockProps} />);

            component.instance().handleSaveClick = jest.fn();

            component.find('.edit-note__save').simulate('click');

            expect(component.instance().handleSaveClick).toHaveBeenCalled();
        });
    });

    describe('#componentDidMount', () => {
        it('should call #fetchNote if url has the note id in it', () => {
            let mockProps = {
                routeParams: {
                    noteId: 2
                },
                fetchNote: jest.fn()
            };
            let component = mount(<EditNote {...mockProps} />);

            expect(mockProps.fetchNote).toHaveBeenCalledWith(2);
        });

        it('should call #fetchNote if url has the note id in it', () => {
            let mockProps = {
                routeParams: {},
                clearNoteData: jest.fn()
            };
            let component = mount(<EditNote {...mockProps} />);

            expect(mockProps.clearNoteData).toHaveBeenCalled();
        });
    });

    describe('#handleTextFieldChange', () => {
        it('should call #changeTextFieldValue', () => {
            let mockProps = {
                changeTextFieldValue: jest.fn()
            };
            let component = shallow(<EditNote {...mockProps} />);

            component.instance().handleTextFieldChange({target: {value: 'someVal'}});

            expect(mockProps.changeTextFieldValue).toHaveBeenCalledWith('someVal');
        });
    });

    describe('#handleTextFieldChange', () => {
        it('should call #changeTextFieldValue', () => {
            let mockProps = {
                changeNoteName: jest.fn()
            };
            let component = shallow(<EditNote {...mockProps} />);

            component.instance().handleNameChange({target: {value: 'someVal'}});

            expect(mockProps.changeNoteName).toHaveBeenCalledWith('someVal');
        });
    });

    describe('#handleSaveClick', () => {
        it('should call #createNoteRequest', () => {
            let mockProps = {
                createNoteRequest: jest.fn(),
                routeParams: {},
                name: 'Note 1',
                textFieldValue: 'Text of note 1',
                activeFolderId: 3
            };

            let component = shallow(<EditNote {...mockProps} />);

            component.instance().handleSaveClick();

            expect(mockProps.createNoteRequest).toHaveBeenCalledWith(
                {
                    name: 'Note 1',
                    text: 'Text of note 1',
                    activeFolderId: 3
                }
            );
        });

        it('should call #editNoteRequest', () => {
            let mockProps = {
                editNoteRequest: jest.fn(),
                routeParams: {
                    noteId: 3
                },
                name: 'Note 1',
                textFieldValue: 'Text of note 1',
                activeFolderId: 3
            };

            let component = shallow(<EditNote {...mockProps} />);

            component.instance().handleSaveClick();

            expect(mockProps.editNoteRequest).toHaveBeenCalledWith(
                {
                    id: 3,
                    name: 'Note 1',
                    text: 'Text of note 1'
                }
            );
        });
    });
});
