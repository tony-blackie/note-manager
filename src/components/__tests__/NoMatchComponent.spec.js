import React, { Component } from 'react';
import { shallow, mount } from 'enzyme';
import NoMatchComponent from '../NoMatchComponent.jsx';

describe('NoMatchComponent tests', () => {
    it('should render single div', () => {
        let component = shallow(<NoMatchComponent />);
        let child = component.find('div');
        expect(child.length).toBe(1);
    });
});
