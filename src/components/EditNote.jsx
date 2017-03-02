import React, { Component } from 'react';
import {
    connect,
    mapStateToProps,
    mapDispatchToProps
} from 'react-redux';

export class EditNote extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const name = this.props.params.name ? this.props.params.name : 'New Note';
        const textFieldValue = this.props.params.text ? this.props.params.text: '';
        const textFieldPlaceholder = this.props.params.text ? '' : 'Enter text here:';

        <div>
            <nav>
                <button>Save</button>
                <button>Cancel</button>
            </nav>
            <form>
                <fieldset>
                    <label>Name</label>
                    <input type="text" value={name} />
                </fieldset>
                <fieldset>
                    <input
                        type="text"
                        value={textFieldValue}
                        placeholder={textFieldPlaceholder}
                    />
                </fieldset>
            </form>
        </div>
    }
}

const mapStateToProps = state => ({
    params: state.note
});

export default connect(mapStateToProps, mapDispatchToProps)(EditNote);
