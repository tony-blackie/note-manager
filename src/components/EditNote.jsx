import React, { Component } from 'react';
import {
    connect
} from 'react-redux';
import { Link } from 'react-router';

export class EditNote extends Component {
    constructor(props) {
        super(props);

        this.state = {
          id: null,
          name: '',
          textFieldValue: '',
          textFieldPlaceholder: ''
        }
    }

    componentDidMount() {
        $.get(`/notes/${this.props.routeParams.noteId}`).then((response) => {
            this.setState({name: response.name});
            this.setState({textFieldValue: response.text});
            this.setState({id: response.id})
        });
    }

    render() {
        return (
            <div>
                <nav className="edit-note__nav">
                    <button>
                        <Link to="/"> Go Back</Link>
                    </button>
                </nav>
                <form>
                    <fieldset>
                        <div>
                            <label>Note #{this.state.id}</label>
                        </div>
                        <div>
                            <label>Name:</label>
                        </div>
                        <input
                            className="edit-note__name"
                            type="text"
                            value={this.state.name}
                        />
                    </fieldset>
                    <fieldset>
                        <textarea
                            className="edit-note__text"
                            type="text"
                            value={this.state.textFieldValue}
                            placeholder={this.state.textFieldPlaceholder}>
                        </textarea>
                    </fieldset>
                </form>
            </div>
        );

    }
}

const mapStateToProps = state => ({
    params: state.note
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(EditNote);
