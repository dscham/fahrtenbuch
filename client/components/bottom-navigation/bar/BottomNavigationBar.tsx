import React, { CSSProperties } from "react";
import { Button } from '@rmwc/button';
import BottomNavigationItem from "../item/BottomNavigationItem";
import './style.scss';
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

export default class BottomNavigationBar extends React.Component<Props, {}> {

    render() {
        return (
            <div className="bottom-navigation">
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