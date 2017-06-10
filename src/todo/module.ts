import {Action} from "redux";

const ADD_NAME      = "todo/add";
const FIND_ALL_NAME = "todo/find/all";
type ADD_TYPE       = typeof ADD_NAME;
type FIND_ALL_TYPE  = typeof FIND_ALL_NAME;

interface AddAction extends Action {
  type: ADD_TYPE;
  title: string;
}
export const addAction = (title: string): AddAction => ({
  type: ADD_NAME,
  title,
});

interface FindAllAction extends Action {
  type: FIND_ALL_TYPE;
  list: [{id: number, title: string}];
}
export const findAllAction = (list: [{id: number, title: string}]): FindAllAction => ({
  type: FIND_ALL_NAME,
  list,
});

export interface TodoState {
  title: string;
  list: [{id: number, title: string}];
}

export type TodoActions = AddAction | FindAllAction;

// TODO initialStateに関してはもっと良い取得方法を検討する
const initialState: TodoState = {
  title: "",
  list: [{id: 0, title: "サンプル"}],
};

export default function reducer(state: TodoState = initialState, action: TodoActions): TodoState {
  switch (action.type) {
    case ADD_NAME:
      return Object.assign({}, state, {title: action.title});
    case FIND_ALL_NAME:
      return Object.assign({}, state, {list: action.list});
    default:
      return state;
  }
}
