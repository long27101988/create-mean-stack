import React, { Component, lazy, Suspense } from 'react';
import classes from './App.scss';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom'
import Layout  from './hoc/Layout/Layout';
import Home from './containers/Home/Home' 
import {connect} from 'react-redux'
import * as actions from './store/actions/'
import AsyncComponent from './hoc/asyncComponent/asyncComponent'

//use async component to import component
const Login = AsyncComponent(() => (import('./containers/Auth/Login/Login')))
const ArticleDetail = AsyncComponent(() => (import('./containers/ArticleDetail/ArticleDetail')))
const Logout = AsyncComponent(() => (import('./containers/Auth/Logout/Logout')))
const Register = AsyncComponent(() => (import('./containers/Auth/Register/Register')))

const PrivateRoute = ({component: C, ...rest}) => {
  console.log(rest);
  return (
    <Route {...rest} render={(props) => (
        rest.isAuthenticated === true 
        ? <C {...props} /> : <Redirect to="/login" />
    )} />
  )
  }

class App extends Component {

  componentDidMount() {
    this.props.onTryAuto();
  }
  
  render() {

    let routes = (
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/" exact component={Home} />
      </Switch>
    );

    if ( this.props.isAuthenticated ) {
      routes = (
        <Switch>
          <Route path="/detail/:id" component={ArticleDetail} />
          <Route path="/logout" component={Logout} />
          <Route path="/login" component={Login} />
          <Route path="/" exact component={Home} />
        </Switch>
      );
    }
    return (
      <div className={classes.App}>
        <Layout>
          {routes}
        </Layout>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAuto: () => dispatch(actions.authCheckState())
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
