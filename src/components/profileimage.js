import React from 'react';
import Colors from 'material-ui/lib/styles/colors';
import ProfilePic from './dialogues/profilePic';
import ImageUpdater from './dialogues/imageUpdater';
import FloatingActionButton from 'material-ui/lib/floating-action-button';


class ProfileImage extends React.Component {
	constructor(props) {
		super(props);
		let businessImageCover = 'http://www.mp3alive.com/no_photo.jpg';
		if(this.props.bData.appExtras.businessImageCover){
			businessImageCover = this.props.bData.appExtras.businessImageCover;
		}
		let businessImage = 'http://www.mp3alive.com/no_photo.jpg';
		if(this.props.bData.appExtras.businessImage){
			businessImage = this.props.bData.appExtras.businessImage;
		}

		this.state = {
		  profilePicDialogue: false,
		  businessImageCover: {
		    'background-image': 'url('+businessImageCover+')'
		  },
		  businessImage: {
		    'background-image': 'url('+businessImage+')'
		  },
		  profileImage: 'http://lorempixel.com/600/337/nature/'
		};
	}
	putBusiData(json){
		this.props.putBusiData(json);
	}
	coverImageUpdate(imageurl){
		console.log('imageurl');
		let appExtras = JSON.parse(this.props.bData.appExtras);
		appExtras.businessImageCover = imageurl;
		this.props.putBusiData({	      
	      appExtras: JSON.stringify(appExtras)
	    });
	}
	businessImageUpdate(imageurl){
		console.log('imageurl');
		let appExtras = JSON.parse(this.props.bData.appExtras);
		appExtras.businessImage = imageurl;
		this.props.putBusiData({	      
	      appExtras: JSON.stringify(appExtras)
	    });
	}
    render() {
        return (
        <div styles={this.state.businessImageCover} id="profile-image-cover">
        	<ImageUpdater 
        		open={this.state.coverImageDialogue} 
        		image={this.props.bData.appExtras.businessImageCover}        		
        		postUpload={this.coverImageUpdate.bind(this)} />
            <div styles={this.state.businessImage} id="profile-image">     	
				<ImageUpdater 
					open={this.state.profilePicDialogue}
        			image={this.state.profileImage}         		
        			postUpload={this.businessImageUpdate.bind(this)} />
            </div>
        </div>);
    }
}

export default ProfileImage;