import React from 'react';
import TextField from 'material-ui/lib/text-field';
import { Link } from 'react-router';
import Geosuggest from 'react-geosuggest';
import RaisedButton from 'material-ui/lib/raised-button';
class Location extends React.Component {
	constructor(props){
		super(props);	
        this.state = {
            gmap: {},
        };
	}	
    onCitySuggestSelect(location){
        console.log('onCitySuggestSelect',location);
    }
    onLocalitySuggestSelect(location){
        console.log('onLocalitySuggestSelect',location);
    }
    onAddressSuggestSelect(location){
        console.log('onAddressSuggestSelect',location);
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
	render(){
		return (<div style={this.props.styles.slide}>
                    <Geosuggest 
                        placeholder={"City"}
                        className={"GeoSuggestList"}
                        inputClassName={"GeoSuggestinput"}
                        country={"in"}
                        searchText={"hello"}
                        onSuggestSelect={this.onCitySuggestSelect.bind(this)} />
                    <Geosuggest 
                        placeholder={"Locality"}
                        className={"GeoSuggestList"}
                        inputClassName={"GeoSuggestinput"}
                        country={"in"}
                        onSuggestSelect={this.onLocalitySuggestSelect.bind(this)} />
                    <Geosuggest 
                        placeholder={"Address"}
                        className={"GeoSuggestList"}
                        inputClassName={"GeoSuggestinput"}
                        country={"in"}
                        onSuggestSelect={this.onAddressSuggestSelect.bind(this)} />
                    <div className={"pickLocation"}>
                        <RaisedButton 
                            primary={true} 
                            label="PICK LOCATION"
                            onTouchTap={this.onPickLocation.bind(this)} />
                    </div>
                    <div className={"Timings"}>
                        <Link  to="/timings" >Timings</Link>
                    </div>
                  </div>
                );
	}
}
export default Location;