import React from 'react';
import Colors from 'material-ui/lib/styles/colors';
import ProfilePic from './../dialogues/profilePic';
import ImageUpdater from './../dialogues/imageUpdater';
import FloatingActionButton from 'material-ui/lib/floating-action-button';

const styles = {
    coverImageText : {
        textAlign: 'right',
        paddingRight: 48,
        paddingTop: 2
    }
}
class ProfileImage extends React.Component {
	constructor(props) {
		super(props);
        let pending = '';
    	let coverBg = '';
        let coverBgApproved = false;
        let businessImage = '';
        let businessImageApproved = false;
        let approvedCoverImage = this.props.bData.coverImage;
        let approvedBusinessImage = this.props.bData.profilePicUrl;
        if(this.props.bData.newExtras && this.props.bData.newExtras.pending){
            pending =  this.props.bData.newExtras.pending;
        }
        //coverImage
    	if(pending.coverImage){
    		coverBg = pending.coverImage;
            coverBgApproved = false;
    	}else{
            if(approvedCoverImage){
               coverBg = approvedCoverImage; 
               coverBgApproved = true;
            }
        }

        //businessImage
        if(pending.businessImage){
            businessImage = pending.businessImage;
            businessImageApproved = false;
        }else{
            if(approvedBusinessImage){
               businessImage = approvedBusinessImage; 
               businessImageApproved = true;
            }
        }
		
		this.state = {
		  profilePicDialogue: false,
		  businessImageCover: {
		    backgroundImage: 'url('+coverBg+')',
		    backgroundColor: '#F7F3F3'
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
        	<div className={coverImageTextClass}><span style={styles.coverImageText} className="coverImageText"><br />{"Upload Business Cover"}</span></div>
        	<div  className={"businessImageCoverIcon"}>
                <ImageUpdater 
                    approvedClass={topPanel}
                    approvedText={coverBgApproved?'':'Pending Approval'}
            		image={this.state.businessImageCoverUrl}        		
            		postUpload={this.coverImageUpdate.bind(this)} 
            		title={'Business Cover Image'} />
            </div>
            <div style={this.state.businessImage} id="profile-image" className={this.state.businessImageUrl ? 'white' : 'non-white'}>
            	<ImageUpdater 
            	    approved={bottomPanel}
            	    approvedText={businessImageApproved?'':'Pending Approval'}
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