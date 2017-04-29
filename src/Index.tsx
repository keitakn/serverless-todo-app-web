import * as React from "react"
import * as ReactDOM from "react-dom"
import * as injectTapEventPlugin from "react-tap-event-plugin";
import MyComponent from "./components/MyComponent";

injectTapEventPlugin();

ReactDOM.render(
  <MyComponent content="Hello React SPA!" />,
  document.getElementById("app")
);
