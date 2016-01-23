import React from 'react';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import Dropzone from 'react-dropzone';
import DocumentUploader from './../dialogues/documentUploader';
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
    businessDocUpdate(imageurl){
        console.log("Document",imageurl);
        let pending = this.props.bData.appExtras.pending;
        if(pending){
            if(pending.document){
                pending.document.push(imageurl);
            }else{
                pending.document = [];
                pending.document.push(imageurl);
            }
        }else{
            pending = {};
            pending.document = [];
            pending.document.push(imageurl);
        }
        this.props.manageSave('show','pending',pending);
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
                        <DocumentUploader 
                                open={true}
                                image={this.state.profileImage}                 
                                postUpload={this.businessDocUpdate.bind(this)} />
                    </div>
                  </div>
                );
    }
}
export default Payments;

