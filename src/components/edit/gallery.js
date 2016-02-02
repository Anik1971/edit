import React from 'react';
import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import StarBorder from 'material-ui/lib/svg-icons/toggle/star-border';
import IconButton from 'material-ui/lib/icon-button';
import RaisedButton from 'material-ui/lib/raised-button';
import SwipeableViews from 'react-swipeable-views';
import DocumentUploader from './../dialogues/documentUploader';
import Request from 'superagent';
import objectAssign from 'object-assign';


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
  }
};
class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
      slideImages: [] 
    };    
  }
  componentWillMount(){
    let _this = this;
    Request
    .post('http://testchat.tsepak.com/goodbox/get_business_photos')
    .send('{"supplierLoggedInId": "a09bdcd8"}')
    .end(function(err, res){
      if(err || !res.ok){
          console.error(err)
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
    let _this = this
    let newSlideImages = this.state.slideImages.slice();
    let body = {supplierLoggedInId: "a09bdcd8", url: value}
    Request
    .post('http://testchat.tsepak.com/goodbox/add_business_photo')
    .send(body)
    .end(function(err, res){
      if (err || !res.ok){
        console.error(err)
      }
      else{
        if (res && res.text){
          newSlideImages.push({url: value, objectId:JSON.parse(res.text).objectId});
          _this.setState({
            slideImages: newSlideImages
          });
        }
      }
    })
    
  }
  deletePic(index){
    let _this = this
    let newSlideImages = this.state.slideImages.slice()
    let objectId = this.state.slideImages[index].objectId
    let body = {supplierLoggedInId: "a09bdcd8", objectId: objectId}  
    Request
    .post('http://testchat.tsepak.com/goodbox/remove_business_photo')
    .send(JSON.stringify(body))
    .end(function(err, res){
      if (err || !res.ok){
        console.error(err)
      }
      else{
        if (res && res.text){
          if(JSON.parse(res.text).status == 0){
            newSlideImages.splice(index, 1)
            console.log(newSlideImages)
            _this.setState({
              slideImages: newSlideImages
            })
          }
        }
      }
    })
  }
  render() {
    //add a div absolute postioned button right top
    let photos = this.state.slideImages.map((image, index) => <div key={index} style={objectAssign({},styles.slide,{backgroundImage:"url(" + image.url  +")"})}>
        <div className="galleryDelete" onClick={this.deletePic.bind(this,index)}>Delete</div>
        </div>);
    return (<div id="gallery">
              <SwipeableViews
                index={this.state.slideIndex}
                onChangeIndex={this.handleChange.bind(this)}>
                {photos}
                <div key={photos.length} style={styles.slide}>
                  <DocumentUploader 
                    postUpload={this.handlePostImageUpload.bind(this)}>
                  </DocumentUploader>
                </div>
              </SwipeableViews>
              <div style={styles.indicatorContainer}>
                {photos.map((photo,index)=> <div key={index} style={this.getIndicatorStyle(index)}></div>)}
              </div>
            </div>);
  }
}
export default Gallery;