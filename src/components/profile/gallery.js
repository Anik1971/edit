import React from 'react';
import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import StarBorder from 'material-ui/lib/svg-icons/toggle/star-border';
import IconButton from 'material-ui/lib/icon-button';
import RaisedButton from 'material-ui/lib/raised-button';

const gradientBg = 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)';
const gridListStyle = {width: 500, height: 400, overflowY: 'auto', marginBottom: 24};
const gallery = [
  {
    img: 'http://lorempixel.com/600/337/nature/',
    title: 'Breakfast',
    author: 'jill111',
    featured: true,
  },
  {
    img: 'http://lorempixel.com/500/337/nature/',
    title: 'Tasty burger',
    author: 'pashminu',
  },
  {
    img: 'http://lorempixel.com/400/300/nature/',
    title: 'Camera',
    author: 'Danson67',
  },
  {
    img: 'http://lorempixel.com/600/437/nature/',
    title: 'Morning',
    author: 'fancycrave1',
    featured: true,
  },
  {
    img: 'http://lorempixel.com/600/300/nature/',
    title: 'Hats',
    author: 'Hans',
  },
  {
    img: 'http://lorempixel.com/300/300/nature/',
    title: 'Hats',
    author: 'Hans',
  }
];
class Gallery extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (<div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
      {/*Grid list with all possible overrides*/}
      <GridList
        cols={2}
        cellHeight={200}
        padding={1}
        style={gridListStyle}
        >
        {
          gallery.map((tile,index) => <GridTile
          cols={tile.featured ? 2 : 1}
          rows={tile.featured ? 2 : 1}
          key={index}><img src={tile.img} /></GridTile>)
        }
      </GridList>
    </div>);
  }
}
export default Gallery;