import React, { Component } from 'react';
import { shallow, mount } from 'enzyme';
import FolderTree from '../FolderTree.jsx';

describe('FolderTree tests', () => {
    describe('#renderFolder', () => {
        let mockProps,
            component,
            allFolders;

        beforeEach(() => {
            mockProps = {
                folders: [
                    {
                        id: 0,
                        parent: null
                    },
                    {
                        id: 1,
                        parent: null
                    },
                    {
                        id: 2,
                        parent: 1
                    },
                    {
                        id: 3,
                        parent: 1
                    }
                ]
            };

            component = mount(<FolderTree {...mockProps} />);
            allFolders = component.find('.folder-container');
        });

        it('should call #renderFolder', () => {
            expect(allFolders.length).toEqual(4);
        });
    });

    describe('#renderFolder', () => {
        let mockProps,
            component,
            allFolders;

        beforeEach(() => {
            mockProps = {
                folders: [
                    {
                        id: 0,
                        parent: 1
                    },
                    {
                        id: 1,
                        parent: 1
                    },
                    {
                        id: 2,
                        parent: 1
                    },
                    {
                        id: 3,
                        parent: 1
                    }
                ]
            };

            component = mount(<FolderTree {...mockProps} />);
            allFolders = component.find('.folder-container');
        });

        it('should call #renderFolder', () => {
            expect(allFolders.length).toEqual(0);
        });
    });

    describe('#renderFolder', () => {
        it('should return Folder component', () => {
            let mockProps = {
                folders: {
                    map: jest.fn()
                }
            };
            let component = shallow(<FolderTree {...mockProps} />);
            let folder = component.instance().renderFolder({parent: 1, isOpen: false}, 2);

            expect(mockProps.folders.map).toHaveBeenCalled();
        });
    });

    describe('#renderFolder', () => {
        it('should return Folder component', () => {
            let mockProps = {
                folders: {
                    map: jest.fn()
                }
            };
            let component = shallow(<FolderTree {...mockProps} />);
            let folder = component.instance().renderFolder({isOpen: true}, 2);

            expect(mockProps.folders.map).toHaveBeenCalled();
        });
    });
});
