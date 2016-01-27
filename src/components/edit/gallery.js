import React from 'react';
import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import StarBorder from 'material-ui/lib/svg-icons/toggle/star-border';
import IconButton from 'material-ui/lib/icon-button';
import RaisedButton from 'material-ui/lib/raised-button';
import SwipeableViews from 'react-swipeable-views';

const tilesData = [{
  img: 'http://lorempixel.com/600/337/nature/',
  title: 'Breakfast',
  author: 'jill111',
  featured: true,
}, {
  img: 'http://lorempixel.com/500/337/nature/',
  title: 'Tasty burger',
  author: 'pashminu',
}, {
  img: 'http://lorempixel.com/400/300/nature/',
  title: 'Camera',
  author: 'Danson67',
}, {
  img: 'http://lorempixel.com/600/437/nature/',
  title: 'Morning',
  author: 'fancycrave1',
  featured: true,
}, {
  img: 'http://lorempixel.com/600/300/nature/',
  title: 'Hats',
  author: 'Hans',
}, {
  img: 'http://lorempixel.com/300/300/nature/',
  title: 'Hats',
  author: 'Hans',
}];

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
const photos = tilesData.map((tile, index) => <div key={index} style={Object.assign({},styles.slide,{backgroundImage:"url(" + tile.img  +")"})}></div>);
class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
    };

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
    return (<div id="gallery">
              <SwipeableViews
                index={this.state.slideIndex}
                onChangeIndex={this.handleChange.bind(this)}>
                {photos}
              </SwipeableViews>
              <div style={styles.indicatorContainer}>
                {tilesData.map((tile,index)=> <div key={index} style={this.getIndicatorStyle(index)}></div>)}
              </div>
            </div>);
  }
}
export default Gallery;