import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { GetFolderFn, CreateNewFolderFn, EditFolderFn } from './types';
import {
  getFolder,
  handleFolderNameChange,
  editFolder,
  createNewFolder
} from './actions/EditFolder.actions';

interface RouteParams {
    id: string;
}

interface OwnProps {
    routeParams: RouteParams;
}

interface MappedProps {
    folderName: string;
}

interface MappedActions {
    getFolder: GetFolderFn;
    createNewFolder: CreateNewFolderFn;
    editFolder: EditFolderFn;
    
}

type Props = OwnProps & MappedProps & MappedActions;

export class EditFolder extends React.Component<Props> {
    componentDidMount() {
        this.props.getFolder(this.props.routeParams.id);
    }

    handleFolderSave = (event) => {
        event.preventDefault();

        if (!this.props.routeParams.id) {
            this.props.createNewFolder(this.props.folderName);
        } else {
            const id: number = parseInt(this.props.routeParams.id, 10);
            const name: string = this.props.folderName;

            this.props.editFolder(id, name);
        }
    }

    handleNameChange = (event) => {
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
    handleFolderNameChange,
    editFolder,
    createNewFolder
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EditFolder);
