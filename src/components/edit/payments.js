import React from 'react';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import Dropzone from 'react-dropzone';
import ImageUpdater from './../dialogues/imageUpdater';
class Payments extends React.Component {
    constructor(props){
        super(props);  
        let paymentStatus = 'Disabled';
        if(this.props.bData.paymentEnabled){
            paymentStatus = 'Enabled';
        }
        let document = '';
        if(this.props.bData.appExtras && this.props.bData.appExtras.approved && this.props.bData.appExtras.approved.document){
            document = this.props.bData.appExtras.approved.document;
        }
        this.state = {
            paymentEnabled : this.props.bData.paymentEnabled,
            paymentStatus : paymentStatus,
            document: document
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
        let document = this.state.approved;
        if(!document){
            document = 'http://www.mp3alive.com/no_photo.jpg';
        }
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
                        Document Upload: 
                        <ImageUpdater 
                            image={document}                 
                            postUpload={this.businessDocUpdate.bind(this)} />
                    </div>
                  </div>
                );
    }
}
export default Payments;

