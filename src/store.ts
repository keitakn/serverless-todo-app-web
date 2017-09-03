import {Action, combineReducers, createStore} from "redux";
import counter, {CounterActions, CounterState} from "./pages/counter/module";
import todo, {TodoActions, TodoState} from "./pages/todo/module";
import user, {UserActions, UserState} from "./pages/user/module";

export default createStore(
  combineReducers({
    counter,
    todo,
    user,
  }),
);

export interface ReduxState {
  counter: CounterState;
  todo: TodoState;
  user: UserState;
}

export type ReduxAction = CounterActions | TodoActions | UserActions | Action;
