import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router";
import { createStructuredSelector } from "reselect";
import axios from "axios";
import { Paper, AppBar, TextField, RaisedButton, Subheader } from "material-ui";

import {
  GetHashtagFn,
  CreateNewHashtagFn,
  EditHashtagFn,
  HandleHashtagNameChangeFn,
  HandleFailedHashtagCreationFn,
  HandleClearFailedHashtagCreationFn
} from "./types";
import { HashtagType } from "../../generic/types";
import {
  getHashtag,
  handleHashtagNameChange,
  editHashtag,
  createNewHashtag,
  handleFailedHashtagCreation
} from "./actions/EditHashtag.actions";
import { selectHashtag, selectErrorMessage } from "./selectors";
import { selectActiveHashtagId } from "../App/selectors";
import utils from "../../utils";

const { setDefaultAuthHeader } = utils;

interface RouteParams {
  id: string;
}

interface OwnProps {
  routeParams: RouteParams;
}

interface MappedProps {
  folder: HashtagType;
  errorMessage: string;
  activeHashtagId: number;
}

interface MappedActions {
  getHashtag: GetHashtagFn;
  createNewHashtag: CreateNewHashtagFn;
  editHashtag: EditHashtagFn;
  handleHashtagNameChange: HandleHashtagNameChangeFn;
  handleFailedHashtagCreation: HandleFailedHashtagCreationFn;
  handleClearFailedHashtagCreation: HandleClearFailedHashtagCreationFn;
}

type Props = OwnProps & MappedProps & MappedActions;

export class EditHashtag extends React.Component<Props> {
  componentDidMount() {
    setDefaultAuthHeader();

    const { id } = this.props.routeParams;

    if (this.props.routeParams.id) {
      const numericId = parseInt(id, 10);

      this.props.getHashtag(numericId);
    }
  }

  handleHashtagSave = event => {
    event.preventDefault();

    const { routeParams, folder, activeHashtagId } = this.props;
    const { name } = folder;

    if (!routeParams.id) {
      this.props.createNewHashtag(name, activeHashtagId);
    } else {
      this.props.editHashtag({
        ...folder,
        id: parseInt(routeParams.id, 10)
      });
    }
  };

  handleNameChange = event => {
    this.props.handleHashtagNameChange(event.target.value);
  };

  render() {
    const { folder, routeParams, errorMessage } = this.props;
    const { name } = folder;

    if (routeParams.id) {
      const folderId = routeParams.id;
    }

    const wrapperStyles = {
      padding: 40,
      margin: "20px auto",
      maxWidth: 700,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between"
    };

    const leftButtonStyles = {
      margin: "15px 0 15px 0"
    };

    const rightButtonStyles = {
      margin: "15px 0 15px 15px"
    };

    const subheaderStyle = {
      paddingLeft: 0
    };

    return (
      <div>
        <AppBar
          title="Notes &#x3b2;eta"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          zDepth={2}
        />
        <div>
          <Paper zDepth={2} style={wrapperStyles}>
            <Subheader style={subheaderStyle}>Hashtag name:</Subheader>
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
              onClick={this.handleHashtagSave}
            />
          </nav>
        </div>
      </div>
    );
  }
}

export const mapStateToProps = state =>
  createStructuredSelector({
    folder: selectHashtag,
    activeHashtagId: selectActiveHashtagId,
    errorMessage: selectErrorMessage
  });

export const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getHashtag,
      handleHashtagNameChange,
      editHashtag,
      createNewHashtag,
      handleFailedHashtagCreation
    },
    dispatch
  );

export default connect<MappedProps, MappedActions, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(EditHashtag);
