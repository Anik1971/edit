import React from 'react';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
class Payments extends React.Component {
    constructor(props){
        super(props);  
        let paymentStatus = 'Disabled';
        if(this.props.bData.paymentEnabled){
            paymentStatus = 'Enabled';
        }
        this.state = {
            paymentEnabled : this.props.bData.paymentEnabled,
            paymentStatus : paymentStatus
        } 
    }   
    render(){
        return (<div style={this.props.styles.slide}>
                    <TextField
                        hintText="Status"
                        disabled={true}
                        fullWidth={true}
                        defaultValue={this.state.paymentStatus}
                        floatingLabelText="Status" />
                    <TextField fullWidth={true}
                        floatingLabelText="PAN" />
                    <TextField fullWidth={true}
                        floatingLabelText="Bank Acc" />
                    <TextField fullWidth={true}
                        floatingLabelText="IFSC" />
                    <TextField fullWidth={true}
                        floatingLabelText="VAT/TIN/Sevice Taxa" />
                    <div className="row">
                        <RaisedButton
                            secondary={true}
                            fullWidth={true} 
                            label="Upload Documents">
                          <input 
                            className="imageUploadButton" 
                            type="file" 
                            id="imageButton" />
                        </RaisedButton>
                    </div>
                  </div>
                );
    }
}
export default Payments;

