import {Action} from "redux";

enum ActionNames {
  INCREMENT = 'counter/increment',
  DECREMENT = 'counter/decrement',
  FETCH_START = 'counter/fetch_request_start',
  FETCH_FINISH = 'counter/fetch_request_finish'
}

interface IncrementAction extends Action {
  type: ActionNames.INCREMENT;
  plusAmount: number;
}
export const incrementAmount = (amount: number): IncrementAction => ({
  type: ActionNames.INCREMENT,
  plusAmount: amount,
});

interface DecrementAction extends Action {
  type: ActionNames.DECREMENT;
  minusAmount: number;
}
export const decrementAmount = (amount: number): DecrementAction => ({
  type: ActionNames.DECREMENT,
  minusAmount: amount,
});

interface FetchRequestStartAction extends Action {
  type: ActionNames.FETCH_START;
}
export const fetchRequestStart = (): FetchRequestStartAction => ({
  type: ActionNames.FETCH_START,
});

interface FetchRequestFinishAction extends Action {
  type: ActionNames.FETCH_FINISH;
}
export const fetchRequestFinish = (): FetchRequestFinishAction => ({
  type: ActionNames.FETCH_FINISH,
});

export interface CounterState {
  num: number;
  loadingCount: number;
}

export type CounterActions = IncrementAction
  | DecrementAction
  | FetchRequestStartAction
  | FetchRequestFinishAction;

const initialState: CounterState = {
  num: 0,
  loadingCount: 0,
};

export default function reducer(state: CounterState = initialState, action: CounterActions): CounterState {
  switch (action.type) {
    case ActionNames.INCREMENT:
      return Object.assign({}, state, {num: state.num + action.plusAmount});
    case ActionNames.DECREMENT:
      return Object.assign({}, state, {num: state.num - action.minusAmount});
    case ActionNames.FETCH_START: {
      return Object.assign({}, state, {loadingCount: state.loadingCount + 1});
    }
    case ActionNames.FETCH_FINISH: {
      return Object.assign({}, state, {loadingCount: state.loadingCount - 1});
    }
    default:
      return state;
  }
}
