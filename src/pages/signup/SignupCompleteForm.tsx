import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import * as React from 'react';
import { ISignupProps } from './Signup';
import { UserService } from '../../domain/UserService';
import ISignupCompleteRequest = UserService.ISignupCompleteRequest;

/**
 * SignupCompleteForm Component
 */
export default class SignupCompleteForm extends React.PureComponent<ISignupProps, {}> {
  /**
   * Formから送信されてくるメールアドレス
   */
  private emailInput: TextField;

  /**
   * Formから送信されてくる検証コード
   */
  private verificationCodeInput: TextField;

  /**
   * @param {ISignupProps} props
   */
  constructor(props: ISignupProps) {
    super(props);

    this.handleTouchTap = this.handleTouchTap.bind(this);
  }

  /**
   * サインアップ完了リクエストを送信する
   *
   * @param {React.FormEvent<any>} e
   * @returns {Promise<void>}
   */
  public async handleTouchTap(e: React.FormEvent<any>) {
    e.preventDefault();

    const signupCompleteRequest: ISignupCompleteRequest = {
      email: this.emailInput.getInputNode().value.trim(),
      verificationCode: this.verificationCodeInput.getInputNode().value.trim(),
    };

    await this.props.actions.postSignupCompleteRequest(signupCompleteRequest);
  }

  /**
   * @returns {any}
   */
  public render() {
    const isError = this.props.value.isError;
    const signupCompleted = this.props.value.signupCompleted;

    return (
      <form>
        <TextField
          type="email"
          hintText="Enter your Email"
          ref={(input: TextField) => {this.emailInput = input; }}
          defaultValue={this.props.value.email}
          errorText={(isError && signupCompleted) ? this.props.value.errors.message : ''}
        />
        <TextField
          type="text"
          hintText="Enter your VerificationCode"
          ref={(input: TextField) => {this.verificationCodeInput = input; }}
          defaultValue=""
          errorText={(isError && signupCompleted) ? this.props.value.errors.message : ''}
        />
        <RaisedButton
          onTouchTap={this.handleTouchTap}
          label="サインアップを完了させる"
          secondary={true}
          fullWidth={true}
        />
      </form>
    );
  }
}
