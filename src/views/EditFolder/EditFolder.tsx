import { } from '../App/components/Folder';
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { createStructuredSelector } from 'reselect';
import axios from 'axios';

import { GetFolderFn, CreateNewFolderFn, EditFolderFn, HandleFolderNameChangeFn, HandleFailedFolderCreationFn } from './types';
import { FolderType } from '../../generic/types';
import {
  getFolder,
  handleFolderNameChange,
  editFolder,
  createNewFolder,
  handleFailedFolderCreation
} from './actions/EditFolder.actions';
import { selectFolderName, selectFolderId, selectFolderFail } from './selectors';

interface RouteParams {
    id: string;
}

interface OwnProps {
    routeParams: RouteParams;
}

interface MappedProps {
    folderName: string;
    folderFail: string;
}

interface MappedActions {
    getFolder: GetFolderFn;
    createNewFolder: CreateNewFolderFn;
    editFolder: EditFolderFn;
    handleFolderNameChange: HandleFolderNameChangeFn;
    handleFailedFolderCreation: HandleFailedFolderCreationFn;
}

type Props = OwnProps & MappedProps & MappedActions;

export class EditFolder extends React.Component<Props> {
    componentDidMount() {
        /* TODO: Refactor to use a util function for localStorage set/get */
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');

        const { id } = this.props.routeParams;

        this.props.handleFailedFolderCreation('');
        this.props.handleFolderNameChange('');

        if (this.props.routeParams.id) {
            const numericId = parseInt(id, 10);

            this.props.getFolder(numericId);
        }
    }

    handleFolderSave = (event) => {
        event.preventDefault();

        const { folderName, routeParams } = this.props;

        if (!routeParams.id) {
            this.props.createNewFolder(folderName);
        } else {
            const id: number = parseInt(routeParams.id, 10);
            const name: string = folderName;

            this.props.editFolder(id, name);
        }
    }

    handleNameChange = (event) => {
        this.props.handleFolderNameChange(event.target.value);
    }

    render() {
        const { folderName, routeParams, folderFail} = this.props;
        if (routeParams.id) {
            const folderId = routeParams.id;
        }

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
                    <div>{this.props.folderFail}</div>
                    <fieldset>
                        <div>
                            <label>Name:</label>
                        </div>
                        <input
                            onChange={this.handleNameChange}
                            className="edit-note__name"
                            type="text"
                            value={folderName}
                        />
                    </fieldset>
                </form>
            </div>
        );
    }
}

export const mapStateToProps = state => createStructuredSelector({
    folderName: selectFolderName,
    folderId: selectFolderId,
    folderFail: selectFolderFail
});

export const mapDispatchToProps = dispatch => bindActionCreators({
    getFolder,
    handleFolderNameChange,
    editFolder,
    createNewFolder,
    handleFailedFolderCreation
}, dispatch);

export default connect<MappedProps, MappedActions, OwnProps>(mapStateToProps, mapDispatchToProps)(EditFolder);
