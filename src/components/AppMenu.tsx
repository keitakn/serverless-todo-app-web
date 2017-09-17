import { AppBar, IconButton, IconMenu, MenuItem } from 'material-ui';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import * as React from 'react';
import { Link } from 'react-router-dom';

/**
 * Menu用Component
 *
 * @returns {any}
 * @constructor
 */
const AppMenu = () => {
  return (
    <AppBar
      title="TODOアプリ"
      iconElementLeft={
        <IconMenu
          iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
        >
          <MenuItem
            primaryText="signup"
            containerElement={
              <Link to="/signup" />
            }
          />
          <MenuItem
            primaryText="todo"
            containerElement={
              <Link to="/todo" />
            }
          />
        </IconMenu>
      }
    />
  );
};

export default AppMenu;
