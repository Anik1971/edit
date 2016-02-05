import React from 'react';
import ContentInbox from 'material-ui/lib/svg-icons/content/inbox';
import ActionGrade from 'material-ui/lib/svg-icons/action/grade';
import ImageUpdater from './../dialogues/imageUpdater';
import UserUpdater from './../dialogues/userUpdater';
import Request from 'superagent'
const defaultUserIcon = 'https://cdn0.iconfinder.com/data/icons/users-android-l-lollipop-icon-pack/24/user-128.png';
class ProfileDetail extends React.Component {
	constructor(props) {
		super(props);
		let userImage = '';
		let userName = '';
		this.state = {
			userName:userName,
			userImage:userImage,
			userDataLoaded: false
		}
	}
	
    render() {
    	let userImage = this.state.userImage || defaultUserIcon;
       
        let userName = this.state.userName || 'Your Name';

        let userImagePreview = this.state.userImage;

        return (        
        <div id="profile-detail">
            <div className="business-name">{this.props.bData.businessName}</div>
	        <div className="">
        		<UserUpdater />
			</div>
        </div>);
    }
}

export default ProfileDetail;