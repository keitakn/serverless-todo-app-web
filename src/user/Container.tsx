import {connect, MapDispatchToPropsParam, MapStateToPropsParam} from "react-redux";
import {Dispatch} from "redux";
import {ReduxAction, ReduxState} from "../store";
import {postSignUpRequestAction, SignUpRequest, signUpSuccessAction, SignUpSuccessResponse, UserState} from "./module";
import User from "./User";
import {CognitoUserPool, CognitoUserAttribute, ISignUpResult} from "amazon-cognito-identity-js";
import {AppConfig} from "../AppConfig";
import getCognitoUserPoolClientId = AppConfig.getCognitoUserPoolClientId;
import getCognitoUserPoolId = AppConfig.getCognitoUserPoolId;

export class ActionDispatcher {
  constructor(private dispatch: (action: ReduxAction) => void) {}

  public async postSignUp(signUpRequest: SignUpRequest) {
    this.dispatch(postSignUpRequestAction(signUpRequest));

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
      (error: Error, signUpResult: ISignUpResult) => {
        if (error) {
          return error;
        }

        const signUpSuccessResponse: SignUpSuccessResponse = {
          email: signUpResult.user.getUsername(),
          signUpCompleted: true,
        };

        this.dispatch(signUpSuccessAction(signUpSuccessResponse));

        return signUpSuccessResponse;
      });
  }
}

const mapStateToProps: MapStateToPropsParam<{value: UserState}, any> = (state: ReduxState) => {
  return {value: state.user};
};

const mapDispatchToProps: MapDispatchToPropsParam<{actions: ActionDispatcher}, {}>
  = (dispatch: Dispatch<ReduxAction>) => ({actions: new ActionDispatcher(dispatch)});

export default connect(mapStateToProps, mapDispatchToProps)(User);
