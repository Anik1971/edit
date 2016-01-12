import React from 'react';
import Colors from 'material-ui/lib/styles/colors';
import ProfilePic from './dialogues/profilePic';

class ProfileImage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		  profilePicDialogue: false,
		};
	}
    render() {
        return (
        <div id="profile-image-cover">
            <div id="profile-image">            	
				<ProfilePic 
					open={this.state.profilePicDialogue} />
            </div>
        </div>);
    }
}

export default ProfileImage;