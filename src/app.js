import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import ProfileImage from './components/profileimage';
import ProfileDetail from './components/profiledetails';
import BusinessDetail from './components/businessdetails';
import StoreTimings from './components/storetimings';
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
    </div>
    );
  }
}

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Index}/>
          <Route path="/timings" component={StoreTimings}/>
        </Route>
    </Router>,
    document.getElementById('app')
);