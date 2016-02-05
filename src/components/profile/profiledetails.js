import React from 'react';
import Avatar from 'material-ui/lib/avatar';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import ContentInbox from 'material-ui/lib/svg-icons/content/inbox';
import ActionGrade from 'material-ui/lib/svg-icons/action/grade';
import Request from 'superagent';
const defaultUserIcon = 'https://cdn0.iconfinder.com/data/icons/users-android-l-lollipop-icon-pack/24/user-128.png';
import UserUpdater from './../dialogues/userUpdater';

class ProfileDetail extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
        <div id="profile-detail">
            <div className="business-name">{this.props.bData.businessName}</div>
            <div className="business-shortDescription">{this.props.bData.businessType}</div>
            <div className="business-bussinessID">{"GOODBOX ID: "+this.props.bData.businessHandle}</div>
			<div className="">
                <UserUpdater />
            </div>
        </div>);
    }
}

export default ProfileDetail;