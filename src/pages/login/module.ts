import { Action } from 'redux';
import { LoginDomains } from '../../domain/LoginDomains';
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
 * @param {LoginDomains.ILoginRequest} request
 * @returns {IPostLoginRequestAction}
 */
export const postLoginRequestAction = (request: LoginDomains.ILoginRequest): IPostLoginRequestAction => ({
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
 * ログイン成功時に呼ばれるaction
 *
 * @param {"amazon-cognito-identity-js".CognitoUserSession} session
 * @returns {ILoginSuccessAction}
 */
export const loginSuccessAction = (session: CognitoUserSession): ILoginSuccessAction => ({
  type: ActionNames.LOGIN_SUCCESS,
  payload: {
    session,
    isLoggedIn: true,
  },
  meta: {
    loading: false,
  },
  error: false,
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

export type LoginActions = IPostLoginRequestAction | ILoginSuccessAction;

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
    default:
      return state;
  }
}
