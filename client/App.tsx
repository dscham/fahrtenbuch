import React, {Component} from 'react';
import {Typography} from '@rmwc/typography';
import BottomNavigationBar from "./components/bottom-navigation/bar/BottomNavigationBar";
import Refills from "./pages/refills/Refills";
import Cars from "./pages/cars/Cars";
import Stats from "./pages/stats/Stats";
import Header from "./components/header/Header";

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
            case 'cars':
                return <Cars />;
            case 'refills':
                return <Refills />;
            case 'stats':
                return <Stats />;
            default:
                return null;
        }
    }

    private menuItems = [
        {
            page: 'refills',
            title: 'Tankstopps',
            icon: 'local_gas_station',

        },
        {
            page: 'cars',
            title: 'Autos',
            icon: 'directions_car',

        },
        {
            page: 'stats',
            title: 'Statistiken',
            icon: 'bar_chart',

        }
    ];

    render() {
        return (
            <div>
                <Header />
                <br />
                {this.getPage()}
                <BottomNavigationBar callback={this.changePage} current-page={this.state.page} items={this.menuItems}/>
            </div>
        )
    }
}