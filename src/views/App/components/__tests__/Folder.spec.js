import React, { Component } from 'react';
import { shallow, mount } from 'enzyme';
import Folder from '../Folder';

describe('Folder Component tests', () => {
    describe('#openFolder', () => {
        it('should call setState when #openFolder is called', () => {
            let component = shallow(<Folder />);
            component.instance().setState = jest.fn();

            component.instance().state = {
                isOpen: false
            };

            component.instance().openFolder();

            expect(component.instance().setState).toHaveBeenCalledWith({ isOpen: true });
        });
    });

    describe('#handleFolderClick', () => {
        it('should call #handleFolderClick onClick', () => {
            let mockProps = {
                isActive: true,
                makeFolderInactive: jest.fn(),
                makeFolderActive: jest.fn()
            };
            let component = shallow(<Folder {...mockProps} />);
            component.instance().openFolder = jest.fn();
            component.find('.folder_active').simulate('click');

            expect(component.instance().openFolder).toHaveBeenCalled();
        });

        it('should call #makeFolderActive if isActive prop is true', () => {
            let mockProps = {
                isActive: true,
                makeFolderInactive: jest.fn(),
                makeFolderActive: jest.fn(),
                id: 3
            };
            let component = shallow(<Folder {...mockProps} />);
            component.find('.folder_active').simulate('click');

            expect(mockProps.makeFolderInactive).toHaveBeenCalledWith(3);
        });

        it('should call #makeFolderActive if isActive prop is true', () => {
            let mockProps = {
                isActive: false,
                makeFolderInactive: jest.fn(),
                makeFolderActive: jest.fn(),
                id: 2
            };
            let component = shallow(<Folder {...mockProps} />);
            component.find('.folder').simulate('click');

            expect(mockProps.makeFolderActive).toHaveBeenCalledWith(2);
        });
    });

    //Keep this test at the bottom for now, because 'bind' stays mocked throughout all tests
    describe('#constructor', () => {
        it('should initialize state of Folder component', () => {
            let component = shallow(<Folder />);

            expect(component.instance().state).toEqual({isOpen: false});
        });

        it('should call bind function', () => {
            Function.prototype.bind = jest.fn();

            let component = shallow(<Folder />);

            expect(Function.prototype.bind).toHaveBeenCalledTimes(2);
        });
    });
});
