import React, { Component } from 'react';
import Note from '../Note.jsx';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';

describe('Note component', () => {
    describe('#goToNoteEdit', () => {
        let mockProps,
            component;

        beforeEach(() => {
            mockProps = {
                goToNoteEdit: jest.fn(),
                removeNote: jest.fn(),
                name: 'someName',
                id: 5,
                text: 'someText'
            };

            component = mount(<Note {...mockProps} />);
        });

        it('should find component with goToNoteEdit event handler', () => {
            let wrapper = component.find('.note__icon-wrapper');

            expect(wrapper.length).toEqual(1);
        });

        it('should call #goToNoteEdit', () => {
            let wrapper = component.find('.note__icon-wrapper');
            wrapper.simulate('click');

            expect(mockProps.goToNoteEdit).toHaveBeenCalled();
        });
    });

    describe('#removeNote', () => {
        let mockProps,
            component;

        beforeEach(() => {
            mockProps = {
                goToNoteEdit: jest.fn(),
                removeNote: jest.fn(),
                name: 'someName',
                id: 5,
                text: 'someText'
            };

            component = mount(<Note {...mockProps} />);
        });

        it('should find component with removeNote event handler', () => {
            let wrapper = component.find('.note__remove');

            expect(wrapper.length).toEqual(1);
        });

        it('should call #removeNote', () => {
            let wrapper = component.find('.note__remove');
            wrapper.simulate('click');

            expect(mockProps.removeNote).toHaveBeenCalled();
        });
    });

    //Keep this describe at the end for now. Everything after it fails, because of the mocked bind.
    describe('#bind', () => {
        let component;

        it('should call #bind twice', () => {
            Function.prototype.bind = jest.fn();

            component = shallow(<Note />);

            expect(Function.prototype.bind).toHaveBeenCalledTimes(2);
        });
    });
});
