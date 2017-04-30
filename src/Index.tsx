import * as React from "react";
import * as ReactDOM from "react-dom";
import { Router, Switch } from 'react-router';
import { Route } from 'react-router-dom';
import Counter from "./counter/Container";
import store from "./store";
import {Provider} from "react-redux";
import createBrowserHistory from 'history/createBrowserHistory';
import NotFound from "./NotFound";

const history = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route exact path="/counter" component={Counter} />
        <Route path="/counter/:myParams" component={Counter} />
        <Route component={NotFound}/>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("app")
);
