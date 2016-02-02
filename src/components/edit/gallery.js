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
    let newSlideImages = this.state.slideImages.slice();
    newSlideImages.push(value);
    this.setState({
      slideImages: newSlideImages
    });
  }
  render() {
    const photos = this.state.slideImages.map((image, index) => <div key={index} style={objectAssign({},styles.slide,{backgroundImage:"url(" + image  +")"})}></div>);
    return (<div id="gallery">
              <SwipeableViews
                index={this.state.slideIndex}
                onChangeIndex={this.handleChange.bind(this)}>
                {photos}
                <div key={photos.length} style={styles.slide}>
                  <DocumentUploader postUpload={this.handlePostImageUpload.bind(this)}>
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