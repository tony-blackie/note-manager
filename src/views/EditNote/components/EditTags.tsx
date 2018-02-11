import * as React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Chip from 'material-ui/Chip';
import Checkbox from 'material-ui/Checkbox';
import { find } from 'lodash';

import { HashtagType } from '../../../generic/types';

interface State {}

interface OwnProps {
    allHashtags: HashtagType[];
    hashtagsInNote: HashtagType[];
    isOpen: boolean;
    // startData: any;
    mockData: any;
    searchArr: any;
    valueInput: string;
    isVisibleBnt: boolean;
    trySearch: boolean;
    wereHashtagsInitialized: boolean;
    wasAutocompleteInitialized: boolean;
    // setInitialAllHashtags: any;
    setInitialAutocomplete: any;
    handleRequestDelete: any;
    updateCheck: any;
    handleInputChange: any;
    saveData: any;
    closeState: any;
    setAutocompleteOpen: any;
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
    // componentWillReceiveProps(props) {
    //     if (
    //         props.allHashtags.length &&
    //         !this.props.startData.length &&
    //         !this.props.wereHashtagsInitialized
    //     ) {
    //         this.props.setInitialAllHashtags(props);
    //     }

    //     if (
    //         props.hashtagsInNote.length &&
    //         !this.props.mockData.length &&
    //         !this.props.searchArr.length &&
    //         !this.props.wasAutocompleteInitialized
    //     ) {
    //         this.props.setInitialAutocomplete(props);
    //     }
    // }

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
                    {this.props.mockData.map((item, index) => (
                        <Chip
                            key={item.id}
                            style={styles.chip}
                            onRequestDelete={() => {
                                debugger;
                                this.props.handleRequestDelete(item.id);
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
                    open={this.props.isOpen}
                    onClick={() => {
                        this.props.setAutocompleteOpen();
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
                            value={this.props.valueInput}
                            onChange={e => {
                                this.props.handleInputChange(e);
                            }}
                        />
                        {/* {this.props.searchArr.length === 0 &&
                        !this.props.trySearch
                            ? this.props.startData.map((item, index) => (
                                  <Checkbox
                                      key={index}
                                      label={item.name}
                                      onCheck={() => {
                                          debugger;
                                          this.props.updateCheck(item.id);
                                      }}
                                  />
                              )) */}
                        {/* :  */}
                        {this.props.searchArr.map((item, index) => (
                            <Checkbox
                                key={index}
                                label={item.name}
                                onCheck={() => {
                                    this.props.updateCheck(item.id);
                                }}
                            />
                        ))}
                        {this.props.isVisibleBnt ? (
                            <button
                                onClick={() => {
                                    this.props.saveData();
                                }}
                            >
                                Save {this.props.valueInput}
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
