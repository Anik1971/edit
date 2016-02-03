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
        let approved = '';
        let pending = '';
    	let coverBg = '';
        let coverBgApproved = true;
        let businessImage = '';
        let businessImageApproved = true;
        if(this.props.bData.newExtras && this.props.bData.newExtras.approved){
            approved =  this.props.bData.newExtras.approved;
        }
        if(this.props.bData.newExtras && this.props.bData.newExtras.pending){
            pending =  this.props.bData.newExtras.pending;
        }
        //coverImage
    	if(pending.coverImage){
    		coverBg = pending.coverImage;
            coverBgApproved = false;
    	}else{
            if(approved.coverImage){
               coverBg = approved.coverImage; 
               coverBgApproved = true;
            }
        }

        //businessImage
        if(pending.businessImage){
            businessImage = pending.businessImage;
            businessImageApproved = false;
        }else{
            if(approved.businessImage){
               businessImage = approved.businessImage; 
               businessImageApproved = true;
            }
        }
        
    	let styles = {
		    profile_image_cover: {
		        'background-image': 'url('+coverBg+')'
		    },
		    profile_image: {
		        'background-image': 'url('+businessImage+')'
		    }
		};
		let businessNameTag = '';
    	if(!businessImage  && this.props.bData.businessName){
    		businessNameTag = this.props.bData.businessName.substr(0,1);
    	}
        return (
        <div style={styles.profile_image_cover} id="profile-image-cover">
            <div style={styles.profile_image} id="profile-image">
            	<div className="businessNameTag">
        			{businessNameTag}</div>
            </div>
        </div>);
    }
}

export default ProfileImage;