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
import Request from 'superagent';
import {EventEmitter} from 'fbemitter';

injectTapEventPlugin();

class App extends React.Component {
  constructor(props){
    super(props);
  }
  componentWillMount(){
    window.emitter = new EventEmitter();
        
      try{
        let uData = {
          userId: 'a09bdcd8'
        };
        if(window.Android){
          uData = JSON.parse(window.Android.getUserInfo());
        }
        let supplierLoginID = uData.userId;
        /*curl 
            'http://testchat.tsepak.com/goodbox/get_supplier_data' 
            --data-binary $'{"supplierLoggedInId": "a09bdcd8"}\n' 
            --compressed */
        Request
         .post('http://testchat.tsepak.com/goodbox/get_supplier_data')
         .send('{"supplierLoggedInId":"'+  supplierLoginID + '"}')
         .end(function(err, res){
           if (err || !res.ok) {
            console.error('Response',err);
           }else {
            //converting level 1 nested json strings to Object
            console.log('Response',res);
            //try{
              let _bData = JSON.parse(res.text);
              for(let key in _bData){
                let _currData = _bData[key];        
                try{
                  _bData[key] = JSON.parse(_currData);          
                }catch(e){
                  _bData[key] = _currData;          
                }        
              }
              if(!_bData['newExtras']){
                _bData['newExtras'] = {};
              }
              window.emitter.emit('bData',_bData);
            /*}catch(e){
              console.error('Server Data parse',e);
            }*/
          }
         });
      }
      catch(e){
        console.error('Android.getUserInfo()',e);
      }  
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
      let _bData = bData;
      if(window.businessData){
        console.info('Data from server Accepted');
        _bData = window.businessData;
      }else{
        console.log('Data from server not recieved yet');
      }
      this.state = {
          bData:  _bData,
          saveBtn: 'hidden',
          saveData: {},
          snackbar: false,
          snackbarMsg: '',
          tab: 0,
          businessWrapperClass: '',
          bDataLoaded: false
      };
      window.errorFlag = false;
      window.errorStack = {};
  }
  componentWillMount(){
    let _this = this;
    window.emitter.addListener('bData', function(value){
      console.log('bData event',value);
      _this.setState({
        bData: value,
        bDataLoaded: true
      })
    });
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
        saveBtn:'',
        businessWrapperClass:'businessWrapperPadding'
      });
    }else if(task == 'updation'){
      if(this.state.saveBtn == 'hidden'){
        this.setState({
          saveBtn:'',
          businessWrapperClass:'businessWrapperPadding'
        });
      }
      return;
    }else{
      this.setState({
        saveBtn:'hidden',
        businessWrapperClass:''
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
    }else{
      this.setState({
        snackbar: true,
        snackbarMsg:'Please wait, saving...',
      });
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
        let newExtras = bData.newExtras;
        if(!newExtras ){
          newExtras = {};
        }
        newExtras[key] = sData; //normal data
        bData.newExtras = newExtras; //integrating newExtras
      }      
    } 

    this.setState({
      saveBtn:'hidden',
      saveData: {},
      businessWrapperClass:'',
      bData : bData //integrating to bData
    });

    //creating data to export
    let exportData = this.state.bData;
    for(let key in exportData){
      let _bData = exportData[key];    
      if(typeof _bData == 'object'){ //checks if the data going to be stored is a object
        exportData[key]=JSON.stringify(_bData); // goodbox compatible nested json
      }     
      //some exceptions
      switch(key){
        case "businessHandle":
          exportData[key] = exportData[key]+'';
          break;
        case "phoneNoForDisplay":
          exportData[key] = exportData[key]+'';
          break;
        default:
          break;
      }    
    } 
    

    console.log('Merged data:',bData);
    console.log('ExportData data:',exportData);
    let _this = this;
    //if(window.Android){
      console.log(this.state.bData);
      
      window.convertToStringBusinessProfileObj = JSON.stringify(exportData);
      Request
       .post('http://testchat.tsepak.com/goodbox/set_supplier_data')
       .type('form')
       .send(window.convertToStringBusinessProfileObj)
       .end(function(err, res){
         if (err || !res.ok) {
          console.error('Response',err);
          _this.setState({
            snackbar: true,
            snackbarMsg:'Failed to save'
          });
         }else {
          //converting level 1 nested json strings to Object
          console.log('Response',res);
          _this.setState({
            snackbar: true,
            snackbarMsg:'Saved successfully'
          });          
        }
       });
      /*console.log('convertToStringBusinessProfileObj',convertToStringBusinessProfileObj);
      if(window.Android.saveBusinessData){
        try {
          let status = window.Android.saveBusinessData(convertToStringBusinessProfileObj);
          console.log("....................save business data status............");
          console.log(status);
          this.setState({
            snackbar: true,
            snackbarMsg:'Saved successfully'
          });
        } catch (e) {
          console.log("....................save business data failed due to crash............");
          console.log(e);
        } 
      }else{
        console.error('window.Android.saveBusinessData not found');
      } */
    //}
  }
  onSnackBarClose(){
    this.setState({
      snackbar:false
    });
  };
  render() {
    if(!this.state.bDataLoaded){
      return(<div className="loaderWrapper">Loading...</div>);
    }else{
      let wrapperPadding = "businessWrapper";
      if(this.state.businessWrapperClass){
        wrapperPadding = "businessWrapper "+this.state.businessWrapperClass;
      }

      return (
       <div className={wrapperPadding}>
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