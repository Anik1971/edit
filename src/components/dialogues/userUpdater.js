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
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';


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
    margin: 'auto',
    marginTop: 10
  },
  dialogBody : {
    minHeight : 250
  },
  profileName:{
    width:'100%',
    height:'auto'
  },
  avatarName: {
    float:'left',
    marginLeft: 12
  },
  savedUserName: {
    float:'left',
    height:'100%',
    marginTop: 9,
    marginLeft: 12
  },
  editIcon: {
    float:'right',
    marginTop:5
  },
  profileWrapper:{
    width:'100%',
    height:50
  },
  loadIcon:{
    float:'right'
  },
  loader:{
    height:70
  }
}
export default class UserUpdater extends React.Component {
  constructor(props) {
    super(props);
    console.log('UserUpdater constructor');
    if(this.props.name){
      name = this.props.name;
    }
    this.state = {
      open: false,
      image: this.props.image,
      uploadSuccess: false,
      change: false,
      loader: 'hidden',
      name:name,
      errorText: '',
      uNameDisabled: false
    };
    this.loadUserData(this);
  }
  loadUserData(){
    console.log('userUpdater loadUserData');
    let url = 'http://testchat.tsepak.com/goodbox/get_details';
    let userData = {
        userId: 'b2fda850',
        app: 'com.tsepak.supplierchat.debug',
        authToken: '19C29BE487BD166AADBADC13BEE787A5ECBA934332126964DC7E5F8394CED26D',
        clientId: 'sup_1454659467523pBBUYFWQX'
    };
    try {
      if (window.Android) {
        userData = JSON.parse(window.Android.getUserInfo());
        if (userData.app == 'com.tsepak.supplierchat') {
          url = 'http://chat.tsepak.com/goodbox/get_details';
        }

      }
    }
    catch (e) {
      console.log(e);
    }
    let _this = this;
    Request
    .get(url)
    .set('AUTHTOKEN', userData.authToken)
    .set('CLIENTID', userData.clientId)
    .end(function(err, res){
        if(err || !res.ok){
            console.error("error occured")
        }
        else{
            //console.log(res.text);
            let resp = JSON.parse(res.text);
            let uName = resp.name;
            let uNameDisabled = false;
            if(uName && uName.length){ 
              uNameDisabled = true; //excluding username update option since its not the first time
            }
            _this.setState({
                userName:uName,
                userImage:resp.profile_pic,
                prevName:uName,
                prevImage:resp.profile_pic,
                userDataLoaded:true,
                uNameDisabled: uNameDisabled
            })   
        }
    })
  }
  editImage(){
    this.setState({
      open:true,
      errorText: ''
    });
  };

