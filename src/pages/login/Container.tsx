import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IReduxState, ReduxAction } from '../../store';
import { postLoginRequestAction } from './module';
import Login from './Login';

/**
 * ActionDispatcher
 * 非同期処理でのビジネスロジックを定義し、Actionをdispatchする
 *
 * @link http://qiita.com/uryyyyyyy/items/d8bae6a7fca1c4732696
 */
export class ActionDispatcher {

  /**
   * @param {(action: ReduxAction) => void} dispatch
   */
  constructor(
    private dispatch: (action: ReduxAction) => void,
  ) {}

  /**
   * ログインを行う
   *
   * @param request
   * @returns {Promise<void>}
   */
  public async login(request: any): Promise<void> {
    this.dispatch(postLoginRequestAction(request));
  }
}

const mapStateToProps = (state: IReduxState) => {
  return { value: state.login };
};

const mapDispatchToProps = (dispatch: Dispatch<ReduxAction>) => ({
  actions: new ActionDispatcher(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
