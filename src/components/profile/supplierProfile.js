import React from 'react';
import ProfileImage from './profileimage';
import ProfileDetail from './profiledetails';
import BusinessDetail from './businessdetail';
import bData_dummy from './../data/businessData';
class SupplierProfile extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			bData: this.getBusiData(),
			bDataLoaded: false
		}	
	}	
	componentWillMount(){
		let _this = this;
		window.emitter.addListener('bData', function(value){
		  console.log('bData event in supplier profile',value);
		  _this.setState({
		    bData: value,
		    bDataLoaded: true
		  })
		});
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
		if(!this.state.bDataLoaded){
	      return(<div className="loaderWrapper">Loading...</div>);
	    }else{
			return (
				<div id="supplier-profile">
					<ProfileImage bData={this.state.bData} />
	        		<ProfileDetail bData={this.state.bData} />
	        		<BusinessDetail bData={this.state.bData} />
				</div>);
		}
	}
}
export default SupplierProfile;