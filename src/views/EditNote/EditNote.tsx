import * as React from "react";
import { connect } from "react-redux";
import { Link, hashHistory } from "react-router";
import { bindActionCreators } from "redux";
import { createStructuredSelector } from "reselect";
import axios from "axios";
import * as format from "date-fns/format";
import * as parse from "date-fns/parse";
import {
  RaisedButton,
  Paper,
  TextField,
  Subheader,
  AppBar,
  Divider
} from "material-ui";
import Chip from "material-ui/Chip";

import {
  selectIsNoteCreationMode,
  selectEditedNote,
  selectErrorMessage,
  selectEditTags
} from "./selectors";
import { selectActiveHashtagId } from "../App/selectors";
import { NoteType } from "../../generic/types";
import { goToRoot } from "../../generic/actions";

import EditTags from "./components/EditTags";

import {
  CreateNoteRequestFn,
  EditNoteRequestFn,
  ChangeTextFieldValueFn,
  FetchNoteFn,
  EditNoteState,
  EditedNote,
  EditedTags
} from "./types";

import {
  editNoteRequest,
  createNoteRequest,
  changeTextFieldValue,
  changeNoteName,
  fetchNote,
  clearNoteData,
  handleClearErrorMessage
} from "./actions/EditNote.actions";
import utils from "../../utils";

const { setDefaultAuthHeader } = utils;

interface RouteParams {
  noteId: string;
}

interface OwnProps {
  routeParams: RouteParams;
}

interface MappedProps {
  name: string;
  editedNote: EditedNote;
  activeHashtagId: number | null;
  errorMessage: string;
  editedTags: EditedTags;
}

interface MappedActions {
  createNoteRequest: CreateNoteRequestFn;
  editNoteRequest: EditNoteRequestFn;
  changeTextFieldValue: ChangeTextFieldValueFn;
  changeNoteName: ChangeTextFieldValueFn;
  fetchNote: FetchNoteFn;
  clearNoteData: () => void;
  handleClearErrorMessage: () => void;
  goToRoot: () => void;
}

type Props = OwnProps & MappedActions & MappedProps;

export class EditNote extends React.Component<Props> {
  componentDidMount() {
    setDefaultAuthHeader();

    if (this.props.routeParams.noteId) {
      this.props.fetchNote(this.props.routeParams.noteId);
    } else {
      this.props.clearNoteData();
    }

    this.props.handleClearErrorMessage();
  }

  handleSaveClick = () => {
    const { routeParams, activeHashtagId } = this.props;
    const { name, textFieldValue, folderId } = this.props.editedNote;

    if (!routeParams.noteId) {
      this.props.createNoteRequest(
        {
          name,
          text: textFieldValue
        },
        activeHashtagId
      );
    } else {
      this.props.editNoteRequest({
        id: routeParams.noteId,
        name,
        text: textFieldValue,
        parent: folderId
      });
    }
  };

  handleTextFieldChange = event => {
    this.props.changeTextFieldValue(event.target.value);
  };

  handleNameChange = event => {
    this.props.changeNoteName(event.target.value);
  };

  render() {
    const { errorMessage, editedNote, editedTags } = this.props;
    const { textFieldValue, textFieldPlaceholder, name, date } = editedNote;
    const { listTags } = editedTags;

    const parsedDate = date ? format(parse(date), "DD/MM/YY") : null;

    const wrapperStyles = {
      padding: 40,
      margin: "20px auto",
      maxWidth: 700,
      minHeight: 400,
      width: "94%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      backgroundColor: "#fff9c4"
    };

    const leftButtonStyles = {
      margin: "15px 0 15px 0"
    };

    const rightButtonStyles = {
      margin: "15px 0 15px 15px"
    };

    const subheaderStyles = {
      paddingLeft: 0
    };

    const headerInputStyles = {
      cursor: "default",
      maxWidth: "90%",
      textOverflow: "ellipsis"
    };

    const textareaStyles = {
      width: "100%"
    };

    const titleStyles = {
      cursor: "pointer"
    };

    const chipStyles = {
      chip: {
        margin: 4
      },
      wrapper: {
        display: "flex"
      }
    };

    return (
      <div>
        <AppBar
          title="Notes &#x3b2;eta"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          zDepth={2}
        />
        <div>
          <div>{errorMessage}</div>
          <Paper zDepth={2} style={wrapperStyles}>
            <form className="edit-note__form">
              <TextField
                name="noteName"
                onChange={this.handleNameChange}
                className="edit-note__name"
                type="text"
                value={name}
                underlineShow={false}
                inputStyle={headerInputStyles}
              />
              <Divider />
              <textarea
                className="edit-note__textarea"
                value={textFieldValue}
                onChange={this.handleTextFieldChange}
              />
            </form>
            <div className="edit-note__creation-date">
              Created on: {parsedDate}
            </div>
            <div style={chipStyles.wrapper}>
              {listTags.map((item, index) => (
                <Chip
                  key={item.id}
                  style={chipStyles.chip}
                  onRequestDelete={() => {}}
                >
                  {item.name}
                </Chip>
              ))}
            </div>
            <div>
              <EditTags />
            </div>
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
              className="edit-note__save"
              onClick={this.handleSaveClick}
            />
          </nav>
        </div>
      </div>
    );
  }
}

export const mapStateToProps = (state: EditNoteState) =>
  createStructuredSelector({
    isNoteCreationMode: selectIsNoteCreationMode,
    editedNote: selectEditedNote,
    activeHashtagId: selectActiveHashtagId,
    errorMessage: selectErrorMessage,
    editedTags: selectEditTags
  });

export const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      editNoteRequest,
      createNoteRequest,
      changeTextFieldValue,
      changeNoteName,
      fetchNote,
      clearNoteData,
      handleClearErrorMessage
    },
    dispatch
  );

export default connect<MappedProps, MappedActions, {}>(
  mapStateToProps,
  mapDispatchToProps
)(EditNote);
