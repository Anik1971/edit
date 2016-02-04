import React from 'react';
import Avatar from 'material-ui/lib/avatar';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import ContentInbox from 'material-ui/lib/svg-icons/content/inbox';
import ActionGrade from 'material-ui/lib/svg-icons/action/grade';
import Request from 'superagent';
const defaultUserIcon = 'https://cdn0.iconfinder.com/data/icons/users-android-l-lollipop-icon-pack/24/user-128.png';

class ProfileDetail extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            userName:'',
            userImage:''
        }
    }
    componentWillMount(){
        console.log('ProfileView componentDidMount');
        let url = 'http://testchat.tsepak.com/goodbox/get_details'
        try {
          if (window.Android) {
            let userData = JSON.parse(window.Android.getUserInfo());
            if (userData.app == 'com.tsepak.supplierchat') {
              url = 'http://chat.tsepak.com/goodbox/get_details';
            }

          }
        }
        catch (e) {
          console.log(e);
        }
        let user_info = JSON.parse(Android.getUserInfo());
        let _this = this;
        Request
        .get(url)
        .set('AUTHTOKEN', user_info.authToken)
        .set('CLIENTID', user_info.clientId)
        .end(function(err, res){
            if(err || !res.ok){
                alert("error occured")
            }
            else{
                console.log(res.text);
                let resp = JSON.parse(res.text);
                _this.setState({
                    userName:resp.name,
                    userImage:resp.profile_pic
                })   
            }
        })
    }
    render() {
    	let userName = this.state.userName;
        let userImage = this.state.userImage;
    	
        if(!userName){
            userName = 'Your Name';
        } 
        let userImageApproved = false;
        /*let approved = '';
        let pending = '';*/
       /* if(this.props.bData.newExtras && this.props.bData.newExtras.approved){
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
        }*/
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