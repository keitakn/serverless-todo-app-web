import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IReduxState, ReduxAction } from '../../store';
import { postLoginRequestAction } from './module';
import Login from './Login';
import {LoginDomains} from "../../domain/LoginDomains";

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

    const cognitoUserSession = await LoginDomains.login(request);
    console.log(cognitoUserSession);
  }
}

const mapStateToProps = (state: IReduxState) => {
  return { value: state.login };
};

const mapDispatchToProps = (dispatch: Dispatch<ReduxAction>) => ({
  actions: new ActionDispatcher(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
