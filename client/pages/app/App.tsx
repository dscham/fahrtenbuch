import React, {Component} from 'react';
import {Typography} from '@rmwc/typography';
import BottomNavigationBar from "../../components/bottom-navigation/bar/BottomNavigationBar";
import Refills from "./refills/Refills";
import Cars from "./cars/Cars";
import Stats from "./stats/Stats";
import Header from "../../components/header/Header";
import {Route, Switch, Redirect} from 'react-router-dom';
import {withTracker} from "meteor/react-meteor-data";

interface State {
    page: string
}

class App extends Component<any, State> {
    readonly state = { page: 'refills' };

    constructor(props: any) {
        super(props);
        this.render = this.render.bind(this);
    }

    private menuItems = [
        {
            page: '/refills',
            title: 'Tankstopps',
            icon: 'local_gas_station',

        },
        {
            page: '/cars',
            title: 'Autos',
            icon: 'directions_car',

        },
        {
            page: '/stats',
            title: 'Statistiken',
            icon: 'bar_chart',

        }
    ];

    render() {
        return (
            <div className="page-body">
            {
                Meteor.userId() ?
                    <div>
                        <Switch>
                            <Route exact path="/">
                                <Redirect to="/refills" />
                            </Route>

                            <Route path="/refills">
                                <Refills />
                            </Route>
                            <Route path="/cars">
                                <Cars />
                            </Route>
                            <Route path="/stats">
                                <Stats />
                            </Route>
                        </Switch>
                        <BottomNavigationBar items={this.menuItems}/>
                    </div>
                    :
                    <Redirect to="/" />
            }
            </div>
        )
    }
}

export default withTracker(() => {
    return {};
})(App);