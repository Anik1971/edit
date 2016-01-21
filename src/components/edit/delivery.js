import React from 'react';
import TextField from 'material-ui/lib/text-field';
import Toggle from 'material-ui/lib/toggle';
import RadioButton from 'material-ui/lib/radio-button';
import RadioButtonGroup from 'material-ui/lib/radio-button-group';
import SelectField from 'material-ui/lib/SelectField';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Geosuggest from 'react-geosuggest';



class Delivery extends React.Component {
	constructor(props){
		super(props);	
    let homeDelivery = 'hidden';
    let homeDeliveryEnabled = false;
    if(this.props.bData.serviceAreas != ''){
      homeDelivery = '';
      homeDeliveryEnabled = true;
    }
    let minimumOrderAmount = '';
    let deliveryCharge = '';
    let freeDeliveryAmount = '';
    //classNames
    let deliveryPricingCustom = '';
    let deliveryPricingStandard = '';
    if(this.props.bData.deliveryPricing && this.props.bData.deliveryPricing.standard){
      if(this.props.bData.deliveryPricing.standard.minimumOrderAmount){
        minimumOrderAmount = this.props.bData.deliveryPricing.standard.minimumOrderAmount;
      }
      if(this.props.bData.deliveryPricing.standard.deliveryCharge){
        deliveryCharge = this.props.bData.deliveryPricing.standard.deliveryCharge;
      }
      if(this.props.bData.deliveryPricing.standard.freeDeliveryAmount){
        freeDeliveryAmount = this.props.bData.deliveryPricing.standard.freeDeliveryAmount;
      }
    }
    if(minimumOrderAmount || deliveryCharge || freeDeliveryAmount){
      deliveryPricingCustom = 'hidden';
      deliveryPricingStandard = '';
    }else{
      deliveryPricingStandard = 'hidden';
      deliveryPricingCustom = '';
    }
    this.state={
      homeDeliveryEnabled: homeDeliveryEnabled,
      homeDelivery: homeDelivery,
      deliveryPricing: 'standard',
      deliveryPricingStandard: deliveryPricingStandard,
      deliveryPricingCustom: deliveryPricingCustom,
      minimumOrder: minimumOrderAmount,
      deliveryCharge: deliveryCharge,
      freeDeliveryAbove: freeDeliveryAmount,
      customDeliveryPricing: '',
      serviceLimit:5,
      serviceClass:[],
      serviceAreas:[],
      serviceAreasObj:[]
    };  
    this.state.serviceClass[0] = '';
    for(let i=1;i<this.state.serviceLimit;i++){
      this.state.serviceClass.push('hidden');
    }
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
  onMinimumOrderChange(e){
    this.setState({
      minimumOrder:e.target.value
    },function(){
      this.props.manageSave('show','deliveryPricing.standard.minimumOrderAmount',this.state.minimumOrder);
    });
  }
  onDeliveryChargeChange(e){
    this.setState({
      deliveryCharge:e.target.value
    },function(){
      this.props.manageSave('show','deliveryPricing.standard.deliveryCharge',this.state.deliveryCharge);
    });
  }
  onFreeDeliveryAboveChange(e){
    this.setState({
      freeDeliveryAbove:e.target.value
    },function(){
      this.props.manageSave('show','deliveryPricing.standard.freeDeliveryAmount',this.state.freeDeliveryAbove);
    });
  }
  onCustomDeliveryPricingChange(e){
    this.setState({
      customDeliveryPricing:e.target.value
    },function(){
      this.props.manageSave('show','deliveryPricing.custom.customDeliveryPricing',this.state.customDeliveryPricing);
    });
  }
  onServiceAreaChange(index,textField){
    console.log('onServiceAreaChange',index);
    this.state.serviceAreas[index] = textField.target.value;
    this.props.manageSave('show','serviceArea',this.state.serviceAreas.join());
    if(textField.target.value.length>0 && this.state.serviceLimit >= index){
      this.state.serviceClass[index+1] = '';  
    }else if(index>0 && textField.target.value.length == 0){
      this.state.serviceClass[index] = 'hidden';  
    }
  }
  getLocatlitySuggestLabel(index,suggest){
    console.log('locality Label:',suggest);
    let locality = [],termsLength = 0;
    termsLength = suggest.terms.length;
    suggest.terms.forEach(term => {
        locality.push(term.value);
    });
    locality.splice(termsLength-3,termsLength);
    let localityLabel = locality.join();
    return localityLabel;
  }
  skipLocalitySuggest(index,suggest){
    console.log('skipLocalitySuggest',suggest);
    let city = '',termsLength = 0;
    termsLength = suggest.terms.length;
  }
  onLocalitySuggestSelect(index,location){
    console.log('onLocalitySuggestSelect',location);
    let serviceAreas = this.state.serviceAreas;
    let serviceAreasObj = this.state.serviceAreasObj;
    
    serviceAreas[index] = location.label;
    let serviceObjModal = {
      name: location.label,
      placeId: location.placeId,
      geocode_output: {
        geometry: {
          location: {
            lat: location.location.lat,
            lng: location.location.lng
          }
        }
      }
    };
    let vp = location.gmaps.geometry.viewport;
    if(vp){
      serviceObjModal.geocode_output.geometry.viewport = {
        north: vp.getNorthEast().lat(),
        east: vp.getNorthEast().lng(),
        south: vp.getSouthWest().lat(),
        west: vp.getSouthWest().lng()
      };
    }
    serviceAreasObj[index] = serviceObjModal;
    this.setState({
        serviceAreas:serviceAreas,
        serviceAreasObj:serviceAreasObj
    },function(){
        this.props.manageSave('show','serviceAreas',this.state.serviceAreasObj);
        if(this.state.serviceAreas.length>0 && this.state.serviceLimit >= index){
          this.state.serviceClass[index+1] = '';  
        }else if(index>0 && this.state.serviceAreas.length == 0){
          this.state.serviceClass[index] = 'hidden';  
        }
    });
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
                          value={this.state.minimumOrder} 
                          onChange = {this.onMinimumOrderChange.bind(this)} />
                      <TextField fullWidth={true}
                          floatingLabelText="Delivery Charge"                        
                          value={this.state.deliveryCharge} 
                          onChange = {this.onDeliveryChargeChange.bind(this)} />
                      <TextField fullWidth={true}
                          floatingLabelText="Free Delivery Above"                        
                          value={this.state.freeDeliveryAbove} 
                          onChange = {this.onFreeDeliveryAboveChange.bind(this)} />
                    </div>
                  </div>
                  <div className={this.state.deliveryPricingCustom} id="deliveryPricingCustom">
                    <div className="subContent">
                      <TextField fullWidth={true}
                          floatingLabelText={"Custom delivery pricing"}
                          value={this.state.customDeliveryPricing} 
                          onChange = {this.onCustomDeliveryPricingChange.bind(this)} />                    
                    </div>
                  </div>                  
                  {  
                    this.state.serviceClass.map((className, index) => {
                      let serviceText = "Service Area "+(index+1);
                      let _className = "GeoSuggestList "+className;
                      return (<Geosuggest 
                        placeholder={serviceText}
                        className={_className}
                        inputClassName={"GeoSuggestinput"}
                        autoActivateFirstSuggest={true}
                        country={"in"}                        
                        getSuggestLabel={this.getLocatlitySuggestLabel.bind(this,index)}
                        skipSuggest={this.skipLocalitySuggest.bind(this,index)}
                        onSuggestSelect={this.onLocalitySuggestSelect.bind(this,index)} 
                        initialValue = {this.state.serviceAreas[index]}
                        key={index} />)   
                    })
                  } 
                </div>
              </div>
            );
	}
}
export default Delivery;