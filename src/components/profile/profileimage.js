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
    	let styles = {
		    profile_image_cover: {
		        'background-image': 'url('+this.props.bData.businessImageCover+')'
		    },
		    profile_image: {
		        'background-image': 'url('+this.props.bData.businessImage+')'
		    }
		};
        return (
        <div styles={styles.profile_image_cover} id="profile-image-cover">
            <div styles={styles.profilePicUrl} id="profile-image"></div>
        </div>);
    }
}

export default ProfileImage;