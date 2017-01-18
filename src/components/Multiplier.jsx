import React, { Component } from 'react';

export default class Multiplier extends Component {
    constructor(props) {
        super(props);

        this.isMultiply = this.props.type === 'multiply';

        this.onValueChange = this.onValueChange.bind(this);
        this.onOperandChange = this.onOperandChange.bind(this);
    }

    onValueChange(event) {
        //if (this.isMultiply) {
        //    this.props.onChange({})
        //}
    }

    onOperandChange(event) {
        if (this.isMultiply) {
            this.props.onChange({multiply: event.target.value});
        } else {
            this.props.onChange({divisor: event.target.value});
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