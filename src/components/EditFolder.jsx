import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import {
  getFolder,
  saveEditedFolder,
  handleFolderNameChange,
  requestFolderEdit,
  createNewFolder
} from '../actions/EditFolder.actions.jsx';

export class EditFolder extends Component {
    constructor(props) {
        super(props);

        this.handleFolderSave = this.handleFolderSave.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
    }
    componentDidMount() {
        this.props.getFolder(this.props.routeParams.id);
    }

    handleFolderSave() {
        if (!this.props.routeParams.id) {
            this.props.createNewFolder({ name: this.props.folderName });
        } else {
            this.props.requestFolderEdit({
                id: parseInt(this.props.routeParams.id, 10),
                name: this.props.folderName
            });
        }
    }

    handleNameChange(event) {
        this.props.handleFolderNameChange(event.target.value);
    }

    render() {
        return (
            <div>
                <nav className="edit-note__nav">
                    <button>
                        <Link to="/"> Go Back</Link>
                    </button>
                    <button onClick={this.handleFolderSave}>
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
                            value={this.props.folderName}
                        />
                    </fieldset>
                </form>
            </div>
        );
    }
}

export const mapStateToProps = state => ({
    folderName: state.folderName
});

export const mapDispatchToProps = dispatch => bindActionCreators({
    getFolder,
    saveEditedFolder,
    handleFolderNameChange,
    requestFolderEdit,
    createNewFolder
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EditFolder);
