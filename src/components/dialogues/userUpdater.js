import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import EditIcon from 'material-ui/lib/svg-icons/content/create';
import NextIcon from 'material-ui/lib/svg-icons/navigation/chevron-right';
import PrevIcon from 'material-ui/lib/svg-icons/navigation/chevron-left';
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
import CircularProgress from 'material-ui/lib/circular-progress';
import SwipeableViews from 'react-swipeable-views';
import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import StarBorder from 'material-ui/lib/svg-icons/toggle/star-border';
import IconButton from 'material-ui/lib/icon-button';
import ClearIcon from 'material-ui/lib/svg-icons/content/clear';
const defaultUserIcon = 'https://cdn0.iconfinder.com/data/icons/users-android-l-lollipop-icon-pack/24/user-128.png';

const styles = {
  dialog : {
    padding:'0px',
    paddingTop: '10px !important',
    top:'-40px'
  },
  img : {
    width: 'auto',
    height: '100px'
  }
}
export default class UserUpdater extends React.Component {
  constructor(props) {
    super(props);
    console.info('UserUpdater');
    let pendingClass = 'hidden',pending = [],pendingMsg = '',pendingStatus = '',name='';
    if(this.props.name){
      name = this.props.name;
    }
    this.state = {
      open: false,
      image: this.props.image,
      uploadSuccess: true,
      loader: 'hidden',
      name:name
    };
  }
  editImage(){
    this.setState({
      open:true 
    });
  };
  startImageUpload(files) {
      console.log('Received files: ', files);
      let _this = this;
      this.setState({
        loader:'',
        uploadSuccess:false
      });
      Request
       .post('https://chat.tsepak.com/goodbox/image_resize')
       .attach('image', files[0],files[0].name)
       .end(function(err, res){
         if (err || !res.ok) {
           _this.setState({
            loader:'hidden',
            uploadSuccess:false
           });
         } else {
           let response = JSON.parse(res.text);
           if(response.status == 0){          
            _this.setState({
              image: response.url,
              loader:'hidden',
              uploadSuccess: true             
            });
           }
         }
       });
  };
  cancelImageUpload(){
    console.log('Canceled Profile Pic Uploading');
    this.setState({open: false});
  };
  updateImage(){
    console.log(this);
    let _this = this;
    this.setState({
      open: false
    },function(){
      if(_this.state.open == false && _this.state.uploadSuccess){
        _this.props.postUpload(_this.state.image,_this.state.name);
      }else{
        console.error('Upload failure');
      }
    });
  };
  onNameChange(name){
    console.log('onChange',name.target.value);
    this.state.name = name.target.value;
  };
  render() {
    const actions = [
      <FlatButton
        label="Update Photo"
        secondary={true}>
        <Dropzone 
          className="imageUploadButton"
          id="profilePicUploadButton"
          onDrop={this.startImageUpload.bind(this)}>
          <div>Try dropping some files here, or click to select files to upload.</div>
        </Dropzone>
      </FlatButton>,
      <FlatButton
        label="Save"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.updateImage.bind(this)} />,
    ];
    let imagePreview = this.state.image || defaultUserIcon;
    return (
      <div>
        <EditIcon 
          className="editIcon userUpdater" 
          color={Colors.black} 
          onClick={this.editImage.bind(this)} />        
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoDetectWindowHeight={false}
          repositionOnUpdate={false}
          style={styles.dialog}>
          <div className="dialogueCancel"><ClearIcon onClick={this.cancelImageUpload.bind(this)} /></div>
          <Card zDepth={0}>
            <CardActions>
              <div>
                <TextField fullWidth={true}
                  floatingLabelText="User Name" 
                  defaultValue={this.state.name}
                  onChange={this.onNameChange.bind(this)} />
              </div>
            </CardActions>
            <CardMedia>
              <div className={"imageGallery"}>   
                  <GridTile   
                    className="imgUptGridTile"                 
                    title={this.state.pendingStatus}
                    subtitle={this.state.pendingMsg}>                  
                    <img width="auto" height="100px" styles={styles.img} src={imagePreview}/>
                  </GridTile>
                </div>
            </CardMedia>
            <CardActions>
              <CircularProgress 
                className={this.state.loader} 
                mode="indeterminate" 
                size={.5} />                                 
            </CardActions>
          </Card>          
        </Dialog>
      </div>
    );
  }
}
export default UserUpdater;