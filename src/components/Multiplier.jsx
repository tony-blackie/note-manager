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
            this.props.onChange(Number(event.target.value), {isMultiply: true, isOperand: false})
        } else {
            this.props.onChange(Number(event.target.value), {isMultiply: false, isOperand: false})
        }
    }

    onOperandChange(event) {
        if (this.isMultiply) {
            this.props.onChange(Number(event.target.value), {isMultiply: true, isOperand: true});
        } else {
            this.props.onChange(Number(event.target.value), {isMultiply: false, isOperand: true});
        }

    }


    render() {
        return (
            <div>
                <br/>
                {this.isMultiply ? <label>Operand to multiply:</label> : <label>Operand to divide:</label>}
                <input type="text" value={this.props.params.value} onChange={this.onValueChange} />
                {this.isMultiply ? <label>Multiplier</label> : <label>Divisor</label>}
                <input type="text" value={this.props.params.operand} onChange={this.onOperandChange} />
                <br/>
            </div>
        );
    }
};