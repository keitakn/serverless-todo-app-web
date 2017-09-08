import {Action, combineReducers, createStore} from "redux";
import todo, {TodoActions, ITodoState} from "./pages/todo/module";
import signup, {SignupActions, ISignupState} from "./pages/signup/module";

export default createStore(
  combineReducers({
    todo,
    signup,
  }),
);

export interface IReduxState {
  todo: ITodoState;
  signup: ISignupState;
}

export type ReduxAction = TodoActions | SignupActions | Action;
