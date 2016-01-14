import React from 'react';
import Colors from 'material-ui/lib/styles/colors';
import ProfilePic from './dialogues/profilePic';

class ProfileImage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		  profilePicDialogue: false,
		  businessImageCover: {
		    'background-image': 'url('+this.props.bData.businessImageCover+')'
		  },
		  businessImage: {
		    'background-image': 'url('+this.props.bData.businessImage+')'
		  },
		  profileImage: 'http://lorempixel.com/600/337/nature/'
		};
	}
	putBusiData(json){
		this.props.putBusiData(json);
	}
    render() {
        return (
        <div styles={this.state.businessImageCover} id="profile-image-cover">
            <div styles={this.state.businessImage} id="profile-image">            	
				<ProfilePic 
					open={this.state.profilePicDialogue}
					profileImage={this.state.profileImage} 
					storeName={this.state.storeName}
					bData={this.props.bData}
					getBusiData={this.props.getBusiData.bind(this)} 
					putBusiData={this.props.putBusiData.bind(this)} />
            </div>
        </div>);
    }
}

export default ProfileImage;