import FloatingActionButton from "material-ui/FloatingActionButton";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import ContentAdd from "material-ui/svg-icons/content/add";
import TextField from "material-ui/TextField";
import * as React from "react";
import AppMenu from "../common/AppMenu";
import {ActionDispatcher} from "./Container";
import {TodoState} from "./module";

interface Props {
  value: TodoState;
  actions: ActionDispatcher;
}

export default class Todo extends React.Component<Props, {}> {

  // TODO もっと良い書き方がないか検討する
  public refs: {
    [string: string]: any;
    todoTitle: TextField;
  };

  constructor(props: Props) {
    super(props);
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  public componentDidMount() {
    // TODO Promiseが返却されるのでちゃんと受け取り処理を書く
    this.props.actions.findAll();
  }

  public handleTouchTap(e: React.FormEvent<any>) {
    e.preventDefault();
    const title = this.refs.todoTitle.getValue();
    // TODO Promiseが返却されるのでちゃんと受け取り処理を書く
    this.props.actions.addTodo(title);
  }

  public render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppMenu />
          <p>TODOリスト</p>
          <div>
            <TextField hintText="買い物に行く" ref="todoTitle" />
            <FloatingActionButton onTouchTap={(e) => this.handleTouchTap(e)}>
              <ContentAdd />
            </FloatingActionButton>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}
