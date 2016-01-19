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
    }
};

const TAB_HEADERS = ['Description', 'Location', 'Delivery', 'Payments'];

class BusinessDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            slideIndex: 0,
        };
    }

    handleChange(value) {
        this.setState({
            slideIndex: value,
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
        return (
            <div>
                <Tabs
                  onChange={this.handleChange.bind(this)}
                  value={this.state.slideIndex}
                  inkBarStyle = {styles.inkbar}
                  style = {styles.tabs}
                  tabItemContainerStyle = {styles.tab}
                  className = "profile-tabs"
                >
                  {
                    TAB_HEADERS.map((header, index) => {
                        return <Tab label={header} value={index} key={index}/>;
                    })
                  }
                  
                </Tabs>
                <SwipeableViews
                  index={this.state.slideIndex}
                  onChangeIndex={this.handleChange.bind(this)}
                >
                  <Description 
                    styles={styles}
                    bData={this.props.bData} 
                    getBusiData={this.props.getBusiData.bind(this)}
                    putBusiData={this.props.putBusiData.bind(this)} />
                  <Location 
                    styles={styles} 
                    bData={this.props.bData} 
                    getBusiData={this.props.getBusiData.bind(this)}
                    putBusiData={this.props.putBusiData.bind(this)} />
                  <Delivery
                    styles={styles} 
                    bData={this.props.bData} 
                    getBusiData={this.props.getBusiData.bind(this)}
                    putBusiData={this.props.putBusiData.bind(this)} />
                  <Payments 
                    styles={styles} 
                    bData={this.props.bData} 
                    getBusiData={this.props.getBusiData.bind(this)}
                    putBusiData={this.props.putBusiData.bind(this)} />
                </SwipeableViews>
            </div>
        );
    }
}
BusinessDetail.childContextTypes = {
    muiTheme: React.PropTypes.object,
};

export default BusinessDetail;