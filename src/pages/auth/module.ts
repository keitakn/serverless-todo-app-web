import { Action } from 'redux';

/**
 * actions Enum
 */
enum ActionNames {
  IS_LOGGED_IN_START = 'IS_LOGGED_IN_START',
  IS_LOGGED_IN_TRUE  = 'IS_LOGGED_IN_TRUE',
  IS_LOGGED_IN_FALSE = 'IS_LOGGED_IN_FALSE',
}

/**
 * isLoggedInStartAction IF
 */
interface IIsLoggedInStartAction extends Action {
  type: ActionNames.IS_LOGGED_IN_START;
  payload: {};
  meta: {
    loading: true;
  };
  error: false;
}

/**
 * ログイン状態の確認が開始された際に実行されるaction
 * ログイン状態の確認が必要なページでは必ず最初に実行される
 *
 * @returns {IIsLoggedInStartAction}
 */
export const isLoggedInStartAction = (): IIsLoggedInStartAction => ({
  type: ActionNames.IS_LOGGED_IN_START,
  payload: {},
  meta: {
    loading: true,
  },
  error: false,
});

/**
 * isLoggedInTrueAction IF
 */
interface IIsLoggedInTrueAction {
  type: ActionNames.IS_LOGGED_IN_TRUE;
  payload: {
    isLoggedIn: true;
  };
  meta: {
    loading: false;
  };
  error: false;
}

/**
 * ログイン状態が有効な時に実行されるaction
 *
 * @returns {IIsLoggedInTrueAction}
 */
export const isLoggedInTrueAction = (): IIsLoggedInTrueAction => ({
  type: ActionNames.IS_LOGGED_IN_TRUE,
  payload: {
    isLoggedIn: true,
  },
  meta: {
    loading: false,
  },
  error: false,
});

/**
 * isLoggedInFalseAction IF
 */
interface IIsLoggedInFalseAction {
  type: ActionNames.IS_LOGGED_IN_FALSE;
  payload: {
    isLoggedIn: false;
  };
  meta: {
    loading: false;
  };
  error: false;
}

/**
 * ログイン状態が無効な時に実行されるaction
 *
 * @returns {IIsLoggedInFalseAction}
 */
export const isLoggedInFalseAction = (): IIsLoggedInFalseAction => ({
  type: ActionNames.IS_LOGGED_IN_FALSE,
  payload: {
    isLoggedIn: false,
  },
  meta: {
    loading: false,
  },
  error: false,
});

/**
 * AuthState IF
 */
export interface IAuthState {
  isLoggedIn: boolean;
  loading: boolean;
  isError: boolean;
  errors: {message: string};
}

export type AuthActions = IIsLoggedInStartAction | IIsLoggedInTrueAction | IIsLoggedInFalseAction;

const initialState: IAuthState = {
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
 * @param {IAuthState} state
 * @param {AuthActions} action
 * @returns {IAuthState}
 */
export default function reducer(state: IAuthState = initialState, action: AuthActions): IAuthState {
  switch (action.type) {
    case ActionNames.IS_LOGGED_IN_START:
      return {
        ...state,
        loading: action.meta.loading,
        isError: action.error,
      };
    case ActionNames.IS_LOGGED_IN_TRUE:
      return {
        ...state,
        isLoggedIn: action.payload.isLoggedIn,
        loading: action.meta.loading,
        isError: action.error,
      };
    case ActionNames.IS_LOGGED_IN_FALSE:
      return {
        ...state,
        isLoggedIn: action.payload.isLoggedIn,
        loading: action.meta.loading,
        isError: action.error,
      };
    default:
      return state;
  }
}
