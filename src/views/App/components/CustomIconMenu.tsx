import * as React from 'react';
import { IconMenu, MenuItem, FontIcon } from 'material-ui';

export default class CustomIconMenu extends React.Component {
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
                <MenuItem primaryText="Sign out" />
            </IconMenu>
        );
    }
}