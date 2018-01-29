import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Note from "./Note";
import {
  UpdateNoteFilterQueryFn,
  GoToNoteEditFn,
  RemoveNoteFn
} from "../types";
import { NoteType, HashtagType } from "../../../generic/types";

interface OwnProps {
  notes: NoteType[];
  hashtags: HashtagType[];
  activeHashtagId: number;
  goToNoteEdit: GoToNoteEditFn;
  removeNote: RemoveNoteFn;
}

interface MappedActions {
  // updateNoteFilterQuery: UpdateNoteFilterQueryFn;
}

type Props = OwnProps & MappedActions;

class NotePanel extends React.Component<Props> {
  getActiveHashtag = (hashtags: HashtagType[], activeHashtagId: number) => {
    return hashtags.filter(hashtag => hashtag.id === activeHashtagId)[0];
  };

  render() {
    const { notes, hashtags, activeHashtagId } = this.props;

    return (
      <div className="note-panel">
        <div className="note-container">
          {notes.map(note => {
            const { id, text, name } = note;
            return (
              <Note
                key={id}
                id={id}
                text={text}
                name={name}
                goToNoteEdit={this.props.goToNoteEdit}
                removeNote={this.props.removeNote}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      // updateNoteFilterQuery
    },
    dispatch
  );

export default connect<null, MappedActions, OwnProps>(null, mapDispatchToProps)(
  NotePanel
);
