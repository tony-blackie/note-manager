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
            name: '',
            valueToMultiply: 0,
            multiplier: 0,
            valueToDivide: 0,
            divisor: 0
        };

        this.listItems = this.state.objects.map((object) => {
            return (
                <li key={object.id.toString()}>{object.name}</li>
            );
        });

        this.handleChange = this.handleChange.bind(this);
        this.multiplyNumber = this.multiplyNumber.bind(this);
        this.divideNumber = this.divideNumber.bind(this);
    }

    handleChange(number, config) {
        if (config.isMultiply && config.isOperand) {
            this.setState({multiply: number});
            return;
        }

        if (config.isMultiply && !config.isOperand) {
            this.setState({valueToMultiply: number});
        }

        if (!config.isMultiply && config.isOperand) {
            this.setState({divisor: number});
        }

        if (!config.isMultiply && !config.isOperand) {
            this.setState({valueToDivide: number});
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
                <br/>
                <Multiplier
                    onChange={this.multiplyNumber}
                    type="multiply"
                    params={{value: this.valueToMultiply, operand: this.multiplier}}
                />
                <Multiplier
                    onChange={this.divideNumber}
                    type="divide"
                    params={{value: this.valueToDivide, operand: this.divisor}}
                />
            </div>
        );
    }
}