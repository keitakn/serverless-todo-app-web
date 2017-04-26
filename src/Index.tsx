import * as React from "react"
import * as ReactDOM from "react-dom"
import * as injectTapEventPlugin from "react-tap-event-plugin";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import MyComponent from "./components/MyComponent";

injectTapEventPlugin();

ReactDOM.render(
  <MuiThemeProvider>
    <MyComponent content="Hello React SPA!" />
  </MuiThemeProvider>,
  document.getElementById("app")
);
