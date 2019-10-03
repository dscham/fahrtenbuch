import React, {Component} from "react";
import {Typography} from "@rmwc/typography";
import {withTracker} from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';
import RefillsCollection, {insert, Refill} from '../../imports/api/collections/Refills';
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
import '@rmwc/data-table/data-table.css';

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

    formChange(e) {
        e.persist();
        this.setState({[e.target.name]: e.target.value});
    }

    save() {
        insert.call({
            userId: Meteor.userId(),
            date: this.state.date,
            amount: parseFloat(this.state.amount),
            driven: parseFloat(this.state.driven),
            price: parseFloat(this.state.price)
        }, () => {

        });
    }

    render() {
        return (
            <div style={{paddingTop: '1em', paddingBottom: '5em'}}>

                <Typography use="headline4" tag="h3">Tankstopps</Typography>
                <Typography use="headline6" tag="p">Neu</Typography>

                <TextField outlined name="date" label="Datum" type="date" onChange={this.formChange}/>
                <TextField outlined name="amount" label="Liter" type="tel" onChange={this.formChange} style={{marginLeft: '5px'}}/>
                <br />
                <TextField outlined name="driven" label="Kilometer" type="tel" onChange={this.formChange} style={{marginTop: '10px'}}/>
                <TextField outlined name="price" label="Preis" type="tel" onChange={this.formChange} style={{marginLeft: '5px', marginTop: '10px'}}/>
                <br/>
                <Button raised label="Senden" onClick={this.save} style={{marginTop: '10px'}}/>

                <Typography use="headline5" tag="p">Tankstopps</Typography>
                <br/>
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
            </div>
        );
    }
}

export default withTracker(() => {
    const handle = Meteor.subscribe('refills');
    return {
        loading: !handle.ready(),
        refills: RefillsCollection.find().fetch()
    };
})(Refills);