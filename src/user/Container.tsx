import {connect, MapDispatchToPropsParam, MapStateToPropsParam} from "react-redux";
import {Dispatch} from "redux";
import {ReduxAction, ReduxState} from "../store";
import {postSignUpRequestAction, SignUpRequest, UserState} from "./module";
import User from "./User";

export class ActionDispatcher {
  constructor(private dispatch: (action: ReduxAction) => void) {}

  public async postSignUp(signUpRequest: SignUpRequest) {
    this.dispatch(postSignUpRequestAction(signUpRequest));
  }
}

const mapStateToProps: MapStateToPropsParam<{value: UserState}, any> = (state: ReduxState) => {
  return {value: state.user};
};

const mapDispatchToProps: MapDispatchToPropsParam<{actions: ActionDispatcher}, {}>
  = (dispatch: Dispatch<ReduxAction>) => ({actions: new ActionDispatcher(dispatch)});

export default connect(mapStateToProps, mapDispatchToProps)(User);
