import React from 'react';
import TextField from 'material-ui/lib/text-field';
import { Link } from 'react-router'
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
                    <Link  to="/timings" >Timings</Link>
                  </div>
                );
	}
}
export default Location;