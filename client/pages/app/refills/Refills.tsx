import React, {Component, CSSProperties} from "react";
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

interface Props {

}

interface State {
    date: string,
    amount: number,
    driven: number,
    price: number,
    formOpen: boolean
}

class Refills extends Component<Props, State> {
    readonly state = {
        date: "",
        amount: 0,
        driven: 0,
        price: 0,
        formOpen: false
    };
    constructor(props: any) {
        super(props);


        this.formChange = this.formChange.bind(this);
        this.save = this.save.bind(this);
        this.showFormClicked = this.showFormClicked.bind(this);
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

    showForm(formOpen: boolean): CSSProperties {
        return formOpen ? {visibility: 'visible', display: 'flex'} : {visibility: 'hidden', display: 'none'};
    }

    showFormClicked() {
        this.setState({
            ...this.state,
            formOpen: !this.state.formOpen
        });
    }

    getClassForForm(): string {
        return this.state.formOpen ? 'open' : 'closed';
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
                                            <DataTableCell alignEnd>{refill.price.toFixed(2)}€</DataTableCell>
                                        </DataTableRow>);
                                    })
                                }
                            </DataTableBody>
                        </DataTableContent>
                    </DataTable>
                    :
                    null
                }
                <div id="refill-form-sheet" className={this.getClassForForm()}>
                    <div id="new-refill-button" >
                        <Fab icon="close" onClick={this.showFormClicked} style={this.showForm(this.state.formOpen)} />
                        <Fab icon="add" label="Neu" onClick={this.showFormClicked} style={this.showForm(!this.state.formOpen)}/>
                    </div>
                    <div id="refill-form" style={this.showForm(this.state.formOpen)}>
                        <TextField name="date" label="Datum" type="date" onChange={this.formChange}/>
                        <TextField name="amount" label="Liter" type="tel" onChange={this.formChange}/>
                        <TextField name="driven" label="Kilometer" type="tel" onChange={this.formChange}/>
                        <TextField name="price" label="Preis" type="tel" onChange={this.formChange}/>
                        <Button raised label="Speichern" onClick={this.save}  style={this.showForm(this.state.formOpen)}/>
                    </div>
                </div>
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