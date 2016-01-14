import React from 'react';
import ProfileImage from './profileimage';
import ProfileDetail from './profiledetails';
import BusinessDetail from './businessdetail';
import bData_dummy from './../dummyData';
class SupplierProfile extends React.Component {
	constructor(props){
		super(props);	
	}	
	getBusiData(){
		if(window.Android){
			return(window.Android.getBusinessData());
		}else{
			return bData_dummy;
		}
	}
	render(){
		return (
			<div id="supplier-profile">
				<ProfileImage bData={this.getBusiData()} />
        		<ProfileDetail bData={this.getBusiData()} />
        		<BusinessDetail bData={this.getBusiData()} />
			</div>);
	}
}
export default SupplierProfile;