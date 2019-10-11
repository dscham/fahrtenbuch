import React, {Component} from 'react';
import {Typography} from '@rmwc/typography';
import BottomNavigationBar from "../../components/bottom-navigation/bar/BottomNavigationBar";
import Refills from "../app/refills/Refills";
import Cars from "../app/cars/Cars";
import Stats from "../app/stats/Stats";
import Header from "../../components/header/Header";
import AccountsUIWrapper from "../../components/accounts/AccountsUIWrapper";

interface State {

}

export default class Login extends Component<any, State> {
    readonly state = {};

    constructor(props: any) {
        super(props);
        this.render = this.render.bind(this);
    }

    render() {
        return (
            <div>
                <Header />
                <AccountsUIWrapper />
                <br />
            </div>
        )
    }
}