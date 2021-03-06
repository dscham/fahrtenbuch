import React, {Component} from 'react';
import {Typography} from '@rmwc/typography';
import BottomNavigation from "./components/BottomNavigation";
import Home from "./pages/Home";
import Refills from "./pages/Refills";
import Cars from "./pages/Cars";
import Drives from "./pages/Drives";
import AccountsUIWrapper from "./components/AccountsUIWrapper";
import Header from "./components/Header";

interface State {
    page: string
}

export default class App extends Component<any, State> {
    readonly state = { page: 'refills' };

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
            case 'refills':
                return <Refills />;
            case 'drives':
                return <Drives />;
            default:
                return null;
        }
    }

    private menuItems = [
        {
            page: 'refills',
            title: 'Tankstopps',
            icon: 'local_gas_station',
        }
    ];

    render() {
        return (
            <div>
                <Header />
                <br />
                {this.getPage()}
                <BottomNavigation callback={this.changePage} current-page={this.state.page} items={this.menuItems}/>
            </div>
        )
    }
}