import React, { Component } from 'react';
import { shallow, mount } from 'enzyme';
import Folder from '../Folder.jsx';

describe('Folder Component tests', () => {
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
