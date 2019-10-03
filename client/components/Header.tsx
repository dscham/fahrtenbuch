import React, { CSSProperties } from "react";
import { Button } from '@rmwc/button';
import BottomNavigationItem from "./BottomNavigationItem";
// @ts-ignore
import PropTypes from 'prop-types';
import { Typography } from "@rmwc/typography";
import AccountsUIWrapper from "./AccountsUIWrapper";

export default class Header extends React.Component {
    barStyle: CSSProperties = {
        position: 'fixed',
        display: 'flex',
        left: 0,
        top: 0,
        width: '100vw',
        zIndex: 10,
        paddingBottom: '.75rem',
        paddingTop: '.75rem',
        textAlign: 'center',
        boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.75)',
        background: 'white'
    };

    render() {
        return (
            <div style={this.barStyle}>
                <Typography use="headline2">backfuel</Typography>
                <AccountsUIWrapper />
            </div>
        );
    }
}