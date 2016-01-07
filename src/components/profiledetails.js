import React from 'react';
import Avatar from 'material-ui/lib/avatar';


class ProfileDetail extends React.Component {
    render() {
        return (
        <div id="profile-detail">
            <div className="profile-name">Subramanyam Shastri</div>
            <div className="business-name">
                 <Avatar size={80} src="http://lorempixel.com/100/100" /> Subbaiah Test Stores
            </div>
        </div>);
    }
}

export default ProfileDetail;