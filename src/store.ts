import {Action, combineReducers, createStore} from "redux";
import counter, {CounterActions, CounterState} from "./counter/module";

export default createStore(
  combineReducers({
    counter,
  }),
);

export interface ReduxState {
  counter: CounterState;
}

export type ReduxAction = CounterActions | Action;
