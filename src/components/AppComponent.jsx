import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import { Link } from 'react-router';
import ControlPanel from './ControlPanel.jsx';
import FolderTree from './FolderTree.jsx';
import NotePanel from './NotePanel.jsx';
import Folder from './Folder.jsx';
import { createStore } from 'redux';
import { connect } from 'react-redux';
import { MAKE_FOLDER_ACTIVE } from '../actions/actionTypes.jsx';

export class App extends Component {
    constructor(props) {
        super(props);
    }

    // componentDidMount() {
    //     debugger;
    //     mapStateToProps(this.state);
    // }

    render() {
        return (
            <div>
                <ControlPanel />
                <FolderTree />
                <NotePanel notes={this.props.notes} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        notes: state.notes
    }
};

const mapDispatchToProps = () => ({

});

//TODO: Check if it needs to be exported
export default connect(mapStateToProps, mapDispatchToProps)(App);
