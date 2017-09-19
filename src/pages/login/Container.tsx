import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IReduxState, ReduxAction } from '../../store';
import { loginFailureAction, loginSuccessAction, postLoginRequestAction } from './module';
import Login from './Login';
import { LoginDomains } from '../../domain/LoginDomains';

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
   * @param {LoginDomains.ILoginRequest} request
   * @returns {Promise<void>}
   */
  public async login(request: LoginDomains.ILoginRequest): Promise<void> {
    this.dispatch(postLoginRequestAction(request));

    const cognitoUserSession = await LoginDomains.login(request).catch((error: Error) => {
      const errorResponse = {
        email: request.email,
        password: request.password,
        error,
      };

      this.dispatch(
        loginFailureAction(errorResponse),
      );

      return Promise.reject(error);
    });

    this.dispatch(
      loginSuccessAction({ session: cognitoUserSession }),
    );
  }

  /**
   * ログイン状態かどうかを確認する
   *
   * @returns {Promise<boolean>}
   */
  public static async isLoggedIn(): Promise<boolean> {
    return await LoginDomains.isLoggedIn();
  }
}

const mapStateToProps = (state: IReduxState) => {
  return { value: state.login };
};

const mapDispatchToProps = (dispatch: Dispatch<ReduxAction>) => ({
  actions: new ActionDispatcher(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
