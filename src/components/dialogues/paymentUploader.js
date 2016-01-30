import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import EditIcon from 'material-ui/lib/svg-icons/file/file-upload';
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
import ClearIcon from 'material-ui/lib/svg-icons/content/clear';
import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import StarBorder from 'material-ui/lib/svg-icons/toggle/star-border';
import IconButton from 'material-ui/lib/icon-button';

const styles = {
  dialog : {
    padding:'0px',
    paddingTop: '10px !important',
    top:'-40px'
  },
  img : {
    width: 'auto',
    height: '150px'
  }
}
export default class PaymentUploader extends React.Component {
  constructor(props) {
    super(props);
    console.info('paymentUploader');
    this.state = {
      open: false,
      image: this.props.image || 'http://www.mp3alive.com/no_photo.jpg',
      uploadSuccess: false,
      loader: 'hidden',
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
        loader:''
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
              loader:'hidden',
              uploadSuccess: true,
              image:response.url
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
        _this.props.postUpload(_this.state.image);
      }else{
        console.error('Upload failure');
      }
    });
  };
  render() {
    const actions = [
      <FlatButton
        label="Update"
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

    return (
      <div>
         <EditIcon 
            className="paymentIcon" 
            color={Colors.black} 
            onClick={this.editImage.bind(this)} />        
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoDetectWindowHeight={false}
          repositionOnUpdate={false}
          style={styles.dialog } >
          <div className="dialogueCancel"><ClearIcon onClick={this.cancelImageUpload.bind(this)} /></div>
          <Card zDepth={0}>
            <CardMedia>
              <img width="auto" height="150px" styles={styles.img} src={this.state.image}/> 
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
export default PaymentUploader;