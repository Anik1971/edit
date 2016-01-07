import React from 'react';
import TextField from 'material-ui/lib/text-field';
class Payments extends React.Component {
    constructor(props){
        super(props);   
    }   
    render(){
        return (<div style={this.props.styles.slide}>
                    <TextField fullWidth={true}
                        floatingLabelText="Busi" />
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
export default Payments;

