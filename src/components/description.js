import React from 'react';
import TextField from 'material-ui/lib/text-field';
import {AutoComplete} from 'material-ui/lib';
class Description extends React.Component {
	constructor(props){
		super(props);	
	}	
	render(){
		return (
			    <div style={this.props.styles.slide}>
                    <TextField fullWidth={true}
                        floatingLabelText="Business Description" />
                    <TextField fullWidth={true}
                        floatingLabelText="Business Long Description"
                        multiLine={true} />
                    <AutoComplete
                        floatingLabelText="Category"
                        fullWidth={true}
                        animated={false}
                        dataSource={this.props.categories}
                        className={"category"}
                        onUpdateInput={this.props.onUpdateInput}
                        onNewRequest={this.props.onNewRequest} />
                  </div>
                );
	}
}

export default Description;