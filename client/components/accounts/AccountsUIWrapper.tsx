import React  from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';
import classNames from 'classnames';

interface Props {

}

interface State {

}

export default class AccountsUIWrapper extends React.Component<Props, State> {

    componentDidMount() {
        // Use Meteor Blaze to render login buttons
        this.view = Blaze.render(Template.loginButtons, ReactDOM.findDOMNode(this.refs.container));
    }

    componentDidUpdate() {
        // Clean up Blaze view
        Blaze.remove(this.view);
    }

    render() {
        // Just render a placeholder container that will be filled in
        return <span className="accounts-ui" ref="container" />;
    }
}

