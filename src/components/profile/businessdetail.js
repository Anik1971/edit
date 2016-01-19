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
  }
}
class BusinessDetail extends React.Component {
	constructor(props){
		super(props);	
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
				    <CardText>
				    	{"VISA"}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				    	{"MASTER-CARD"}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				    	{"MAESTRO"}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				    	{"NET-BANKING"}
				    </CardText>	   
			 	</Card>	;
		}
		let addressCard = <CardText><strong>{"Address: "}</strong><i>Yet to be published.</i></CardText>;
		if(this.props.bData.businessAddress.address!='' || this.props.bData.businessAddress.locality!='' || this.props.bData.businessAddress.city!=''){
			addressCard=
					<CardText>
				    	<strong>{"Address: "}</strong>
				    	{this.props.bData.businessAddress.address}{", "}
				    	{this.props.bData.businessAddress.locality}{", "}
				    	{this.props.bData.businessAddress.city}
				    </CardText>;
		}
		let storeTimingsCard = <CardText><strong>{"Store Timings: "}</strong><i>Yet to be published.</i></CardText>;
		if(this.props.bData.storeTimings.length){			
			storeTimingsCard=
					<CardText>
				    	<strong>{"Store Timings: "}</strong>
				    	{"Has to be displayed"}
				    </CardText>;
		}
		let descriptionCard = <CardText><strong>{"Description: "}</strong><i>Yet to be published.</i></CardText>;
		if(this.props.bData.businessDescription){
			descriptionCard = 
					<CardText>
				    	<strong>{"Description: "}</strong>{this.props.bData.businessDescription}
				    </CardText>;
		}
		return (
			<div id="supplier-profile">
				<Card 
					style={styles.card_shadow}
					className="business-card">
				    <CardTitle 
				    	className="business-cardHeader" 
				    	title="Business Details"/>				    
				    {addressCard}
				    <CardText>
				    	<strong>{"Favourites: "}</strong>{this.props.bData.totalFavouriteCount}
				    </CardText>
				    {storeTimingsCard}
				    {descriptionCard}
			 	</Card>	
			 	{paymentsCard}			 		
			 	<Card
			 		style={styles.card_shadow}
			 		className="business-card">				    
				    <CardTitle
				    className="business-cardHeader"
				    title="Delivery"/>				    			    
				    <CardText>
				    	<strong>PRICING</strong><br /><br />
				    	{"Minimum Order: "}{this.props.bData.deliveryPricing.minOrder}<br />
				    	{"Delivery Charge: "}{this.props.bData.deliveryPricing.deliveryCharge}<br />
				    	{"Free Delivery above: "}{this.props.bData.deliveryPricing.freeDeliveryAbove}
				    </CardText>
				    <CardText>
				    	<strong>SERVICE AREAS</strong><br /><br />				    	
				    	let serviceAreas = JSON.parse(this.props.bData.serviceAreas)
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
			 	</Card>
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