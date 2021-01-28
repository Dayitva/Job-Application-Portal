import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import GetUser from "../context/getUser"
import { AuthContext } from '../context/auth';

function AuthApp({ component: Component, ...rest }) {
  const { user } = useContext(AuthContext);
  const getUser = GetUser()

  return (
    <Route
        {...rest}
        render={(props) => {
            if (user)
            {
                if (getUser.role === "Applicant")
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

export default AuthApp;