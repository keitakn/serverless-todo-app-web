import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import TextField from "material-ui/TextField";
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
          <p>TODOリスト</p>
          <div>
            <TextField hintText="買い物に行く" />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}
