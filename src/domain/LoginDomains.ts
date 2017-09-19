import {
  CognitoUser,
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUserSession,
} from 'amazon-cognito-identity-js';
import { AppConfig } from '../AppConfig';
import getCognitoUserPoolClientId = AppConfig.getCognitoUserPoolClientId;
import getCognitoUserPoolId = AppConfig.getCognitoUserPoolId;
import getAppUri = AppConfig.getAppUri;

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
        },
      );
    });
  };

  /**
   * ログイン状態か確認する
   *
   * @returns {Promise<boolean>}
   */
  export const isLoggedIn = async (): Promise<boolean> => {
    try {
      const session = await fetchSession();

      return Promise.resolve(
        session.isValid(),
      );
    } catch (error) {
      return Promise.resolve(false);
    }
  };

  /**
   * CognitoUserSessionを取得する
   *
   * @returns {Promise<CognitoUserSession>}
   */
  export const fetchSession = async (): Promise<CognitoUserSession> => {
    return new Promise<CognitoUserSession>((resolve, reject) => {
      const poolData = {
        UserPoolId: getCognitoUserPoolId(),
        ClientId: getCognitoUserPoolClientId(),
      };
      const cognitoUserPool = new CognitoUserPool(poolData);

      const cognitoUser = cognitoUserPool.getCurrentUser();

      if (cognitoUser == null) {
        return reject(
          new Error('user dose not exist'),
        );
      }

      cognitoUser.getSession((error: Error, session: CognitoUserSession) => {
        if (error) {
          return reject(error);
        }

        return resolve(session);
      });
    });
  };

  /**
   * ログイン後のリダイレクト処理
   *
   * @returns {string}
   */
  export const redirectAfterLoginSuccessful = () => {
    return location.href = `${getAppUri()}/todo`;
  };
}
