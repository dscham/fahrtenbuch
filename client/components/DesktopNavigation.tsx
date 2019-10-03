import React, {Component} from 'react';
import {Typography} from '@rmwc/typography';
import {
    TopAppBar,
    TopAppBarActionItem,
    TopAppBarFixedAdjust,
    TopAppBarRow,
    TopAppBarSection,
    TopAppBarTitle
} from '@rmwc/top-app-bar';
import {Menu, MenuItem, MenuSurfaceAnchor} from '@rmwc/menu';
import {ListDivider} from '@rmwc/list';
import BottomNavigation from "./BottomNavigation";

export default class DesktopNavigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };

        this.setOpen = this.setOpen.bind(this);
    }

    setOpen(open: boolean) {
        this.setState({
            open: open,
        });
    }

    render() {
        return(
            <div>
                <TopAppBar short>
                    <TopAppBarRow>
                        <TopAppBarSection>
                            <MenuSurfaceAnchor>
                                <Menu open={open}
                                      onSelect={evt => {evt.persist(); console.log(evt.detail.index)}}
                                      onClose={() => setOpen(false)}>
                                    <MenuItem>Cookies</MenuItem>
                                    <MenuItem>Pizza</MenuItem>
                                    {/** MenuItem is just a ListItem, so you can intermingle other List components */}
                                    <ListDivider />
                                    <MenuItem>Icecream</MenuItem>
                                </Menu>
                            </MenuSurfaceAnchor>
                            <TopAppBarActionItem icon="menu" onClick={() => setOpen(!open)}/>
                            <TopAppBarTitle>Home</TopAppBarTitle>
                        </TopAppBarSection>
                    </TopAppBarRow>
                </TopAppBar>
                <TopAppBarFixedAdjust />
            </div>
        );
    }
}