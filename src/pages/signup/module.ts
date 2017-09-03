import {Action} from "redux";

enum ActionNames {
  POST_SIGNUP_REQUEST = "signup/post_signup_request",
  SIGNUP_SUCCESS = "signup/signup_success",
  SIGNUP_FAILURE = "signup/signup_failure",
}

interface PostSignupRequestAction extends Action {
  type: ActionNames.POST_SIGNUP_REQUEST;
  email: string;
  password: string;
  gender: string;
  birthdate: string;
}
export interface SignupRequest {
  email: string;
  password: string;
  gender: string;
  birthdate: string;
}
export const postSignupRequestAction = (request: SignupRequest): PostSignupRequestAction => ({
  type: ActionNames.POST_SIGNUP_REQUEST,
  email: request.email,
  password: request.password,
  gender: request.gender,
  birthdate: request.birthdate,
});

interface SignupSuccessAction extends Action {
  type: ActionNames.SIGNUP_SUCCESS;
  email: string;
  signupCompleted: true;
}
export interface SignupSuccessResponse {
  email: string;
  signupCompleted: true;
}

export const signupSuccessAction = (response: SignupSuccessResponse): SignupSuccessAction => ({
  type: ActionNames.SIGNUP_SUCCESS,
  email: response.email,
  signupCompleted: response.signupCompleted,
});

interface SignupFailureAction extends Action {
  type: ActionNames.SIGNUP_FAILURE;
  error: true;
  errors: {
    message: string;
  },
}
export interface SignupFailureResponse {
  errors: {
    message: string;
  },
}

export const signupFailureAction = (response: SignupFailureResponse): SignupFailureAction => ({
  type: ActionNames.SIGNUP_FAILURE,
  error: true,
  errors: {
    message: response.errors.message,
  },
});

export interface SignupState {
  email: string;
  password: string;
  gender: string;
  birthdate: string;
  signupCompleted: boolean;
  error: boolean;
  errors: {
    message: string;
  },
}

export type SignupActions = PostSignupRequestAction | SignupSuccessAction | SignupFailureAction;

const initialState: SignupState = {
  email: "",
  password: "",
  gender: "",
  birthdate: "1999-01-01",
  signupCompleted: false,
  error: false,
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
        {email: action.email, password: action.password, gender: action.gender, birthdate: action.birthdate},
      );
    case ActionNames.SIGNUP_SUCCESS:
      return Object.assign(
        {},
        state,
        {email: action.email, signupCompleted: action.signupCompleted},
      );
    case ActionNames.SIGNUP_FAILURE:
      return Object.assign(
        {},
        state,
        {error: action.error, errors: action.errors},
      );
    default:
      return state;
  }
}
