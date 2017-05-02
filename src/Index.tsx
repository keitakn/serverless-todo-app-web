import createBrowserHistory from "history/createBrowserHistory";
import * as React from "react";
import * as ReactDOM from "react-dom";
import {Provider} from "react-redux";
import { Router, Switch } from "react-router";
import { Route } from "react-router-dom";
import Counter from "./counter/Container";
import NotFound from "./NotFound";
import store from "./store";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import * as injectTapEventPlugin from "react-tap-event-plugin";

injectTapEventPlugin();
const history = createBrowserHistory();

ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route exact path="/counter" component={Counter} />
          <Route path="/counter/:myParams" component={Counter} />
          <Route component={NotFound}/>
        </Switch>
      </Router>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById("app"),
);
