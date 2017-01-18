import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import { Link } from 'react-router';
import ControlPanel from './ControlPanel.jsx';
import FolderTree from './FolderTree.jsx';
import NotePanel from './NotePanel.jsx';


export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            objects: [
                {
                    id: 0,
                    name: 'str'
                },
                {
                    id: 1,
                    name: 'str1'
                },
                {
                    id: 2,
                    name: 'str2'
                },
                {
                    id: 3,
                    name: 'str3'
                },
                {
                    id: 4,
                    name: 'str4'
                }
            ],
            name: ''
        };

        this.listItems = this.state.objects.map((object) => {
            return (
                <li key={object.id.toString()}>{object.name}</li>
            );
        });

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({name: event.target.value})
    }

    render() {
        return (
            <div>
                <Link to="/note">Note</Link>
                <ControlPanel />
                <FolderTree />
                <NotePanel />
                <ul>{this.listItems}</ul>
                <br/>
                <label>Name:</label>
                <input type="text" value={this.state.name} onChange={this.handleChange} />
                {
                    this.state.name
                    ? <div>Hey, {this.state.name}!</div>
                    : ''
                }

            </div>
        );
    }
}