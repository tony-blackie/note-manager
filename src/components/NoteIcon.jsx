import React, { Component } from 'react';

export default class NoteIcon extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <img/>
                <div>{this.props.name}</div>
            </div>
        );
    }
}
