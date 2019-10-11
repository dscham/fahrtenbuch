import React, {CSSProperties} from "react";
import {Meteor} from 'meteor/meteor';
// @ts-ignore
import {Typography} from "@rmwc/typography";
import './style.scss';
import UserMenu from "./user-menu/UserMenu";

export default class Header extends React.Component {
    barStyle: CSSProperties = {

    };

    render() {
        return (
            <div className="app-header">
                {
                    Meteor.userId() ?
                        <UserMenu />
                        :
                        null
                }
                <Typography use="headline3">backfuel</Typography>
            </div>
        );
    }
}