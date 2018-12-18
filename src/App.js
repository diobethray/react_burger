import React, { Component, Suspense } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import * as actions from './store/actions/index';
import Spinner from './components/UI/Spinner/Spinner';

const BurgerBuilder = React.lazy(() => import('./containers/BurgerBuilder/BurgerBuilder'));
const Checkout = React.lazy(() => import('./containers/Checkout/Checkout'));
const Orders = React.lazy(() => import('./containers/Orders/Orders'));
const Auth = React.lazy(() => import('./containers/Auth/Auth'));
const Logout = React.lazy(() => import('./containers/Auth/Logout/Logout'));

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignIn();
  }

  render() {
    let routes = (
      <Switch>
        <Redirect exact from="/" to="/burger-builder"/>
        <Route path="/burger-builder" render={() => (
          <Suspense fallback={<Spinner/>}>
            <BurgerBuilder />
          </Suspense>
        )}/>
        <Route path="/login" render={() => (
          <Suspense fallback={<Spinner/>}>
            <Auth />
          </Suspense>
        )}/>
        <Route render={() => <div>Page not found.</div>} />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Redirect exact from="/" to="/burger-builder"/>
          <Route path="/burger-builder" render={() => (
            <Suspense fallback={<Spinner/>}>
              <BurgerBuilder />
            </Suspense>
          )}/>
          <Route path="/checkout" render={() => (
            <Suspense fallback={<Spinner/>}>
              <Checkout />
            </Suspense>
          )}/>
          <Route path="/orders" render={() => (
            <Suspense fallback={<Spinner/>}>
              <Orders />
            </Suspense>
          )}/>
          <Route path="/login" render={() => (
            <Suspense fallback={<Spinner/>}>
              <Auth />
            </Suspense>
          )}/>
          <Route path="/logout" render={() => (
            <Suspense fallback={<Spinner/>}>
              <Logout />
            </Suspense>
          )}/>
          <Route render={() => <div>Page not found.</div>} />
        </Switch>
      );
    }
    
    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignIn: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
