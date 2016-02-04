import React from 'react';
import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import StarBorder from 'material-ui/lib/svg-icons/toggle/star-border';
import IconButton from 'material-ui/lib/icon-button';
import RaisedButton from 'material-ui/lib/raised-button';
import SwipeableViews from 'react-swipeable-views';
import objectAssign from 'object-assign';
import Request from 'superagent';



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
    let userData = {
        userId: 'a09bdcd8',
        app: 'com.tsepak.supplierchat.debug'
    };
    let url = 'http://testchat.tsepak.com/goodbox/';
    try {
      if (window.Android) {
        userData = window.Android.getUserInfo();
        if (userData.app == 'com.tsepak.supplierchat') {
          url = 'http://chat.tsepak.com/goodbox/';
        }

      }
    }
    catch (e) {
      console.log(e);
    }

    this.state = {
      supplierLoggedInId: userData.userId,
      photoAPIurl: url,
      slideIndex: 0,
      slideImages: []
    };

  }
  componentWillMount() {
    let _this = this;
    Request
    .post(this.state.photoAPIurl + 'get_business_photos')
    .send('{"supplierLoggedInId": "'+ this.state.supplierLoggedInId + '"}')
      .end(function(err, res) {
        if (err || !res.ok) {
          console.error(err)
        }
        else {
          if (res && res.text) {
            _this.setState({
              slideImages: JSON.parse(res.text)
            });
          }
        }
      });
  }
  getIndicatorStyle(index) {
    var indicatorStyle = {
      borderRadius: '100%',
      backgroundColor: 'rgba(255,255,255,0.75)',
      height: 10,
      width: 10,
      display: 'inline-block',
      marginRight: 5
    };
    if (index == this.state.slideIndex)
      indicatorStyle.backgroundColor = 'rgba(255,255,255,0.9)';
    return indicatorStyle;
  }
  handleChange(value) {
    this.setState({
      slideIndex: value,
    });
  }
  componentWillMount() {
    let _this = this;
    Request
      .post('http://testchat.tsepak.com/goodbox/get_business_photos')
      .send('{"supplierLoggedInId": "' + this.props.bData.supplierLoggedInId + '"}')
      .end(function(err, res) {
        if (err || !res.ok) {
          console.error(err)
        }
        else {
          if (res && res.text) {
            _this.setState({
              slideImages: JSON.parse(res.text)
            });
          }
        }
      });
  }
  render() {
    let photos = this.state.slideImages.map((image, index) => <div key={index} style={objectAssign({},styles.slide,{backgroundImage:"url(" + image.url  +")"})}>
        <div className="galleryDelete">{image.verified?'Approved':'Pending'}</div>
    </div>);
    return (<div id="gallery">
              <SwipeableViews
                index={this.state.slideIndex}
                onChangeIndex={this.handleChange.bind(this)}>
                {photos}
              </SwipeableViews>
              <div style={styles.indicatorContainer}>
                {photos.map((photo,index)=> <div key={index} style={this.getIndicatorStyle(index)}></div>)}
                <div key={photos.length} style={this.getIndicatorStyle(photos.length)}></div>
              </div>
            </div>);
  }
}
export default Gallery;