import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { createStructuredSelector } from 'reselect';
import axios from 'axios';
import { Paper, AppBar, TextField, RaisedButton, Subheader } from 'material-ui';

import {
    GetFolderFn,
    CreateNewFolderFn,
    EditFolderFn,
    HandleFolderNameChangeFn,
    HandleFailedFolderCreationFn,
    HandleClearFailedFolderCreationFn,
} from './types';
import { FolderType } from '../../generic/types';
import {
  getFolder,
  handleFolderNameChange,
  editFolder,
  createNewFolder,
  handleFailedFolderCreation,
} from './actions/EditFolder.actions';
import { selectFolder, selectErrorMessage } from './selectors';
import { selectActiveFolderId } from '../App/selectors';
import utils from '../../utils';


const { setDefaultAuthHeader } = utils;

interface RouteParams {
    id: string;
}

interface OwnProps {
    routeParams: RouteParams;
}

interface MappedProps {
    folder: FolderType;
    errorMessage: string;
    activeFolderId: number;
}

interface MappedActions {
    getFolder: GetFolderFn;
    createNewFolder: CreateNewFolderFn;
    editFolder: EditFolderFn;
    handleFolderNameChange: HandleFolderNameChangeFn;
    handleFailedFolderCreation: HandleFailedFolderCreationFn;
    handleClearFailedFolderCreation: HandleClearFailedFolderCreationFn;
}

type Props = OwnProps & MappedProps & MappedActions;

export class EditFolder extends React.Component<Props> {
    componentDidMount() {
        setDefaultAuthHeader();

        const { id } = this.props.routeParams;

        if (this.props.routeParams.id) {
            const numericId = parseInt(id, 10);

            this.props.getFolder(numericId);
        }
    }

    handleFolderSave = (event) => {
        event.preventDefault();

        const { routeParams, folder, activeFolderId } = this.props;
        const { name } = folder;

        if (!routeParams.id) {
            this.props.createNewFolder(name, activeFolderId);
        } else {
            this.props.editFolder({
                ...folder,
                id: parseInt(routeParams.id, 10)
            });
        }
    }

    handleNameChange = (event) => {
        this.props.handleFolderNameChange(event.target.value);
    }

    render() {
        const { folder, routeParams, errorMessage } = this.props;
        const { name } = folder;

        if (routeParams.id) {
            const folderId = routeParams.id;
        }

        const wrapperStyles = {
            padding: 40,
            margin: '20px auto',
            maxWidth: 700,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
        };

        const leftButtonStyles = {
            margin: '15px 0 15px 0'
        };

        const rightButtonStyles = {
            margin: '15px 0 15px 15px'
        };

        const subheaderStyle = {
            paddingLeft: 0
        };

        return (
            <div>
                <AppBar
                    title="Notes"
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                    zDepth={2}
                >
                </AppBar>
                <div>
                    <Paper zDepth={2} style={wrapperStyles}>
                        <Subheader style={subheaderStyle}>Folder name:</Subheader>
                        <form className="edit-note__form">
                            <div>{errorMessage}</div>
                                <TextField
                                    name="folderName"
                                    onChange={this.handleNameChange}
                                    className="edit-note__name"
                                    type="text"
                                    value={name}
                                />
                        </form>
                    </Paper>
                    <nav className="edit-note__nav">
                            <Link to="/">
                                <RaisedButton
                                    label="Back"
                                    secondary={true}
                                    style={leftButtonStyles}
                                />
                            </Link>
                            <RaisedButton
                                label="Save"
                                primary={true}
                                style={rightButtonStyles}
                                className="edit-note__save-button"
                                onClick={this.handleFolderSave}
                            />
                        </nav>
                </div>
            </div>
        );
    }
}

export const mapStateToProps = state => createStructuredSelector({
    folder: selectFolder,
    activeFolderId: selectActiveFolderId,
    errorMessage: selectErrorMessage
});

export const mapDispatchToProps = dispatch => bindActionCreators({
    getFolder,
    handleFolderNameChange,
    editFolder,
    createNewFolder,
    handleFailedFolderCreation,
}, dispatch);

export default connect<MappedProps, MappedActions, OwnProps>(mapStateToProps, mapDispatchToProps)(EditFolder);
