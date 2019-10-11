import {Typography} from "@rmwc/typography";
import {TextField} from "@rmwc/textfield";
import {Button} from "@rmwc/button";
import React from "react";

<Typography use="headline6" tag="p">Neu</Typography>

    <TextField outlined name="date" label="Datum" type="date" onChange={this.formChange}/>
<TextField outlined name="amount" label="Liter" type="tel" onChange={this.formChange} style={{marginLeft: '5px'}}/>
<br />
<TextField outlined name="driven" label="Kilometer" type="tel" onChange={this.formChange} style={{marginTop: '10px'}}/>
<TextField outlined name="price" label="Preis" type="tel" onChange={this.formChange} style={{marginLeft: '5px', marginTop: '10px'}}/>
<br/>
<Button raised label="Senden" onClick={this.save} style={{marginTop: '10px'}}/>

<Typography use="headline5" tag="p">Tankstopps</Typography>