import {Action} from "redux";

const ADD_NAME = "todo/add";
type ADD_TYPE = typeof ADD_NAME;

interface AddAction extends Action {
  type: ADD_TYPE;
  title: string;
}
export const addAction = (title: string): AddAction => ({
  type: ADD_NAME,
  title,
});

export interface TodoState {
  title: string;
}

export type TodoActions = AddAction;

const initialState: TodoState = {
  title: "",
};

export default function reducer(state: TodoState = initialState, action: TodoActions): TodoState {
  switch (action.type) {
    case ADD_NAME:
      return Object.assign({}, state, {string: state.title});
    default:
      return state;
  }
}
