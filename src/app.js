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
import Snackbar from 'material-ui/lib/snackbar';

injectTapEventPlugin();

class App extends React.Component {
  constructor(props){
    super(props);
  }
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
      if(window.cosupplier){
        window.location.hash = 'profile';
      }
      let uData = uData_dummy;
      this.state = {
          bData:  bData,
          saveBtn: 'hidden',
          saveData: {},
          snackbar: false,
          snackbarMsg: '',
          tab: 0
      };
      window.errorFlag = false;
      window.errorStack = {};
  }
  loadParseData(){
    console.log('loadParseData');
    let _this = this;
     bData.getParseData(function(bData){
        console.log('callback');
        _this.setState({
          bData: bData
        });
    });
  }
  getBusiData(){
    if(window.Android){
      this.setState({
        bData: window.Android.getBusinessData()
      });
    }
  }
  putBusiData(json) {
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
            window.Android.saveBusinessData(convertToStringBusinessProfileObj);
          } catch (e) {
            console.log("....................save business data failed due to crash............");
            console.log(e);
          }          
        }     
        console.log('state  after (app.js) ',this.state);
    });   
  }
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
  toast(msg){
    this.setState({
      snackbar: true,
      snackbarMsg: msg
    });
  }
  manageSave(task,field,value,callback){
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
      return;
    }
    let tempSaveData = {};
    tempSaveData[field]=value;
    this.state.saveData = this.aniMerge(this.state.saveData,tempSaveData);
  }
  executeSave(){
    let errorFlag = false;
    for(let key in window.errorStack){
      let errorData = window.errorStack[key];
      if(errorData && errorData.text){
        window.moveTab = true;
        this.setState({
          snackbar: true,
          snackbarMsg:errorData.text,
          tab:errorData.tab
        },function(){
          window.pageYOffset = 0;
        });
        errorFlag = true;
        break;
      }
    }
    if(errorFlag){
      console.log('the state',this.state);
      return;
    }
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
    } 

    this.setState({
      saveBtn:'hidden',
      saveData: {},
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
      window.convertToStringBusinessProfileObj = JSON.stringify(exportData);
          console.log('convertToStringBusinessProfileObj',convertToStringBusinessProfileObj);
          if(window.Android.saveBusinessData){
            try {
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
  onSnackBarClose(){
    this.setState({
      snackbar:false
    });
  };
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
          executeSave={this.executeSave.bind(this)}
          tab={this.state.tab}
          toast={this.toast.bind(this)} /> 
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
        <Snackbar
          open={this.state.snackbar}
          message={this.state.snackbarMsg}
          autoHideDuration={4000}
          onRequestClose={this.onSnackBarClose.bind(this)}/>       
    </div>
    );
  }
}



/*mounting the routes to element with id app*/
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