import React from 'react';
import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';
class Payments extends React.Component {
    constructor(props){
        super(props);   
    }   
    render(){
        return (<div style={this.props.styles.slide}>
                    <TextField
                        hintText="Status"
                        disabled={true}
                        fullWidth={true}
                        defaultValue="Disabled"
                        floatingLabelText="Status" />
                    <TextField fullWidth={true}
                        floatingLabelText="PAN" />
                    <TextField fullWidth={true}
                        floatingLabelText="Bank Acc" />
                    <TextField fullWidth={true}
                        floatingLabelText="IFSE" />
                    <TextField fullWidth={true}
                        floatingLabelText="VAT/TIN/Sevice Taxa" />
                    <FlatButton primary={true} label="Upload Documents">
                      <input type="file" id="imageButton" />
                    </FlatButton>
                  </div>
                );
    }
}
export default Payments;

