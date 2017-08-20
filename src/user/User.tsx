import DatePicker from "material-ui/DatePicker";
import {RadioButton, RadioButtonGroup} from "material-ui/RadioButton";
import RaisedButton from "material-ui/RaisedButton";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import TextField from "material-ui/TextField";
import * as React from "react";
import AppMenu from "../common/AppMenu";
import {ActionDispatcher} from "./Container";
import {UserState} from "./module";

interface Props {
  value: UserState;
  actions: ActionDispatcher;
}

class SignUpForm extends React.Component<Props, {}> {

  public refs: {
    email: TextField;
    gender: RadioButtonGroup;
    birthdate: any;
  };

  constructor(props: Props) {
    super(props);

    this.send = this.send.bind(this);
  }

  public send(e: React.FormEvent<any>) {
    e.preventDefault();
    console.log(this.refs.email.getValue().trim());
    console.log(this.refs.gender.getSelectedValue());
    console.log(this.refs.birthdate.refs.input.props.value);
  }

  public render() {
    return (
      <form>
        <TextField
          hintText="email"
          ref="email"
          defaultValue=""
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
        <RaisedButton onTouchTap={this.send} label="Sign UP" secondary={true} fullWidth={true} />
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
        </div>
      </MuiThemeProvider>
    );
  }
}
