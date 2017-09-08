import * as React from "react";
import {Switch} from "react-router";
import {Route} from "react-router-dom";
import NotFound from "./components/NotFound";
import Todo from "./pages/todo/Container";
import Signup from "./pages/signup/Container";

export default class Routes extends React.Component<{}, {}> {

  public render() {
    return (
      <Switch>
        <Route exact={true} path="/todo" component={Todo} />
        <Route exact={true} path="/signup" component={Signup} />
        <Route component={NotFound}/>
      </Switch>
    );
  }
}
