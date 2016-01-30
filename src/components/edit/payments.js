import React from 'react';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import Dropzone from 'react-dropzone';
import ImageUpdater from './../dialogues/imageUpdater';
import SelectField from 'material-ui/lib/SelectField';
import MenuItem from 'material-ui/lib/menus/menu-item';
import FontIcon from 'material-ui/lib/font-icon';


class Payments extends React.Component {
    constructor(props) {
        super(props);
        let paymentStatus = 'Disabled';
        if (this.props.bData.paymentEnabled) {
            paymentStatus = 'Enabled';
        }
        let newExtras = this.props.bData.newExtras || {};
        this.state = {
            businessType:  newExtras.ownershipType || "Individual",
            panCard: newExtras.panCard || "",
            paymentEnabled: this.props.bData.paymentEnabled,
            paymentStatus: paymentStatus
        };
    }

    businessTypeChange(e, index, businessType) {
        this.setState({
            businessType: businessType
        }, function() {
            this.props.manageSave('show', 'ownershipType', this.state.businessType);
        });
    }

    render() {
        const businessTypes = ['Individual', 'Propreitorship', 'Partnership', 'Pvt Ltd Co'];
        const styles = {
            panCard: {
                width: 'calc(100% - 100px)'
            },
            upload: {
              marginLeft: 10  
            },
            displayHint: {
                fontSize: '0.7em',
                color: 'gray',
                padding: '10px 0'
            }
        };
        return (<div style={this.props.styles.slide}>
                    <div className="paymentBox">
                        <label className="paymentLabel">Payment status</label>
                        <span className="textView">{this.state.paymentStatus}</span>
                    </div>                    
                    <SelectField value={this.state.businessType}
	                	floatingLabelText="Business Type"
	            	    onChange={this.businessTypeChange.bind(this)}>
	            	    {businessTypes.map((businessType, index)=><MenuItem key={index} value={businessType} primaryText={businessType}/>)}
			       </SelectField>
			       <div style={styles.displayHint}>
			        Please fill in below fields and upload relevant documents
			       </div>
                    <TextField
                        floatingLabelText="PAN" 
                        style={styles.panCard}/>
                    <RaisedButton label="Upload" secondary={true} style={styles.upload}/>
                    <TextField 
                        floatingLabelText="IFSC:Bank Account Number" 
                        style={styles.panCard}/>
                    <RaisedButton label="Upload" secondary={true} style={styles.upload}/>
                    <TextField
                        floatingLabelText="PayU authorization letter" 
                        style={styles.panCard}/>
                    <RaisedButton label="Upload" secondary={true} style={styles.upload}/>
                    <TextField
                        floatingLabelText="Residential Address" 
                        style={styles.panCard}/>
                    <RaisedButton label="Upload" secondary={true} style={styles.upload}/>
                    <TextField
                        floatingLabelText="Email ID" 
                        style={styles.panCard}/>
                    <TextField 
                        floatingLabelText="VAT / CST / Trade license*" 
                        style={styles.panCard}/>
                    <RaisedButton label="Upload" secondary={true} style={styles.upload}/>
                    <div style={styles.displayHint}>
                    * Or other business registration proof issued by government
                    </div>
                    <TextField
                        floatingLabelText="Registration Fee Cheque" 
                        style={styles.panCard}/>
                    <RaisedButton label="Upload" secondary={true} style={styles.upload}/>

                  </div>);
    }
}
export default Payments;
