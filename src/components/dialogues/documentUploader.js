import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import Dropzone from 'react-dropzone';
import Request from 'superagent';

export default class DocumentUploader extends React.Component {
  constructor(props) {
     debugger;
    super(props);
    this.state = {
      open: false,
      image: this.props.image || 'http://www.mp3alive.com/no_photo.jpg',
      loader: 'hidden'
    };
  }
  startDocumentUpload(files) {
      console.log('Received files: ', files);
      let _this = this;
      this.setState({
        loader:''
      });
      Request
       .post('https://chat.tsepak.com/goodbox/image_resize')
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
            },function(){
              _this.props.postUpload(_this.state.image);
            });            
           }
         }
       });
  };
  render() {
    return (     

      		<RaisedButton
                secondary={true}
                fullWidth={true} 
                label="Upload Documents">
                <Dropzone  className="galleryUploadButton"
                 onDrop={this.startDocumentUpload}
                 >
        		</Dropzone>         
            </RaisedButton>	        
	    
    );
  }
}
export default DocumentUploader;