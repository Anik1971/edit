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

        return new Blob([ia], {
            type: mimeString
        });
    }

    imageResize(_this, files, callback) {
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
                }
                else {
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


    startDocumentUpload(files) {
        let _this = this;
        this.props.updateUploadingStatus(true);
        this.imageResize(this, files, function(files) {
            Request
                .post('https://chat.tsepak.com/goodbox/image_resize')
                .attach('image', files[0], files[0].name)
                .end(function(err, res) {
                    if (err || !res.ok) {
                        _this.props.updateUploadingStatus(true);
                    }
                    else {
                        let response = JSON.parse(res.text);
                        if (response.status == 0) {
                            _this.props.postUpload(response.url);
                        }
                    }
                });
        });
    }
    render() {
        const dropzoneStyle = {
            margin: 'auto',
            position: 'relative',
            top: 210,
            borderRadius: '100%',
            height: 50,
            width: 50
        };
        return (
            <Dropzone 
                 onDrop={this.startDocumentUpload.bind(this)}
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
