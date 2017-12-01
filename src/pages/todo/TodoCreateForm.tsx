import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TextField from 'material-ui/TextField';
import * as React from 'react';
import { ITodoProps } from './Todo';
import { LoginService } from '../../domain/LoginService';

/**
 * TODO作成 Form Component
 */
export default class TodoCreateForm extends React.PureComponent<ITodoProps, {}> {

  /**
   * Formから送信されてくるTODOタイトル
   */
  private todoTitleInput: TextField;

  /**
   * @param {ITodoProps} props
   */
  constructor(props: ITodoProps) {
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
    const session = await LoginService.fetchSession().catch((error) => {
      return Promise.reject(error);
    });

    await this.props.actions.create({ title, session });
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
