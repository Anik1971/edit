import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import EditIcon from 'material-ui/lib/svg-icons/image/camera-alt';
import Colors from 'material-ui/lib/styles/colors';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';
import Avatar from 'material-ui/lib/avatar';
import TextField from 'material-ui/lib/text-field';
import Dropzone from 'react-dropzone';
import Request from 'superagent';

export default class ProfilePic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      image: this.props.profileImage,
      businessName: this.props.bData.businessName
    };
  }
  updateProfilePic(){
    console.log('ProfilePic');
    this.setState({
      open:true 
    });
  };
  startProfilePicUpload(files) {
      console.log('Received files: ', files);
      let _this = this;
      Request
       .post('https://chat.tsepak.com/goodbox/image_resize')
       .attach('image', files[0],files[0].name)
       .end(function(err, res){
         if (err || !res.ok) {
           alert('Oh no! error');
         } else {
           let response = JSON.parse(res.text);
           debugger;
           if(response.status == 0){
            _this.setState({
              image: response.url
            });
           }
         }
       });
  };
  cancelProfilePicUpload(){
    console.log('Canceled Profile Pic Uploading');
    this.setState({open: false});
  };
  onNameChange(name){
    console.log('onChange',name.target.value);
    this.setState({
      businessName: name.target.value
    });
  };
  updateProfile(){
    console.log(this);
    this.props.putBusiData({
      businessName: this.state.businessName,
      profilePicUrl: this.state.image
    });
    this.setState({
      open: false
    });
  };
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={this.cancelProfilePicUpload.bind(this)} />,
      <FlatButton
        label="Update"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.updateProfile.bind(this)} />,
    ];

    return (
      <div>
        <FlatButton 
          secondary={true} 
          labelPosition="after"
          onTouchTap = {this.updateProfilePic.bind(this)} >
          <EditIcon 
            className="editIcon" 
            color={Colors.white} />
        </FlatButton> 
        
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}>
          <Card zDepth={1}>
            <CardMedia>
              <img src={this.state.image}/>
            </CardMedia>
            <CardActions>              
              <div className="row">              
                  <RaisedButton
                      className="profilePicChangeBtn"
                      secondary={true}                      
                      label="CHANGE">                    
                    <Dropzone 
                      className="imageUploadButton"
                      id="profilePicUploadButton"
                      onDrop={this.startProfilePicUpload.bind(this)}>
                      <div>Try dropping some files here, or click to select files to upload.</div>
                    </Dropzone>
                  </RaisedButton>              
              </div>
            </CardActions>
          </Card>
          <div>
            <TextField fullWidth={true}
              floatingLabelText="Business Name" 
              defaultValue={this.state.businessName}
              onChange={this.onNameChange.bind(this)}/>
          </div>
        </Dialog>
      </div>
    );
  }
}
export default ProfilePic;