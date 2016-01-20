import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import ProfileImage from './components/edit/profileimage';
import ProfileDetail from './components/edit/profiledetails';
import Gallery from './components/edit/gallery';
import BusinessDetail from './components/edit/businessdetails';
import StoreTimings from './components/edit/storetimings';
import SupplierProfile from './components/profile/supplierProfile';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import bData from './components/data/businessData';
import uData_dummy from './components/data/dummyUserData';
import Card from 'material-ui/lib/card/card';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';

injectTapEventPlugin();

class App extends React.Component {
    render() {
        return <div>{this.props.children}</div>;
    }
}
const styles={
  card_shadow:{
    boxShadow: '0 1px 6px rgba(118, 209, 242, 0.12), 0 1px 4px rgba(118, 209, 242, 0.24)'
  }
}
class Index extends React.Component {
  constructor(props) {
      super(props);
      let uData = uData_dummy;
      console.log('UserData',uData);
      
      this.state = {
          bData:  bData,
          saveBtn: 'hidden',
          saveData: {}
      };
      console.log('converted bData:',bData); 
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
  manageSave(task,field,value){
    if(task == 'show'){
      this.setState({
        saveBtn:''
      });
    }else{
      this.setState({
        saveBtn:'hidden'
      });
    }
    let saveData = this.state.saveData;
    saveData[field]=value;
    this.setState({
      saveData: saveData
    },function(){
      console.log('state',this.state.saveData);
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
          putBusiData={this.putBusiData} 
          saveBtn={this.state.saveBtn} 
          manageSave={this.manageSave.bind(this)} />
        <Card
          style={styles.card_shadow}
          className="business-card">            
            <CardTitle
            className="business-cardHeader"
            title="Photos"/>            
            <CardMedia>
              <Gallery 
                bData={this.state.bData} 
                getBusiData={this.getBusiData}
                putBusiData={this.putBusiData} ></Gallery>
            </CardMedia>  
        </Card>         
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