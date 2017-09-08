import {Action, combineReducers, createStore} from "redux";
import counter, {CounterActions, CounterState} from "./pages/counter/module";
import todo, {TodoActions, ITodoState} from "./pages/todo/module";
import signup, {SignupActions, ISignupState} from "./pages/signup/module";

export default createStore(
  combineReducers({
    counter,
    todo,
    signup,
  }),
);

export interface IReduxState {
  counter: CounterState;
  todo: ITodoState;
  signup: ISignupState;
}

export type ReduxAction = CounterActions | TodoActions | SignupActions | Action;
