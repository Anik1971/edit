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

export default class ProfilePic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }
  updateProfilePic(){
    console.log('ProfilePic');
    this.setState({
      open:true 
    });
  };
  startProfilePicUpload(){
    console.log('Start Profile Pic Uploading');
    this.setState({open: false});
  };
  cancelProfilePicUpload(){
    console.log('Canceled Profile Pic Uploading');
    this.setState({open: false});
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
        onTouchTap={this.startProfilePicUpload.bind(this)} />,
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
              <img src="http://lorempixel.com/600/337/nature/"/>
            </CardMedia>
            <CardActions>
              <FlatButton className="profileBtn" label="CHANGE"  secondary={true}/>
            </CardActions>
          </Card>
          <div>
            <TextField fullWidth={true}
              floatingLabelText="Profile Name" 
              defaultValue="Existing Name"/>
          </div>
        </Dialog>
      </div>
    );
  }
}
export default ProfilePic;