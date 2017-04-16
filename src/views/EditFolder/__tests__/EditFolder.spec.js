jest.mock('../actions/EditFolder.actions.jsx');
import React, { Component } from 'react';
import { shallow, mount } from 'enzyme';
import { EditFolder, mapStateToProps, mapDispatchToProps } from '../EditFolder.jsx';
import {
  getFolder,
  saveEditedFolder,
  handleFolderNameChange,
  editFolder,
  createNewFolder
} from '../actions/EditFolder.actions.jsx';
import * as redux from 'redux';

describe('EditFolder tests', () => {
    describe('#handleNameChange', () => {
        it('should call #handleFolderNameChange when input is changed', () => {
            let mockProps = {
                handleFolderNameChange: jest.fn(),
                routeParams: { id: 3 },
                folderName: 'someName',
                getFolder: jest.fn()
            };

            let component = mount(<EditFolder {...mockProps} />);

            component.find('.edit-note__name').simulate('change');

            expect(mockProps.handleFolderNameChange).toHaveBeenCalledWith('someName');
        });
    });

    describe('#handleFolderSave', () => {
        it('should call #createNewFolder if id is null', () => {
            let mockProps = {
                handleFolderNameChange: jest.fn(),
                routeParams: { id: null },
                folderName: 'someName',
                getFolder: jest.fn(),
                createNewFolder: jest.fn(),
                requestFolderEdit: jest.fn()
            };

            let component = mount(<EditFolder {...mockProps} />);

            component.find('.edit-note__save-button').simulate('click');

            expect(mockProps.createNewFolder).toHaveBeenCalledWith({ name: 'someName' });
        });

        it('should call #requestFolderEdit if id is present', () => {
            let mockProps = {
                handleFolderNameChange: jest.fn(),
                routeParams: { id: '3' },
                folderName: 'someName',
                getFolder: jest.fn(),
                createNewFolder: jest.fn(),
                requestFolderEdit: jest.fn()
            };

            let component = mount(<EditFolder {...mockProps} />);

            component.find('.edit-note__save-button').simulate('click');

            expect(mockProps.requestFolderEdit).toHaveBeenCalledWith({ id: 3, name: 'someName' });
        });
    });

    describe('#mapStateToProps', () => {
        it('should populate props from state', () => {
            const state = { folderName: 'someName' };
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
              getFolder,
              saveEditedFolder,
              handleFolderNameChange,
              editFolder,
              createNewFolder
            };

            const mappedDispatch = mapDispatchToProps(dispatch);

            expect(redux.bindActionCreators).toHaveBeenCalledWith(actionCreators, dispatch);
        });
    });
});
