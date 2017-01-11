import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import { Link } from 'react-router';

export default class App extends Component {
    render() {
        return (
            <div>
                <div>App Component</div>
                <Link to="/note">Note</Link>
                {this.props.children}
            </div>
        );
    }
}