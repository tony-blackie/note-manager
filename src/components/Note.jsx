import React, { Component } from 'react';

export default class Note extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        debugger;
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
