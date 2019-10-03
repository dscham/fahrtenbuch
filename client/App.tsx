import React, {Component} from 'react';
import {Typography} from '@rmwc/typography';
import BottomNavigation from "./components/BottomNavigation";
import Home from "./pages/Home";
import Gasups from "./pages/Gasups";
import Cars from "./pages/Cars";
import Drives from "./pages/Drives";
import AccountsUIWrapper from "./components/AccountsUIWrapper";

interface State {
    page: string
}

export default class App extends Component<any, State> {
    readonly state = { page: 'gasups' };

    constructor(props: any) {
        super(props);
        this.render = this.render.bind(this);
        this.changePage = this.changePage.bind(this);
    }

    private changePage(page: string) {
        this.setState({
           page: page
        });
    }

    private getPage() {
        switch (this.state.page) {
            case 'home':
                return <Home />;
            case 'cars':
                return <Cars />;
            case 'gasups':
                return <Gasups />;
            case 'drives':
                return <Drives />;
            default:
                return null;
        }
    }

    private menuItems = [
        {
            page: 'gasups',
            title: 'Tankstopps',
            icon: 'local_gas_station',
        }
    ];

    render() {
        return (
            <div>
                <AccountsUIWrapper />
                <br />
                {this.getPage()}
                <BottomNavigation callback={this.changePage} current-page={this.state.page} items={this.menuItems}/>
            </div>
        )
    }
}