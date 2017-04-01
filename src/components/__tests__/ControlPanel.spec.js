import React, { Component } from 'react';
import { shallow, mount } from 'enzyme';
import ControlPanel from '../ControlPanel.jsx';

describe('ControlPanel tests', () => {
    describe('#goToEditFolder', () => {
        it('should call #goToEditFolder', () => {
            let mockProps = {
                activeFolderId: 5,
                goToEditFolder: jest.fn()
            };
            let component = shallow(<ControlPanel {...mockProps} />);
            component.find('.control_edit-folder').simulate('click');

            expect(mockProps.goToEditFolder).toHaveBeenCalledWith(5);
        });

        it('should not call #goToEditFolder', () => {
            let mockProps = {
                activeFolderId: null,
                goToEditFolder: jest.fn()
            };
            let component = shallow(<ControlPanel {...mockProps} />);
            component.find('.control_edit-folder').simulate('click');

            expect(mockProps.goToEditFolder).not.toHaveBeenCalled();
        });
    });

    describe('#removeFolder', () => {
        it('should call #removeFolder', () => {
            let mockProps = {
                activeFolderId: 3,
                removeFolder: jest.fn()
            };
            let component = shallow(<ControlPanel {...mockProps} />);
            component.find('.control_remove-folder').simulate('click');

            expect(mockProps.removeFolder).toHaveBeenCalledWith(3);
        });
    });

    describe('#goToFolderCreation', () => {
        it('should call #goToFolderCreation', () => {
            let mockProps = {
                activeFolderId: 3,
                goToFolderCreation: jest.fn()
            };
            let component = shallow(<ControlPanel {...mockProps} />);
            component.find('.control_create-folder').simulate('click');

            expect(mockProps.goToFolderCreation).toHaveBeenCalled();
        });
    });

    describe('#goToNoteCreation', () => {
        it('should call #goToNoteCreation', () => {
            let mockProps = {
                activeFolderId: 3,
                goToNoteCreation: jest.fn()
            };
            let component = shallow(<ControlPanel {...mockProps} />);
            component.find('.control_create-note').simulate('click');

            expect(mockProps.goToNoteCreation).toHaveBeenCalled();
        });
    });

    describe('#constructor', () => {
        it('should #bind methods', () => {
            Function.prototype.bind = jest.fn();

            let component = shallow(<ControlPanel />);

            expect(Function.prototype.bind).toHaveBeenCalledTimes(2);
        });
    });
});
