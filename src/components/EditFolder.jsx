import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { getFolder } from '../actions/EditFolder.actions.jsx';

export class EditFolder extends Component {
    componentDidMount() {
        this.props.getFolder(this.props.routeParams.id);
    }

    render() {
        return (
            <div>
                <nav className="edit-note__nav">
                    <button>
                        <Link to="/"> Go Back</Link>
                    </button>
                    <button onClick={this.handleSaveClick}>
                        Save changes
                    </button>
                </nav>
                <form>
                    <fieldset>
                        <div>
                            <label>Name:</label>
                        </div>
                        <input
                            onChange={this.handleNameChange}
                            className="edit-note__name"
                            type="text"
                            value={this.props.name}
                        />
                    </fieldset>
                </form>
            </div>
        );
    }
}

export const mapStateToProps = state => ({});

export const mapDispatchToProps = dispatch => bindActionCreators({
    getFolder
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EditFolder);
