import React from 'react';
import TextField from 'material-ui/lib/text-field';
import Toggle from 'material-ui/lib/toggle';
import RadioButton from 'material-ui/lib/radio-button';
import RadioButtonGroup from 'material-ui/lib/radio-button-group';
import SelectField from 'material-ui/lib/SelectField';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Geosuggest from 'react-geosuggest';
import ClearIcon from 'material-ui/lib/svg-icons/content/clear';
import Colors from 'material-ui/lib/styles/colors';

const styles = {
  closeIcon : {
    width:'14px',
    height:'14px'
  }
}

class Delivery extends React.Component {
	constructor(props){
		super(props);	
    let homeDelivery = 'hidden';
    let homeDeliveryEnabled = false;
    let tempServiceAreas = [];
    let serviceAreasObj = [];
    if(this.props.bData.serviceAreas.areas){
      homeDelivery = '';
      homeDeliveryEnabled = true;
      for(let key in this.props.bData.serviceAreas.areas){
        tempServiceAreas.push(this.props.bData.serviceAreas.areas[key].name);
      }
      serviceAreasObj = this.props.bData.serviceAreas.areas;
    }else{
      tempServiceAreas = [];
      serviceAreasObj = [];
    }
    let minimumOrderAmount = '';
    let deliveryCharge = '';
    let freeDeliveryAmount = '';
    let customDeliveryPricing = '';
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
    if(this.props.bData.deliveryPricing && this.props.bData.deliveryPricing.custom){
      customDeliveryPricing = this.props.bData.deliveryPricing.custom.customDeliveryPricing;
    }
    let deliveryPricing = 'standard';
    if(minimumOrderAmount || deliveryCharge || freeDeliveryAmount){
      deliveryPricingCustom = 'hidden';
      deliveryPricingStandard = '';
      deliveryPricing = 'standard';
    }else{
      deliveryPricingStandard = 'hidden';
      deliveryPricingCustom = '';
      deliveryPricing = 'custom';
    }
    let errorText = {};
    this.state={
      homeDeliveryEnabled: homeDeliveryEnabled,
      homeDelivery: homeDelivery,
      deliveryPricing: deliveryPricing,
      deliveryPricingStandard: deliveryPricingStandard,
      deliveryPricingCustom: deliveryPricingCustom,
      minimumOrder: minimumOrderAmount,
      deliveryCharge: deliveryCharge,
      freeDeliveryAbove: freeDeliveryAmount,
      customDeliveryPricing: customDeliveryPricing,
      serviceLimit:20,
      serviceClass:[],
      serviceAreas:tempServiceAreas,
      serviceAreasObj:serviceAreasObj,
      geoInitialVal:'',
      errorText: errorText,
      errorFlag: false
    };  
    this.state.serviceClass[0] = '';
    for(let i=0;i<this.state.serviceLimit;i++){
      this.state.serviceClass.push('hidden');
    }
    for(let i=0;i<tempServiceAreas.length+1;i++){
      this.state.serviceClass.push('hidden');
    }
    this.deliveryVaildation.bind(this);
	}	
  deliveryVaildation(){
    console.log('deliveryVaildation');
    let errorText = this.state.errorText;
    if(this.state.homeDeliveryEnabled){
      if(this.state.serviceAreas.length == 0){
        errorText['serviceAreas'] = 'Service Areas is required';
        this.state.errorText = errorText;
        window.errorStack['serviceAreas'] = {
          text: errorText['serviceAreas'],
          tab: 2 
        };
      }else{
        errorText['serviceAreas'] = '';
        delete window.errorStack['serviceAreas'];
        window.errorStack['serviceAreas'] = {
          text: errorText['serviceAreas'],
          tab: 2 
        };
      }

      if(this.state.deliveryPricing == 'standard'){
        if(!this.state.minimumOrder || this.state.minimumOrder <=0 ){
          errorText['minimumOrder'] = 'Minimum Order is required';
          this.state.errorText = errorText;
          window.errorStack['minimumOrder'] = {
            text: errorText['minimumOrder'],
            tab: 2 
          };
        }else if(isNaN(this.state.minimumOrder)){
          errorText['minimumOrder'] = 'Minimum Order must be a number';
          this.state.errorText = errorText;
          window.errorStack['minimumOrder'] = {
            text: errorText['minimumOrder'],
            tab: 2 
          };
        }else{
          errorText['minimumOrder'] = '';
          delete window.errorStack['minimumOrder'];
          window.errorStack['minimumOrder'] = {
            text: errorText['minimumOrder'],
            tab: 2 
          };
        }

        if(this.state.deliveryCharge && this.state.deliveryCharge.length && isNaN(this.state.deliveryCharge)){
          errorText['deliveryCharge'] = 'Delivery Charge must be a number';
          this.state.errorText = errorText;
          window.errorStack['deliveryCharge'] = {
            text: errorText['deliveryCharge'],
            tab: 2 
          };
        }else if(this.state.freeDeliveryAbove>0 && this.state.deliveryCharge==''){
          errorText['deliveryCharge'] = 'Delivery Charge must be entered with Free Delivery Amount';
          this.state.errorText = errorText;
          window.errorStack['deliveryCharge'] = {
            text: errorText['deliveryCharge'],
            tab: 2 
          };
        }else{
          errorText['deliveryCharge'] = '';
          delete window.errorStack['deliveryCharge'];
          window.errorStack['deliveryCharge'] = {
            text: errorText['deliveryCharge'],
            tab: 2 
          };
        }

        if(this.state.freeDeliveryAbove && this.state.freeDeliveryAbove.length && isNaN(this.state.freeDeliveryAbove)){
          errorText['freeDeliveryAbove'] = 'Free Delivery Amount must be a number';
          this.state.errorText = errorText;
          window.errorStack['freeDeliveryAbove'] = {
            text: errorText['freeDeliveryAbove'],
            tab: 2 
          };
        }else if(isNaN(this.state.freeDeliveryAbove)){
          errorText['freeDeliveryAbove'] = 'Free Delivery Above must be a number';
          this.state.errorText = errorText;
          window.errorStack['freeDeliveryAbove'] = {
            text: errorText['freeDeliveryAbove'],
            tab: 2 
          };
        }else if((+this.state.minimumOrder) > (+this.state.freeDeliveryAbove)){
          errorText['freeDeliveryAbove'] = 'Free Delivery Amount must be greater than Minimum Order';
          this.state.errorText = errorText;
          window.errorStack['freeDeliveryAbove'] = {
            text: errorText['freeDeliveryAbove'],
            tab: 2 
          };
        }else{
          errorText['freeDeliveryAbove'] = '';
          delete window.errorStack['freeDeliveryAbove'];
          window.errorStack['freeDeliveryAbove'] = {
            text: errorText['freeDeliveryAbove'],
            tab: 2 
          };
        }        
      }

      if(this.state.deliveryPricing == 'custom'){
        let errorText = this.state.errorText;
        if((!this.state.customDeliveryPricing || isNaN(this.state.customDeliveryPricing) || this.state.customDeliveryPricing <=0 )){
          errorText['customDeliveryPricing'] = 'Custom Delivery Pricing Order is required';
          this.state.errorText = errorText;
          window.errorStack['customDeliveryPricing'] = {
            text: errorText['customDeliveryPricing'],
            tab: 2 
          };
        }else{
          errorText['customDeliveryPricing'] = '';
          delete window.errorStack['customDeliveryPricing'];
          window.errorStack['customDeliveryPricing'] = {
            text: errorText['customDeliveryPricing'],
            tab: 2 
          };
        }
      }
    }
  }
  deliveryPricingChange(e, index, deliveryPricing){
    this.setState({deliveryPricing});
    if(deliveryPricing == 'standard'){
      this.setState({
        deliveryPricingStandard : '',
        deliveryPricingCustom : 'hidden'
      },function(){
        let uploadData = {};
        uploadData.standard = {};
        uploadData.standard.minimumOrderAmount = this.state.minimumOrder;
        uploadData.standard.deliveryCharge = this.state.deliveryCharge;
        uploadData.standard.freeDeliveryAmount = this.state.freeDeliveryAbove;   
        this.deliveryVaildation(this);
        this.props.manageSave('show','deliveryPricing',uploadData);
      });
    }else{
      this.setState({
        deliveryPricingStandard : 'hidden',
        deliveryPricingCustom : ''
      },function(){
        let uploadData = {};
        uploadData.custom = {};
        uploadData.custom.customDeliveryPricing = this.state.customDeliveryPricing; 
        this.deliveryVaildation(this);
        this.props.manageSave('show','deliveryPricing',uploadData);
      });
    }
  }
  onDeliveryStatusToggle(e, deliveryStatus){
      console.log(deliveryStatus);
      if(deliveryStatus){
        this.setState({
          homeDelivery: '',
          homeDeliveryEnabled: true
        },function(){
          let uploadData = {};
          uploadData.standard = {};
          uploadData.standard.minimumOrderAmount = this.state.minimumOrder;
          uploadData.standard.deliveryCharge = this.state.deliveryCharge;
          uploadData.standard.freeDeliveryAmount = this.state.freeDeliveryAbove;   
          this.props.manageSave('show','deliveryPricing',uploadData);
          this.deliveryVaildation(this);          
        });
      }else{
        this.setState({
          homeDelivery: 'hidden',
          homeDeliveryEnabled: false
        },function(){
          let uploadData = {};
          uploadData.custom = {};
          uploadData.custom.customDeliveryPricing = this.state.customDeliveryPricing; 
          this.props.manageSave('show','deliveryPricing',uploadData);
          this.deliveryVaildation(this);
        });
      }
  }
  onMinimumOrderChange(e){
    this.state.minimumOrder = e.target.value;
    this.props.manageSave('updation');
  }
  onDeliveryChargeChange(e){
    this.state.deliveryCharge = e.target.value;
    this.props.manageSave('updation');
  }
  onFreeDeliveryAboveChange(e){
    this.state.freeDeliveryAbove = e.target.value;
    this.props.manageSave('updation');
  }
  onCustomDeliveryPricingChange(e){
    this.state.customDeliveryPricing = e.target.value;
    this.props.manageSave('updation');
  }

