import DatePicker from 'material-ui/DatePicker';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import * as React from 'react';
import { ISignupProps } from './Signup';

/**
 * SignupForm Component
 */
export default class SignupForm extends React.PureComponent<ISignupProps, {}> {

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
   * @param {ISignupProps} props
   */
  constructor(props: ISignupProps) {
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

