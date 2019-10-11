import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Header from "./components/header/Header";
import Login from "./pages/login/Login";
import App from "./pages/app/App";
import {withTracker} from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";

interface State {}

class Main extends Component  {

    render() {
        return (
            <div>
                <Header />
                <Router>
                    <Switch>
                        <Route path="/">
                            {
                                Meteor.userId() ?
                                    <App/>
                                    :
                                    <Login />
                            }
                        </Route>
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default withTracker(() => {
    Meteor.subscribe('users');
    return ({
        users: Meteor.users.find({}).fetch(),
    });
})(Main);