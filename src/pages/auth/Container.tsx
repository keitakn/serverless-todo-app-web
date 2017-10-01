import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IReduxState, ReduxAction } from '../../store';
import Auth from './Auth';
import { LoginDomains } from '../../domain/LoginDomains';
import { isLoggedInFalseAction, isLoggedInStartAction, isLoggedInTrueAction } from './module';

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
   * ログイン状態かどうかを確認する
   *
   * @returns {Promise<boolean>}
   */
  public async isLoggedIn(): Promise<boolean> {
    this.dispatch(
      isLoggedInStartAction(),
    );

    const isLoggedIn = await LoginDomains.isLoggedIn();

    if (isLoggedIn) {
      this.dispatch(
        isLoggedInTrueAction(),
      );
    } else {
      this.dispatch(
        isLoggedInFalseAction(),
      );
    }

    return Promise.resolve(isLoggedIn);
  }
}

const mapStateToProps = (state: IReduxState) => {
  return { value: state.auth };
};

const mapDispatchToProps = (dispatch: Dispatch<ReduxAction>) => ({
  actions: new ActionDispatcher(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
