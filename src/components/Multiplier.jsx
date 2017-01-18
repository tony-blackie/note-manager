import React, { Component } from 'react';

export default class Multiplier extends Component {
    constructor(props) {
        super(props);

        this.isMultiply = this.props.type === 'multiply';

        this.onValueChange = this.onValueChange.bind(this);
        this.onOperandChange = this.onOperandChange.bind(this);
    }

    onValueChange(event) {
        if (this.isMultiply) {
            this.props.onChange(event.target.value, {isMultiply: true, isOperand: false})
        } else {
            this.props.onChange(event.target.value, {isMultiply: false, isOperand: false})
        }
    }

    onOperandChange(event) {
        if (this.isMultiply) {
            this.props.onChange(event.target.value, {isMultiply: true, isOperand: true});
        } else {
            this.props.onChange(event.target.value, {isMultiply: false, isOperand: true});
        }

    }


    render() {
        return (
            <div>
                <label>Value</label>
                <input type="text" value={this.props.value} onChange={this.onValueChange} />
                <label>Operand</label>
                <input type="text" value={this.props.operand} onChange={this.onOperandChange} />
            </div>
        );
    }
};