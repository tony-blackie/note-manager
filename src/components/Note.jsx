import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Note extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Link className="note" to={`notes/${this.props.id}`}>
                <i className="fa fa-file-text-o fa-3x"></i>
                <div className="note-text">
                    <span>{this.props.name}</span>
                </div>
            </Link>
        );
    }
}
