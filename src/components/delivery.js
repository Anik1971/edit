import React from 'react';
import TextField from 'material-ui/lib/text-field';
class Delivery extends React.Component {
	constructor(props){
		super(props);	
	}	
	render(){
		return (
            <div style={this.props.styles.slide}>
                <TextField fullWidth={true}
                    floatingLabelText="Delivery Pricing" />
                <TextField fullWidth={true}
                    floatingLabelText="Business Long Description" />
                <TextField fullWidth={true}
                    floatingLabelText="Floating Label Text" />
                <TextField fullWidth={true}
                    floatingLabelText="Floating Label Text" />
                <TextField fullWidth={true}
                    floatingLabelText="Floating Label Text" />
              </div>
            );
	}
}
export default Delivery;