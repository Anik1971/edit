import React from 'react';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import Dropzone from 'react-dropzone';
import ImageUpdater from './../dialogues/imageUpdater';
import PaymentUploader from './../dialogues/paymentUploader';
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
            panCard_image: newExtras.panCard_image || "",
            bankAcc: newExtras.bankAcc || "",
            bankAcc_image: newExtras.bankAcc_image || "",
            payU:newExtras.payU || "",
            payU_image:newExtras.payU_image || "",
            resAddr:newExtras.resAddr || "",
            resAddr_image:newExtras.resAddr_image || "",
            payEmail:newExtras.payEmail || "",
            licence:newExtras.licence || "",
            licence_image:newExtras.licence_image || "",
            regFeeCheck:newExtras.regFeeCheck || "",

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
    onPanBlur(e){
        console.log('PAN',e.target.value);
        this.state.panCard = e.target.value;
        this.props.manageSave('show', 'panCard', e.target.value);
    }
    onBankAccBlur(e){
        console.log('bankAcc',e.target.value);
        this.state.bankAcc = e.target.value;
        this.props.manageSave('show','bankAcc',e.target.value);
    }
    onPayUBlur(e){
        console.log('payU',e.target.value);
        this.state.payU = e.target.value;
        this.props.manageSave('show','payU',e.target.value);
    }
    onResAddrBlur(e){
        console.log('ResAddr',e.target.value);
        this.state.resAddr = e.target.value;
        this.props.manageSave('show','resAddr',e.target.value);
    }
    onPayEmailBlur(e){
        console.log('onPayEmail',e.target.value);
        this.state.payEmail = e.target.value;
        this.props.manageSave('show','payEmail',e.target.value);
    }
    onLicenceBlur(e){
        console.log('licence',e.target.value);
        this.state.payEmail = e.target.value;
        this.props.manageSave('show','licence',e.target.value);
    }
    onRegFeeCheckBlur(e){
        console.log('RegFeeCheck',e.target.value);
        this.state.regFeeCheck = e.target.value;
        this.props.manageSave('show','regFeeCheck',e.target.value);
    }
    panCard_imageUpdate(imageUrl){
        console.log('panCard_imageUpdate',imageUrl);
        this.state.panCard_image = imageUrl;
        this.props.manageSave('show', 'panCard_image', imageUrl);
    }
    bankAcc_imageUpdate(imageUrl){
        console.log('bankAcc_imageUpdate',imageUrl);
        this.state.bankAcc_image = imageUrl;
        this.props.manageSave('show', 'bankAcc_image', imageUrl);
    }
    payU_imageUpdate(imageUrl){
        console.log('payU_imageUpdate',imageUrl);
        this.state.payU_image = imageUrl;
        this.props.manageSave('show', 'payU_image', imageUrl);
    }
    resAddr_imageUpdate(imageUrl){
        console.log('resAddr_imageUpdate',imageUrl);
        this.state.resAddr_image = imageUrl;
        this.props.manageSave('show', 'resAddr_image', imageUrl);
    }
    licence_imageUpdate(imageUrl){
        console.log('licence_imageUpdate',imageUrl);
        this.state.licence_image = imageUrl;
        this.props.manageSave('show', 'licence_image', imageUrl);
    }
    regFeeCheck_imageUpdate(imageUrl){
        console.log('regFeeCheck_imageUpdate',imageUrl);
        this.state.regFeeCheck_image = imageUrl;
        this.props.manageSave('show', 'regFeeCheck_image', imageUrl);
    }
    onPaymentChange(){
        this.props.manageSave('updation');
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
        return (<div style={this.props.styles.slide} className="paymentWrapper">
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
                   <div className="paymentRow">
                        <TextField
                            className="paymentText"
                            floatingLabelText="PAN" 
                            style={styles.panCard}
                            defaultValue={this.state.panCard}
                            onChange={this.onPaymentChange.bind(this)}
                            onBlur={this.onPanBlur.bind(this)}/>
                        <PaymentUploader
                            image={this.state.panCard_image}                
                            postUpload={this.panCard_imageUpdate.bind(this)} 
                            title={'PAN'} />
                    </div>
                    <div className="paymentRow">
                        <TextField 
                            className="paymentText"
                            floatingLabelText="IFSC:Bank Account Number" 
                            style={styles.panCard}
                            defaultValue={this.state.bankAcc}
                            onChange={this.onPaymentChange.bind(this)}
                            onBlur={this.onBankAccBlur.bind(this)}/>
                        <PaymentUploader
                            image={this.state.bankAcc_image}                
                            postUpload={this.bankAcc_imageUpdate.bind(this)} 
                            title={'IFSC:Bank Account Number'}/>
                    </div>
                     <div className={'paymentRow paymenthide-'+(this.state.businessType!='Individual')}>
                         <TextField
                             className="paymentText"
                             floatingLabelText="Residential Address" 
                             style={styles.panCard}
                             defaultValue={this.state.resAddr}
                             onChange={this.onPaymentChange.bind(this)}
                             onBlur={this.onResAddrBlur.bind(this)}/>
                         <PaymentUploader
                             image={this.state.resAddr_image}                
                             postUpload={this.resAddr_imageUpdate.bind(this)} 
                             title={'Residential Address'}/>
                    </div>
                    <div className={'paymentRow paymenthide-'+(this.state.businessType=='Individual')}>
                        <TextField
                            className="paymentText"
                            floatingLabelText="VAT / CST / Trade license*" 
                            style={styles.panCard}
                            defaultValue={this.state.licence}
                            onChange={this.onPaymentChange.bind(this)}
                            onBlur={this.onLicenceBlur.bind(this)}/>
                        <PaymentUploader
                            image={this.state.licence_image}                
                            postUpload={this.licence_imageUpdate.bind(this)} 
                            title={'VAT / CST / Trade license'}/>
                    </div>
                    <div className={'paymentRow paymenthide-'+(this.state.businessType!='Individual')}
                         style={styles.displayHint}>
                    * Or other business registration proof issued by government
                    </div>
                  </div>);
    }
}
export default Payments;
