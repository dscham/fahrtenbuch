import React, {CSSProperties} from "react";
import {Meteor} from 'meteor/meteor';
// @ts-ignore
import {Menu, MenuItem, MenuSurfaceAnchor} from "@rmwc/menu"
import {IconButton} from "@rmwc/icon-button";

interface Props {

}

interface State {
    open: boolean
}

export default class UserMenu extends React.Component<Props, State> {
    readonly state = {
        open: false
    }

    constructor(props) {
        super(props);

        this.setOpen = this.setOpen.bind(this);
    }

    setOpen(b: boolean) {
        this.setState({open: b});
    };

    logOut(){
        Meteor.logout(() => {
            console.debug('Logged Out!');
            location.replace('/');
        });
    }

    render() {
        const { open } = this.state;
        return (
            <div className="user-menu">
                <MenuSurfaceAnchor>
                    <Menu
                        open={open}
                        onSelect={evt => console.log(evt.detail.index)}
                        onClose={evt => this.setOpen(false)}
                    >
                        <MenuItem onClick={this.logOut}>Logout</MenuItem>
                    </Menu>
                    <IconButton icon="person" onClick={evt => this.setOpen(!open)} />
                </MenuSurfaceAnchor>
            </div>
        );
    }
}