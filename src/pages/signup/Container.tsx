import {connect, MapDispatchToPropsParam, MapStateToPropsParam} from "react-redux";
import {Dispatch} from "redux";
import {ReduxAction, ReduxState} from "../../store";
import {
  postSignupRequestAction,
  signupFailureAction,
  SignupRequest,
  signupSuccessAction,
  SignupSuccessResponse,
  SignupState
} from "./module";
import Signup from "./Signup";
import {CognitoUserPool, CognitoUserAttribute, ISignUpResult} from "amazon-cognito-identity-js";
import {AppConfig} from "../../AppConfig";
import getCognitoUserPoolClientId = AppConfig.getCognitoUserPoolClientId;
import getCognitoUserPoolId = AppConfig.getCognitoUserPoolId;

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
   * @param {SignupRequest} signUpRequest
   * @returns {Promise<void>}
   */
  public async postSignup(signUpRequest: SignupRequest) {
    this.dispatch(postSignupRequestAction(signUpRequest));

    // TODO 登録成功時と登録失敗時のアクションを実装
    // TODO この一連の登録処理は別の場所に分離させる
    const poolData = {
      UserPoolId: getCognitoUserPoolId(),
      ClientId: getCognitoUserPoolClientId(),
    };
    const cognitoUserPool = new CognitoUserPool(poolData);

    const dataEmail = {
      Name: "email",
      Value: signUpRequest.email,
    };

    const dataGender = {
      Name: "gender",
      Value: signUpRequest.gender,
    };

    const dataBirthdate = {
      Name: "birthdate",
      Value: signUpRequest.birthdate,
    };

    const attributeEmail = new CognitoUserAttribute(dataEmail);
    const attributeGender = new CognitoUserAttribute(dataGender);
    const attributeBirthdate = new CognitoUserAttribute(dataBirthdate);

    const attributeList = [
      attributeEmail,
      attributeGender,
      attributeBirthdate,
    ];

    cognitoUserPool.signUp(
      dataEmail.Value,
      signUpRequest.password,
      attributeList,
      attributeList,
      (error: Error, signupResult: ISignUpResult) => {
        if (error) {
          const signupFailureResponse = {
            error: error,
          };

          // TODO エラー内容が既にemailが登録されている等だった場合は検証コードを再送するのが良いかも
          this.dispatch(signupFailureAction(signupFailureResponse));

          return error;
        }

        const signupSuccessResponse: SignupSuccessResponse = {
          email: signupResult.user.getUsername(),
        };

        this.dispatch(signupSuccessAction(signupSuccessResponse));

        return signupSuccessResponse;
      });
  }
}

const mapStateToProps: MapStateToPropsParam<{value: SignupState}, any> = (state: ReduxState) => {
  return {value: state.signup};
};

const mapDispatchToProps: MapDispatchToPropsParam<{actions: ActionDispatcher}, {}>
  = (dispatch: Dispatch<ReduxAction>) => ({actions: new ActionDispatcher(dispatch)});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
