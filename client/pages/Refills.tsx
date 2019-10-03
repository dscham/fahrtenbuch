import React, {Component} from "react";
import {Typography} from "@rmwc/typography";
import {withTracker} from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';
import RefillsCollection, {insert} from '../../imports/api/collections/Refills';
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
            <div style={{paddingBottom: '10rem'}}>

                <Typography use="headline3" tag="h3">Tankstopps</Typography>
                <Typography use="headline5" tag="p">Neu</Typography>

                <TextField outlined name="date" label="Datum" type="date" onChange={this.formChange}
                           value={this.state.date}/>
                <TextField outlined name="amount" label="Liter" type="number" onChange={this.formChange}
                           value={this.state.amount} style={{marginLeft: '5px'}}/>
                <br />
                <TextField outlined name="driven" label="Kilometer" type="number" onChange={this.formChange}
                           value={this.state.driven} style={{marginTop: '10px'}}/>
                <TextField outlined name="price" label="Preis" type="number" onChange={this.formChange}
                           value={this.state.price} style={{marginLeft: '5px', marginTop: '10px'}}/>
                <br/>
                <Button raised label="Senden" onClick={this.save} style={{marginTop: '10px', fontSize: '2rem', padding: '2rem'}}/>

                <Typography use="headline5" tag="p">Tankstopps</Typography>
                <br/>
                <DataTable>
                    <DataTableContent>
                        <DataTableHead>
                            <DataTableRow>
                                <DataTableHeadCell style={{fontSize: '2rem'}}>Datum</DataTableHeadCell>
                                <DataTableHeadCell style={{fontSize: '2rem'}} alignEnd>Liter</DataTableHeadCell>
                                <DataTableHeadCell style={{fontSize: '2rem'}} alignEnd>Kilometer</DataTableHeadCell>
                                <DataTableHeadCell style={{fontSize: '2rem'}} alignEnd>Preis</DataTableHeadCell>
                            </DataTableRow>
                        </DataTableHead>
                        <DataTableBody>
                            {
                                this.props.refills.map((refill, i) => {
                                    return (<DataTableRow key={i}>
                                        <DataTableCell style={{fontSize: '2rem'}}>{refill.date}</DataTableCell>
                                        <DataTableCell style={{fontSize: '2rem'}} alignEnd>{refill.amount}l</DataTableCell>
                                        <DataTableCell style={{fontSize: '2rem'}} alignEnd>{refill.driven}km</DataTableCell>
                                        <DataTableCell style={{fontSize: '2rem'}} alignEnd>{refill.price}€</DataTableCell>
                                    </DataTableRow>);
                                })
                            }
                        </DataTableBody>
                    </DataTableContent>
                </DataTable>
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