  postUpload(){
    console.info('userImageUpdate');
    let userImage = this.state.userImage;
    let userName = this.state.userName;
    if(userImage.length){
      //console.log('imageurl');      
      this.setState({
        userImage: userImage,
        prevImage: userImage
      });
    } 
    if(userName){
      this.setState({
        userName:userName,
        prevName:userName
      });
      // this.props.manageSave('show','userName',userName);
    }
    let userData = {
        userId: 'b2fda850',
        app: 'com.tsepak.supplierchat.debug',
        authToken: '19C29BE487BD166AADBADC13BEE787A5ECBA934332126964DC7E5F8394CED26D',
        clientId: 'sup_1454659467523pBBUYFWQX'
    };
    let url = 'http://testchat.tsepak.com/goodbox/set_details';
    try {
      if (window.Android) {
        userData = JSON.parse(window.Android.getUserInfo());        
        if (userData.app == 'com.tsepak.supplierchat') {
          url = 'http://chat.tsepak.com/goodbox/set_details';
        }
        
      }
    }
    catch (e) {
      console.log(e);
    }   
    let body = JSON.stringify({name: userName, profile_pic: userImage});
    let _this = this;
    Request
    .post(url)
    .set('AUTHTOKEN', userData.authToken)
    .set('CLIENTID', userData.clientId)
    .send(body)
    .end(function(err, res){
      if(err || !res.ok){
        console.error('Error Spotted');
      }
      else{
        _this.setState({
          uploadSuccess: true
        });
        let response = JSON.parse(res.text);
      }
    });
  }
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
        let blob = _this.dataURItoBlob(canvas.toDataURL("image/jpeg", 0.85));
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
      console.log('Selected file: ', files[0]);
      let _this = this;
      this.setState({
        loader:'',
        preview:files[0].preview
      });
      this.imageResize(this,files,function(files){
        console.log('Resized image',files[0]);
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
            _this.setState({
              userImage: response.url,
              loader:'hidden',
              uploadSuccess: true,
              change:true,
              preview:''            
            });
           }
         }
       });
      });
  };
  cancelImageUpload(){
    console.log('Canceled Profile Pic Uploading', this.state.prevName);
    this.setState({open: false, userName: this.state.prevName});
    window.ispopped = true;
    window.history.back();

  };
   componentWillMount(){
    let _this = this;
    window.emitter.addListener('backclicked', function(){
      window.ispopped = true;
      _this.setState({
        open: false
      });
    });
  }

  updateImage(){
    console.log(this);
    let _this = this;
    this.setState({
      open: false
    },function(){
      if(this.state.open == false){
        this.postUpload();
        window.ispopped = true;
        window.history.back();
      }else{
        //console.error('Upload failure');
      }
    });    
  };
  onNameChange(name){
    if (name.target.value){
      this.setState({
        change: true,
        userName: name.target.value,
        errorText: ''
      });  
    }
    else{
      this.setState({
        change: false,
        errorText: 'This is a required field',
        userName: ''
      });
    };
  };
  render() {
      let savedUserName = '';
      let savedUserImage = '';
      if(!this.state.userDataLoaded){
        return(<div style={styles.profileWrapper}>
                 <div style={styles.profileName}>
                    <div style={styles.avatarName}>
                      <Avatar src={defaultUserIcon} />
                    </div>
                    <div style={styles.savedUserName}>
                     {"Loading.."}
                    </div>
                    <div style={styles.loadIcon}>
                      <CircularProgress size={.25} /> 
                    </div>   
                 </div>
              </div>);
      }else{
        let userName = this.state.userName;
        let userImage = this.state.userImage;        
        savedUserName = this.state.prevName;
        savedUserImage = this.state.prevImage;        
        let imageSrc = userImage;
        let imageClass = ''; 
        let dialogueImageTextClass = 'hidden';
        if(!imageSrc){
          dialogueImageTextClass = 'dialogueImageText';
          imageClass = 'hidden';
        }
        let actions = [
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
            label="DONE"
            primary={true}
            disabled={!this.state.change}
            keyboardFocused={true}
            onTouchTap={this.updateImage.bind(this)} />,
        ];    

        if(window.history && window.ispopped && this.state.open)
        {
          console.log('pushing the state');
          window.history.pushState({'x':'y'}, null);
          window.ispopped = false;
        }
        let editIcon = "";
        if (window.isCoSupplier || this.props.showEdit)
        {
          editIcon = (<EditIcon 
                    className="editIcon userUpdater" 
                    color={Colors.black} 
                    onClick={this.editImage.bind(this)} /> );
        }

        if(!savedUserName){
          savedUserName = 'Your Name';
        }
        if(!savedUserImage){
          savedUserImage = defaultUserIcon;
        }
        return (
          <div style={styles.profileWrapper}>
           <div style={styles.profileName}>
              <div style={styles.avatarName}>
                <Avatar src={savedUserImage} />
              </div>
              <div style={styles.savedUserName}>
               {savedUserName}
              </div>
              <div style={styles.editIcon}>
                {editIcon} 
              </div>   
           </div>
            <Dialog
              actions={actions}
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}
              autoScrollBodyContent={true}
              repositionOnUpdate={false}
              style={styles.dialog}
              title={this.props.title}
              bodyStyle={styles.dialogBody}
              titleClassName={'dialogTitle'}
              contentStyle={styles.dialogContent}>
              <div className="dialogueCancel"><ClearIcon onClick={this.cancelImageUpload.bind(this)} /></div>
              <Card zDepth={0}>
                <CardActions>
                  <div>
                    <TextField fullWidth={true}
                      floatingLabelText="User Name" 
                      defaultValue={userName}
                      onChange={this.onNameChange.bind(this)} 
                      errorText={this.state.errorText}
                      disabled={this.state.uNameDisabled}/>
                  </div>
                </CardActions>
                <CardActions style={styles.loader} className={this.state.loader}>  
                  <div className={this.state.loader}>        
                        <div className="loaderIcon">
                          <CircularProgress  
                            mode="indeterminate" 
                            size={.25} />
                        </div>
                        <div className="loaderText">
                          {" Uploading... Please wait"}
                        </div>
                  </div>                 
                </CardActions>
                <CardMedia>      
                  <div className={dialogueImageTextClass} style={styles.img}>{"No Image"}</div>
                  <div className={imageClass}><img style={styles.img} src={imageSrc}/></div>
                </CardMedia>
              </Card>          
            </Dialog>
          </div>
      );
    }
  }
}
export default UserUpdater;