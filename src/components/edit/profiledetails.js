import React from 'react';
import Avatar from 'material-ui/lib/avatar';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import ContentInbox from 'material-ui/lib/svg-icons/content/inbox';
import ActionGrade from 'material-ui/lib/svg-icons/action/grade';
class ProfileDetail extends React.Component {
    render() {
        return (
        <div id="profile-detail">
            <div className="business-name">{this.props.bData.businessName}</div>
	        <div className="">
				<List>
			      <ListItem
			      	className="profile-name"
			        primaryText="Users Name"
			        leftAvatar={
				        <Avatar src="http://lorempixel.com/100/100" />
				    }/>
			    </List>
			</div>
        </div>);
    }
}

export default ProfileDetail;