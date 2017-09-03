import * as React from "react";
import {Switch} from "react-router";
import {Route} from "react-router-dom";
import Counter from "./pages/counter/Container";
import NotFound from "./components/NotFound";
import Todo from "./pages/todo/Container";
import User from "./pages/user/Container";

export default class Routes extends React.Component<{}, {}> {

  public render() {
    return (
      <Switch>
        <Route exact path="/counter" component={Counter} />
        <Route path="/counter/:myParams" component={Counter} />
        <Route path="/todo" component={Todo} />
        <Route path="/sign-up" component={User} />
        <Route component={NotFound}/>
      </Switch>
    );
  }
}
