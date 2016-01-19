import React from 'react';
import TextField from 'material-ui/lib/text-field';
import Toggle from 'material-ui/lib/toggle';
import RadioButton from 'material-ui/lib/radio-button';
import RadioButtonGroup from 'material-ui/lib/radio-button-group';
import SelectField from 'material-ui/lib/SelectField';
import MenuItem from 'material-ui/lib/menus/menu-item';



class Delivery extends React.Component {
	constructor(props){
		super(props);	
    let homeDelivery = 'hidden';
    let homeDeliveryEnabled = false;
    if(this.props.bData.serviceAreas != ''){
      homeDelivery = '';
      homeDeliveryEnabled = true;
    }
    this.state={
      homeDeliveryEnabled: homeDeliveryEnabled,
      homeDelivery: homeDelivery,
      deliveryPricing: 'standard',
      deliveryPricingStandard: '',
      deliveryPricingCustom: 'hidden',
      minimumOrder: 0,
      deliveryCharge: 0,
      freeDeliveryAbove: 0,
      customDeliveryPricing: ''
    };
	}	
  deliveryPricingChange(e, index, deliveryPricing){
    this.setState({deliveryPricing});
    if(deliveryPricing == 'standard'){
      this.setState({
        deliveryPricingStandard : '',
        deliveryPricingCustom : 'hidden'
      });
    }else{
      this.setState({
        deliveryPricingStandard : 'hidden',
        deliveryPricingCustom : ''
      });
    }
  }
  onDeliveryStatusToggle(e, deliveryStatus){
      console.log(deliveryStatus);
      if(deliveryStatus){
        this.setState({
          homeDelivery: '',
          homeDeliveryEnabled: true
        });
      }else{
        this.setState({
          homeDelivery: 'hidden',
          homeDeliveryEnabled: false
        });
      }
  }
	render(){
		return (
            <div style={this.props.styles.slide}>
                <Toggle
                  name="deliveryStatus"
                  value="delivery"
                  label="Home Delivery"
                  defaultToggled={this.state.homeDeliveryEnabled}
                  onToggle={this.onDeliveryStatusToggle.bind(this)}
                  className="row"/>  
                <div className={this.state.homeDelivery}>              
                  <SelectField value={this.state.deliveryPricing}
                        floatingLabelText="Delivery Pricing"
                        onChange={this.deliveryPricingChange.bind(this)}>
                      <MenuItem value={"standard"} primaryText="standard"/>
                      <MenuItem value={"custom"} primaryText="custom"/>                    
                  </SelectField>
                  <div className={this.state.deliveryPricingStandard} id="deliveryPricingStandard">
                    <div className="subContent">
                      <TextField fullWidth={true}
                          floatingLabelText={"Minimum Order"}
                          value={this.state.minimumOrder} />
                      <TextField fullWidth={true}
                          floatingLabelText="Delivery Charge"                        
                          value={this.state.deliveryCharge} /> 
                      <TextField fullWidth={true}
                          floatingLabelText="Free Delivery Above"                        
                          value={this.state.freeDeliveryAbove} /> 
                    </div>
                  </div>
                  <div className={this.state.deliveryPricingCustom} id="deliveryPricingCustom">
                    <div className="subContent">
                      <TextField fullWidth={true}
                          floatingLabelText={"Custom delivery pricing"}
                          value={this.state.customDeliveryPricing} />                    
                    </div>
                  </div>                  
                  <div className="row">
                      Select2 box for Delivery areas
                  </div>
                </div>
              </div>
            );
	}
}
export default Delivery;