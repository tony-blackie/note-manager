import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import {
  getFolder,
  saveEditedFolder,
  handleFolderNameChange,
  editFolder,
  createNewFolder
} from './actions/EditFolder.actions';

export class EditFolder extends React.Component {
    constructor(props) {
        super(props);

        this.handleFolderSave = this.handleFolderSave.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
    }
    componentDidMount() {
        this.props.getFolder(this.props.routeParams.id);
    }

    handleFolderSave(event) {
        event.preventDefault();
        if (!this.props.routeParams.id) {
            this.props.createNewFolder({ name: this.props.folderName });
        } else {
            this.props.editFolder({
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
                    <button
                      className="edit-note__save-button"
                      onClick={this.handleFolderSave}>
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
    folderName: state.editFolder.folderName
});

export const mapDispatchToProps = dispatch => bindActionCreators({
    getFolder,
    saveEditedFolder,
    handleFolderNameChange,
    editFolder,
    createNewFolder
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EditFolder);
