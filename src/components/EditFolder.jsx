import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import {
  getFolder,
  saveEditedFolder,
  handleFolderNameChange,
  requestFolderEdit
} from '../actions/EditFolder.actions.jsx';

export class EditFolder extends Component {
    constructor(props) {
        super(props);

        this.saveEditedFolder = this.saveEditedFolder.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
    }
    componentDidMount() {
        this.props.getFolder(this.props.routeParams.id);
    }

    saveEditedFolder() {
        if (!this.props.routeParams.noteId) {
            // this.props.requestFolderCreation({
            //     name: this.state.name,
            //     text: this.state.textFieldValue,
            //     activeFolderId: this.props.activeFolderId
            // });
        } else {
            this.props.requestFolderEdit({
                id: this.props.routeParams.id,
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
                    <button onClick={this.saveEditedFolder}>
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
    handleFolderNameChange
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EditFolder);
