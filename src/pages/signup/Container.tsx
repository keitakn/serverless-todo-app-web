import {
  CognitoUser,
  CognitoUserPool,
} from 'amazon-cognito-identity-js';
import { connect, MapDispatchToPropsParam, MapStateToPropsParam } from 'react-redux';
import { Dispatch } from 'redux';
import { AppConfig } from '../../AppConfig';
import { IReduxState, ReduxAction } from '../../store';
import {
  ISignupCompleteRequest,
  ISignupState,
  postSignupCompleteRequestAction,
  postSignupRequestAction,
  signupCompleteFailureAction,
  signupCompleteSuccess,
  signupFailureAction,
  signupSuccessAction,
} from './module';
import Signup from './Signup';
import getCognitoUserPoolClientId = AppConfig.getCognitoUserPoolClientId;
import getCognitoUserPoolId = AppConfig.getCognitoUserPoolId;
import { UserService } from '../../domain/UserService';
import ISignupRequest = UserService.ISignupRequest;
import ISignupSuccessResponse = UserService.ISignupSuccessResponse;
import ISignupFailureResponse = UserService.ISignupFailureResponse;

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
    return new Promise((resolve, reject) => {
      this.dispatch(
        postSignupCompleteRequestAction(request),
      );

      // TODO この一連の登録処理は別の場所に分離させる
      const poolData = {
        UserPoolId: getCognitoUserPoolId(),
        ClientId: getCognitoUserPoolClientId(),
      };
      const cognitoUserPool = new CognitoUserPool(poolData);

      const userData = {
        Username: request.email,
        Pool: cognitoUserPool,
      };

      const cognitoUser = new CognitoUser(userData);
      cognitoUser.confirmRegistration(
        request.verificationCode,
        true,
        (error, result) => {
          if (error) {
            this.dispatch(
              signupCompleteFailureAction({ error }),
            );
            return reject(error);
          }

          this.dispatch(
            signupCompleteSuccess(),
          );

          return resolve(result);
        },
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
