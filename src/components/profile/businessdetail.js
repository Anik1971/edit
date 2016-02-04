import React from 'react';
import Avatar from 'material-ui/lib/avatar';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';
import FontIcon from 'material-ui/lib/font-icon';
import CardText from 'material-ui/lib/card/card-text';
import Gallery from './gallery';
const deliveryOptions = ['Home delivery','Pre-Order','Parcel/Take Away'
];
const deliveryIcons = {
	'Home delivery':'https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_home_48px-128.png',
	'Pre-Order':'http://nasirnobin.xtgem.com/torbd_icons_nasir/clock.png',
	'Parcel/Take Away':'https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_local_shipping_48px-128.png'
}
const styles={
  card_shadow:{
    boxShadow: '0 1px 6px rgba(118, 209, 242, 0.12), 0 1px 4px rgba(118, 209, 242, 0.24)'
  },
  maps:{
  	height: 150,
    width: '100%',
    display: 'block',
    float: 'left'
  }
}
class BusinessDetail extends React.Component {
	constructor(props){
		super(props);	
	}	
	componentDidMount(){
		console.log('componentDidMount');
		if(this.props.bData.latitude && this.props.bData.longitude){
			let position = {
				coords: {
					latitude : this.props.bData.latitude,
					longitude: this.props.bData.longitude
				}
			}
			let Latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	        let map = new google.maps.Map(document.getElementById('supplierMap'), {
	            center: Latlng,
                zoom: 18,
                scaleControl: false,
                scrollwheel: false,
                navigationControl: false,
                mapTypeControl: false,
                draggable: false,
                disableDoubleClickZoom: false
	        }); 
	        let geocoder = new google.maps.Geocoder;
	        let latlng = {
	            lat: position.coords.latitude, 
	            lng: position.coords.longitude
	        };
	        geocoder.geocode({'location': latlng}, function(results, status) {
	            if(results[0]){                        
	                
	                //marker
	                map.setZoom(16);
	                let marker = new google.maps.Marker({
	                  position: latlng,
	                  map: map
	                });
	            }
	        });
		}
	}
	render(){
		let paymentsCard = '';
		if(this.props.bData.paymentEnabled){
			paymentsCard=<Card
			 		style={styles.card_shadow}
			 		className="business-card">				    
				    <CardTitle
				    className="business-cardHeader"
				    title="Payments"/>				    
				    <CardText className="paymentsCards">
				    	<span>{"VISA"}</span>
				    	<span>{"MASTER-CARD"}</span>
				    	<span>{"MAESTRO"}</span>
				    	<span>{"NET-BANKING"}</span>
				    </CardText>	   
			 	</Card>	;
		}
		let addressCard = '';
		let mapCard = '';
		if(this.props.bData.latitude && this.props.bData.longitude){
			mapCard = <div style={styles.maps} className={"supplierMap"} id="supplierMap"></div>;
			/*this.state.latitude = this.props.bData.latitude;
			this.state.longitude = this.props.bData.longitude;*/
		}
		if(this.props.bData.businessAddress.address!='' || this.props.bData.businessAddress.locality!='' || this.props.bData.businessAddress.city!=''){
			let address = this.props.bData.businessAddress.address;
			address = address ? (address + ", ") : "";
			address += this.props.bData.businessAddress.locality ? (this.props.bData.businessAddress.locality + ", ") : "";
			address += this.props.bData.businessAddress.city;
			addressCard=
					<CardText>
				    	<strong>{"ADDRESS"}</strong>
				    	<br/>
				    	{address}
				    	{mapCard}
				    </CardText>;
		}
		let storeTimingsCard ='';
		if(this.props.bData.storeTimings.length){	
			let storeTimings = [];
			if(this.props.bData.storeTimings){
				storeTimings = this.props.bData.storeTimings;
			}		
			storeTimingsCard=
					<CardText>
				    	<strong>{"STORE TIMINGS"}</strong>
				    	<br/>
				    	{  
		            		storeTimings.map((timing, index) => {
		            			let days = timing.days;
		            			let openTimings = timing.openTimings;
		            			let closedTimings = timing.closedTimings;		            			
		            			return (
		            			<div key={index}>
		            				<br />
		            				{days}<br />
		            				{"Opens: "}{openTimings} &nbsp;{"Closes: "}{closedTimings} <br />
		            			</div>);	 
		            		})
		            	}   
				    </CardText>;
		}
		let descriptionCard = <CardText><strong>{"DESCRIPTION"}</strong><br/><i>Yet to be published.</i></CardText>;
		if(this.props.bData.businessDescription){
			descriptionCard = 
					<CardText>
				    	<strong>{"DESCRIPTION"}</strong><br/>{this.props.bData.businessDescription}
				    </CardText>;
		}
		let deliveryPricing = this.props.bData.deliveryPricing;
		let cardContent = '';
		let areas = this.props.bData.serviceAreas.areas;
		if(!this.props.bData.serviceAreas || !areas || areas.length == 0 || this.props.bData.serviceAreas.length==0){
			cardContent = <CardText>
				    	DISABLED
				    </CardText>;
		}else if(deliveryPricing.standard){
			if(deliveryPricing.standard.minimumOrderAmount || 
				deliveryPricing.standard.deliveryCharge || 
				deliveryPricing.standard.freeDeliveryAbove){
				cardContent = <CardText>
				    	<strong>PRICING</strong><br /><br />
				    	{"Minimum Order: "}{deliveryPricing.standard.deliveryCharge}<br />
				    	{"Delivery Charge: "}{deliveryPricing.standard.deliveryCharge}<br />
				    	{"Free Delivery above: "}{deliveryPricing.standard.freeDeliveryAbove}
				    </CardText>;
			}else{
				cardContent = <CardText>
				    	<strong>PRICING</strong><br /><br />
				    	{"Custom delivery: "}{deliveryPricing.custom.customDeliveryPricing}<br />
				    </CardText>;
			}
		}
		let serviceAreas='';
		console.log('areas:'+areas);
		let serviceAreasCard = '';
		if(areas && areas.length){
			serviceAreas = 
				<div>{  
		            		areas.map((area, index) => {		            				            			
		            			return (
		            			<div key={index}>
		            				{area.name}{", "}
		            			</div>);	 
		            		})
		            	}</div>;
		    serviceAreasCard = <Card
			 		style={styles.card_shadow}
			 		className="business-card">				    
				    <CardTitle
				    className="business-cardHeader"
				    title="Delivery"/>				    			    
				    	{cardContent}
				    <CardText>
				    	<strong>SERVICE AREAS</strong><br /><br />				    	
				    	{serviceAreas}
				    </CardText>
				    <CardText>
				    	<strong>ORDER TYPE</strong><br /><br />
					    	{
					    		deliveryOptions.map((order,index) =>
				    			<div className="deliveryDivide" key={index}>
					    			<Avatar
					          		src={deliveryIcons[order]} />
					          	 	<br />
					          		{order}
				          		</div>)	
				          	}				    
				    </CardText>
			 	</Card>;
		}
		return (
			<div id="supplier-profile">
				<Card 
					style={styles.card_shadow}
					className="business-card">
				    <CardTitle 
				    	className="business-cardHeader" 
				    	title="Business Details"/>	
				    <CardText>
				    	<strong>{"FAVOURITES"}</strong><br/>{this.props.bData.activeFavouriteCount}
				    </CardText>			    
				    {descriptionCard}
				    {storeTimingsCard}
				    {addressCard}				    
				    
				    
			 	</Card>	
			 	{paymentsCard}			 		
			 	{serviceAreasCard}
			 	<Card
			 		style={styles.card_shadow}
			 		className="business-card">				    
				    <CardTitle
				    className="business-cardHeader"
				    title="Photos"/>				    
				    <CardMedia>
				    	<Gallery 
			 				bData={this.props.bData} />
				    </CardMedia>	   
			 	</Card>			 	
			</div>);
	}
}
export default BusinessDetail;