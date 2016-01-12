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


injectTapEventPlugin();

class App extends React.Component {
    render() {
        return <div>{this.props.children}</div>;
    }
}

class Index extends React.Component {
  render() {
    return (
     <div>
        <ProfileImage />
        <ProfileDetail />
        <BusinessDetail />
        <Gallery></Gallery>             
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