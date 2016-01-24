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
      console.log('converted bData::',bData); 
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
          console.log('convertToStringBusinessProfileObj',convertToStringBusinessProfileObj); 
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
  /*saveDepth(0,value){
    let oo = {}, t, parts, part;
    for (let k in o) {
        t = oo;
        parts = k.split('.');
        let key = parts.pop();
        while (parts.length) {
          part = parts.shift();
          t = t[part] = t[part] || {};
        }
        t[key] = value;
      }
      return oo;
    }
  }*/
  aniMerge(oldObj,newObj){
      for(let key in newObj){
        if(typeof newObj[key] == 'object'){
          if(!oldObj[key]){
            oldObj[key] = newObj[key];
            return oldObj;
          }else{
            oldObj[key] = this.aniMerge(oldObj[key],newObj[key]);
            return oldObj;
          }          
        }else{
          oldObj[key] = newObj[key];
          
        }
      }
      return oldObj;
    }
  manageSave(task,field,value,callback){
    //debugger;
    //console.log('state.saveData',this.state.saveData);
    //console.log('field',field,value);
    if(task == 'show'){
      this.setState({
        saveBtn:''
      });
    }else if(task == 'updation'){
      if(this.state.saveBtn == 'hidden'){
        this.setState({
          saveBtn:''
        });
      }
      return;
    }else{
      this.setState({
        saveBtn:'hidden'
      });
    }
    let tempSaveData = {};
    tempSaveData[field]=value;
    this.state.saveData = this.aniMerge(this.state.saveData,tempSaveData);
    //console.log('save data: ',this.state.saveData);
}
  executeSave(){
    console.info('Execute Save');
    console.log('bData curr (app.js) ',this.state.bData);
    console.log('saveData (app.js) ',this.state.saveData);
    let bData = this.state.bData; 
    //converting level 1 nested json strings to Object
    for(let key in bData){
      let _currData = bData[key];        
      try{
        bData[key] = JSON.parse(_currData);          
      }catch(e){
        bData[key] = _currData;          
      }        
    }
    debugger;   
    for(let key in this.state.saveData){
      let sData = this.state.saveData[key]; 
      if(bData[key] || bData[key] == ''){ //checks if level 0 has such field        
        bData[key]=sData; //normal data       
      }else{ //others goes to app extras
        let appExtras = bData.appExtras;
        if(!appExtras ){
          appExtras = {};
        }
        appExtras[key] = sData; //normal data
        bData.appExtras = appExtras; //integrating appExtras
      }    
      this.setState({
        saveBtn:'hidden',
        saveData: {}
      });  
    } 

    this.setState({
      bData : bData //integrating to bData
    });

    //creating data to export
    let exportData = this.state.bData;
    for(let key in exportData){
      let _bData = exportData[key];      
      if(typeof _bData == 'object'){ //checks if the data going to be stored is a object
        exportData[key]=JSON.stringify(_bData); // goodbox compatible nested json
      }       
    } 
    

    console.log('Merged data:',bData);
    console.log('ExportData data:',exportData);
    if(window.Android){
      console.log(this.state.bData);
      /*this.state.bData.storeTimings = JSON.stringify(this.state.bData.storeTimings);
      this.state.bData.serviceAreas = JSON.stringify(this.state.bData.serviceAreas);
      this.state.bData.deliveryPricing = JSON.stringify(this.state.bData.deliveryPricing);
      this.state.bData.businessAddress = JSON.stringify(this.state.bData.businessAddress);
      this.state.bData.appExtras = JSON.stringify(this.state.bData.appExtras);*/
      
      
      let convertToStringBusinessProfileObj = JSON.stringify(this.state.bData);
          console.log('convertToStringBusinessProfileObj',convertToStringBusinessProfileObj);
          if(window.Android.saveBusinessData){
            try {
              debugger;
              let status = window.Android.saveBusinessData(convertToStringBusinessProfileObj);
              console.log("....................save business data status............");
              console.log(status);
            } catch (e) {
              console.log("....................save business data failed due to crash............");
              console.log(e);
            } 
          }else{
            console.error('window.Android.saveBusinessData not found');
          } 
    }
    
  }
  render() {
    return (
     <div>
        <ProfileImage 
          bData={this.state.bData} 
          getBusiData={this.getBusiData.bind(this)}
          putBusiData={this.putBusiData.bind(this)} 
          manageSave={this.manageSave.bind(this)} />
        <ProfileDetail 
          bData={this.state.bData} 
          getBusiData={this.getBusiData}
          putBusiData={this.putBusiData} 
          manageSave={this.manageSave.bind(this)} />
        <BusinessDetail 
          bData={this.state.bData} 
          getBusiData={this.getBusiData}
          putBusiData={this.putBusiData} 
          saveBtn={this.state.saveBtn} 
          manageSave={this.manageSave.bind(this)} 
          executeSave={this.executeSave.bind(this)}/>
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