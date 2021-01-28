import React from 'react';
import { BrowserRouter, Switch } from "react-router-dom";
import { AuthProvider } from './context/auth';
import LoginRoute from './util/LoginRoute';
import AuthRoute from './util/AuthRoute';
import AuthApp from './util/AuthApp';

import "bootstrap/dist/css/bootstrap.min.css"

import Home from './components/Common/Home'
import Register from './components/Common/Register'
import Login from './components/Common/Login'
import MyProfile from './components/Common/MyProfile'
import CreateListing from './components/Recruiters/CreateListing'
import MyListings from './components/Recruiters/MyListings'
import MyApplications from './components/Applicants/MyApplications'
import JobsList from './components/Applicants/ViewListings'
import ApplyJob from './components/Applicants/ApplyJob'
import RateJob from './components/Applicants/RateJob'
import ChooseJob from './components/Recruiters/ChooseJob'
import EditJob from './components/Recruiters/EditJob'
import Employees from './components/Recruiters/Employees'
import RateEmployee from './components/Recruiters/RateEmployee'
import GetUser from "./context/getUser"

function App() {

  const user = GetUser()

  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="container">
          <Switch>   
            <LoginRoute path="/" exact component={Home}/>
            <LoginRoute path="/register" component={Register}/>
            <LoginRoute path="/login" component={Login}/>
            <AuthRoute path="/create-listing" component={CreateListing}/>
            <AuthApp path="/view-listings" component={JobsList}/>
            <AuthApp path="/apply-job/:jobId" component={ApplyJob}/>
            <AuthRoute path="/choose-job/:jobId" component={ChooseJob}/>
            <AuthRoute path="/edit-job/:jobId" component={EditJob}/>
            <AuthApp path="/rate-job/:jobId" component={RateJob}/>
            <AuthRoute path="/listings" component={MyListings}/>
            <AuthApp path="/applications" component={MyApplications}/>
            <AuthRoute path="/employees" component={Employees}/>
            <AuthRoute path="/rate-employee/:userId" component={RateEmployee}/>
            { user.role === "Recruiter" ?
            <AuthRoute path="/profile" component={MyProfile}/> :
            <AuthApp path="/profile" component={MyProfile}/> }
          </Switch>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;