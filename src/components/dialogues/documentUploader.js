import React from 'react';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import Dropzone from 'react-dropzone';
import Request from 'superagent';

export default class DocumentUploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            image: this.props.image || 'http://www.mp3alive.com/no_photo.jpg',
            loader: 'hidden'
        };
    }
    startDocumentUpload(files) {
        let _this = this;
        this.setState({
            loader: ''
        });
        Request
            .post('https://chat.tsepak.com/goodbox/image_resize')
            .attach('image', files[0], files[0].name)
            .end(function(err, res) {
                if (err || !res.ok) {
                    _this.setState({
                        loader: 'hidden'
                    });
                }
                else {
                    let response = JSON.parse(res.text);
                    if (response.status == 0) {
                        _this.setState({
                            image: response.url,
                            loader: 'hidden'
                        }, function() {
                            _this.props.postUpload(_this.state.image);
                        });
                    }
                }
            });
    }
    render() {
        const dropzoneStyle = {
            margin: 'auto',
            position: 'relative',
            top: 200,
            borderRadius: '100%',
            height: 50,
            width: 50
        };
        return (
            <Dropzone 
                 onDrop={this.startDocumentUpload}
                 style={dropzoneStyle}
                 postUpload={this.props.postUpload}
                 accept='image/*'
                 multiple={false}>
                <FloatingActionButton mini={true}>
                    <ContentAdd />
                </FloatingActionButton>
            </Dropzone>
        );
    }
}
export default DocumentUploader;