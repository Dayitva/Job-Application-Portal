import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import GetUser from "../context/getUser"
import { AuthContext } from '../context/auth';

function AuthRoute({ component: Component, ...rest }) {
  const { user } = useContext(AuthContext);
  const getUser = GetUser()

  return (
    <Route
      {...rest}
      render={(props) => {
        if (user)
        {
          if(getUser.role === "Recruiter")
          {
            return <Component {...props} />
          }
        }
        
        else
        {
          return <Redirect to="/" />
        } 
      }}
    />
  );
}

export default AuthRoute;