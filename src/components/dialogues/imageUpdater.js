import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import EditIcon from 'material-ui/lib/svg-icons/image/camera-alt';
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
  dialogContent : {
    width:'95%'
  },
  img : {
    width: 'auto',
    height: 250,
    minWidth: 'inherit',
    maxWidth: '100%',
    display: 'block',
    margin: 'auto'
  }
}
export default class ImageUpdater extends React.Component {
  constructor(props) {
    super(props);
    console.info('ImageUpdater');
    let pendingClass = 'hidden',pending = '',pendingMsg = '',pendingStatus = '';
    if(this.props.pending){
      pendingClass = '';
      pending = this.props.pending;
      pendingMsg = this.props.pending.length+" image(s) waiting for approval";
      pendingStatus = 'Approved';
    }
    this.state = {
      open: false,
      image: this.props.image || 'http://www.mp3alive.com/no_photo.jpg',
      uploadSuccess: false,
      loader: 'hidden',
      pendingClass:pendingClass,
      slideIndex: 0,
      pending:pending,
      pendingMsg:pendingMsg,
      pendingStatus:pendingStatus
    };
  }
  editImage(){
    this.setState({
      open:true 
    });
  };
  dataURItoBlob(dataURI) {
      // convert base64/URLEncoded data component to raw binary data held in a string
      let byteString;
      if (dataURI.split(',')[0].indexOf('base64') >= 0)
          byteString = atob(dataURI.split(',')[1]);
      else
          byteString = unescape(dataURI.split(',')[1]);

      // separate out the mime component
      let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

      // write the bytes of the string to a typed array
      let ia = new Uint8Array(byteString.length);
      for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
      }

      return new Blob([ia], {type:mimeString});
  }
  imageResize(_this,files,callback){
    let fileReader = new FileReader();
    let name = files[0].name;
    let lastModified = files[0].lastModified;
    fileReader.onload = function(e) {
      let img = new Image();
      img.onload = function() {
        let MAX_WIDTH = 1024;
        let MAX_HEIGHT = 768;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        }else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        let canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        canvas.getContext("2d").drawImage(this, 0, 0, width, height);
        let blob = _this.dataURItoBlob(canvas.toDataURL());
        files[0] = blob;
        files[0].name = name;
        files[0].lastModified = lastModified;
        callback(files);
      }
      img.src = e.target.result;
    }
    fileReader.readAsDataURL(files[0]);
  }
  startImageUpload(files) {
      console.log('Received files: ', files);
      let _this = this;
      this.setState({
        loader:''
      });
      this.imageResize(this,files,function(files){
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
            console.log('Image uploaded');           
            let pendingClass = '';
            let pending = response.url;
            let pendingMsg = pending.length+" image(s) waiting for approval";                    
            let slideIndex = _this.state.slideIndex;
            slideIndex = pending.length;           
            _this.setState({
              pending: pending,
              loader:'hidden',
              uploadSuccess: true,
              slideIndex:slideIndex,
              pendingMsg:pendingMsg,              
              pendingClass:pendingClass,
              image:response.url
            });
           }
         }
       });
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
        _this.props.postUpload(_this.state.pending);
      }else{
        console.error('Upload failure');
      }
    });
  };
  onIndexChange(value){
    this.setState({
      slideIndex: value,
    });
  };
  prevClick(){
    console.log('prev clicked',this.state);
    let slideIndex = this.state.slideIndex;
    if(slideIndex>0){
      this.setState({
        slideIndex:slideIndex-1
      });
    }
  };
  nextClick(){
    console.log('next clicked');
    let slideIndex = this.state.slideIndex;
    let pending = this.state.pending;
    if(slideIndex<pending.length){
      this.setState({
        slideIndex:slideIndex+1
      })
    }
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
            className="editIcon" 
            color={Colors.black} 
            onClick={this.editImage.bind(this)} />        
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoDetectWindowHeight={false}
          repositionOnUpdate={false}
          style={styles.dialog } 
          contentStyle={styles.dialogContent}>
          <div className="dialogueCancel"><ClearIcon onClick={this.cancelImageUpload.bind(this)} /></div>
          <Card zDepth={0}>
            <CardMedia>
              <img style={styles.img} src={this.state.image}/> 
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
export default ImageUpdater;