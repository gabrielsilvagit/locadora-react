import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Password from './pages/Password';
import Dashboard from './pages/Dashboard';
import Fuel from './pages/Fuel';
import Brand from './pages/Brand';
import CarModel from './pages/CarModel';
import Category from './pages/Category';
import Vehicle from './pages/Vehicle';
import Rental from './pages/Rental';
import Cleaning from './pages/Cleaning';
import Maintenance from './pages/Maintenance';
import CheckOut from './pages/CheckOut';
import PageNotFound from './pages/PageNotFound';
import Dropoffs from './pages/Dropoffs';
import Reports from './pages/Reports';

import { isAuthenticated } from './services/auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/login" exact component={SignIn} />
      <Route path="/register" exact component={SignUp} />
      <Route path="/password/:token" exact component={Password} />
      <PrivateRoute path="/dashboard" exact component={Dashboard} />
      <PrivateRoute path="/fuels" exact component={Fuel} />
      <PrivateRoute path="/brands" exact component={Brand} />
      <PrivateRoute path="/carmodels" exact component={CarModel} />
      <PrivateRoute path="/categories" exact component={Category} />
      <PrivateRoute path="/vehicles" exact component={Vehicle} />
      <PrivateRoute path="/rentals" exact component={Rental} />
      <PrivateRoute path="/cleanings" exact component={Cleaning} />
      <PrivateRoute path="/maintenances" exact component={Maintenance} />
      <PrivateRoute path="/checkouts" exact component={CheckOut} />
      <PrivateRoute path="/dropoffs" exact component={Dropoffs} />
      <PrivateRoute path="/reports" exact component={Reports} />
      <PrivateRoute path="/app" component={PageNotFound} />
      <Route path="*" component={PageNotFound} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
