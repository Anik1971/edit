import React from 'react';
import Colors from 'material-ui/lib/styles/colors';
import ProfilePic from './../dialogues/profilePic';
import ImageUpdater from './../dialogues/imageUpdater';
import FloatingActionButton from 'material-ui/lib/floating-action-button';


class ProfileImage extends React.Component {
	constructor(props) {
		super(props);
		let businessImageCover = '';
		if(this.props.bData.appExtras.approved && this.props.bData.appExtras.approved.coverImage){
			businessImageCover = this.props.bData.appExtras.approved.coverImage;
		}
		let businessImage = '';
		if(this.props.bData.appExtras.approved && this.props.bData.appExtras.approved.businessImage){
			console.log('pend cov img',this.props.bData.appExtras.pending.coverImage);
			businessImage = this.props.bData.appExtras.approved.businessImage;
		}
		let pending_businessImageCover = [];		
		if(this.props.bData.appExtras.pending && this.props.bData.appExtras.pending.coverImage){
			pending_businessImageCover = this.props.bData.appExtras.pending.coverImage;
		}
		let pending_businessImage = [];		
		if(this.props.bData.appExtras.pending && this.props.bData.appExtras.pending.businessImage){
			pending_businessImage = this.props.bData.appExtras.pending.businessImage;
		}
		this.state = {
		  profilePicDialogue: false,
		  businessImageCover: {
		    backgroundImage: 'url('+businessImageCover+')',
		    backgroundColor: '#D8D4D4'
		  },
		  businessImage: {
		    backgroundImage: 'url('+businessImage+')'
		  },
		  businessImageCoverUrl:businessImageCover,
		  businessImageUrl:businessImage,
		  pending_businessImageCover:pending_businessImageCover,
		  pending_businessImage:pending_businessImage,	
		  businessName:this.props.bData.businessName
		};
	}
	putBusiData(json){
		this.props.putBusiData(json);
	}
	coverImageUpdate(imageurl){
		console.log('imageurl');
		let pending = this.props.bData.appExtras.pending;
		console.log('pending',pending);
		if(pending){
			if(pending.coverImage){
				pending.coverImage.push(imageurl);
			}else{
				pending.coverImage = [];
				pending.coverImage.push(imageurl);
			}
		}else{
			pending = {};
			pending.coverImage = [];
			pending.coverImage.push(imageurl);
		}
		this.props.manageSave('show','pending',pending);
	}
	businessImageUpdate(imageurl){
		console.log('imageurl');
		//debugger;
		let pending = this.props.bData.appExtras.pending;
		if(pending){
			if(pending.businessImage){
				pending.businessImage.push(imageurl);
			}else{
				pending.businessImage = [];
				pending.businessImage.push(imageurl);
			}
		}else{
			pending = {};
			pending.businessImage = [];
			pending.businessImage.push(imageurl);
		}
		this.props.manageSave('show','pending',pending);
	}
    render() {
    	let businessNameTag = '';
    	if(!this.state.businessImageUrl && this.state.businessName){
    		businessNameTag = this.state.businessName.substr(1,1);
    	}
        return (
        <div style={this.state.businessImageCover} id="profile-image-cover">
        	<ImageUpdater 
        		image={this.state.businessImageCoverUrl}        		
        		postUpload={this.coverImageUpdate.bind(this)} 
        		pending = {this.state.pending_businessImageCover}/>
            <div style={this.state.businessImage} id="profile-image">
            	<ImageUpdater 
        			image={this.state.businessImageUrl}         		
        			postUpload={this.businessImageUpdate.bind(this)} 
        			pending = {this.state.pending_businessImage}/> 	
        		<div className="businessNameTag">
        			{this.state.businessName.substr(0,1)}</div>
            </div>
        </div>);
    }
}

export default ProfileImage;