import * as React from 'react';
import {
    GoToEditHashtagFn,
    RemoveHashtagFn,
    GoToHashtagCreationFn,
    GoToNoteCreationFn,
} from '../types';
import { Dialog, FlatButton } from 'material-ui';

interface Props {
    activeHashtagId: number;
    goToEditHashtag: GoToEditHashtagFn;
    removeHashtag: RemoveHashtagFn;
    goToHashtagCreation: GoToHashtagCreationFn;
    goToNoteCreation: GoToNoteCreationFn;
    isAnyHashtagActive: boolean;
}

interface State {
    confirmDelete: boolean;
}

export default class ControlPanel extends React.Component<Props, State> {
    state: State = {
        confirmDelete: false,
    };

    goToEditHashtag = () => {
        const { activeHashtagId } = this.props;

        if (activeHashtagId) {
            this.props.goToEditHashtag(activeHashtagId);
        }
    };

    removeHashtag = () => {
        const { activeHashtagId } = this.props;

        this.props.removeHashtag(activeHashtagId);
    };

    openConfirmDelete = event => {
        event.stopPropagation();

        this.setState({ confirmDelete: true });
    };

    closeConfirmDelete = () => {
        this.setState({ confirmDelete: false });
    };

    handleConfirmDelete = () => {
        this.removeHashtag();
        this.closeConfirmDelete();
    };

    render() {
        const { isAnyHashtagActive } = this.props;
        const { confirmDelete } = this.state;

        const actions = [
            <FlatButton
                label="Cancel"
                secondary={true}
                onClick={this.closeConfirmDelete}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                onClick={this.handleConfirmDelete}
            />,
        ];

        return (
            <div className="control-panel">
                <div
                    className="control control_create-note"
                    onClick={this.props.goToNoteCreation}
                >
                    <i className="fa fa-pencil fa-2x control__icon" />
                    <div className="control__text">Add Note</div>
                </div>
                <div
                    className="control control_create-folder"
                    onClick={this.props.goToHashtagCreation}
                >
                    <i className="fa fa-plus fa-2x control__icon" />
                    <div className="control__text">Add Hashtag</div>
                </div>
                {isAnyHashtagActive && (
                    <div
                        className="control control_edit-folder"
                        onClick={this.goToEditHashtag}
                    >
                        <i className="fa fa-folder-open fa-2x control__icon" />
                        <div className="control__text">Edit Hashtag</div>
                    </div>
                )}
                {isAnyHashtagActive && (
                    <div
                        className="control control_remove-folder"
                        onClick={this.openConfirmDelete}
                    >
                        <i className="fa fa-remove fa-2x control__icon" />
                        <div className="control__text">Remove Hashtag</div>
                    </div>
                )}
                <Dialog
                    open={confirmDelete}
                    title="Confirm deletion?"
                    actions={actions}
                    modal={false}
                    onRequestClose={this.closeConfirmDelete}
                />
            </div>
        );
    }
}
