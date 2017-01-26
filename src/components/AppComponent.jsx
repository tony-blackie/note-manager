import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import { Link } from 'react-router';
import ControlPanel from './ControlPanel.jsx';
import FolderTree from './FolderTree.jsx';
import NotePanel from './NotePanel.jsx';
import Multiplier from './Multiplier.jsx';


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
            name: '',
            valueToMultiply: 5,
            multiplier: 1,
            valueToDivide: 5,
            divisor: 1
        };

        this.listItems = this.state.objects.map((object) => {
            return (
                <li key={object.id.toString()}>{object.name}</li>
            );
        });

        this.handleChange = this.handleChange.bind(this);
        this.multiplyNumber = this.multiplyNumber.bind(this);
        this.divideNumber = this.divideNumber.bind(this);
        this.changeValues = this.changeValues.bind(this);
    }

    handleChange(event) {
        this.setState({name: event.target.value})
    }

    changeValues(number, config) {
        if (config.isMultiply && config.isOperand) {
            this.setState({multiplier: number, divisor: number, valueToDivide: number * this.state.valueToMultiply});
            return;
        }

        if (config.isMultiply && !config.isOperand) {
            this.setState({valueToMultiply: number, valueToDivide: number * this.state.multiplier});
            return;
        }

        if (!config.isMultiply && config.isOperand) {
            this.setState(
                {divisor: number, multiplier: number, valueToMultiply: this.state.valueToDivide / number}
            );
            return;
        }

        if (!config.isMultiply && !config.isOperand) {
            this.setState({valueToDivide: number, valueToMultiply: number / this.state.divisor});
            return;
        }
    }

    multiplyNumber(number, multiplier) {
        this.setState({valueToMultiply: number, multiplier: multiplier});
    }

    divideNumber(number, divisor) {
        this.setState({valueToDivide: number, divisor: divisor})
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