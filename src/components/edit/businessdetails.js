import React from 'react';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import TextField from 'material-ui/lib/text-field';
import SwipeableViews from 'react-swipeable-views';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import Colors from 'material-ui/lib/styles/colors';
import {AutoComplete} from 'material-ui/lib';
import Description from './description';
import Location from './location';
import Delivery from './delivery';
import Payments from './payments';
import RaisedButton from 'material-ui/lib/raised-button';
import SaveIcon from 'material-ui/lib/svg-icons/content/save';
const styles = {
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
    },
    slide: {
        minHeight: 500,
        padding: 10,
        backgroundColor: "white"
    },
    input: {
        width: 300
    },
    inkbar: {
        backgroundColor: "#76D1F2",
        height: 4
    },
    tabs: {
        backgroundColor: "#F7F3F3"
    },
    tab: {
        textTransform: "uppercase"
    },
    floatRight: {
        float: "right"
    }
};

const TAB_HEADERS = ['Description', 'Location', 'Delivery', 'Payments'];

class BusinessDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            slideIndex: this.props.tab,
        };
    }

    handleChange(value) {
        let errorFlag = false;
        let errorData = {};
        for(let key in window.errorStack){
            errorData = window.errorStack[key];
            if(errorData){
                errorFlag = true;                 
                break;
            }
        }
        if(errorFlag){
            this.props.toast(errorData.text);
        }
        this.setState({
            slideIndex: value
        });    
    }
    getChildContext() {
        return {
            muiTheme: ThemeManager.getMuiTheme({
                palette: {
                    alternateTextColor: Colors.black
                }
            }),
        };
    }

    render() {
        let saveBtn = this.props.saveBtn+" floatingBtn";
        if (window.moveTab)
        {
            this.state.slideIndex = this.props.tab;
            window.moveTab = false;
        }
        return (
            <div>
                <Tabs
                  onChange={this.handleChange.bind(this)}
                  initialSelectedIndex={this.state.slideIndex}
                  value={this.state.slideIndex}
                  inkBarStyle = {styles.inkbar}
                  style = {styles.tabs}
                  tabItemContainerStyle = {styles.tab}
                  className = "profile-tabs">
                  {
                    TAB_HEADERS.map((header, index) => {
                        return <Tab label={header} value={index} key={index}/>;
                    })
                  }
                  
                </Tabs>
                <SwipeableViews
                  index={this.state.slideIndex}
                  onChangeIndex={this.handleChange.bind(this)}>
                  <Description 
                    styles={styles}
                    bData={this.props.bData} 
                    getBusiData={this.props.getBusiData.bind(this)}
                    putBusiData={this.props.putBusiData.bind(this)} 
                    manageSave={this.props.manageSave} />
                  <Location 
                    styles={styles} 
                    bData={this.props.bData} 
                    getBusiData={this.props.getBusiData.bind(this)}
                    putBusiData={this.props.putBusiData.bind(this)}
                    manageSave={this.props.manageSave} />
                  <Delivery
                    styles={styles} 
                    bData={this.props.bData} 
                    getBusiData={this.props.getBusiData.bind(this)}
                    putBusiData={this.props.putBusiData.bind(this)}
                    manageSave={this.props.manageSave} />
                  <Payments 
                    styles={styles} 
                    bData={this.props.bData} 
                    getBusiData={this.props.getBusiData.bind(this)}
                    putBusiData={this.props.putBusiData.bind(this)}
                    manageSave={this.props.manageSave} />
                </SwipeableViews>
                <div className={saveBtn}>
                    <RaisedButton 
                      secondary={true} 
                      fullWidth={true}
                      label="SAVE"                            
                      labelPosition="after"                      
                      className={this.props.saveBtn}                       
                      onClick={this.props.executeSave}>                      
                    </RaisedButton>
                </div>
            </div>
        );
    }
}
BusinessDetail.childContextTypes = {
    muiTheme: React.PropTypes.object,
};

export default BusinessDetail;