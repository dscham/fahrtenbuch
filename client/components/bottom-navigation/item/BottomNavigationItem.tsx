import React, { CSSProperties } from "react";
import { Icon } from '@rmwc/icon';
import { Typography } from '@rmwc/typography';
import { Ripple } from '@rmwc/ripple';
import './style.scss';
//@ts-ignore
import classNames from 'classnames';
import {Link, NavLink} from "react-router-dom";

interface Props {
    navigate: string,
    caption: string,
    icon: string
}

export default class BottomNavigationItem extends React.Component<Props, {}> {
    private activeClasses = {
        "bottom-navigation-item": true,
        "active": true
    };

    render() {
        return (

                <NavLink to={this.props.navigate} className="bottom-navigation-item" activeClassName={classNames(this.activeClasses)}>
                    <Ripple>
                    <div>
                        <Icon className="icon" icon={this.props.icon} />
                        <br />
                        <Typography use='caption'>{this.props.caption}</Typography>
                    </div>
                    </Ripple>
                </NavLink>

        );
    }
}