import {
  CognitoUser,
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUserSession
} from 'amazon-cognito-identity-js';
import { AppConfig } from '../AppConfig';
import getCognitoUserPoolClientId = AppConfig.getCognitoUserPoolClientId;
import getCognitoUserPoolId = AppConfig.getCognitoUserPoolId;

/**
 * LoginDomains
 *
 * @author keita-nishimoto
 * @since 2017-09-19
 */
export namespace LoginDomains {

  /**
   * ログイン時のリクエストIF
   */
  export interface ILoginRequest {
    email: string;
    password: string;
  }

  /**
   * ログインを行う
   *
   * @param {LoginDomains.ILoginRequest} request
   * @returns {Promise<"amazon-cognito-identity-js".CognitoUserSession>}
   */
  export const login = async (request: ILoginRequest): Promise<CognitoUserSession> => {
    return new Promise<CognitoUserSession>((resolve, reject) => {
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

      const authenticationData = {
        Username: request.email,
        Password: request.password,
      };

      const authenticationDetails = new AuthenticationDetails(authenticationData);

      cognitoUser.authenticateUser(
        authenticationDetails,
        {
          onSuccess: (session: CognitoUserSession) => {
            resolve(session);
          },
          onFailure: (error: Error) => {
            reject(error);
          },
        }
      );
    });
  };
}
