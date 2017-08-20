import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import * as React from "react";
import AppMenu from "../common/AppMenu";
import {ActionDispatcher} from "./Container";
import {UserState} from "./module";

interface Props {
  value: UserState;
  actions: ActionDispatcher;
}

export default class User extends React.Component<Props, {}> {
  public render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppMenu />
          <p>サインアップ</p>
        </div>
      </MuiThemeProvider>
    );
  }
}
