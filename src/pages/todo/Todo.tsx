import Checkbox from 'material-ui/Checkbox';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import { List, ListItem } from 'material-ui/List';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TextField from 'material-ui/TextField';
import * as React from 'react';
import AppMenu from '../../components/AppMenu';
import { ActionDispatcher } from './Container';
import { ITodoEntity, ITodoState } from './module';

/**
 * IProps IF
 */
interface IProps {
  value: ITodoState;
  actions: ActionDispatcher;
}

/**
 * TODO作成 Form Component
 */
class TodoCreateForm extends React.Component<IProps, {}> {

  /**
   * Formから送信されてくるTODOタイトル
   */
  private todoTitleInput: TextField;

  /**
   * @param {IProps} props
   */
  constructor(props: IProps) {
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

    const title = this.todoTitleInput.getInputNode().value.trim();

    await this.props.actions.create({ title });
  }

  /**
   * @returns {any}
   */
  public render() {
    return (
      <div>
        <TextField
          hintText="買い物に行く"
          ref={(input: TextField) => {this.todoTitleInput = input; }}
        />
        <FloatingActionButton onTouchTap={this.handleTouchTap}>
          <ContentAdd />
        </FloatingActionButton>
      </div>
    );
  }
}

/**
 * TODOリスト 表示用Component
 *
 * @param {IProps} props
 * @returns {any}
 * @constructor
 */
const TodoList = (props: IProps) => {
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
export default class Todo extends React.Component<IProps, {}> {

  /**
   * @param {IProps} props
   */
  constructor(props: IProps) {
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
