import React from 'react';
import Colors from 'material-ui/lib/styles/colors';
import ProfilePic from './../dialogues/profilePic';
import ImageUpdater from './../dialogues/imageUpdater';
import FloatingActionButton from 'material-ui/lib/floating-action-button';


class ProfileImage extends React.Component {
	constructor(props) {
		super(props);
		let approved = '';
        let pending = '';
    	let coverBg = '';
        let coverBgApproved = false;
        let businessImage = '';
        let businessImageApproved = false;
        if(this.props.bData.newExtras && this.props.bData.newExtras.approved){
            approved =  this.props.bData.newExtras.pending;
        }
        if(this.props.bData.newExtras && this.props.bData.newExtras.pending){
            pending =  this.props.bData.newExtras.pending;
        }
        //coverImage
    	if(pending.coverImage){
    		coverBg = pending.coverImage;
            coverBgApproved = false;
    	}else{
            if(approved.coverImage){
               coverBg = approved.coverImage; 
               coverBgApproved = true;
            }
        }

        //businessImage
        if(pending.businessImage){
            businessImage = pending.businessImage;
            businessImageApproved = false;
        }else{
            if(approved.businessImage){
               businessImage = approved.businessImage; 
               businessImageApproved = true;
            }
        }
		
		this.state = {
		  profilePicDialogue: false,
		  businessImageCover: {
		    backgroundImage: 'url('+coverBg+')',
		    backgroundColor: '#D8D4D4'
		  },
		  businessImage: {
		    backgroundImage: 'url('+businessImage+')'
		  },
		  businessImageCoverUrl:coverBg,
		  businessImageUrl:businessImage,
		  businessName:this.props.bData.businessName,
		  businessImageApproved:businessImageApproved,
		  coverBgApproved:coverBgApproved
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
		  coverBgApproved: false
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
		  businessImageApproved:false
		});
	}
    render() {
    	let businessNameTag = '';
    	let businessImageApproved = this.state.businessImageApproved;
    	let coverBgApproved = this.state.coverBgApproved;
    	let bottomPanel = 'bottomPanel';
    	if(!this.state.businessImageUrl && !this.state.pending_businessImage && this.state.businessName){
    		businessNameTag = this.state.businessName.substr(0,1);
    		bottomPanel = 'hidden';
    	}
    	let coverImageTextClass = 'hidden';
    	let topPanel = 'topPanel';
    	if(!this.state.businessImageCoverUrl){
    		coverImageTextClass = '';
    		topPanel = 'hidden';
    	}
        return (
        <div style={this.state.businessImageCover} id="profile-image-cover">
        	<div className={coverImageTextClass}><span className="coverImageText"><br /><br />{"Upload Business Cover Image"}</span></div>
        	<div className={topPanel}>{businessImageApproved?'Approved':'Pending'}</div>
        	<ImageUpdater 
        		image={this.state.businessImageCoverUrl}        		
        		postUpload={this.coverImageUpdate.bind(this)} 
        		title={'Business Cover Image'} />
            <div style={this.state.businessImage} id="profile-image">
            	<div className={bottomPanel}>{coverBgApproved?'Approved':'Pending'}</div>
            	<ImageUpdater 
        			image={this.state.businessImageUrl}         		
        			postUpload={this.businessImageUpdate.bind(this)} 
        			title={'Business Logo'} /> 	
        		<div className="businessNameTag">
        			{businessNameTag}</div>
            </div>
        </div>);
    }
}

export default ProfileImage;