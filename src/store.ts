import {Action, combineReducers, createStore} from "redux";
import counter, {CounterActions, CounterState} from "./pages/counter/module";
import todo, {TodoActions, TodoState} from "./pages/todo/module";
import signup, {SignupActions, SignupState} from "./pages/signup/module";

export default createStore(
  combineReducers({
    counter,
    todo,
    signup,
  }),
);

export interface ReduxState {
  counter: CounterState;
  todo: TodoState;
  signup: SignupState;
}

export type ReduxAction = CounterActions | TodoActions | SignupActions | Action;
