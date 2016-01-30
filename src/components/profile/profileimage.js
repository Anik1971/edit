import React from 'react';
import Colors from 'material-ui/lib/styles/colors';

class ProfileImage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		  profilePicDialogue: false,
		};
	}
    render() {
    	let coverBg = '';
    	if(this.props.bData.newExtras.approved && this.props.bData.newExtras.approved.coverImage){
    		coverBg = this.props.bData.newExtras.approved.coverImage;
    	}
    	let businessLogo = '';
    	if(this.props.bData.newExtras.approved && this.props.bData.newExtras.approved.businessImage){
    		businessLogo = this.props.bData.newExtras.approved.businessImage;
    	}
    	let styles = {
		    profile_image_cover: {
		        'background-image': 'url('+coverBg+')'
		    },
		    profile_image: {
		        'background-image': 'url('+businessLogo+')'
		    }
		};
		let businessNameTag = '';
    	if(!businessLogo  && this.props.bData.businessName){
    		businessNameTag = this.props.bData.businessName.substr(0,1);
    	}
        return (
        <div styles={styles.profile_image_cover} id="profile-image-cover">
            <div styles={styles.profilePicUrl} id="profile-image">
            	<div className="businessNameTag">
        			{businessNameTag}</div>
            </div>
        </div>);
    }
}

export default ProfileImage;