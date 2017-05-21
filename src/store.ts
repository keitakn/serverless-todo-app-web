import {Action, combineReducers, createStore} from "redux";
import counter, {CounterActions, CounterState} from "./counter/module";
import todo, {TodoActions, TodoState} from "./todo/module";

export default createStore(
  combineReducers({
    counter,
    todo,
  }),
);

export interface ReduxState {
  counter: CounterState;
  todo: TodoState;
}

export type ReduxAction = CounterActions | TodoActions |Action;
