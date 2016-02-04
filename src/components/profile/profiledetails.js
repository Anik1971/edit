import React from 'react';
import Avatar from 'material-ui/lib/avatar';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import ContentInbox from 'material-ui/lib/svg-icons/content/inbox';
import ActionGrade from 'material-ui/lib/svg-icons/action/grade';
const defaultUserIcon = 'https://cdn0.iconfinder.com/data/icons/users-android-l-lollipop-icon-pack/24/user-128.png';

class ProfileDetail extends React.Component {
    render() {
    	let userName = 'Your Name';
    	if(this.props.bData.newExtras && this.props.bData.newExtras.userName){
    		userName = this.props.bData.newExtras.userName;
    	}


        let userImage = '';
        let userImageApproved = false;
        let approved = '';
        let pending = '';
        if(this.props.bData.newExtras && this.props.bData.newExtras.approved){
            approved =  this.props.bData.newExtras.approved;
        }
        if(this.props.bData.newExtras && this.props.bData.newExtras.pending){
            pending =  this.props.bData.newExtras.pending;
        }
        //coverImage
        if(pending.userImage){
            userImage = pending.userImage;
            userImageApproved = false;
        }else{
            if(approved.userImage){
               userImage = approved.userImage; 
               userImageApproved = true;
            }
        }
        if(!userImage){
            userImage = defaultUserIcon;
        }
        return (
        <div id="profile-detail">
            <div className="business-name">{this.props.bData.businessName}</div>
            <div className="business-shortDescription">{this.props.bData.businessType}</div>
            <div className="business-bussinessID">{"GOODBOX ID: "+this.props.bData.businessHandle}</div>
			<List>
		      <ListItem
		      	className="profile-name"
		        primaryText={userName}
		        leftAvatar={
			        <Avatar src={userImage} />
			    }/>
		    </List>
        </div>);
    }
}

export default ProfileDetail;