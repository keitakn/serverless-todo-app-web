import {Action} from "redux";

enum ActionNames {
  POST_TODO = "todo/increment",
  FETCH_ALL_TODO = "todo/fetch_all_todo",
}

interface AddTodoAction extends Action {
  type: ActionNames.POST_TODO;
  title: string;
}
export const addTodoAction = (title: string): AddTodoAction => ({
  type: ActionNames.POST_TODO,
  title,
});

interface FetchAllTodoAction extends Action {
  type: ActionNames.FETCH_ALL_TODO;
  list: [{id: number, title: string}];
}
export const fetchAllTodoAction = (list: [{id: number, title: string}]): FetchAllTodoAction => ({
  type: ActionNames.FETCH_ALL_TODO,
  list,
});

export interface TodoState {
  title: string;
  list: [{id: number, title: string}];
}

export type TodoActions = AddTodoAction | FetchAllTodoAction;

// TODO initialStateに関してはもっと良い取得方法を検討する
const initialState: TodoState = {
  title: "",
  list: [{id: 0, title: "サンプル"}],
};

export default function reducer(state: TodoState = initialState, action: TodoActions): TodoState {
  switch (action.type) {
    case ActionNames.POST_TODO:
      return Object.assign({}, state, {title: action.title});
    case ActionNames.FETCH_ALL_TODO:
      return Object.assign({}, state, {list: action.list});
    default:
      return state;
  }
}
