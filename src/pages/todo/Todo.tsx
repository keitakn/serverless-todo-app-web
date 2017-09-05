import Checkbox from "material-ui/Checkbox";
import FloatingActionButton from "material-ui/FloatingActionButton";
import {List, ListItem} from "material-ui/List";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import ContentAdd from "material-ui/svg-icons/content/add";
import TextField from "material-ui/TextField";
import * as React from "react";
import AppMenu from "../../components/AppMenu";
import {ActionDispatcher} from "./Container";
import {ITodoEntity, TodoState} from "./module";

/**
 * Props IF
 */
interface Props {
  value: TodoState;
  actions: ActionDispatcher;
}

/**
 * TODO作成 Form Component
 */
class TodoCreateForm extends React.Component<Props, {}> {
  // TODO 非推奨の書き方なので後で直す
  public refs: {
    [string: string]: any;
    todoTitle: TextField;
  };

  /**
   * @param {Props} props
   */
  constructor(props: Props) {
    super(props);
    this.handleTouchTap = this.handleTouchTap.bind(this);
  }

  /**
   * TODO作成リクエストを送信する
   *
   * @param {React.FormEvent<any>} e
   * @returns {Promise<void>}
   */
  public async handleTouchTap(e: React.FormEvent<any>) {
    e.preventDefault();

    const title = this.refs.todoTitle.getValue();

    await this.props.actions.create({title});
  }

  /**
   * @returns {any}
   */
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

/**
 * TODOリスト 表示用Component
 *
 * @param {Props} props
 * @returns {any}
 * @constructor
 */
const TodoList = (props: Props) => {
  return (
    <List>
      {props.value.todoList.map((todo: ITodoEntity) => {
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

/**
 * TODOの親Component
 */
export default class Todo extends React.Component<Props, {}> {

  /**
   * @param {Props} props
   */
  constructor(props: Props) {
    super(props);
    this.componentWillMount = this.componentWillMount.bind(this);
  }

  /**
   * 初期化処理
   * 初期表示用のTODOリストを取得する
   *
   * @returns {Promise<void>}
   */
  public async componentWillMount() {
    await this.props.actions.fetchAll();
  }

  /**
   * @returns {any}
   */
  public render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppMenu />
          <p>TODOリスト</p>
          <TodoCreateForm value={this.props.value} actions={this.props.actions} />
          <TodoList value={this.props.value} actions={this.props.actions} />
        </div>
      </MuiThemeProvider>
    );
  }
}
