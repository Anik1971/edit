import React from 'react';
import Colors from 'material-ui/lib/styles/colors';
import ProfilePic from './../dialogues/profilePic';
import ImageUpdater from './../dialogues/imageUpdater';
import FloatingActionButton from 'material-ui/lib/floating-action-button';


class ProfileImage extends React.Component {
	constructor(props) {
		super(props);
		let businessImageCover = 'http://www.mp3alive.com/no_photo.jpg';
		if(this.props.bData.appExtras.approved && this.props.bData.appExtras.approved.coverImage){
			businessImageCover = this.props.bData.appExtras.approved.coverImage;
		}
		let businessImage = 'http://www.mp3alive.com/no_photo.jpg';
		if(this.props.bData.appExtras.approved && this.props.bData.appExtras.approved.businessImage){
			businessImage = this.props.bData.appExtras.approved.businessImage;
		}

		this.state = {
		  profilePicDialogue: false,
		  businessImageCover: {
		    backgroundImage: 'url('+businessImageCover+')'
		  },
		  businessImage: {
		    backgroundImage: 'url('+businessImage+')'
		  },
		  businessImageCoverUrl:businessImageCover,
		  businessImageUrl:businessImage,
		  profileImage: 'http://lorempixel.com/600/337/nature/'
		};
	}
	putBusiData(json){
		this.props.putBusiData(json);
	}
	coverImageUpdate(imageurl){
		console.log('imageurl');
		let pending = this.props.bData.appExtras.pending;
		if(pending && pending.coverImage){
			pending.coverImage.push(imageurl);
		}else{
			pending = {};
			pending.coverImage = [];
			pending.coverImage.push(imageurl);
		}
		this.props.manageSave('show','pending',pending);
	}
	businessImageUpdate(imageurl){
		console.log('imageurl');
		let pending = this.props.bData.appExtras.pending;
		if(pending && pending.businessImage){
			pending.businessImage.push(imageurl);
		}else{
			pending = {};
			pending.businessImage = [];
			pending.businessImage.push(imageurl);
		}
		this.props.manageSave('show','pending',pending);
	}
    render() {
        return (
        <div style={this.state.businessImageCover} id="profile-image-cover">
        	<ImageUpdater 
        		image={this.state.businessImageCoverUrl}        		
        		postUpload={this.coverImageUpdate.bind(this)} />
            <div style={this.state.businessImage} id="profile-image">     	
				<ImageUpdater 
        			image={this.state.businessImageUrl}         		
        			postUpload={this.businessImageUpdate.bind(this)} />
            </div>
        </div>);
    }
}

export default ProfileImage;