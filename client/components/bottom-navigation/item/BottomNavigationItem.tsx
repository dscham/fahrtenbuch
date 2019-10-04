import React, { CSSProperties } from "react";
import { Icon } from '@rmwc/icon';
import { Typography } from '@rmwc/typography';
import { Ripple } from '@rmwc/ripple';
import './style.scss';
//@ts-ignore
import classNames from 'classnames';

interface Props {
    onClick: Function,
    navigate: string,
    caption: string,
    icon: string,
    active: boolean
}

export default class BottomNavigationItem extends React.Component<Props, {}> {

    private getClasses() {
        return {
            'bottom-navigation-item': true,
            'active': this.props.active
        };
    }

    render() {
        return (
            <Ripple>
                <div className={classNames(this.getClasses())}
                     onClick={() => { this.props.onClick(this.props.navigate)}}>
                    <Icon className="icon" icon={this.props.icon} />
                    <br />
                    <Typography use='caption'>{this.props.caption}</Typography>
                </div>
            </Ripple>
        );
    }
}