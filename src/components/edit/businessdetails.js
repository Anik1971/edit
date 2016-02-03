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
let styles = {
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
    },
    slide: {
        height:'auto',
        minHeight:500,
        padding: 10,
        backgroundColor: "white"
    },
    input: {
        width: 300
    },
    inkbar: {
        backgroundColor: "#76D1F2",
        height: 4,
        margin: '10px -10px 0px -10px'
    },
    tabs: {
        backgroundColor: "#F7F3F3",
        width: 454
    },
    tabWrapper: {
        overflowX: 'scroll'
    },
    tab: {
        textTransform: "uppercase",
        display: 'inline-block',
        padding: 15,
        paddingBottom: 0,
        color: 'rgba(0,0,0,0.6)',
        fontSize:14
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
        if (value == 3)
            this.refs.tabWrapper.scrollLeft = 98;
        if (value == 0)
            this.refs.tabWrapper.scrollLeft = 0;
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
        let saveBtn = this.props.saveBtn + " floatingBtn";
        const savBtnStyle = {padding: 5, backgroundColor: '#008800', height: 48};
        const savLabelStyle = {bottom: 5}
        if (window.moveTab) {
            this.state.slideIndex = this.props.tab;
            window.moveTab = false;
        }
        return (
            <div>
                <div ref="tabWrapper" style={styles.tabWrapper}>
                <div style={styles.tabs}>
                {
                    TAB_HEADERS.map((header, index) => {
                        return (<div className={this.state.slideIndex==index?'active-tab':'no-active-tab'} onClick={this.handleChange.bind(this,index)} key={index} style={styles.tab}>
                                  {header}
                                  <div className={this.state.slideIndex==index?'ink-bar':'no-ink-bar'} style={styles.inkbar}></div>
                               </div>);
                    })
                }
                </div>
                </div>
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
                      backgroundColor={"#008800"}
                      secondary={true} 
                      fullWidth={true}
                      label="SAVE CHANGES"
                      labelColor="white"                            
                      labelPosition="after"
                      labelStyle={savLabelStyle}
                      style={savBtnStyle}                      
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