import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import EditIcon from 'material-ui/lib/svg-icons/image/camera-alt';
import NextIcon from 'material-ui/lib/svg-icons/av/skip-next';
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

export default class ImageUpdater extends React.Component {
  constructor(props) {
    super(props);
    let pendingClass = 'hidden',pending = [],pendingMsg = '',pendingStatus = '';
    if(this.props.pending && this.props.pending.length){
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
        _this.props.postUpload(_this.state.image);
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
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={this.cancelImageUpload.bind(this)} />,
      <FlatButton
        label="Update"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.updateImage.bind(this)} />,
    ];

    return (
      <div>
        <FlatButton 
          secondary={true} 
          labelPosition="after"
          className="imageUpdaterButton"
          onTouchTap = {this.editImage.bind(this)} >
          <EditIcon 
            className="editIcon" 
            color={Colors.black} />
        </FlatButton> 
        
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}>
          <Card zDepth={1}>
            <CardMedia>
              <SwipeableViews
                      index={this.state.slideIndex}
                      onChangeIndex={this.onIndexChange.bind(this)}
                    >
                <div className={"imageGallery"}>   
                  <GridTile                    
                    title={this.state.pendingStatus}
                    subtitle={this.state.pendingMsg}>                  
                    <img width="auto" height="150px" src={this.state.image}/>
                  </GridTile>
                </div>
                
                
                    
                {  
                  this.state.pending.map((imageUrl, index) => {
                    return (                      
                      <div className={"imageGallery"}>          
                        <GridTile
                          key={index}
                          title={"Pending"}
                          subtitle={<span><b>{"for approval"}</b></span>}>
                          <img src={imageUrl} width="auto" height="150px" /></GridTile>
                      </div>
                    );
                  })
                }  
              </SwipeableViews> 
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
                      onDrop={this.startImageUpload.bind(this)}>
                      <div>Try dropping some files here, or click to select files to upload.</div>
                    </Dropzone>
                  </RaisedButton>                   
                  <CircularProgress 
                    className={this.state.loader} 
                    mode="indeterminate" 
                    size={.5} /> 
                  <div className={this.state.pendingClass}>
                    next <NextIcon color={Colors.black} />
                  </div>
              </div>
            </CardActions>
          </Card>          
        </Dialog>
      </div>
    );
  }
}
export default ImageUpdater;