import React from 'react';
import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import StarBorder from 'material-ui/lib/svg-icons/toggle/star-border';
import IconButton from 'material-ui/lib/icon-button';
import RaisedButton from 'material-ui/lib/raised-button';
import SwipeableViews from 'react-swipeable-views';
import objectAssign from 'object-assign';
import Request from 'superagent';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';



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
        userId: 'b2fda850',
        app: 'com.tsepak.supplierchat.debug'
    };
    let url = 'http://testchat.tsepak.com/goodbox/';
    try {
      if (window.Android) {
        userData = JSON.parse(window.Android.getUserInfo());
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
  render() {
    let photos = this.state.slideImages.map((image, index) => <div key={index} style={objectAssign({},styles.slide,{backgroundImage:"url(" + image.url  +")"})}>
        <div className="galleryDelete">{image.verified?'Approved':'Pending'}</div>
    </div>);
    return (<Card
          style={styles.card_shadow}
          className="business-card">            
            <CardTitle
            className="business-cardHeader"
            title="Photos"/>            
            <CardMedia>
              <div id="gallery">
                  <SwipeableViews
                    index={this.state.slideIndex}
                    onChangeIndex={this.handleChange.bind(this)}>
                    {photos}
                  </SwipeableViews>
                  <div style={styles.indicatorContainer}>
                    {photos.map((photo,index)=> <div key={index} style={this.getIndicatorStyle(index)}></div>)}
                  </div>
                </div>
              </CardMedia>     
        </Card>
      );
  }
}
export default Gallery;