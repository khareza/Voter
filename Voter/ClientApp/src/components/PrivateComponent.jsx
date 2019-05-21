import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import AuthMethods from '../Helpers/AuthMethods';
const PrivateRoute = ({ component: Component, ...rest}) => {
    
    // Add your own authentication on the below line.
    this.Auth = new AuthMethods();

    return (
        <Route {...rest}
            render={(props) =>
                this.Auth.loggedIn()
                    ? <Component {...rest}/>
                 : <Redirect to='/login'  />
            }
        />
    )
}

export default PrivateRoute