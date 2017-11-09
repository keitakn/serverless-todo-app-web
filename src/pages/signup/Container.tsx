import { connect, MapDispatchToPropsParam, MapStateToPropsParam } from 'react-redux';
import { Dispatch } from 'redux';
import { IReduxState, ReduxAction } from '../../store';
import {
  ISignupState,
  postSignupCompleteRequestAction,
  postSignupRequestAction,
  signupCompleteFailureAction,
  signupCompleteSuccess,
  signupFailureAction,
  signupSuccessAction,
} from './module';
import Signup from './Signup';
import { UserService } from '../../domain/UserService';
import ISignupRequest = UserService.ISignupRequest;
import ISignupSuccessResponse = UserService.ISignupSuccessResponse;
import ISignupFailureResponse = UserService.ISignupFailureResponse;
import ISignupCompleteRequest = UserService.ISignupCompleteRequest;
import ISignupCompleteFailureResponse = UserService.ISignupCompleteFailureResponse;

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
  constructor(private dispatch: (action: ReduxAction) => void) {}

  /**
   * サインアップリクエストを送信する
   *
   * @param {ISignupRequest} request
   * @returns {Promise<void>}
   */
  public async postSignup(request: ISignupRequest) {
    this.dispatch(postSignupRequestAction(request));

    await UserService.signup(request).then((response: ISignupSuccessResponse) => {
      this.dispatch(signupSuccessAction(response));
    }).catch((error: ISignupFailureResponse) => {
      this.dispatch(signupFailureAction(error));
    });
  }

  /**
   * サインアップ完了リクエストを送信する
   *
   * @param {ISignupCompleteRequest} request
   * @returns {Promise<any>}
   */
  public async postSignupCompleteRequest(request: ISignupCompleteRequest) {
    this.dispatch(
      postSignupCompleteRequestAction(request),
    );

    await UserService.signupComplete(request).then(() => {
      this.dispatch(
        signupCompleteSuccess(),
      );
    }).catch((error: ISignupCompleteFailureResponse) => {
      this.dispatch(
        signupCompleteFailureAction(error),
      );
    });
  }
}

const mapStateToProps: MapStateToPropsParam<{value: ISignupState}, any> = (state: IReduxState) => {
  return { value: state.signup };
};

const mapDispatchToProps: MapDispatchToPropsParam<{actions: ActionDispatcher}, {}>
  = (dispatch: Dispatch<ReduxAction>) => ({ actions: new ActionDispatcher(dispatch) });

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
