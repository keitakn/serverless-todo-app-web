import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import * as React from "react";
import {RouteComponentProps} from "react-router";
import AppMenu from "./common/AppMenu";

export default class NotFound extends React.Component<RouteComponentProps<any>, {}> {

  public render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppMenu />
          <div>
            <p>404 Not Found</p>
            <p>お探しのページは見つかりません。</p>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}
