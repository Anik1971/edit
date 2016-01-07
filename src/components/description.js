import React from 'react';
import TextField from 'material-ui/lib/text-field';
import {AutoComplete} from 'material-ui/lib';
import Checkbox from 'material-ui/lib/checkbox';
const categoryLimit = 3;
class GenerateCheckBox extends React.Component {
	constructor(props)
	{
		super(props);
	}
  	render() {
	  	if(this.props.specialCategoriesCheckList){
	  		return (        	
            	<div className="specialCategoryCheckList">
                {
                  this.props.specialCategoriesCheckList.map((title, index) => {
                    return (
                    	<Checkbox 
                    		name={title} 
                    		value={title} 
                    		key={index} 
                    		label={title}
                    		className="checkBox"/>
                    );
                  })
                }
                </div>              
		    );
	  	}else{
	  		return ( 
	  			<div></div>
	  		);
	  	}	    
	  }
}

class CategoryAutoComplete extends React.Component{
	constructor(props)
	{
		super(props);
		this.state = {
			dynamicVals:
				[{
					categories: [],
		            specialCategoriesCheckList: []
		        }]
        }
	}
	onCategoryRequest(category) {
		let index = 0;
		let state = this.state;
		state.dynamicVals[index].categories = [];
		this.setState(state);	    
        let lowerCaseCategory = category.trim().toLowerCase(),
            searchSpecialCategories = this.props.specialCategories.filter((item)=>{ return item.toLowerCase().startsWith(lowerCaseCategory)});
        if(searchSpecialCategories.length > 0){
            let state = this.state;
			state.dynamicVals[index].specialCategoriesCheckList = this.props.specialCategoriesCheckList[searchSpecialCategories];
			this.setState(state);
        }else{
        	let state = this.state;
			state.dynamicVals[index].specialCategoriesCheckList = [];
			this.setState(state);
        }
        if(this.state.dynamicVals.length<categoryLimit){
        	this.state.dynamicVals.push(
        		{
					categories: [],
		            specialCategoriesCheckList: []
		        }
        	);
        	this.props.categoryCount.push('category2');
        }
    }
    
    onCategoryUpdate(category) {
        let lowerCaseCategory = category.trim().toLowerCase(),
            searchCategories = this.props.categories.filter((item)=>{ return item.toLowerCase().startsWith(lowerCaseCategory)});
        this.setState({
            categories: searchCategories
        });
    }
	render() {
		if(this.props.categoryCount){
			return ( 
				<div>{  
		  			this.props.categoryCount.map((count, index) => {
		  				return (        	
			  				<div key={index}>
				            	<AutoComplete
				                    floatingLabelText="Category"
				                    fullWidth={true}
				                    animated={false}
				                    dataSource={this.props.categories}
				                    className={"category"}
				                    onUpdateInput={this.onCategoryUpdate.bind(this)}
				                    onNewRequest={this.onCategoryRequest.bind(this)} />
				                <GenerateCheckBox 
				                	specialCategoriesCheckList={this.state.dynamicVals[index].specialCategoriesCheckList} />
				            </div> 
				        );
		  			})  
	  			}</div>  	             
		    );	 
		}else{
			return ( 
	  			<div></div>
	  		);
		}
  		 	    
	}
}
class Description extends React.Component {
	constructor(props){
		super(props);
		this.state = {
            categoryCount: this.props.categoryCount
        };	
	}	
	render(){
		return (
		    <div style={this.props.styles.slide}>
	            <TextField fullWidth={true}
	                floatingLabelText="Business Description" />
	            <TextField fullWidth={true}
	                floatingLabelText="Business Long Description"
	                multiLine={true} />    
	          	<CategoryAutoComplete 
	          		categories={this.props.categories}
	          		specialCategories={this.props.specialCategories}
	            	specialCategoriesCheckList={this.props.specialCategoriesCheckList}
	            	categoryCount={this.state.categoryCount} />
	          </div>
	        );
	}
}

export default Description;