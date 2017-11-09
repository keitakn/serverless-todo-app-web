import { Action } from 'redux';
import { LoginService } from '../../domain/LoginService';
import { CognitoUserSession } from 'amazon-cognito-identity-js';

/**
 * actions Enum
 */
enum ActionNames {
  POST_LOGIN_REQUEST = 'POST_LOGIN_REQUEST',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAILURE = 'LOGIN_FAILURE',
}

/**
 * postLoginRequestAction IF
 */
interface IPostLoginRequestAction extends Action {
  type: ActionNames.POST_LOGIN_REQUEST;
  payload: {
    email: string;
    password: string;
  };
  meta: {
    loading: true;
  };
  error: false;
}

/**
 * ログインRequestの送信時に実行されるaction
 *
 * @param {LoginService.ILoginRequest} request
 * @returns {IPostLoginRequestAction}
 */
export const postLoginRequestAction = (request: LoginService.ILoginRequest): IPostLoginRequestAction => ({
  type: ActionNames.POST_LOGIN_REQUEST,
  payload: {
    email: request.email,
    password: request.password,
  },
  meta: {
    loading: true,
  },
  error: false,
});

/**
 * loginSuccessAction IF
 */
interface ILoginSuccessAction {
  type: ActionNames.LOGIN_SUCCESS;
  payload: {
    session: CognitoUserSession;
    isLoggedIn: true;
  };
  meta: {
    loading: false;
  };
  error: false;
}

/**
 * ログイン成功時のResponse
 */
interface ILoginSuccessResponse {
  session: CognitoUserSession;
}

/**
 * ログイン成功時に呼ばれるaction
 *
 * @param {ILoginSuccessResponse} response
 * @returns {ILoginSuccessAction}
 */
export const loginSuccessAction = (response: ILoginSuccessResponse): ILoginSuccessAction => ({
  type: ActionNames.LOGIN_SUCCESS,
  payload: {
    session: response.session,
    isLoggedIn: true,
  },
  meta: {
    loading: false,
  },
  error: false,
});

/**
 * loginFailureAction IF
 */
interface ILoginFailureAction {
  type: ActionNames.LOGIN_FAILURE;
  payload: Error;
  meta: {
    email: string;
    password: string;
    isLoggedIn: false;
    loading: false;
  };
  error: true;
}

/**
 * loginFailureActionのResponseIF
 */
interface ILoginFailureResponse {
  email: string;
  password: string;
  error: Error;
}

/**
 * ログイン失敗時に実行されるaction
 *
 * @param {ILoginFailureResponse} response
 * @returns {ILoginFailureAction}
 */
export const loginFailureAction = (response: ILoginFailureResponse): ILoginFailureAction => ({
  type: ActionNames.LOGIN_FAILURE,
  payload: response.error,
  meta: {
    email: response.email,
    password: response.password,
    isLoggedIn: false,
    loading: false,
  },
  error: true,
});

/**
 * ILoginState IF
 */
export interface ILoginState {
  email: string;
  password: string;
  isLoggedIn: boolean;
  session?: CognitoUserSession;
  loading: boolean;
  isError: boolean;
  errors: {message: string};
}

export type LoginActions = IPostLoginRequestAction | ILoginSuccessAction | ILoginFailureAction;

const initialState: ILoginState = {
  email: '',
  password: '',
  isLoggedIn: false,
  loading: false,
  isError: false,
  errors: {
    message: '',
  },
};

/**
 * reducer
 *
 * @param {ILoginState} state
 * @param {LoginActions} action
 * @returns {ILoginState}
 */
export default function reducer(state: ILoginState = initialState, action: LoginActions): ILoginState {
  switch (action.type) {
    case ActionNames.POST_LOGIN_REQUEST:
      return {
        ...state,
        email: action.payload.email,
        password: action.payload.password,
        loading: action.meta.loading,
        isError: action.error,
      };
    case ActionNames.LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: action.payload.isLoggedIn,
        session: action.payload.session,
        loading: action.meta.loading,
        isError: action.error,
      };
    case ActionNames.LOGIN_FAILURE:
      return {
        ...state,
        email: action.meta.email,
        password: action.meta.password,
        isLoggedIn: action.meta.isLoggedIn,
        loading: action.meta.loading,
        isError: action.error,
        errors: {
          message: action.payload.message,
        },
      };
    default:
      return state;
  }
}
