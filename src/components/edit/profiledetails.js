import React from 'react';
import Avatar from 'material-ui/lib/avatar';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import ContentInbox from 'material-ui/lib/svg-icons/content/inbox';
import ActionGrade from 'material-ui/lib/svg-icons/action/grade';
import UserUpdater from './../dialogues/userUpdater';
class ProfileDetail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userName:this.props.bData.appExtras.userName,
			userImage:this.props.bData.appExtras.userImage || 'http://www.mp3alive.com/no_photo.jpg'
		}
	}
	userImageUpdate(imageurl,userName){
		console.log('imageurl');
		this.props.manageSave('show','userImageUpdate',imageurl);
		this.props.manageSave('show','userName',userName);
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
			        		postUpload={this.userImageUpdate.bind(this)} 
			        		bData={this.props.bData}/>
				    </ListItem>
			    </List>
			</div>
        </div>);
    }
}

export default ProfileDetail;