import * as React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Chip from 'material-ui/Chip';
import Checkbox from 'material-ui/Checkbox';
import { find } from 'lodash';

import { HashtagType } from '../../../generic/types';

interface State {
    isOpen: boolean;
    startData: any;
    mockData: any;
    searchArr: any;
    valueInput: string;
    isVisibleBnt: boolean;
    trySearch: boolean;
    wereHashtagsInitialized: boolean;
    wasAutocompleteInitialized: boolean;
}

interface OwnProps {
    allHashtags: HashtagType[];
    hashtagsInNote: HashtagType[];
}

// let mock: HashtagType[] = [
//     { id: 1, name: 'initial' },
//     { id: 2, name: 'chloe' },
//     { id: 13, name: 'rachel' },
//     { id: 14, name: 'max' },
// ];

const styles = {
    chip: {
        margin: 4,
    },
    wrapper: {
        display: 'flex',
    },
};

export default class EditTags extends React.Component<OwnProps, State> {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: null,
            startData: [],
            searchArr: [],
            mockData: [],
            valueInput: '',
            isVisibleBnt: false,
            trySearch: false,
            wereHashtagsInitialized: false,
            wasAutocompleteInitialized: false,
        };
    }

    componentWillReceiveProps(props) {
        if (
            props.allHashtags.length &&
            !this.state.startData.length &&
            !this.state.wereHashtagsInitialized
        ) {
            this.setState({
                startData: props.allHashtags,
                wereHashtagsInitialized: true,
            });
        }

        if (
            props.hashtagsInNote.length &&
            !this.state.mockData.length &&
            !this.state.searchArr.length &&
            !this.state.wasAutocompleteInitialized
        ) {
            const hashtagsInAutocomplete = props.allHashtags.filter(
                hashtag => !find(props.hashtagsInNote, hashtag)
            );

            this.setState({
                mockData: props.hashtagsInNote,
                searchArr: hashtagsInAutocomplete,
                wasAutocompleteInitialized: true,
            });
        }
    }

    closeState() {
        this.setState({ isOpen: false });
    }

    saveData() {
        let rand = 0 + Math.random() * (1000 + 1 - 0);
        rand = Math.floor(rand);

        let obj = { name: this.state.valueInput, id: rand };
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
    }

    handleInputChange(event) {
        console.log(event.target.value);
        let text = event.target.value.trim();
        let arr = this.state.startData.slice();
        let searchArr = this.state.searchArr.slice();

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
    }

    updateCheck(id) {
        let data = this.state.startData.slice();
        const itemForAdd = data.map(item => item.id).indexOf(id);
        let item = data.slice(itemForAdd, itemForAdd + 1);
        let mock = this.state.mockData.slice() || [];
        mock = mock.concat(item);
        data.splice(itemForAdd, 1);
        this.setState({
            isOpen: false,
            startData: data,
            mockData: mock,
            searchArr: [],
            valueInput: '',
            isVisibleBnt: false,
            trySearch: false,
        });
    }

    handleRequestDelete(id) {
        let chipData = this.state.mockData.slice();
        const chipToDelete = chipData.map(chip => chip.id).indexOf(id);
        let mock = this.state.startData.slice();
        let item = chipData.slice(chipToDelete, chipToDelete + 1);
        mock = mock.concat(item);
        chipData.splice(chipToDelete, 1);
        this.setState({
            mockData: chipData,
            startData: mock,
        });
    }

    render() {
        const chipStyles = {
            chip: {
                margin: 4,
            },
            wrapper: {
                display: 'flex',
            },
        };

        return (
            <div>
                {/* <div style={chipStyles.wrapper}>
                    {this.state.mockData.map((item, index) => (
                        <Chip
                            key={item.id}
                            style={chipStyles.chip}
                            onRequestDelete={() => {}}
                        >
                            {item.name}
                        </Chip>
                    ))}
                </div> */}
                <div style={styles.wrapper}>
                    {this.state.mockData.map((item, index) => (
                        <Chip
                            key={item.id}
                            style={styles.chip}
                            onRequestDelete={() => {
                                this.handleRequestDelete(item.id);
                            }}
                        >
                            {item.name}
                        </Chip>
                    ))}
                </div>
                <IconMenu
                    iconButtonElement={<div>Add tag +</div>}
                    anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
                    targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                    open={this.state.isOpen}
                    onClick={() => {
                        this.setState({ isOpen: true });
                    }}
                    onRequestChange={(e, r) => {
                        r === 'clickAway'
                            ? this.setState({ isOpen: false })
                            : false;
                    }}
                >
                    <div>
                        <input
                            type="text"
                            value={this.state.valueInput}
                            onChange={e => {
                                this.handleInputChange(e);
                            }}
                        />
                        {this.state.searchArr.length === 0 &&
                        !this.state.trySearch
                            ? this.state.startData.map((item, index) => (
                                  <Checkbox
                                      key={index}
                                      label={item.name}
                                      onCheck={() => {
                                          this.updateCheck(item.id);
                                      }}
                                  />
                              ))
                            : this.state.searchArr.map((item, index) => (
                                  <Checkbox
                                      key={index}
                                      label={item.name}
                                      onCheck={() => {
                                          this.updateCheck(item.id);
                                      }}
                                  />
                              ))}
                        {this.state.isVisibleBnt ? (
                            <button
                                onClick={() => {
                                    this.saveData();
                                }}
                            >
                                Save {this.state.valueInput}
                            </button>
                        ) : (
                            false
                        )}
                    </div>
                </IconMenu>
            </div>
        );
    }
}
