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
            selCity:location
        });      
    }
    onLocalitySuggestSelect(location){
        console.log('onLocalitySuggestSelect',location);
        this.setState({
            selLocality:location
        });
        if(!this.state.selCity.label){
            console.log('city not set');
        }
    }

    onPickLocation(){
        this.setState({
            gpsUpdateText: 'PLEASE WAIT...'
        });
        if (navigator.geolocation) {
            let _this = this;
            let position = navigator.geolocation.getCurrentPosition(function(position){
                console.log(position);
                let map = new google.maps.Map(document.getElementById('map'), {
                    center: {lat: position.coords.latitude, lng: position.coords.longitude},
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
                        _this.setState({ 
                            gmap: map,                           
                            city: city,
                            locality: locality,
                            address:address,
                            activePopover:'notPop',
                            gpsUpdateText:'UPDATE'
                        });
                    }
                });                
            });
          } else {
            // Browser doesn't support Geolocation\
            console.error('Browser doesnt support Geolocation');
          }
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
    }
    closePopover(){
        this.setState({
            activePopover:'notPop'
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
                        value={this.state.address} />
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
                            <h2>WARNING:</h2><br />
                            <p>This update the store location to the current location</p><br />
                            <RaisedButton 
                                fullWidth = { true}
                                secondary={true} 
                                label={this.state.gpsUpdateText}
                                onTouchTap={this.onPickLocation.bind(this)} />
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