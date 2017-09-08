import {Action} from "redux";

/**
 * actions Enum
 */
enum ActionNames {
  POST_SIGNUP_REQUEST = "POST_SIGNUP_REQUEST",
  SIGNUP_SUCCESS = "SIGNUP_SUCCESS",
  SIGNUP_FAILURE = "SIGNUP_FAILURE",
}

/**
 * postSignupRequestAction IF
 */
interface IPostSignupRequestAction extends Action {
  type: ActionNames.POST_SIGNUP_REQUEST;
  payload: {
    email: string;
    password: string;
    gender: string;
    birthdate: string;
  },
  meta: {
    loading: true;
    signupCompleted: false;
  },
  error: false;
}

/**
 * postSignupRequestAction引数データ型
 */
export interface ISignupRequest {
  email: string;
  password: string;
  gender: string;
  birthdate: string;
}

/**
 * サインアップのリクエストが送信された時に実行されるaction
 *
 * @param {ISignupRequest} request
 * @returns {IPostSignupRequestAction}
 */
export const postSignupRequestAction = (request: ISignupRequest): IPostSignupRequestAction => ({
  type: ActionNames.POST_SIGNUP_REQUEST,
  payload: {
    email: request.email,
    password: request.password,
    gender: request.gender,
    birthdate: request.birthdate,
  },
  meta: {
    loading: true,
    signupCompleted: false,
  },
  error: false,
});

/**
 * signupSuccessAction IF
 */
interface ISignupSuccessAction extends Action {
  type: ActionNames.SIGNUP_SUCCESS;
  payload: {
    email: string;
  },
  meta: {
    loading: false;
    signupCompleted: true;
  },
  error: false;
}

/**
 * signupSuccessAction 引数IF
 */
export interface ISignupSuccessResponse {
  email: string;
}

/**
 * サインアップが正常終了した時に実行されるaction
 *
 * @param {ISignupSuccessResponse} response
 * @returns {ISignupSuccessAction}
 */
export const signupSuccessAction = (response: ISignupSuccessResponse): ISignupSuccessAction => ({
  type: ActionNames.SIGNUP_SUCCESS,
  payload: {
    email: response.email,
  },
  meta: {
    loading: false,
    signupCompleted: true,
  },
  error: false,
});

/**
 * signupFailureAction IF
 */
interface ISignupFailureAction extends Action {
  type: ActionNames.SIGNUP_FAILURE;
  payload: Error;
  meta: {
    loading: false;
    signupCompleted: false;
  },
  error: true;
}

/**
 * signupFailureAction 引数IF
 */
export interface ISignupFailureResponse {
  error: Error;
}

/**
 * サインアップが異常終了した時に実行されるaction
 *
 * @param {ISignupFailureResponse} response
 * @returns {ISignupFailureAction}
 */
export const signupFailureAction = (response: ISignupFailureResponse): ISignupFailureAction => ({
  type: ActionNames.SIGNUP_FAILURE,
  payload: response.error,
  meta: {
    loading: false,
    signupCompleted: false,
  },
  error: true,
});

/**
 * ISignupState IF
 */
export interface ISignupState {
  email: string;
  password: string;
  gender: string;
  birthdate: string;
  loading: boolean;
  signupCompleted: boolean;
  isError: boolean;
  errors: {message: string};
}

export type SignupActions = IPostSignupRequestAction | ISignupSuccessAction | ISignupFailureAction;

const initialState: ISignupState = {
  email: "",
  password: "",
  gender: "",
  birthdate: "1999-01-01",
  loading: false,
  signupCompleted: false,
  isError: false,
  errors: {
    message: "",
  },
};

/**
 * reducer
 *
 * @param {ISignupState} state
 * @param {SignupActions} action
 * @returns {ISignupState}
 */
export default function reducer(state: ISignupState = initialState, action: SignupActions): ISignupState {
  switch (action.type) {
    case ActionNames.POST_SIGNUP_REQUEST:
      return Object.assign(
        {},
        state,
        {
          email: action.payload.email,
          password: action.payload.password,
          gender: action.payload.gender,
          birthdate: action.payload.birthdate,
          loading: action.meta.loading,
          signupCompleted: action.meta.signupCompleted,
          isError: action.error,
        },
      );
    case ActionNames.SIGNUP_SUCCESS:
      return Object.assign(
        {},
        state,
        {
          email: action.payload.email,
          loading: action.meta.loading,
          signupCompleted: action.meta.signupCompleted,
          isError: action.error,
        },
      );
    case ActionNames.SIGNUP_FAILURE:
      return Object.assign(
        {},
        state,
        {
          loading: action.meta.loading,
          signupCompleted: action.meta.signupCompleted,
          isError: action.error,
          errors: {
            message: action.payload.message,
          },
        },
      );
    default:
      return state;
  }
}
