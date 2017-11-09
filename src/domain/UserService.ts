import { CognitoUserAttribute, CognitoUserPool, ISignUpResult } from 'amazon-cognito-identity-js';
import { AppConfig } from '../AppConfig';
import getCognitoUserPoolClientId = AppConfig.getCognitoUserPoolClientId;
import getCognitoUserPoolId = AppConfig.getCognitoUserPoolId;

/**
 * UserService
 *
 * @author keita-koga
 * @since 2017-11-10
 */
export namespace UserService {

  /**
   * Signupリクエスト型
   */
  export interface ISignupRequest {
    email: string;
    password: string;
    gender: string;
    birthdate: string;
  }

  /**
   * Signup成功時のレスポンス型
   */
  export interface ISignupSuccessResponse {
    email: string;
  }

  /**
   * Signup失敗時のレスポンス型
   */
  export interface ISignupFailureResponse {
    error: Error;
  }

  /**
   * サインアップを行う
   *
   * @param {UserService.ISignupRequest} request
   * @returns {Promise<ISignupSuccessResponse>}
   */
  export const signup = (request: ISignupRequest) => {
    return new Promise<ISignupSuccessResponse>((resolve, reject) => {
      const poolData = {
        UserPoolId: getCognitoUserPoolId(),
        ClientId: getCognitoUserPoolClientId(),
      };
      const cognitoUserPool = new CognitoUserPool(poolData);

      const dataEmail = {
        Name: 'email',
        Value: request.email,
      };

      const dataGender = {
        Name: 'gender',
        Value: request.gender,
      };

      const dataBirthdate = {
        Name: 'birthdate',
        Value: request.birthdate,
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
        request.password,
        attributeList,
        attributeList,
        (error: Error, signupResult: ISignUpResult) => {
          if (error != null) {
            // TODO エラー内容が既にemailが登録されている等だった場合は検証コードを再送するのが良いかも
            return reject({ error });
          }

          return resolve({ email: signupResult.user.getUsername() });
        });
    });
  };
}
