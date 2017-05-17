import {AppBar, IconButton, IconMenu, MenuItem} from "material-ui";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import * as React from "react";
import {Link} from "react-router-dom";

export default class AppMenu extends React.Component<any, any> {

  render() {
    return (
      <AppBar
        title="SPA-Prototype-React"
        iconElementLeft={
          <IconMenu
            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
          >
            <MenuItem
              primaryText="home"
              containerElement={
                <Link to="/" />
              }
            />
            <MenuItem
              primaryText="counter"
              containerElement={
                <Link to="/counter" />
              }
            />
            <MenuItem
              primaryText="counter(params)"
              containerElement={
                <Link to="/counter/9999" />
              }
            />
          </IconMenu>
        }
      />
    );
  }
}