  onMinimumOrderBlur(textField){
    this.setState({
      minimumOrder:textField.target.value
    },function(){
      let uploadData = {};
      uploadData.standard = {};
      uploadData.standard.minimumOrderAmount = this.state.minimumOrder;
      uploadData.standard.deliveryCharge = this.state.deliveryCharge;
      uploadData.standard.freeDeliveryAmount = this.state.freeDeliveryAbove;   
      this.deliveryVaildation(this);
      this.props.manageSave('show','deliveryPricing',uploadData);
    });
  }
  onDeliveryChargeBlur(textField){
    this.setState({
      deliveryCharge:textField.target.value
    },function(){
      let uploadData = {};
      uploadData.standard = {};
      uploadData.standard.minimumOrderAmount = this.state.minimumOrder;
      uploadData.standard.deliveryCharge = this.state.deliveryCharge;
      uploadData.standard.freeDeliveryAmount = this.state.freeDeliveryAbove;  
      this.deliveryVaildation(this);
      this.props.manageSave('show','deliveryPricing',uploadData);
    });
  }
  onFreeDeliveryAboveBlur(textField){
    this.setState({
      freeDeliveryAbove:textField.target.value
    },function(){
      let uploadData = {};
      uploadData.standard = {};
      uploadData.standard.minimumOrderAmount = this.state.minimumOrder;
      uploadData.standard.deliveryCharge = this.state.deliveryCharge;
      uploadData.standard.freeDeliveryAmount = this.state.freeDeliveryAbove; 
      this.deliveryVaildation(this);
      this.props.manageSave('show','deliveryPricing',uploadData);
    });
  }
  onCustomDeliveryPricingBlur(textField){
    this.setState({
      customDeliveryPricing:textField.target.value
    },function(){
      let uploadData = {};
      uploadData.custom = {};
      uploadData.custom.customDeliveryPricing = this.state.customDeliveryPricing; 
      this.deliveryVaildation(this);
      this.props.manageSave('show','deliveryPricing',uploadData);
    });
  }

