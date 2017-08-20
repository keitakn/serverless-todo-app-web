import {Action} from "redux";

enum ActionNames {
  POST_SIGN_UP_REQUEST = "user/post_sign_up_request",
}

interface PostSignUpRequestAction extends Action {
  type: ActionNames.POST_SIGN_UP_REQUEST;
  email: string;
  gender: string;
  birthdate: string;
}
export interface SignUpRequest {
  email: string;
  gender: string;
  birthdate: string;
}
export const postSignUpRequestAction = (signUpRequest: SignUpRequest): PostSignUpRequestAction => ({
  type: ActionNames.POST_SIGN_UP_REQUEST,
  email: signUpRequest.email,
  gender: signUpRequest.gender,
  birthdate: signUpRequest.birthdate,
});

export interface UserState {
  email: string;
  gender: string;
  birthdate: string;
}

export type UserActions = PostSignUpRequestAction;

const initialState: UserState = {
  email: "",
  gender: "",
  birthdate: "1999-01-01",
};

export default function reducer(state: UserState = initialState, action: UserActions): UserState {
  switch (action.type) {
    case ActionNames.POST_SIGN_UP_REQUEST:
      return Object.assign(
        {},
        state,
        {email: action.email, gender: action.gender, birthdate: action.birthdate},
      );
    default:
      return state;
  }
}