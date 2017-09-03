import * as React from "react";
import {Switch} from "react-router";
import {Route} from "react-router-dom";
import Counter from "./pages/counter/Container";
import NotFound from "./components/NotFound";
import Todo from "./pages/todo/Container";
import Signup from "./pages/signup/Container";

export default class Routes extends React.Component<{}, {}> {

  public render() {
    return (
      <Switch>
        <Route exact path="/counter" component={Counter} />
        <Route path="/counter/:myParams" component={Counter} />
        <Route path="/todo" component={Todo} />
        <Route path="/signup" component={Signup} />
        <Route component={NotFound}/>
      </Switch>
    );
  }
}
