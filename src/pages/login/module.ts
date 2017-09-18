import { Action } from 'redux';

/**
 * actions Enum
 */
enum ActionNames {
  POST_LOGIN_REQUEST = 'POST_LOGIN_REQUEST',
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
 * @param request
 * @returns {IPostLoginRequestAction}
 */
export const postLoginRequestAction = (request: any): IPostLoginRequestAction => ({
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
 * ILoginState IF
 */
export interface ILoginState {
  email: string;
  password: string;
  loading: boolean;
  isError: boolean;
  errors: {message: string};
}

export type LoginActions = IPostLoginRequestAction;

const initialState: ILoginState = {
  email: '',
  password: '',
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
    default:
      return state;
  }
}
