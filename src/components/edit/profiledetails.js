import React from 'react';
import Avatar from 'material-ui/lib/avatar';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import ContentInbox from 'material-ui/lib/svg-icons/content/inbox';
import ActionGrade from 'material-ui/lib/svg-icons/action/grade';
import ImageUpdater from './../dialogues/imageUpdater';
import UserUpdater from './../dialogues/userUpdater';
const defaultUserIcon = 'https://cdn0.iconfinder.com/data/icons/users-android-l-lollipop-icon-pack/24/user-128.png';
class ProfileDetail extends React.Component {
	constructor(props) {
		super(props);
		let userImage = '';
		let userName = '';
		if(this.props.bData.newExtras.userName){
			userName = this.props.bData.newExtras.userName;
		}
		if(this.props.bData.newExtras.approved && this.props.bData.newExtras.approved.userImage){
			userImage = this.props.bData.newExtras.approved.userImage;
		}		
		let pending_userImage = '';		
		if(this.props.bData.newExtras.pending && this.props.bData.newExtras.pending.userImage){
			pending_userImage = this.props.bData.newExtras.pending.userImage;
		}		
		this.state = {
			userName:userName,
			pending:pending_userImage,
			userImage:userImage || pending_userImage
		}
	}
	userImageUpdate(imageurl,userName){
		if(imageurl.length){
			console.log('imageurl');			
			let pending = this.props.bData.newExtras.pending || {};
			pending.userImage = imageurl;
			this.props.manageSave('show','pending',pending);
			this.setState({
				userImage: imageurl
			});
		}	
		if(userName){
			this.setState({
				userName:userName
			});
			this.props.manageSave('show','userName',userName);
		}		
	}
    render() {
    	let userImage = this.state.userImage || this.state.pending || defaultUserIcon;
       
        let userName = this.state.userName || 'Your Name';

        let userImagePreview = this.state.userImage || this.state.pending;
        return (        
        <div id="profile-detail">
            <div className="business-name">{this.props.bData.businessName}</div>
	        <div className="">
				<List>
			      <ListItem
			      	className="profile-name"
			        primaryText={userName}
			        leftAvatar={
				        <Avatar src={userImage} />
				    }>
			    	<UserUpdater 			        		 
		        		image={userImagePreview} 
		        		name={this.state.userName}      		
				        postUpload={this.userImageUpdate.bind(this)} 
				        title={'User Details'}/>
				    </ListItem>
			    </List>
			</div>
        </div>);
    }
}

export default ProfileDetail;