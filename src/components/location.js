import React from 'react';
import TextField from 'material-ui/lib/text-field';
class Location extends React.Component {
	constructor(props){
		super(props);	
	}	
	render(){
		return (<div style={this.props.styles.slide}>
                    <TextField fullWidth={true}
                        floatingLabelText="City" />
                    <TextField fullWidth={true}
                        floatingLabelText="Locality" />
                    <TextField fullWidth={true}
                        floatingLabelText="Address" />
                  </div>
                );
	}
}
export default Location;