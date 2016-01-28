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

export default class UserUpdater extends React.Component {
  constructor(props) {
    super(props);
    console.info('UserUpdater');
    let pendingClass = 'hidden',pending = [],pendingMsg = '',pendingStatus = '',name='';
    if(this.props.pending && this.props.pending.length){
      pendingClass = '';
      pending = this.props.pending;
      pendingMsg = this.props.pending.length+" image(s) waiting for approval";
      pendingStatus = 'Approved';
    }
    if(this.props.name){
      name = this.props.name;
    }
    this.state = {
      open: false,
      image: this.props.image || 'http://www.mp3alive.com/no_photo.jpg',
      uploadSuccess: true,
      loader: 'hidden',
      pendingClass:pendingClass,
      slideIndex: 0,
      pending:pending,
      pendingMsg:pendingMsg,
      pendingStatus:pendingStatus,
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
            let pendingClass = '';
            let pending = _this.state.pending;
            pending.push(response.url)
            let pendingMsg = pending.length+" image(s) waiting for approval";                    
            let slideIndex = _this.state.slideIndex;
            slideIndex = pending.length;
            console.log('pending',_this.state.pending);
            _this.setState({
              pending: pending,
              loader:'hidden',
              uploadSuccess: true,
              slideIndex:slideIndex,
              pendingMsg:pendingMsg,              
              pendingClass:pendingClass
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
        _this.props.postUpload(_this.state.pending,_this.state.name);
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
          onRequestClose={this.handleClose}>
          <div className="dialogueCancel"><ClearIcon onClick={this.cancelImageUpload.bind(this)} /></div>
          <Card zDepth={0}>
            <CardMedia>
              <SwipeableViews
                      index={this.state.slideIndex}
                      onChangeIndex={this.onIndexChange.bind(this)}
                    >
                <div className={"imageGallery"}>   
                  <GridTile   
                    className="imgUptGridTile"                 
                    title={this.state.pendingStatus}
                    subtitle={this.state.pendingMsg}>                  
                    <img width="auto" height="100px" src={this.state.image}/>
                  </GridTile>
                </div>                
                {  
                  this.state.pending.map((imageUrl, index) => {
                    return (                      
                      <div 
                        className={"imageGallery"}
                        key={index}>          
                        <GridTile  
                          className="imgUptGridTile"                        
                          title={<span className="mainText">{"Pending"}</span>}
                          subtitle={<span className="subText"><b>{"for approval"}</b></span>}>
                          <img src={imageUrl} width="auto" height="150px" /></GridTile>
                      </div>
                    );
                  })
                }  
              </SwipeableViews> 
            </CardMedia>
            <CardActions>    
              <div className={this.state.pendingClass}>
                <PrevIcon onClick={this.prevClick.bind(this)} className="prevBtn" color={Colors.black} />
                <NextIcon onClick={this.nextClick.bind(this)} className="nextBtn" color={Colors.black} />
              </div>          
              <div className="row">
                  <CircularProgress 
                    className={this.state.loader} 
                    mode="indeterminate" 
                    size={.5} />                   
              </div>
              <div>
                <TextField fullWidth={true}
                  floatingLabelText="User Name" 
                  defaultValue={this.state.name}
                  onChange={this.onNameChange.bind(this)} />
              </div> 
            </CardActions>
          </Card>          
        </Dialog>
      </div>
    );
  }
}
export default UserUpdater;