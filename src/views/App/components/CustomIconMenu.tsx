import * as React from 'react';
import { IconMenu, MenuItem, FontIcon } from 'material-ui';
import { hashHistory } from 'react-router';

import utils from '../../../utils';
const { deleteToken } = utils;

export default class CustomIconMenu extends React.Component {
    handleSignOut = () => {
        deleteToken();
        hashHistory.push('/login');
    }

    goToQuestionnaire = () => {
        hashHistory.push('/questionnaire');
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
                    primaryText="Leave feedback"
                    onClick={this.goToQuestionnaire}
                />
                <MenuItem
                    primaryText="Request a feature"
                    onClick={this.goToQuestionnaire}
                />
                <MenuItem
                    primaryText="Sign out"
                    onClick={this.handleSignOut}
                />
            </IconMenu>
        );
    }
}