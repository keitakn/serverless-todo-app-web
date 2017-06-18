import Checkbox from "material-ui/Checkbox";
import FloatingActionButton from "material-ui/FloatingActionButton";
import {List, ListItem} from "material-ui/List";
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

class TodoForm extends React.Component<Props, {}> {
  // TODO もっと良い書き方がないか検討する
  public refs: {
    [string: string]: any;
    todoTitle: TextField;
  };

  constructor(props: Props) {
    super(props);
    this.handleTouchTap = this.handleTouchTap.bind(this);
  }

  public handleTouchTap(e: React.FormEvent<any>) {
    e.preventDefault();
    const title = this.refs.todoTitle.getValue();
    this.props.actions.addTodo(title).catch((error) => {
      // TODO まともなエラー処理を行う
      console.error(error);
    });
  }

  public render() {
    return (
      <div>
        <TextField hintText="買い物に行く" ref="todoTitle" />
        <FloatingActionButton onTouchTap={(e) => this.handleTouchTap(e)}>
          <ContentAdd />
        </FloatingActionButton>
      </div>
    );
  }
}

const TodoList = (props: Props) => {
  return (
    <List>
      {props.value.list.map((todo) => {
        return (
          <ListItem
            key={todo.id}
            primaryText={todo.title}
            leftCheckbox={<Checkbox />}
          />
        );
      })}
    </List>
  );
};

export default class Todo extends React.Component<Props, {}> {

  constructor(props: Props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  public componentDidMount() {
    this.props.actions.findAll().catch((error) => {
      // TODO まともなエラー処理を行う
      console.error(error);
    });
  }

  public render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppMenu />
          <p>TODOリスト</p>
          <TodoForm value={this.props.value} actions={this.props.actions} />
          <TodoList value={this.props.value} actions={this.props.actions} />
        </div>
      </MuiThemeProvider>
    );
  }
}
