import React, {Component} from "react";
import {Typography} from "@rmwc/typography";
//@ts-ignore
import {withTracker} from 'meteor/react-meteor-data';
//@ts-ignore
import {Meteor} from 'meteor/meteor';
import RefillsCollection, {insert, Refill} from '../../../../imports/api/collections/Refills';
import {TextField} from "@rmwc/textfield";
import {
    DataTable,
    DataTableBody,
    DataTableCell,
    DataTableContent,
    DataTableHead,
    DataTableHeadCell,
    DataTableRow
} from "@rmwc/data-table";
import {Button} from "@rmwc/button";
import {Fab} from "@rmwc/fab";
import '@rmwc/data-table/data-table.css';
import FloatingActionButton from "../../components/floating-action-button/FloatingActionButton";
import './style.scss'

interface State {
    date: string,
    amount: number,
    driven: number,
    price: number
}

class Refills extends Component<any, State> {
    readonly state = {
        date: "",
        amount: 0,
        driven: 0,
        price: 0
    };

    constructor(props: any) {
        super(props);


        this.formChange = this.formChange.bind(this);
        this.save = this.save.bind(this);
    }

    //@ts-ignore
    formChange(e) {
        e.persist();
        //@ts-ignore
        this.setState({[e.target.name]: e.target.value});
    }

    save() {
        insert.call({
            userId: Meteor.userId(),
            date: this.state.date,
            //@ts-ignore
            amount: parseFloat(this.state.amount),
            //@ts-ignore
            driven: parseFloat(this.state.driven),
            //@ts-ignore
            price: parseFloat(this.state.price)
        }, () => {

        });
    }

    render() {
        return (
            <div>
                <Typography use="headline4" tag="h3">Tankstopps</Typography>
                {Meteor.userId() ?
                    <DataTable>
                        <DataTableContent>
                            <DataTableHead>
                                <DataTableRow>
                                    <DataTableHeadCell>Datum</DataTableHeadCell>
                                    <DataTableHeadCell alignEnd>Liter</DataTableHeadCell>
                                    <DataTableHeadCell alignEnd>Kilometer</DataTableHeadCell>
                                    <DataTableHeadCell alignEnd>Preis</DataTableHeadCell>
                                </DataTableRow>
                            </DataTableHead>
                            <DataTableBody>
                                {
                                    this.props.refills.map((refill: Refill, i: number) => {
                                        return (<DataTableRow key={i}>
                                            <DataTableCell>{refill.date}</DataTableCell>
                                            <DataTableCell alignEnd>{refill.amount}l</DataTableCell>
                                            <DataTableCell alignEnd>{refill.driven}km</DataTableCell>
                                            <DataTableCell alignEnd>{refill.price}€</DataTableCell>
                                        </DataTableRow>);
                                    })
                                }
                            </DataTableBody>
                        </DataTableContent>
                    </DataTable>
                    :
                    null
                }
                <Fab icon="add" label="Neu" style={{position: 'fixed', bottom: '7.5em', right: '1.5em'}} />
            </div>
        );
    }
}

export default withTracker(() => {
    const handle = Meteor.subscribe('refills');
    return {
        loading: !handle.ready(),
        //@ts-ignore
        refills: RefillsCollection.find().fetch()
    };
})(Refills);