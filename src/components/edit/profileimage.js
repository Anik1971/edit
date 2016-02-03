import React from 'react';
import Colors from 'material-ui/lib/styles/colors';
import ProfilePic from './../dialogues/profilePic';
import ImageUpdater from './../dialogues/imageUpdater';
import FloatingActionButton from 'material-ui/lib/floating-action-button';


class ProfileImage extends React.Component {
	constructor(props) {
		super(props);
		let businessImageCover = '';
		if(this.props.bData.newExtras.approved && this.props.bData.newExtras.approved.coverImage){
			businessImageCover = this.props.bData.newExtras.approved.coverImage;
		}
		let businessImage = '';
		if(this.props.bData.newExtras.approved && this.props.bData.newExtras.approved.businessImage){
			console.log('pend cov img',this.props.bData.newExtras.pending.coverImage);
			businessImage = this.props.bData.newExtras.approved.businessImage;
		}
		let pending_businessImageCover = '';		
		if(this.props.bData.newExtras.pending && this.props.bData.newExtras.pending.coverImage){
			pending_businessImageCover = this.props.bData.newExtras.pending.coverImage;
		}
		let pending_businessImage = '';		
		if(this.props.bData.newExtras.pending && this.props.bData.newExtras.pending.businessImage){
			pending_businessImage = this.props.bData.newExtras.pending.businessImage;
		}
		let coverBg = pending_businessImageCover || businessImageCover;
		let profileBg = pending_businessImage || businessImage;
		this.state = {
		  profilePicDialogue: false,
		  businessImageCover: {
		    backgroundImage: 'url('+coverBg+')',
		    backgroundColor: '#D8D4D4'
		  },
		  businessImage: {
		    backgroundImage: 'url('+profileBg+')'
		  },
		  businessImageCoverUrl:pending_businessImageCover || businessImageCover,
		  businessImageUrl:pending_businessImage || businessImage,
		  pending_businessImageCover:pending_businessImageCover,
		  pending_businessImage:pending_businessImage,	
		  businessName:this.props.bData.businessName
		};
	}
	putBusiData(json){
		this.props.putBusiData(json);
	}

	coverImageUpdate(imageurl){
		console.log('imageurl');
		let pending = this.props.bData.newExtras.pending || {} ;
		pending.coverImage = imageurl;
		this.props.manageSave('show','pending',pending);
		this.setState({
		  businessImageCover: {
		    backgroundImage: 'url('+imageurl+')',
		    backgroundColor: '#D8D4D4'
		  },		  
		  businessImageCoverUrl:imageurl,
		  pending_businessImageCover:imageurl
		});
	}

	businessImageUpdate(imageurl){
		let pending = this.props.bData.newExtras.pending || {};
		pending.businessImage = imageurl;
		this.props.manageSave('show','pending',pending);
		this.setState({
		  businessImage: {
		    backgroundImage: 'url('+imageurl+')'
		  },
		  businessImageUrl:imageurl,
		  pending_businessImage:imageurl,
		});
	}
    render() {
    	let businessNameTag = '';
    	if(!this.state.businessImageUrl && !this.state.pending_businessImage && this.state.businessName){
    		businessNameTag = this.state.businessName.substr(0,1);
    	}
    	let coverImageTextClass = 'hidden';
    	if(!this.state.businessImageCoverUrl){
    		coverImageTextClass = ''
    	}
        return (
        <div style={this.state.businessImageCover} id="profile-image-cover">
        	<div className={coverImageTextClass}><span className="coverImageText"><br /><br />{"Upload Business Cover Image"}</span></div>
        	<ImageUpdater 
        		image={this.state.businessImageCoverUrl}        		
        		postUpload={this.coverImageUpdate.bind(this)} />
            <div style={this.state.businessImage} id="profile-image">
            	<ImageUpdater 
        			image={this.state.businessImageUrl}         		
        			postUpload={this.businessImageUpdate.bind(this)} /> 	
        		<div className="businessNameTag">
        			{businessNameTag}</div>
            </div>
        </div>);
    }
}

export default ProfileImage;