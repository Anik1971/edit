import React from 'react';
import TextField from 'material-ui/lib/text-field';
import Toggle from 'material-ui/lib/toggle';
import RadioButton from 'material-ui/lib/radio-button';
import RadioButtonGroup from 'material-ui/lib/radio-button-group';

class Delivery extends React.Component {
	constructor(props){
		super(props);	
	}	
	render(){
		return (
            <div style={this.props.styles.slide}>
                <Toggle
                  name="deliveryStatus"
                  value="toggleValue1"
                  label="Home Delivery"
                   className="row"/>
                <div className="row">
                    Delivery Pricing
                    <RadioButtonGroup name="shipSpeed" defaultSelected="not_light">
                        <RadioButton
                          value="standard"
                          label="Standard"
                          className="subContent"/>
                        <RadioButton
                          value="custom"
                          label="Custom"
                          className="subContent"/>                    
                    </RadioButtonGroup>
                </div>
                <TextField fullWidth={true}
                    floatingLabelText="Delivery Pricing" />
                <TextField fullWidth={true}
                    floatingLabelText="Business Long Description" />
              </div>
            );
	}
}
export default Delivery;