import DatePicker from "material-ui/DatePicker";
import {RadioButton, RadioButtonGroup} from "material-ui/RadioButton";
import RaisedButton from "material-ui/RaisedButton";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import TextField from "material-ui/TextField";
import * as React from "react";
import AppMenu from "../../components/AppMenu";
import {ActionDispatcher} from "./Container";
import {UserState} from "./module";

interface Props {
  value: UserState;
  actions: ActionDispatcher;
}

const SignUpSuccessMessage = (props: Props) => {
  return (
    <div>
      SignUpが完了しました。
      メールアドレス宛に検証コードが届いているので入力して下さい。
      メールが届かない場合は、下記アドレスからのメールを受信出来るように設定して下さい。
      no-reply@verificationemail.com
    </div>
  );
};

class SignUpForm extends React.Component<Props, {}> {

  // TODO passwordの入力フォームが必要
  public refs: {
    email: TextField;
    password: TextField;
    gender: RadioButtonGroup;
    birthdate: any;
  };

  constructor(props: Props) {
    super(props);

    this.handleTouchTap = this.handleTouchTap.bind(this);
  }

  public async handleTouchTap(e: React.FormEvent<any>) {
    e.preventDefault();

    const signUpRequest = {
      email: this.refs.email.getValue().trim(),
      password: this.refs.password.getValue().trim(),
      gender: this.refs.gender.getSelectedValue(),
      birthdate: this.refs.birthdate.refs.input.props.value,
    };

    await this.props.actions.postSignUp(signUpRequest);
  }

  public render() {
    return (
      <form>
        <TextField
          type="email"
          hintText="Enter your Email"
          ref="email"
          defaultValue={this.props.value.email}
          errorText={(this.props.value.error) ? this.props.value.errors.message : ""}
        />
        <TextField
          type="password"
          hintText="Enter your Password"
          ref="password"
          defaultValue={this.props.value.password}
          errorText={(this.props.value.error) ? this.props.value.errors.message : ""}
        />
        <RadioButtonGroup ref="gender" name="gender" defaultSelected="not_light">
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
          ref="birthdate"
          hintText="birthdate"
        />
        <RaisedButton onTouchTap={this.handleTouchTap} label="Sign UP" secondary={true} fullWidth={true} />
      </form>
    );
  }
}

export default class User extends React.Component<Props, {}> {
  public render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppMenu />
          <p>サインアップ</p>
          <SignUpForm value={this.props.value} actions={this.props.actions} />
          {
            (this.props.value.signUpCompleted) ?
            <SignUpSuccessMessage value={this.props.value} actions={this.props.actions}/> :
            ""
          }
        </div>
      </MuiThemeProvider>
    );
  }
}
