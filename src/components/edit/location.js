import React from 'react';
import TextField from 'material-ui/lib/text-field';
import { Link } from 'react-router';
import Geosuggest from 'react-geosuggest';
import RaisedButton from 'material-ui/lib/raised-button';
import Colors from 'material-ui/lib/styles/colors';
import FontIcon from 'material-ui/lib/font-icon';
import Popover from 'material-ui/lib/popover/popover';
class Location extends React.Component {
	constructor(props){
		super(props);	
        let address = this.props.bData.businessAddress;
        this.state = {
            selCity: {},
            citySuggest:[],
            selLocality:{},
            selAddress:'',
            city:address.city || '',
            locality:address.locality || '',
            address:address.address || '',
            activePopover: 'notPop',
            gpsUpdateText: 'UPDATE'
        };
	}	
    onCitySuggestSelect(location){
        console.log('onCitySuggestSelect',location); 
        this.setState({
            selCity:location,
            city:location.label
        },function(){
            let businessAddress = {};
            businessAddress.city = this.state.city;
            businessAddress.locality = this.state.locality;
            businessAddress.address = this.state.address;
            this.props.manageSave('show','businessAddress',businessAddress);
        });      
    }
    onLocalitySuggestSelect(location){
        console.log('onLocalitySuggestSelect',location);
        this.setState({
            selLocality:location,
            locality:location.label
        },function(){
            let businessAddress = {};
            businessAddress.city = this.state.city;
            businessAddress.locality = this.state.locality;
            businessAddress.address = this.state.address;
            this.props.manageSave('show','businessAddress',businessAddress);
        });
    }
    getLocation(callback){
        if(window.Android){
          let userData = JSON.parse(window.Android.getUserInfo()); 
          console.log(userData);
          if(userData){
            let location = userData.location;
            let position = {
                coords : {
                    latitude: location.latitude,
                    longitude: location.longitude
                }
            }  
            callback(position);
         }          
        }else{
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(location){
                    let position = {
                        coords : {
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude
                        }
                    }
                    callback(position);
                }); 
            }else {
            // Browser doesn't support Geolocation\
            console.error('Browser doesnt support Geolocation');
          }
        }
    }
    onPickLocation(){
        this.setState({
            gpsUpdateText: 'PLEASE WAIT...'
        });
        let _this = this;
        let position = this.getLocation(function(position){
            console.log('position',position);
            let Latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            let map = new google.maps.Map(document.getElementById('storeMap'), {
                center: Latlng,
                zoom: 6
            }); 
            let geocoder = new google.maps.Geocoder;
            let infowindow = new google.maps.InfoWindow;                
            let latlng = {
                lat: position.coords.latitude, 
                lng: position.coords.longitude
            };
            geocoder.geocode({'location': latlng}, function(results, status) {
                if(results[0]){                        
                    let formatted_address = results[0].formatted_address.split(',');
                    let city = formatted_address[formatted_address.length-3];
                    let locality = formatted_address[formatted_address.length-4];
                    let address = [];

                    for(let i = 0;i<formatted_address.length-4;i++){
                        address.push(formatted_address[i]);
                    }
                    address = address.join();
                    //marker
                    map.setZoom(20);
                    let marker = new google.maps.Marker({
                      position: latlng,
                      map: map
                    });
                    infowindow.setContent(address);
                    infowindow.open(map, marker);
                    _this.setState({ 
                        _gmap: map,                           
                        _city: city,
                        _locality: locality,
                        _address:address,
                        gpsUpdateText:'UPDATE'
                    });
                }
            });                
        });
          
    }


    //City selection
    getCitySuggestLabel(suggest){
        let city = '',termsLength = 0;
        termsLength = suggest.terms.length;
        if( termsLength > 2){
            city = suggest.terms[termsLength-3].value;
        }     
        return city;  
    }
    cityOnChange(keyWord){
        console.log('city onChange');
        this.setState({
            citySuggest: [],
        });
    }
    cityOnBlur(){
        console.log('cityOnBlur');
    }
    skipCitySuggest(suggest){
        let city = '',termsLength = 0;
        termsLength = suggest.terms.length;
        city = this.getCitySuggestLabel(suggest);  
        let citySuggest = this.state.citySuggest;
        if(citySuggest.indexOf(city)>=0){
            return true;
        }else{
            citySuggest.push(city);
            this.setState({
                citySuggest: citySuggest
            });
            return false;
        } 
    }

    //Locality Selection 
    getLocatlitySuggestLabel(suggest){
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
    skipLocalitySuggest(suggest){
        console.log('skipLocalitySuggest',suggest);
        let city = '',termsLength = 0;
        termsLength = suggest.terms.length;
        city = this.getCitySuggestLabel(suggest);  
        if(!this.state.selCity.label){
            return false; //if city not selected yet
        }
        if(this.state.selCity && 
           this.state.selCity.label &&
           this.state.selCity.label == city){
            return false; //city is selected, thus filtering localities only in the city
        }else{
            return true; //blocking localities outside the city boundary
        }
    }
    showPop(key,e){
        this.setState({
            activePopover:'pop',
            anchorEl:e.currentTarget,
            gpsUpdateText:'UPDATE'
        });
        this.onPickLocation();
    }
    closePopover(){
        this.setState({
            activePopover:'notPop'
        });
    }
    onLocationSelect(){
        console.log('onLocationSelect');
        this.setState({ 
            gmap: this.state._map,                           
            city: this.state._city,
            locality: this.state._locality,
            address:this.state._address,
            activePopover:'notPop',
            gpsUpdateText:'UPDATE'
        },function(){
            let businessAddress = {};
            businessAddress.city = this.state.city;
            businessAddress.locality = this.state.locality;
            businessAddress.address = this.state.address;
            this.props.manageSave('show','businessAddress',businessAddress);
        });        
    }
    onAddressChange(e){
        this.setState({
            address:e.target.value
        },function(){
            let businessAddress = {};
            businessAddress.city = this.state.city;
            businessAddress.locality = this.state.locality;
            businessAddress.address = this.state.address;
            this.props.manageSave('show','businessAddress',businessAddress);
        });
    }
	render(){
		return (<div style={this.props.styles.slide}>
                    <Geosuggest 
                        placeholder={"City"}
                        className={"GeoSuggestList"}
                        inputClassName={"GeoSuggestinput"}
                        autoActivateFirstSuggest={false}
                        country={"in"}                        
                        getSuggestLabel={this.getCitySuggestLabel.bind(this)}
                        skipSuggest={this.skipCitySuggest.bind(this)}
                        onChange={this.cityOnChange.bind(this)}
                        onBlur={this.cityOnBlur.bind(this)}
                        onSuggestSelect={this.onCitySuggestSelect.bind(this)}
                        initialValue={this.state.city} />
                    <Geosuggest 
                        placeholder={"Locality"}
                        className={"GeoSuggestList"}
                        inputClassName={"GeoSuggestinput"}
                        autoActivateFirstSuggest={true}
                        country={"in"}                        
                        getSuggestLabel={this.getLocatlitySuggestLabel.bind(this)}
                        skipSuggest={this.skipLocalitySuggest.bind(this)}
                        onSuggestSelect={this.onLocalitySuggestSelect.bind(this)} 
                        initialValue = {this.state.locality} />
                    <TextField fullWidth={true}
                        floatingLabelText="Address"
                        value={this.state.address} 
                        onChange={this.onAddressChange.bind(this)}/>
                    <div className={"pickLocation"}>
                        <RaisedButton 
                            secondary={true} 
                            fullWidth={true}
                            label="UPDATE STORE ADDRESS USING GPS"                            
                            labelPosition="after"
                            onClick={this.showPop.bind(this, "pop")} >
                            <FontIcon className="material-icons">
                            </FontIcon>
                        </RaisedButton>
                        <Popover 
                          anchorEl = {this.state.anchorEl}
                          canAutoPosition = { true }
                          open={this.state.activePopover === 'pop'}                          
                          onRequestClose={this.closePopover.bind(this, 'pop')} >
                          <div style={{padding:20}}>                            
                            <p>WARNING: This will update the store location to the current location</p><br />
                            <div id="storeMap" className={"storeMap"}></div>
                            <RaisedButton 
                                fullWidth = { true}
                                secondary={true} 
                                label={this.state.gpsUpdateText}
                                onTouchTap={this.onLocationSelect.bind(this)} />
                          </div>
                        </Popover>
                    </div>
                    <div className={"Timings"}>
                        <Link  to="/timings" >Timings</Link>
                    </div>
                  </div>
                );
	}
}
export default Location;