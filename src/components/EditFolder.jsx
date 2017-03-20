import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

export class EditFolder extends Component {
    render() {
        return (
            <div>Edit Folder Page</div>
        );
    }
}

export const mapStateToProps = state => ({});

export const mapDispatchToProps = dispatch => bindActionCreators({});

export default connect(mapStateToProps, mapDispatchToProps)(EditFolder);
