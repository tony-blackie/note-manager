import React, { Component } from 'react';

export default class Folder extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const note = {name: 'someName'};
        const folder = this.props.folderIcon === 'open' ? 'folder-open': 'folder';

        return (
            <div>
                <div>
                    <i className={`fa fa-${folder} fa-lg`}></i>
                </div>
            </div>
        );
    }
}