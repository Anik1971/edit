import React from 'react';
import ProfileImage from './profileimage';
import ProfileDetail from './profiledetails';
import BusinessDetail from './businessdetail';
const bData = 
{
	businessName: 'Ajith Stores',
	businessImageCover: 'http://lorempixel.com/400/160',
	businessImage: 'http://lorempixel.com/100/100',
	userName: 'User Name'
}
class SupplierProfile extends React.Component {
	constructor(props){
		super(props);	
	}	
	render(){
		return (
			<div id="supplier-profile">
				<ProfileImage bData={bData} />
        		<ProfileDetail bData={bData} />
        		<BusinessDetail bData={bData} />
			</div>);
	}
}
export default SupplierProfile;