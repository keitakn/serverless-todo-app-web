import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import * as React from 'react';
import { ILoginProps } from './Login';

/**
 * LoginForm Component
 */
export default class LoginForm extends React.PureComponent<ILoginProps, {}> {

  /**
   * Formから送信されてくるメールアドレス
   */
  private emailInput: TextField;

  /**
   * Formから送信されてくるメールアドレス
   */
  private passwordInput: TextField;

  /**
   * @param {ISignupProps} props
   */
  constructor(props: ILoginProps) {
    super(props);

    this.handleTouchTap = this.handleTouchTap.bind(this);
  }

  /**
   * ログインリクエストを送信する
   *
   * @param {React.FormEvent<any>} e
   * @returns {Promise<void>}
   */
  public async handleTouchTap(e: React.FormEvent<any>) {
    e.preventDefault();

    const loginRequest = {
      email: this.emailInput.getInputNode().value.trim(),
      password: this.passwordInput.getInputNode().value.trim(),
    };

    await this.props.actions.login(loginRequest);
  }

  /**
   * @returns {any}
   */
  public render() {
    const isError = this.props.value.isError;

    return (
      <form>
        <TextField
          type="email"
          hintText="Enter your Email"
          ref={(input: TextField) => {this.emailInput = input; }}
          defaultValue={this.props.value.email}
          errorText={(isError) ? this.props.value.errors.message : ''}
        />
        <TextField
          type="password"
          hintText="Enter your Password"
          ref={(input: TextField) => {this.passwordInput = input; }}
          defaultValue={this.props.value.password}
          errorText={(isError) ? this.props.value.errors.message : ''}
        />
        <RaisedButton onTouchTap={this.handleTouchTap} label="ログイン" secondary={true} fullWidth={true} />
      </form>
    );
  }
}

