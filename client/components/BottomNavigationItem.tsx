import React, { CSSProperties } from "react";
import { Icon } from '@rmwc/icon';
import { Typography } from '@rmwc/typography';
import { Ripple } from '@rmwc/ripple';

interface Props {
    onClick: Function,
    navigate: string,
    caption: string,
    icon: string,
    active: boolean
}

export default class BottomNavigationItem extends React.Component<Props, {}> {

    divStyle: CSSProperties = {
        width: '25%',
        textAlign: "center",
        cursor: 'pointer',
        borderLeft: '1px solid black',
    };

    activeDivStyle: CSSProperties = {
        width: '25%',
        textAlign: "center",
        cursor: 'pointer',
        borderLeft: '1px solid black',
        color: 'limegreen'
    };

    iconStyle: CSSProperties = {
        fontSize: '3rem',
    };

    render() {
        return (
            <Ripple>
                <div style={!!this.props.active ? this.activeDivStyle : this.divStyle} onClick={() => { this.props.onClick(this.props.navigate)}}>
                    <Icon style={this.iconStyle} icon={this.props.icon} />
                    <br />
                    <Typography use='overline'>{this.props.caption}</Typography>
                </div>
            </Ripple>
        );
    }
}