/**
 * AppConfig
 * アプリケーションに必要で.env等で管理する値はここで管理する
 *
 * @author keita-nishimoto
 * @since 2017-08-30
 */
export namespace AppConfig {

  /**
   * 自身のURIを取得する
   *
   * @returns {string}
   */
  export const getAppUri = () => {
    const appUri = process.env.APP_URI;

    return typeof appUri === "string" ? appUri : "";
  };

  /**
   * Cognito UserPoolのIDを取得する
   *
   * @returns {string}
   */
  export const getCognitoUserPoolId = (): string => {
    const cognitoUserPoolId = process.env.COGNITO_USER_POOL_ID;

    return typeof cognitoUserPoolId === 'string' ? cognitoUserPoolId : '';
  };

  /**
   * Cognito UserPoolのクライアントIDを取得する
   *
   * @returns {string}
   */
  export const getCognitoUserPoolClientId = (): string => {
    const cognitoUserPoolClientId = process.env.COGNITO_USER_POOL_CLIENT_ID;

    return typeof cognitoUserPoolClientId === 'string' ? cognitoUserPoolClientId : '';
  };
}
