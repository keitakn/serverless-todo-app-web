import DatePicker from 'material-ui/DatePicker';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import * as React from 'react';
import AppMenu from '../../components/AppMenu';
import { ActionDispatcher } from './Container';
import { ISignupCompleteRequest, ISignupState } from './module';

/**
 * IProps IF
 */
interface IProps {
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
 * SignupCompleteForm Component
 */
class SignupCompleteForm extends React.PureComponent<IProps, {}> {
  /**
   * Formから送信されてくるメールアドレス
   */
  private emailInput: TextField;

  /**
   * Formから送信されてくる検証コード
   */
  private verificationCodeInput: TextField;

  /**
   * @param {IProps} props
   */
  constructor(props: IProps) {
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
 * SignupForm Component
 */
class SignupForm extends React.Component<IProps, {}> {

  /**
   * Formから送信されてくるメールアドレス
   */
  private emailInput: TextField;

  /**
   * Formから送信されてくるメールアドレス
   */
  private passwordInput: TextField;

  /**
   * Formから送信されてくる性別
   */
  private genderInput: RadioButtonGroup;

  /**
   * Formから送信されてくる誕生日
   */
  private birthdateInput: any;

  /**
   * @param {IProps} props
   */
  constructor(props: IProps) {
    super(props);

    this.handleTouchTap = this.handleTouchTap.bind(this);
  }

  /**
   * サインアップのリクエストを送信する
   *
   * @param {React.FormEvent<any>} e
   * @returns {Promise<void>}
   */
  public async handleTouchTap(e: React.FormEvent<any>) {
    e.preventDefault();

    const signUpRequest = {
      email: this.emailInput.getInputNode().value.trim(),
      password: this.passwordInput.getInputNode().value.trim(),
      gender: this.genderInput.getSelectedValue(),
      birthdate: this.birthdateInput.refs.input.props.value,
    };

    await this.props.actions.postSignup(signUpRequest);
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
          errorText={(isError && signupCompleted === false) ? this.props.value.errors.message : ''}
        />
        <TextField
          type="password"
          hintText="Enter your Password"
          ref={(input: TextField) => {this.passwordInput = input; }}
          defaultValue={this.props.value.password}
          errorText={(isError && signupCompleted === false) ? this.props.value.errors.message : ''}
        />
        <RadioButtonGroup
          ref={(input: RadioButtonGroup) => {this.genderInput = input; }}
          name="gender"
          defaultSelected="not_light"
        >
          <RadioButton
            value="female"
            label="女性"
          />
          <RadioButton
            value="male"
            label="男性"
          />
        </RadioButtonGroup>
        <DatePicker
          ref={(input: DatePicker) => {this.birthdateInput = input; }}
          hintText="birthdate"
        />
        <RaisedButton onTouchTap={this.handleTouchTap} label="サインアップ" secondary={true} fullWidth={true} />
      </form>
    );
  }
}

/**
 * Signup Root Component
 */
export default class Signup extends React.PureComponent<IProps, {}> {

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
