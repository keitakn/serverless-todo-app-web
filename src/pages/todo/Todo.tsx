import Checkbox from 'material-ui/Checkbox';
import { List, ListItem } from 'material-ui/List';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as React from 'react';
import AppMenu from '../../components/AppMenu';
import { ActionDispatcher } from './Container';
import { ITodoEntity, ITodoState } from './module';
import TodoCreateForm from './TodoCreateForm';

/**
 * ITodoProps IF
 */
export interface ITodoProps {
  value: ITodoState;
  actions: ActionDispatcher;
}

/**
 * TODOリスト 表示用Component
 *
 * @param {ITodoProps} props
 * @returns {any}
 * @constructor
 */
const TodoList = (props: ITodoProps) => {
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
export default class Todo extends React.PureComponent<ITodoProps, {}> {

  /**
   * @param {ITodoProps} props
   */
  constructor(props: ITodoProps) {
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
