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
interface PostSignupRequestAction extends Action {
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
export interface SignupRequest {
  email: string;
  password: string;
  gender: string;
  birthdate: string;
}

/**
 * サインアップのリクエストが送信された時に実行されるaction
 *
 * @param {SignupRequest} request
 * @returns {PostSignupRequestAction}
 */
export const postSignupRequestAction = (request: SignupRequest): PostSignupRequestAction => ({
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
interface SignupSuccessAction extends Action {
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
export interface SignupSuccessResponse {
  email: string;
}

/**
 * サインアップが正常終了した時に実行されるaction
 *
 * @param {SignupSuccessResponse} response
 * @returns {SignupSuccessAction}
 */
export const signupSuccessAction = (response: SignupSuccessResponse): SignupSuccessAction => ({
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
interface SignupFailureAction extends Action {
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
export interface SignupFailureResponse {
  error: Error;
}

/**
 * サインアップが異常終了した時に実行されるaction
 *
 * @param {SignupFailureResponse} response
 * @returns {SignupFailureAction}
 */
export const signupFailureAction = (response: SignupFailureResponse): SignupFailureAction => ({
  type: ActionNames.SIGNUP_FAILURE,
  payload: response.error,
  meta: {
    loading: false,
    signupCompleted: false,
  },
  error: true,
});

/**
 * SignupState IF
 */
export interface SignupState {
  email: string;
  password: string;
  gender: string;
  birthdate: string;
  loading: boolean;
  signupCompleted: boolean;
  isError: boolean;
  errors: {message: string};
}

export type SignupActions = PostSignupRequestAction | SignupSuccessAction | SignupFailureAction;

const initialState: SignupState = {
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

export default function reducer(state: SignupState = initialState, action: SignupActions): SignupState {
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
