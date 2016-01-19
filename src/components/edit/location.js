import React from 'react';
import TextField from 'material-ui/lib/text-field';
import { Link } from 'react-router';
import Geosuggest from 'react-geosuggest';
import RaisedButton from 'material-ui/lib/raised-button';
import Colors from 'material-ui/lib/styles/colors';
import FontIcon from 'material-ui/lib/font-icon';

class Location extends React.Component {
	constructor(props){
		super(props);	
        let address = JSON.parse(this.props.bData.businessAddress);
        this.state = {
            gmap: {},
            selCity: {},
            citySuggest:[],
            selLocality:{},
            selAddress:'',
            city:address.city || '',
            locality:address.locality || '',
            address:address.address || ''
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
        if (navigator.geolocation) {
            let _this = this;
            console.log(_this);
            let position = navigator.geolocation.getCurrentPosition(function(position){
                console.log(position);
                let map = new google.maps.Map(document.getElementById('map'), {
                    center: {lat: position.coords.latitude, lng: position.coords.longitude},
                    zoom: 6
                }); 
                _this.setState({
                    gmap:map
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
                            label="PICK LOCATION"
                            onTouchTap={this.onPickLocation.bind(this)}
                            labelPosition="after">
                            <FontIcon className="material-icons">
                            </FontIcon>
                        </RaisedButton>
                    </div>
                    <div className={"Timings"}>
                        <Link  to="/timings" >Timings</Link>
                    </div>
                  </div>
                );
	}
}
export default Location;