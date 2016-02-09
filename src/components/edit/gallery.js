import React from 'react';
import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import StarBorder from 'material-ui/lib/svg-icons/toggle/star-border';
import Colors from 'material-ui/lib/styles/colors';
import DeleteIcon from 'material-ui/lib/svg-icons/action/delete';
import IconButton from 'material-ui/lib/icon-button';

import RaisedButton from 'material-ui/lib/raised-button';
import SwipeableViews from 'react-swipeable-views';
import DocumentUploader from './../dialogues/documentUploader';
import Request from 'superagent';
import objectAssign from 'object-assign';
import CircularProgress from 'material-ui/lib/circular-progress';
import Dialog from 'material-ui/lib/dialog';
import ClearIcon from 'material-ui/lib/svg-icons/content/clear';
import FlatButton from 'material-ui/lib/flat-button';


const styles = {
  slide: {
    minHeight: 400,
    backgroundSize: '85%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundColor: 'rgba(0,0,0,0.95)'
  },
  slideIndicator: {
    borderRadius: '100%',
    backgroundColor: 'rgba(255,255,255,0.8)',
    height: 10,
    width: 10,
    display: 'inline-block',
    marginRight: 5
  },
  indicatorContainer: {
    backgroundColor: 'rgba(0,0,0,0.95)',
    padding: 10,
    textAlign: 'center',
  },
  dropzoneStyle: {
      margin: 'auto',
      position: 'relative',
      borderRadius: '100%',
      height: 50,
      width: 50,
      transform:'translateY(-50%)',
      top:'50%'
  },
  progressText : {
    fontSize: 12,
    margin: 'auto',
    color:'#02a8f3'
  },
  dialog : {
      padding:'0px',
      paddingTop: '10px !important',
      top:'-40px'
  },
  dialogContent : {
      width:'95%'
  }
}; 
class Gallery extends React.Component {
  constructor(props) {
    super(props);
    let userData = {
        userId: 'b2fda850',
        app: 'com.tsepak.supplierchat.debug'
    };
    let url = 'http://testchat.tsepak.com/goodbox/';
    try {
      if(window.Android)
      {
        userData = JSON.parse(window.Android.getUserInfo());
        if(userData.app == 'com.tsepak.supplierchat'){
          url = 'http://chat.tsepak.com/goodbox/';
        }

      }
    }
    catch(e)
    {
      console.log(e);
    }
    this.state = {
      supplierLoggedInId: userData.userId,
      photoAPIurl: url,
      slideIndex: 0,
      slideImages: [],
      uploading: false,
      deletePopover: 'notPop',
      deletePicIndex: -1
    };    
  }
  componentWillMount(){
    let _this = this;
    Request
    .post(this.state.photoAPIurl + 'get_business_photos')
    .send('{"supplierLoggedInId": "'+ this.state.supplierLoggedInId + '"}')
    .end(function(err, res){
      if(err || !res.ok){
          console.error(err);
      }
      else{
        if (res && res.text){
          _this.setState({slideImages: JSON.parse(res.text)});
        }
      }
    });
  }
  getIndicatorStyle(index) {
    var indicatorStyle = {
      borderRadius: '100%',
      backgroundColor: 'rgba(255,255,255,0.75)',
      height: 5,
      width: 5,
      display: 'inline-block',
      marginRight: 5
    };
    if (index == this.state.slideIndex) {
      indicatorStyle.backgroundColor = 'rgba(255,255,255,0.9)';
      indicatorStyle.height = 10;
      indicatorStyle.width = 10;
    }
    return indicatorStyle;
  }
  handleChange(value) {
    this.setState({
      slideIndex: value
    });
  }
  handlePostImageUpload(value) {
    let _this = this;
    let newSlideImages = this.state.slideImages.slice();
    let body = {supplierLoggedInId: this.state.supplierLoggedInId, url: value};
    Request
    .post(this.state.photoAPIurl + 'add_business_photo')
    .send(body)
    .end(function(err, res){
      if (err || !res.ok){
        console.error(err);
        _this.updateUploadingStatus(false);
      }
      else{
        if (res && res.text){
          console.log('resp',res.text);
          newSlideImages.push({url: value, objectId:JSON.parse(res.text).objectId});
          _this.updateUploadingStatus(false);
          _this.setState({
            slideImages: newSlideImages
          });
        }
      }
    })
    
  }
  deletePicPrompt(index){
    console.log('deletePicPrompt',index);
    this.setState({
      deletePopover: 'pop',
      deletePicIndex: index
    });
  }
  deletePic(){
    let _this = this;
    let index = this.state.deletePicIndex;
    let slideImages = this.state.slideImages.slice();
    let _slideImages = this.state.slideImages.slice();
    let objectId = this.state.slideImages[index].objectId;
    let body = {supplierLoggedInId: this.state.supplierLoggedInId, objectId: objectId};
    slideImages.splice(index, 1);
    this.setState({
      slideImages: slideImages
    },function(){
      this.closePopover();
    });
    Request
    .post(this.state.photoAPIurl + 'remove_business_photo')
    .send(JSON.stringify(body))
    .end(function(err, res){
      if (err || !res.ok){
        console.error(err);
        _this.setState({
          slideImages:_slideImages
        });
      }
      else{
        if (res && res.text){
          if(JSON.parse(res.text).status == 0){
            console.log('deleted image');
            /*newSlideImages.splice(index, 1);
            _this.setState({
              slideImages: newSlideImages
            });*/
          }
        }
      }
    })
  }
  updateUploadingStatus(value){
    this.setState({
      uploading:value
    });
  }
  closePopover(){
        this.setState({
            deletePopover:'notPop',
            deletePicIndex: -1
        });
    }
  render() {
    //add a div absolute postioned button right top
    let docUpLoading = 'hidden';
    let addBtnClass = '';
    if(this.state.uploading){
      docUpLoading = 'docUpLoading';
      addBtnClass = 'hidden';
    }
    const actions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={this.closePopover.bind(this, 'pop')} />,
      <FlatButton
        label="Delete"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.deletePic.bind(this)}/>
    ];
    let photos = this.state.slideImages.map((image, index) => <div key={index} style={objectAssign({},styles.slide,{backgroundImage:"url(" + image.url  +")"})}>
        <div className="galleryDelete">{image.verified?'':'Pending Approval'} <DeleteIcon className="deleteIcon" onClick={this.deletePicPrompt.bind(this,index)} color={'rgba(255,255,255,0.85)'}/></div>
        </div>);
    let documentUploaderBtn = <DocumentUploader 
                      updateUploadingStatus={this.updateUploadingStatus.bind(this)}
                      postUpload={this.handlePostImageUpload.bind(this)}>
                    </DocumentUploader>;
            if(!window.showBrowse){
              documentUploaderBtn = <span style={{padding: '0 20px', paddingTop:'50%',fontSize: 12,lineHeight:'1.5em',display: 'block',color: 'red',width: '100%',textAlign: 'center'}}>
            {"Uploading images is not supported. Please contact GoodBox support"}
          </span>;
            }
    return (<div id="gallery">
              <SwipeableViews
                index={this.state.slideIndex}
                onChangeIndex={this.handleChange.bind(this)}>
                {photos}
                <div key={photos.length} style={styles.slide}>
                  <div className={docUpLoading} styles={styles.dropzoneStyle}> 
                    <CircularProgress  
                        mode="indeterminate" 
                        size={.5}/>
                    <div style={styles.progressText}>{"Please wait... Uploading Image"}</div>
                  </div>
                  <div className={addBtnClass}>
                    {documentUploaderBtn}
                  </div>
                </div>
              </SwipeableViews>
              <div style={styles.indicatorContainer}>
                {photos.map((photo,index)=> <div key={index} style={this.getIndicatorStyle(index)}></div>)}
                <div key={photos.length} style={this.getIndicatorStyle(photos.length)}></div>
              </div>
               <Dialog
                  title="Delete Photo"
                  actions={actions}
                  modal={false}
                  open={this.state.deletePopover === 'pop'}  
                  onRequestClose={this.closePopover.bind(this, 'pop')}>
                  Are you sure ?
                </Dialog>
            </div>);
  }
}
export default Gallery;