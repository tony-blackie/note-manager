import * as React from 'react';
import { connect } from 'react-redux';
import { Link, hashHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import axios from 'axios';
import * as format from 'date-fns/format';
import * as parse from 'date-fns/parse';
import {
    RaisedButton,
    Paper,
    TextField,
    Subheader,
    AppBar,
    Divider,
} from 'material-ui';
import Chip from 'material-ui/Chip';
import { find } from 'lodash';

import {
    selectIsNoteCreationMode,
    selectNoteWithHashtags,
    selectErrorMessage,
    // selectEditTags,
} from './selectors';
import { selectHashtags } from '../App/selectors';
import { NoteType, HashtagType } from '../../generic/types';
import { goToRoot } from '../../generic/actions';

import EditTags from './components/EditTags';

import {
    CreateNoteRequestFn,
    EditNoteRequestFn,
    ChangeTextFieldValueFn,
    FetchNoteFn,
    EditNoteState,
    EditedNote,
    EditedTags,
} from './types';

import {
    editNoteRequest,
    createNoteRequest,
    changeTextFieldValue,
    changeNoteName,
    fetchNote,
    clearNoteData,
    handleClearErrorMessage,
} from './actions/EditNote.actions';

import utils from '../../utils';

import { getAllHashtags } from '../App/actions/AppComponent.actions';

const { setDefaultAuthHeader } = utils;

interface RouteParams {
    noteId: string;
}

interface OwnProps {
    routeParams: RouteParams;
}

interface MappedProps {
    name: string;
    editedNote: EditedNote<HashtagType>;
    activeHashtagId: number | null;
    errorMessage: string;
    allHashtags: HashtagType[];
}

interface State {
    isOpen: boolean;
    mockData: any;
    searchArr: any;
    valueInput: string;
    isVisibleBnt: boolean;
    trySearch: boolean;
    wereHashtagsInitialized: boolean;
    wasAutocompleteInitialized: boolean;
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
    getAllHashtags: () => void;
}

type Props = OwnProps & MappedActions & MappedProps;

export class EditNote extends React.Component<Props, State> {
    state: State = {
        isOpen: null,
        searchArr: [],
        mockData: [],
        valueInput: '',
        isVisibleBnt: false,
        trySearch: false,
        wereHashtagsInitialized: false,
        wasAutocompleteInitialized: false,
    };

    componentWillReceiveProps(props) {
        if (
            props.allHashtags.length &&
            !this.state.mockData.length &&
            !this.state.searchArr.length &&
            !this.state.wasAutocompleteInitialized
        ) {
            this.setInitialAutocomplete(props);
        }
    }

    componentDidMount() {
        setDefaultAuthHeader();

        if (this.props.routeParams.noteId) {
            this.props.fetchNote(this.props.routeParams.noteId);
        } else {
            this.props.clearNoteData();
        }

        this.props.getAllHashtags();

        this.props.handleClearErrorMessage();
    }

    handleSaveClick = () => {
        const { routeParams, activeHashtagId } = this.props;
        const { name, textFieldValue, hashtags } = this.props.editedNote;

        if (!routeParams.noteId) {
            this.props.createNoteRequest(
                {
                    name,
                    text: textFieldValue,
                },
                this.state.mockData.concat(this.state.searchArr),
                this.state.mockData
            );
        } else {
            this.props.editNoteRequest(
                {
                    id: routeParams.noteId,
                    name,
                    text: textFieldValue,
                },
                this.state.mockData.concat(this.state.searchArr),
                this.state.mockData
            );
        }
    };

    handleTextFieldChange = event => {
        this.props.changeTextFieldValue(event.target.value);
    };

    handleNameChange = event => {
        this.props.changeNoteName(event.target.value);
    };

    closeState = () => {
        this.setState({ isOpen: false });
    };

    saveData = () => {
        // let rand = 0 + Math.random() * (1000 + 1 - 0);
        // rand = Math.floor(rand);

        let obj = { name: this.state.valueInput };
        let arr = this.state.mockData.slice();
        let data = arr.concat(obj);

        if (this.state.valueInput.length !== 0) {
            this.setState({
                isOpen: false,
                mockData: data,
                searchArr: [],
                valueInput: '',
                isVisibleBnt: false,
                trySearch: false,
            });
        }
    };

    handleInputChange = event => {
        console.log(event.target.value);
        let text = event.target.value.trim();
        let arr = this.state.searchArr.slice();

        let flterArr = arr.filter(item => {
            return (
                item.name.toLowerCase().substr(0, text.length) ===
                text.toLowerCase()
            );
        });

        //let finArr = searchArr.concat(flterArr);

        if (flterArr.length === 0 && text.length !== 0) {
            this.setState({
                searchArr: flterArr,
                valueInput: text,
                isVisibleBnt: true,
                trySearch: true,
            });
        } else {
            this.setState({
                searchArr: flterArr,
                valueInput: text,
                isVisibleBnt: true,
            });
        }
    };

    updateCheck = id => {
        let data = this.state.searchArr.slice();
        const itemForAdd = data.map(item => item.id).indexOf(id);
        let item = data.slice(itemForAdd, itemForAdd + 1);

        let mock = this.state.mockData.slice() || [];
        mock = mock.concat(item);
        data.splice(itemForAdd, 1);

        this.setState({
            isOpen: false,
            // startData: data,
            mockData: mock,
            searchArr: data,
            valueInput: '',
            isVisibleBnt: false,
            trySearch: false,
        });
    };

    handleRequestDelete = id => {
        let chipData = this.state.mockData.slice();
        const chipToDelete = chipData.map(chip => chip.id).indexOf(id);

        let mock = this.state.searchArr.slice();
        let item = chipData.slice(chipToDelete, chipToDelete + 1);
        mock = mock.concat(item);
        chipData.splice(chipToDelete, 1);

        this.setState({
            mockData: chipData,
            searchArr: mock,
        });
    };

    setInitialAutocomplete = props => {
        /*
            TODO: editedNote.name is used to check if editedNote data has already resolved.
            Later it needs to be refactored to some flag like isLoaded.
         */
        if (props.routeParams.noteId) {
            if (props.editedNote.name && props.allHashtags.length) {
                const hashtagsInAutocomplete = props.allHashtags.filter(
                    hashtag => !find(props.editedNote.hashtags, hashtag)
                );

                this.setState({
                    mockData: props.editedNote.hashtags,
                    searchArr: hashtagsInAutocomplete,
                    wasAutocompleteInitialized: true,
                });
            }
        } else {
            this.setState({
                mockData: [],
                searchArr: props.allHashtags,
                wasAutocompleteInitialized: true,
            });
        }
    };

    setAutocompleteOpen = () => {
        this.setState({ isOpen: true });
    };

    render() {
        const { errorMessage, editedNote, allHashtags } = this.props;
        const { textFieldValue, textFieldPlaceholder, name, date } = editedNote;
        const hashtagsInNote = editedNote.hashtags;

        const parsedDate = date ? format(parse(date), 'DD/MM/YY') : null;

        const wrapperStyles = {
            padding: 40,
            margin: '20px auto',
            maxWidth: 700,
            minHeight: 400,
            width: '94%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: '#fff9c4',
        };

        const leftButtonStyles = {
            margin: '15px 0 15px 0',
        };

        const rightButtonStyles = {
            margin: '15px 0 15px 15px',
        };

        const subheaderStyles = {
            paddingLeft: 0,
        };

        const headerInputStyles = {
            cursor: 'default',
            maxWidth: '90%',
            textOverflow: 'ellipsis',
        };

        const textareaStyles = {
            width: '100%',
        };

        const titleStyles = {
            cursor: 'pointer',
        };

        const chipStyles = {
            chip: {
                margin: 4,
            },
            wrapper: {
                display: 'flex',
            },
        };

        const {
            isOpen,
            // startData,
            mockData,
            searchArr,
            valueInput,
            isVisibleBnt,
            trySearch,
            wereHashtagsInitialized,
            wasAutocompleteInitialized,
        } = this.state;

        return (
            <div
                onClick={() =>
                    this.state.isOpen ? this.setState({ isOpen: false }) : ''
                }
            >
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
                        <div>
                            <EditTags
                                hashtagsInNote={hashtagsInNote}
                                allHashtags={allHashtags}
                                isOpen={isOpen}
                                // startData={startData}
                                mockData={mockData}
                                searchArr={searchArr}
                                valueInput={valueInput}
                                isVisibleBnt={isVisibleBnt}
                                trySearch={trySearch}
                                wereHashtagsInitialized={
                                    wereHashtagsInitialized
                                }
                                wasAutocompleteInitialized={
                                    wasAutocompleteInitialized
                                }
                                // setInitialAllHashtags={
                                //     this.setInitialAllHashtags
                                // }
                                setInitialAutocomplete={
                                    this.setInitialAutocomplete
                                }
                                handleRequestDelete={this.handleRequestDelete}
                                updateCheck={this.updateCheck}
                                handleInputChange={this.handleInputChange}
                                saveData={this.saveData}
                                closeState={this.closeState}
                                setAutocompleteOpen={this.setAutocompleteOpen}
                            />
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
        editedNote: selectNoteWithHashtags,
        errorMessage: selectErrorMessage,
        // editedTags: selectEditTags,
        allHashtags: selectHashtags,
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
            handleClearErrorMessage,
            getAllHashtags,
        },
        dispatch
    );

export default connect<MappedProps, MappedActions, {}>(
    mapStateToProps,
    mapDispatchToProps
)(EditNote);
