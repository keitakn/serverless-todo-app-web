import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import * as React from "react";
import AppMenu from "../common/AppMenu";
import {ActionDispatcher} from "./Container";
import {TodoState} from "./module";

interface Props {
  value: TodoState;
  actions: ActionDispatcher;
}

export default class Todo extends React.Component<Props, {}> {

  public render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppMenu />
          <p>TODO Component!</p>
        </div>
      </MuiThemeProvider>
    );
  }
}
