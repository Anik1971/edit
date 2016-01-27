import React from 'react';
import Avatar from 'material-ui/lib/avatar';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import ContentInbox from 'material-ui/lib/svg-icons/content/inbox';
import ActionGrade from 'material-ui/lib/svg-icons/action/grade';
import ImageUpdater from './../dialogues/imageUpdater';
import UserUpdater from './../dialogues/userUpdater';
class ProfileDetail extends React.Component {
	constructor(props) {
		super(props);
		let userImage = 'http://www.mp3alive.com/no_photo.jpg';
		let userName = '';
		if(this.props.bData.appExtras.approved && this.props.bData.appExtras.approved.userImage){
			userImage = this.props.bData.appExtras.approved.userImage;
		}		
		let pending_userImage = [];		
		if(this.props.bData.appExtras.pending && this.props.bData.appExtras.pending.userImage){
			pending_userImage = this.props.bData.appExtras.pending.userImage;
		}		
		this.state = {
			userName:userName,
			pending:pending_userImage,
			userImage:userImage || 'http://www.mp3alive.com/no_photo.jpg'
		}
		console.log('STate',this.state)
	}
	userImageUpdate(imageurl,userName){
		if(imageurl.length){
			console.log('imageurl');
			let pending = this.props.bData.appExtras.pending;
			console.log('pending',pending);
			if(pending){
				if(pending.userImage){
					pending.userImage.push(imageurl);
				}else{
					pending.userImage = [];
					pending.userImage.push(imageurl);
				}
			}else{
				pending = {};
				pending.userImage = [];
				pending.userImage.push(imageurl);
			}
			this.props.manageSave('show','pending',pending);
		}	
		if(userName){
			this.setState({
				userName:userName
			});
			this.props.manageSave('show','userName',userName);
		}		
	}
    render() {
        return (
        <div id="profile-detail">
            <div className="business-name">{this.props.bData.businessName}</div>
	        <div className="">
				<List>
			      <ListItem
			      	className="profile-name"
			        primaryText={this.state.userName}
			        leftAvatar={
				        <Avatar src={this.state.userImage} />
				    }>
			    	<UserUpdater 			        		 
		        		image={this.state.userImage} 
		        		name={this.state.userName}  
		        		pending={this.state.pending}     		
				        postUpload={this.userImageUpdate.bind(this)} />
				    </ListItem>
			    </List>
			</div>
        </div>);
    }
}

export default ProfileDetail;