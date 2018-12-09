import React from 'react'
import {Route, Redirect} from 'react-router-dom'

const privateRoute = ({C: component, ...rest}) => {
    <Route {...rest} render={(props) => (
        fakeAuth.isAuthenticated === true 
        ? <C {...props} /> : <Redirect to={{
            pathname: "/login",
            state: {from: props.location}
        }}/>
    )} />
}