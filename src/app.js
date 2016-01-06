import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import ProfileImage from './components/profileimage';
import ProfileDetail from './components/profiledetails';
import BusinessDetail from './components/businessdetails';


injectTapEventPlugin();

ReactDOM.render(
    <div>
        <ProfileImage />
        <ProfileDetail />
        <BusinessDetail />
    </div>,
    document.getElementById('app')
);