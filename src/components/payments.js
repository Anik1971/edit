import React from 'react';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
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

