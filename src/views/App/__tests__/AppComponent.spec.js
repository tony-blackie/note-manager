jest.mock('../actions/AppComponent.actions.jsx');
import React, { Component } from 'react';
import { shallow, mount } from 'enzyme';
import { App, mapStateToProps, mapDispatchToProps } from '../AppComponent.jsx';
import {
  addNote,
  getAllNotes,
  goToNoteCreation,
  goToNoteEdit,
  removeNote,
  makeFolderActive,
  makeFolderInactive,
  getAllFolders,
  removeFolder,
  goToEditFolder,
  goToFolderCreation
} from '../actions/AppComponent.actions.jsx';
import * as redux from 'redux';

describe('App component tests', () => {
    describe('#mapStateToProps', () => {
        it('should populate props from state', () => {
            const state = { activeFolderId: 5, notes: [], folders: [] };
            const props = {};

            const mappedProps = mapStateToProps(state, props);

            expect(mappedProps).toEqual(state);
        });
    });

    describe('#mapDispatchToProps', () => {
        it('should map action creators to props', () => {
            redux.bindActionCreators = jest.fn();
            const dispatch = jest.fn();
            const actionCreators = {
              addNote,
              getAllNotes,
              goToNoteCreation,
              goToNoteEdit,
              removeNote,
              makeFolderActive,
              makeFolderInactive,
              getAllFolders,
              removeFolder,
              goToEditFolder,
              goToFolderCreation
            };

            const mappedDispatch = mapDispatchToProps(dispatch);

            expect(redux.bindActionCreators).toHaveBeenCalledWith(actionCreators, dispatch);
        });
    });

    describe('#componentDidMount', () => {
        it('should call #getAllNotes on component mount', () => {
            let mockProps = {
                getAllNotes: jest.fn(),
                addNote: jest.fn(),
                getAllNotes: jest.fn(),
                goToNoteCreation: jest.fn(),
                goToNoteEdit: jest.fn(),
                removeNote: jest.fn(),
                makeFolderActive: jest.fn(),
                makeFolderInactive: jest.fn(),
                getAllFolders: jest.fn(),
                removeFolder: jest.fn(),
                goToEditFolder: jest.fn(),
                goToFolderCreation: jest.fn(),
                folders: [{ id: 0 }],
                notes: [{ id: 0 }]
            };

            let component = mount(<App {...mockProps}/>);

            expect(mockProps.getAllNotes).toHaveBeenCalled();
        });
    });
});
