import * as React from 'react';
import { IconMenu, MenuItem, FontIcon } from 'material-ui';
import { hashHistory } from 'react-router';

import utils from '../../../utils';
const { deleteToken } = utils;

export default class CustomIconMenu extends React.Component {
    handleSignOut = (event) => {
        deleteToken();
        hashHistory.push('/login');
    }

    render() {
        const menuStyle = {
            color: 'white'
        };

        return (
            <IconMenu
                iconButtonElement={
                    <FontIcon
                        className="material-icons"
                        style={menuStyle}
                    >
                        menu
                    </FontIcon>
                }
            >
                <MenuItem
                    primaryText="Sign out"
                    onClick={this.handleSignOut}
                />
            </IconMenu>
        );
    }
}