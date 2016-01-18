import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import ProfileImage from './components/profileimage';
import ProfileDetail from './components/profiledetails';
import Gallery from './components/gallery';
import BusinessDetail from './components/businessdetails';
import StoreTimings from './components/storetimings';
import SupplierProfile from './components/profile/supplierProfile';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import bData_dummy from './components/dummyData';

injectTapEventPlugin();

class App extends React.Component {
    render() {
        return <div>{this.props.children}</div>;
    }
}

class Index extends React.Component {
  constructor(props) {
      super(props);
      let bData = bData_dummy;
      if(window.Android)
        bData = JSON.parse(window.Android.getBusinessData());
      this.state = {
          bData:  bData
      };
      console.log(bData_dummy);
  }
  getBusiData(){
    if(window.Android){
      this.setState({
        bData: window.Android.getBusinessData()
      });
    }
  }
  putBusiData(json) {
    console.log('putting app.js ',json);
    console.log('state  before (app.js) ',this.state);
    let bData = this.state.bData;
    for(let key in json){
      bData[key]=json[key];
    }    
    this.setState({
      bData
    },function(){
       if(window.Android){
          //code for saving the json to android preference variable
          let convertToStringBusinessProfileObj = JSON.stringify(this.state.bData);
          try {
            let status = window.Android.saveBusinessData(convertToStringBusinessProfileObj);
            console.log("....................save business data status............");
            console.log(status);

          } catch (e) {
            console.log("....................save business data failed due to crash............");
            console.log(e);
          }          
        }     
        console.log('state  after (app.js) ',this.state);
    });   
  }
  render() {
    return (
     <div>
        <ProfileImage 
          bData={this.state.bData} 
          getBusiData={this.getBusiData.bind(this)}
          putBusiData={this.putBusiData.bind(this)} />
        <ProfileDetail 
          bData={this.state.bData} 
          getBusiData={this.getBusiData}
          putBusiData={this.putBusiData} />
        <BusinessDetail 
          bData={this.state.bData} 
          getBusiData={this.getBusiData}
          putBusiData={this.putBusiData} />
        <Gallery 
          bData={this.state.bData} 
          getBusiData={this.getBusiData}
          putBusiData={this.putBusiData} ></Gallery>             
    </div>
    );
  }
}

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Index}/>
          <Route path="/timings" component={StoreTimings}/>
          <Route path="/profile" component={SupplierProfile}/>
        </Route>
    </Router>,
    document.getElementById('app')
);