import React from 'react';
import TextField from 'material-ui/lib/text-field';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
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
        let document = '';
        if (this.props.bData.appExtras && this.props.bData.appExtras.approved && this.props.bData.appExtras.approved.document) {
            document = this.props.bData.appExtras.approved.document;
        }
        this.state = {
            businessType: this.props.bData.businessType || "Individual",
            paymentEnabled: this.props.bData.paymentEnabled,
            paymentStatus: paymentStatus,
            document: document
        };
    }

    businessTypeChange(e, index, businessType) {
        this.setState({
            businessType: businessType
        }, function() {
            this.props.manageSave('show', 'ownershipType', this.state.businessType);
        });
    }

    businessDocUpdate(imageurl) {
        console.log("Document", imageurl);
        let pending = this.props.bData.appExtras.pending;
        if (pending) {
            if (pending.document) {
                pending.document.push(imageurl);
            }
            else {
                pending.document = [];
                pending.document.push(imageurl);
            }
        }
        else {
            pending = {};
            pending.document = [];
            pending.document.push(imageurl);
        }
        this.props.manageSave('show', 'pending', pending);
    }
    render() {
        let image = this.state.approved;
        const businessTypes = ['Individual', 'Propreitorship', 'Partnership', 'Pvt Ltd Co'];
        const styles = {
            panCard: {
                width: '70%'
            },
            displayHint: {
                fontSize: '0.7em',
                color: 'gray',
                padding: '10px 0'
            }
        };
        if (!image) {
            image = 'http://www.mp3alive.com/no_photo.jpg';
        }
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
                    <FloatingActionButton mini={true}>
                        <ContentAdd />
                    </FloatingActionButton>
                    <TextField 
                        floatingLabelText="Cancelled Cheque" 
                        style={styles.panCard}/>
                    <FontIcon className="material-icons">file_upload</FontIcon>
                    <TextField 
                        floatingLabelText="VAT / CST / Trade license*" 
                        style={styles.panCard}/>
                    <FontIcon className="material-icons">file_upload</FontIcon>
                    <div style={styles.displayHint}>
                    * Or other business registration proff issued by government
                    </div>
                  </div>);
    }
}
export default Payments;
