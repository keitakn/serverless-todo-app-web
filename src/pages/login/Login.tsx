import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as React from 'react';
import AppMenu from '../../components/AppMenu';
import { ActionDispatcher } from './Container';
import { ILoginState } from './module';
import LoginForm from './LoginForm';

/**
 * LoginProps IF
 */
export interface ILoginProps {
  value: ILoginState;
  actions: ActionDispatcher;
}

/**
 * Loginの親Component
 */
const Login = (props: ILoginProps) => {
  return (
    <MuiThemeProvider>
      <div>
        <AppMenu />
        <LoginForm actions={props.actions} value={props.value} />
      </div>
    </MuiThemeProvider>
  );
};

export default Login;
