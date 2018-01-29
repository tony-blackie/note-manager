import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { createStructuredSelector } from "reselect";
import axios from "axios";
import { hashHistory } from "react-router";
import { Paper, AppBar } from "material-ui";
import { grey300, TextField, IconButton } from "material-ui";

import ControlPanel from "./components/ControlPanel";
// import FolderTree from "./components/FolderTree";
import NotePanel from "./components/NotePanel";
// import Folder from "./components/Folder";
import CustomIconMenu from "./components/CustomIconMenu";
import {
  selectNotesByQuery,
  selectHashtags,
  selectActiveHashtagId,
  selectQuery,
  isAnyHashtagActive,
  selectTruncatedNotes
} from "./selectors";
import utils from "../../utils";
import { updateNoteFilterQuery } from "./actions/AppComponent.actions";

const { setDefaultAuthHeader, getToken } = utils;

import {
  getAllNotes,
  goToNoteCreation,
  goToNoteEdit,
  removeNote,
  makeHashtagActive,
  makeHashtagInactive,
  getAllHashtags,
  removeHashtag,
  goToEditHashtag,
  goToHashtagCreation,
  createInitialHashtag
} from "./actions/AppComponent.actions";

import {
  GetAllNotesFn,
  GetAllHashtagsFn,
  GoToNoteEditFn,
  GoToEditHashtagFn,
  MakeHashtagActiveFn,
  MakeHashtagInactiveFn,
  GoToNoteCreationFn,
  GoToHashtagCreationFn,
  RemoveHashtagFn,
  RemoveNoteFn,
  CreateInitialHashtagFn,
  UpdateNoteFilterQueryFn
} from "./types";
import { HashtagType, NoteType } from "../../generic/types";

interface MappedProps {
  filteredNotes: NoteType[];
  hashtags: HashtagType[];
  activeHashtagId: number;
  searchQuery: string;
  isAnyHashtagActive: boolean;
  truncatedNotes: NoteType[];
}

interface MappedActions {
  getAllNotes: GetAllNotesFn;
  getAllHashtags: GetAllHashtagsFn;
  goToNoteEdit: GoToNoteEditFn;
  goToEditHashtag: GoToEditHashtagFn;
  makeHashtagActive: MakeHashtagActiveFn;
  makeHashtagInactive: MakeHashtagInactiveFn;
  goToNoteCreation: GoToNoteCreationFn;
  goToHashtagCreation: GoToHashtagCreationFn;
  removeHashtag: RemoveHashtagFn;
  removeNote: RemoveNoteFn;
  createInitialHashtag: CreateInitialHashtagFn;
  updateNoteFilterQuery: UpdateNoteFilterQueryFn;
}

type Props = MappedProps & MappedActions;

interface EventTarget {
  value: string;
}

interface Event {
  target: EventTarget;
}

export class App extends React.Component<Props> {
  componentDidMount() {
    if (!getToken()) {
      hashHistory.push("/login");
    }

    setDefaultAuthHeader();

    this.props.getAllNotes();
    this.props.getAllHashtags();
  }

  updateNoteFilterQuery = (event: Event) => {
    const text = event.target.value;

    this.props.updateNoteFilterQuery(text);
  };

  render() {
    const {
      goToNoteCreation,
      removeHashtag,
      activeHashtagId,
      goToEditHashtag,
      goToHashtagCreation,
      hashtags,
      makeHashtagActive,
      makeHashtagInactive,
      goToNoteEdit,
      removeNote,
      filteredNotes,
      isAnyHashtagActive,
      truncatedNotes
    } = this.props;

    const wrapperStyles = {
      padding: 20,
      margin: "20px auto",
      maxWidth: 300
    };

    const menuStyles = {
      width: "100%",
      backgroundColor: grey300
    };

    return (
      <div>
        <AppBar
          title="Notes &#x3b2;eta"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          zDepth={2}
          iconElementLeft={
            <IconButton>
              <CustomIconMenu />
            </IconButton>
          }
        >
          <TextField
            name={"search"}
            hintText={"search"}
            value={this.props.searchQuery}
            onChange={this.updateNoteFilterQuery}
            className="note-search"
          />
          <ControlPanel
            goToNoteCreation={goToNoteCreation}
            removeHashtag={removeHashtag}
            activeHashtagId={activeHashtagId}
            goToEditHashtag={goToEditHashtag}
            goToHashtagCreation={goToHashtagCreation}
            isAnyHashtagActive={isAnyHashtagActive}
          />
        </AppBar>
        <div className="content-wrapper">
          {/* <Paper zDepth={2} style={wrapperStyles}> */}
          {/* <FolderTree
              folders={folders}
              makeFolderActive={makeFolderActive}
              makeFolderInactive={makeFolderInactive} */}
          {/* /> */}
          {/* </Paper> */}
          <NotePanel
            notes={truncatedNotes}
            goToNoteEdit={goToNoteEdit}
            removeNote={removeNote}
            activeHashtagId={activeHashtagId}
            hashtags={hashtags}
          />
        </div>
      </div>
    );
  }
}

export const mapStateToProps = state =>
  createStructuredSelector({
    filteredNotes: selectNotesByQuery,
    truncatedNotes: selectTruncatedNotes,
    hashtags: selectHashtags,
    activeHashtagId: selectActiveHashtagId,
    searchQuery: selectQuery,
    isAnyHashtagActive: isAnyHashtagActive
  });

export const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getAllNotes,
      goToNoteCreation,
      goToNoteEdit,
      removeNote,
      makeHashtagActive,
      makeHashtagInactive,
      getAllHashtags,
      removeHashtag,
      goToEditHashtag,
      goToHashtagCreation,
      createInitialHashtag,
      updateNoteFilterQuery
    },
    dispatch
  );

export default connect<MappedProps, MappedActions, {}>(
  mapStateToProps,
  mapDispatchToProps
)(App);
