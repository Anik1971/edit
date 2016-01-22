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
import CircularProgress from 'material-ui/lib/circular-progress';
export default class ImageUpdater extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      image: this.props.image || 'http://www.mp3alive.com/no_photo.jpg',
      loader: 'hidden'
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
       .post('http://testchat.tsepak.com/goodbox/image_resize')
       .attach('image', files[0],files[0].name)
       .end(function(err, res){
         if (err || !res.ok) {
           _this.setState({
            loader:'hidden'
           });
         } else {
           let response = JSON.parse(res.text);
           if(response.status == 0){
            _this.setState({
              image: response.url,
              loader:'hidden'
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
    this.props.postUpload(this.state.image);
    this.setState({
      open: false
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
            color={Colors.white} />
        </FlatButton> 
        
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}>
          <Card zDepth={1}>
            <CardMedia>
              <img width="auto" height="150px" src={this.state.image}/>
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
              </div>
            </CardActions>
          </Card>          
        </Dialog>
      </div>
    );
  }
}
export default ImageUpdater;