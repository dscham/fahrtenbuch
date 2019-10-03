import React, { CSSProperties } from "react";
import { Button } from '@rmwc/button';
import BottomNavigationItem from "./BottomNavigationItem";
// @ts-ignore
import PropTypes from 'prop-types';

interface Props {
    callback: Function,
    "current-page": string,
    items: MenuItem[]
}

interface MenuItem {
    page: string,
    title: string,
    icon: string,
}

export default class BottomNavigation extends React.Component<Props, {}> {
    barStyle: CSSProperties = {
        position: 'fixed',
        display: 'flex',
        left: 0,
        bottom: 0,
        width: '100vw',
        zIndex: 10,
        paddingBottom: '1.5rem',
        paddingTop: '.75rem',
        textAlign: 'center',
        boxShadow: '0px -1px 5px 0px rgba(0,0,0,0.75)',
        background: 'white',
    };

    render() {
        return (
            <div style={this.barStyle}>
                {
                    this.props.items.map((item, i) => {
                        return (
                            <BottomNavigationItem
                                key={i}
                                icon={item.icon}
                                caption={item.title}
                                onClick={this.props.callback}
                                navigate={item.page}
                                active={this.props["current-page"] == item.page}/>
                        );
                    })
                }
            </div>
        );
    }
}