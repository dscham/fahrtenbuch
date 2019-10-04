import React, { CSSProperties } from "react";
import { Button } from '@rmwc/button';
import BottomNavigationItem from "../bottom-navigation/item/BottomNavigationItem";
// @ts-ignore
import PropTypes from 'prop-types';
import { Typography } from "@rmwc/typography";
import AccountsUIWrapper from "../accounts/AccountsUIWrapper";
import './style.scss';

export default class Header extends React.Component {
    barStyle: CSSProperties = {

    };

    render() {
        return (
            <div className="app-header">
                <Typography use="headline3">backfuel</Typography>
            </div>
        );
    }
}