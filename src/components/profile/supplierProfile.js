import React from 'react';
import ProfileImage from './profileimage';
import ProfileDetail from './profiledetails';
import BusinessDetail from './businessdetail';
import bData_dummy from './../data/businessData';
class SupplierProfile extends React.Component {
	constructor(props){
		super(props);	
	}	
	getBusiData(){
		let _bData_dummy;
		let bData = bData_dummy;
		if(window.Android){
			bData = JSON.parse(window.Android.getBusinessData());
		}

	      //converting level 1 nested json strings to Object
	      for(let key in bData){
	        let _currData = bData[key];        
	        try{
	          bData[key] = JSON.parse(_currData);          
	        }catch(e){
	          bData[key] = _currData;          
	        }        
	      }
	      console.log('bData',bData);
	    return bData;
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