import React from 'react';
import Avatar from 'material-ui/lib/avatar';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
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
	componentWillMount(){
		console.log('ProfileEdit componentDidMount');
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
                    userImage:resp.profile_pic,
                    userDataLoaded:true
                })   
            }
        })
    }
	userImageUpdate(imageurl,userName){
		console.log('userImageUpdate');
		if(imageurl.length){
			console.log('imageurl');			
			this.setState({
				userImage: imageurl
			});
		}	
		if(userName){
			this.setState({
				userName:userName
			});
			// this.props.manageSave('show','userName',userName);
		}
		let user_info = JSON.parse(Android.getUserInfo());
		let url = 'http://testchat.tsepak.com/goodbox/set_details';
		try {
	      if (window.Android) {
	        let userData = JSON.parse(window.Android.getUserInfo());
	        if (userData.app == 'com.tsepak.supplierchat') {
	          url = 'http://chat.tsepak.com/goodbox/set_details';
	        }

	      }
	    }
	    catch (e) {
	      console.log(e);
	    }
		let body = JSON.stringify({name: userName, profile_pic: imageurl})
		Request
		.post(url)
		.set('AUTHTOKEN', user_info.authToken)
		.set('CLIENTID', user_info.clientId)
		.send(body)
		.end(function(err, res){
			if(err || !res.ok){
				alert('Error Spotted')
			}
			else{
				let response = JSON.parse(res.text);
			}
		})		
	}
    render() {
    	let userImage = this.state.userImage || defaultUserIcon;
       
        let userName = this.state.userName || 'Your Name';

        let userImagePreview = this.state.userImage;

        let userUpdater = '';

        if(this.state.userDataLoaded){
        	userUpdater = <UserUpdater 			        		 
		        		image={userImagePreview} 
		        		name={this.state.userName}      		
				        postUpload={this.userImageUpdate.bind(this)} />;        
		}
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
			    	{userUpdater}
				    </ListItem>
			    </List>
			</div>
        </div>);
    }
}

export default ProfileDetail;