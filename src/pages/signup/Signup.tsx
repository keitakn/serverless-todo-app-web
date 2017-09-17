import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as React from 'react';
import AppMenu from '../../components/AppMenu';
import { ActionDispatcher } from './Container';
import { ISignupState } from './module';
import SignupForm from './SignupForm';
import SignupCompleteForm from './SignupCompleteForm';

/**
 * SignupProps IF
 */
export interface ISignupProps {
  value: ISignupState;
  actions: ActionDispatcher;
}

/**
 * サインアップ完了成功時に表示させるComponent
 *
 * @returns {any}
 * @constructor
 */
const SignupCompleteSuccessMessage: React.StatelessComponent = () => {
  return (
    <div>
      検証コードが確認出来ました。
      ログイン画面よりログインを行って下さい。
    </div>
  );
};

/**
 * サインアップ正常終了時に表示させるComponent
 *
 * @returns {any}
 * @constructor
 */
const SignupSuccessMessage: React.StatelessComponent = () => {
  return (
    <div>
      Signupが完了しました。
      メールアドレス宛に検証コードが届いているので入力して下さい。
      メールが届かない場合は、下記アドレスからのメールを受信出来るように設定して下さい。
      no-reply@verificationemail.com
    </div>
  );
};

/**
 * Signup Root Component
 */
export default class Signup extends React.PureComponent<ISignupProps, {}> {

  /**
   * @returns {any}
   */
  public render() {
    const signupCompleted  = this.props.value.signupCompleted;
    const state            = this.props.value;
    const actionDispatcher = this.props.actions;
    const userConfirmed    = this.props.value.userConfirmed;

    return (
      <MuiThemeProvider>
        <div>
          <AppMenu />
          <p>サインアップ</p>
          <SignupForm value={state} actions={actionDispatcher} />
          {(signupCompleted) ? <SignupSuccessMessage /> : ''}
          {(signupCompleted) ? <SignupCompleteForm value={state} actions={actionDispatcher}/> : ''}
          {(userConfirmed) ? <SignupCompleteSuccessMessage /> : ''}
        </div>
      </MuiThemeProvider>
    );
  }
}