  onServiceAreaChange(index,textField){
    this.state.serviceAreas[index] = textField.target.value;
    this.deliveryVaildation(this);
    this.props.manageSave('show','serviceArea',this.state.serviceAreas.join());
  }
  



  //test
  getLocatlitySuggestLabel2(suggest){
    console.log('locality Label 2:',suggest);
    let locality = [],termsLength = 0;
    termsLength = suggest.terms.length;
    suggest.terms.forEach(term => {
        locality.push(term.value);
    });
    locality.splice(termsLength-3,termsLength);
    let localityLabel = locality.join();
    return localityLabel;
  }
  skipLocalitySuggest2(suggest){
    
  }
  onLocalitySuggestSelect2(location){
    let serviceAreas = this.state.serviceAreas;
    let serviceAreasObj = this.state.serviceAreasObj;
    if(serviceAreas.indexOf(location.label)>-1 && serviceAreas.length < this.state.serviceLimit){
      console.log('Already exists');
      return;
    }
    serviceAreas.push(location.label);
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
    serviceAreasObj.push(serviceObjModal);
    this.setState({
        serviceAreas:serviceAreas,
        serviceAreasObj:serviceAreasObj,
        geoInitialVal:''
    },function(){
        let tempServiceAreas = {};
        tempServiceAreas.areas = [];
        tempServiceAreas.areas = this.state.serviceAreasObj;
        this.props.manageSave('show','serviceAreas',tempServiceAreas);
        if(this.state.homeDeliveryEnabled && this.state.serviceAreas.length == 0){
          let errorText = this.state.errorText;
          errorText['serviceAreas'] = 'Service Areas is required';
          this.state.errorText = errorText;
          window.errorStack['serviceAreas'] = {
            text: errorText['serviceAreas'],
            tab: 2 
          };
        }else{            
          let errorText = this.state.errorText;
          errorText['serviceAreas'] = '';
          delete window.errorStack['serviceAreas'];
          this.setState({
            errorText:errorText
          });          
        }
        this.refs.geoSug.clear();
    });
  }
  deleteArea(index){
    console.log('delete area',index);
    let serviceAreas = this.state.serviceAreas;
    let serviceAreasObj = this.state.serviceAreasObj;
    serviceAreas.splice(index,1);
    serviceAreasObj.splice(index,1);
    this.setState({
      serviceAreas: serviceAreas,
      serviceAreasObj: serviceAreasObj
    },function(){
      if(this.state.homeDeliveryEnabled && this.state.serviceAreas.length == 0){
          let errorText = this.state.errorText;
          errorText['serviceAreas'] = 'Service Areas is required';
          this.state.errorText = errorText;
          window.errorStack['serviceAreas'] = {
            text: errorText['serviceAreas'],
            tab: 2 
          };
        }else{            
          let errorText = this.state.errorText;
          errorText['serviceAreas'] = '';
          delete window.errorStack['serviceAreas'];
          this.setState({
            errorText:errorText
          });          
        }
    });
  }
	render(){
    let geoInitialVal = this.state.geoInitialVal;
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
                      <MenuItem value={"standard"} primaryText="Standard"/>
                      <MenuItem value={"custom"} primaryText="Custom"/>                    
                  </SelectField>
                  <div className={this.state.deliveryPricingStandard} id="deliveryPricingStandard">
                    <div className="subContent">
                      <TextField fullWidth={true}
                          floatingLabelText={"Minimum Order"}
                          errorText={this.state.errorText['minimumOrder']}
                          defaultValue={this.state.minimumOrder} 
                          onChange = {this.onMinimumOrderChange.bind(this)} 
                          onBlur = {this.onMinimumOrderBlur.bind(this)}/>
                      <TextField fullWidth={true}
                          floatingLabelText="Delivery Charge"                        
                          defaultValue={this.state.deliveryCharge} 
                          errorText={this.state.errorText['deliveryCharge']}
                          onChange = {this.onDeliveryChargeChange.bind(this)} 
                          onBlur = {this.onDeliveryChargeBlur.bind(this)}/>
                      <TextField fullWidth={true}
                          floatingLabelText="Free Delivery Above"                        
                          defaultValue={this.state.freeDeliveryAbove} 
                          errorText={this.state.errorText['freeDeliveryAbove']}
                          onChange = {this.onFreeDeliveryAboveChange.bind(this)} 
                          onBlur = {this.onFreeDeliveryAboveBlur.bind(this)}/>
                    </div>
                  </div>
                  <div className={this.state.deliveryPricingCustom} id="deliveryPricingCustom">
                    <div className="subContent">
                      <TextField fullWidth={true}
                          floatingLabelText={"Custom delivery pricing"}
                          defaultValue={this.state.customDeliveryPricing} 
                          errorText={this.state.errorText['customDeliveryPricing']}
                          onChange = {this.onCustomDeliveryPricingChange.bind(this)} 
                          onBlur = {this.onCustomDeliveryPricingBlur.bind(this)}/>                    
                    </div>
                  </div>
                  <div className="deliveryAreasSelect2">
                    <span className="serviceHeader">Service Areas</span>
                    <div className="tagArea">
                      {  
                        this.state.serviceAreas.map((areaName, index) => {                        
                          return (<div className="select2Tag" 
                            key={index}>
                                    <div className="nameArea">{areaName}</div>
                                    <div className="closeArea">
                                      <ClearIcon key={index} onClick={this.deleteArea.bind(this,index)} styles={styles.closeIcon} color={Colors.grey600} />
                                      </div>
                                  </div>)   
                        })
                      } 
                    </div>
                    <Geosuggest 
                        ref="geoSug"
                        placeholder={"Enter service area"}
                        className={"GeoSuggestList"}
                        inputClassName={"GeoSuggestinput"}
                        autoActivateFirstSuggest={true}
                        country={"in"}                        
                        getSuggestLabel={this.getLocatlitySuggestLabel2.bind(this)}
                        skipSuggest={this.skipLocalitySuggest2.bind(this)}
                        onSuggestSelect={this.onLocalitySuggestSelect2.bind(this)} 
                        initialValue = {geoInitialVal} />
                    <div className="serviceError">{this.state.errorText['serviceAreas']}</div>
                  </div>
                </div>
              </div>
            );
	}
}
export default Delivery;