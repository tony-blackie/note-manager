import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';

export default class Note extends Component {
    render() {
        return (
            <div>
                <h2>{this.props.note.header}</h2>

                <div>
                    <p>{this.props.note.text}</p>
                </div>
            </div>
        );
    }
}
