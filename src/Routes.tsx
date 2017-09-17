import * as React from 'react';
import { Switch } from 'react-router';
import { Route } from 'react-router-dom';
import NotFound from './components/NotFound';
import Signup from './pages/signup/Container';
import Todo from './pages/todo/Container';

/**
 * ルーティング用 Component
 *
 * @returns {any}
 * @constructor
 */
const Routes = () => {
  return (
    <Switch>
      <Route exact={true} path="/todo" component={Todo} />
      <Route exact={true} path="/signup" component={Signup} />
      <Route component={NotFound}/>
    </Switch>
  );
};

export default Routes;
