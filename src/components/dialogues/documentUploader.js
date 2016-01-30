import React from 'react';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import Dropzone from 'react-dropzone';
import Request from 'superagent';

export default class DocumentUploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploading: false
        };
    }
    startDocumentUpload(files) {
        let _this = this;
        this.setState({
            uploading: true
        }, function() {
            Request
                .post('https://chat.tsepak.com/goodbox/image_resize')
                .attach('image', files[0], files[0].name)
                .end(function(err, res) {
                    if (err || !res.ok) {
                        _this.setState({
                            uploading: false
                        });
                    }
                    else {
                        let response = JSON.parse(res.text);
                        if (response.status == 0) {
                            _this.setState({
                                uploading: false
                            }, function() {
                                _this.props.postUpload(response.url);
                            });
                        }
                    }
                });
        });
    }
    render() {
        const dropzoneStyle = {
            margin: 'auto',
            position: 'relative',
            top: 100,
            borderRadius: '100%',
            height: 50,
            width: 50
        };

        if (this.state.uploading)
        {
            return (
                <div style={dropzoneStyle}>
                    Please wait uploading the image..
                </div>
            );
        }
        else {
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
}
export default DocumentUploader;
