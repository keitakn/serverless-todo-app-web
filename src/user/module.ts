import {Action} from "redux";

enum ActionNames {
  POST_SIGN_UP_REQUEST = "user/post_sign_up_request",
  SIGN_UP_SUCCESS = "user/sign_up_success",
  SIGN_UP_FAILURE = "user/sign_up_failure",
}

interface PostSignUpRequestAction extends Action {
  type: ActionNames.POST_SIGN_UP_REQUEST;
  email: string;
  password: string;
  gender: string;
  birthdate: string;
}
export interface SignUpRequest {
  email: string;
  password: string;
  gender: string;
  birthdate: string;
}
export const postSignUpRequestAction = (signUpRequest: SignUpRequest): PostSignUpRequestAction => ({
  type: ActionNames.POST_SIGN_UP_REQUEST,
  email: signUpRequest.email,
  password: signUpRequest.password,
  gender: signUpRequest.gender,
  birthdate: signUpRequest.birthdate,
});

interface SignUpSuccessAction extends Action {
  type: ActionNames.SIGN_UP_SUCCESS;
  email: string;
  signUpCompleted: true;
}
export interface SignUpSuccessResponse {
  email: string;
  signUpCompleted: true;
}

export const signUpSuccessAction = (signUpSuccessResponse: SignUpSuccessResponse): SignUpSuccessAction => ({
  type: ActionNames.SIGN_UP_SUCCESS,
  email: signUpSuccessResponse.email,
  signUpCompleted: signUpSuccessResponse.signUpCompleted,
});

export interface UserState {
  email: string;
  password: string;
  gender: string;
  birthdate: string;
  signUpCompleted: boolean;
}

export type UserActions = PostSignUpRequestAction | SignUpSuccessAction;

const initialState: UserState = {
  email: "",
  password: "",
  gender: "",
  birthdate: "1999-01-01",
  signUpCompleted: false,
};

export default function reducer(state: UserState = initialState, action: UserActions): UserState {
  switch (action.type) {
    case ActionNames.POST_SIGN_UP_REQUEST:
      return Object.assign(
        {},
        state,
        {email: action.email, password: action.password, gender: action.gender, birthdate: action.birthdate},
      );
    case ActionNames.SIGN_UP_SUCCESS:
      return Object.assign(
        {},
        state,
        {email: action.email, signUpCompleted: action.signUpCompleted},
      );
    default:
      return state;
  }
}
