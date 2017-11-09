import { Action } from 'redux';
import { UserService } from '../../domain/UserService';
import ISignupFailureResponse = UserService.ISignupFailureResponse;
import ISignupRequest = UserService.ISignupRequest;
import ISignupSuccessResponse = UserService.ISignupSuccessResponse;

/**
 * actions Enum
 */
enum ActionNames {
  POST_SIGNUP_REQUEST = 'POST_SIGNUP_REQUEST',
  SIGNUP_SUCCESS = 'SIGNUP_SUCCESS',
  SIGNUP_FAILURE = 'SIGNUP_FAILURE',
  POST_SIGNUP_COMPLETE_REQUEST = 'POST_SIGNUP_COMPLETE_REQUEST',
  SIGNUP_COMPLETE_SUCCESS = 'SIGNUP_COMPLETE_SUCCESS',
  SIGNUP_COMPLETE_FAILURE = 'SIGNUP_COMPLETE_FAILURE',
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
  };
  meta: {
    loading: true;
    signupCompleted: false;
  };
  error: false;
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
  };
  meta: {
    loading: false;
    signupCompleted: true;
  };
  error: false;
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
  };
  error: true;
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
 * postSignupCompleteRequestAction IF
 */
interface IPostSignupCompleteRequestAction {
  type: ActionNames.POST_SIGNUP_COMPLETE_REQUEST;
  payload: {
    email: string;
    verificationCode: string;
  };
  meta: {
    loading: true;
    userConfirmed: false;
  };
  error: false;
}

/**
 * サインアップ完了Request 引数IF
 */
export interface ISignupCompleteRequest {
  email: string;
  verificationCode: string;
}

/**
 * サインアップ完了のRequest送信時に実行されるaction
 *
 * @param {ISignupCompleteRequest} request
 * @returns {IPostSignupCompleteRequestAction}
 */
export const postSignupCompleteRequestAction = (
  request: ISignupCompleteRequest,
): IPostSignupCompleteRequestAction => ({
  type: ActionNames.POST_SIGNUP_COMPLETE_REQUEST,
  payload: {
    email: request.email,
    verificationCode: request.verificationCode,
  },
  meta: {
    loading: true,
    userConfirmed: false,
  },
  error: false,
});

/**
 * signupCompleteSuccess IF
 */
interface ISignupCompleteSuccessAction {
  type: ActionNames.SIGNUP_COMPLETE_SUCCESS;
  payload: {};
  meta: {
    loading: false;
    userConfirmed: true;
  };
  error: false;
}

/**
 * サインアップ完了成功時に実行されるaction
 *
 * @returns {ISignupCompleteSuccessAction}
 */
export const signupCompleteSuccess = (): ISignupCompleteSuccessAction => ({
  type: ActionNames.SIGNUP_COMPLETE_SUCCESS,
  payload: {},
  meta: {
    loading: false,
    userConfirmed: true,
  },
  error: false,
});

/**
 * signupCompleteFailureAction IF
 */
interface ISignupCompleteFailureAction {
  type: ActionNames.SIGNUP_COMPLETE_FAILURE;
  payload: Error;
  meta: {
    loading: false;
  };
  error: true;
}

/**
 * signupCompleteFailureAction 引数IF
 */
export interface ISignupCompleteFailureResponse {
  error: Error;
}

/**
 * サインアップ完了失敗時に呼ばれるaction
 *
 * @param {ISignupCompleteFailureResponse} response
 * @returns {ISignupCompleteFailureAction}
 */
export const signupCompleteFailureAction = (
  response: ISignupCompleteFailureResponse,
): ISignupCompleteFailureAction => ({
  type: ActionNames.SIGNUP_COMPLETE_FAILURE,
  payload: response.error,
  meta: {
    loading: false,
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
  userConfirmed: boolean;
  isError: boolean;
  errors: {message: string};
}

export type SignupActions =
  IPostSignupRequestAction |
  ISignupSuccessAction |
  ISignupFailureAction |
  IPostSignupCompleteRequestAction |
  ISignupCompleteSuccessAction |
  ISignupCompleteFailureAction;

const initialState: ISignupState = {
  email: '',
  password: '',
  gender: '',
  birthdate: '1999-01-01',
  loading: false,
  signupCompleted: false,
  userConfirmed: false,
  isError: false,
  errors: {
    message: '',
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
      return {
        ...state,
        email: action.payload.email,
        password: action.payload.password,
        gender: action.payload.gender,
        birthdate: action.payload.birthdate,
        loading: action.meta.loading,
        signupCompleted: action.meta.signupCompleted,
        isError: action.error,
      };
    case ActionNames.SIGNUP_SUCCESS:
      return {
        ...state,
        email: action.payload.email,
        loading: action.meta.loading,
        signupCompleted: action.meta.signupCompleted,
        isError: action.error,
      };
    case ActionNames.SIGNUP_FAILURE:
      return {
        ...state,
        loading: action.meta.loading,
        signupCompleted: action.meta.signupCompleted,
        isError: action.error,
        errors: {
          message: action.payload.message,
        },
      };
    case ActionNames.SIGNUP_COMPLETE_SUCCESS:
      return {
        ...state,
        loading: action.meta.loading,
        userConfirmed: action.meta.userConfirmed,
        isError: action.error,
      };
    case ActionNames.SIGNUP_COMPLETE_FAILURE:
      return {
        ...state,
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
