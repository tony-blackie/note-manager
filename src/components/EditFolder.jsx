import React, { Component } from 'react';
import { connect } from 'react-redux';

export EditFolder extends Component {
    render() {
        return (
            <div>Edit Folder Page</div>
        );
    }
}

export const mapStateToProps = () => ({});

export const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(EditFolder);
