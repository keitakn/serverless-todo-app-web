import {Action} from "redux";

/**
 * actions Enum
 */
enum ActionNames {
  POST_TODO = "POST_TODO",
  FETCH_ALL_TODO_SUCCESS = "FETCH_ALL_TODO_SUCCESS",
}

/**
 * postTodoAction IF
 */
interface PostTodoAction extends Action {
  type: ActionNames.POST_TODO;
  payload: {
    title: string;
  },
  meta: {
    loading: true;
  },
  error: false;
}

/**
 * TODO作成のリクエスト型
 * @todo このIFはドメイン層的な場所を作ってそっちに移す
 */
export interface ICreateTodoRequest {
  title: string;
}

/**
 * TODOの作成リクエスト送信時に実行されるaction
 *
 * @param {ICreateTodoRequest} request
 * @returns {PostTodoAction}
 */
export const postTodoAction = (request: ICreateTodoRequest): PostTodoAction => ({
  type: ActionNames.POST_TODO,
  payload: {
    title: request.title,
  },
  meta: {
    loading: true,
  },
  error: false,
});

/**
 * TODOのデータ型
 * @todo このIFはドメイン層的な場所を作ってそっちに移す
 */
export interface ITodoEntity {
  id: number;
  title: string;
}

/**
 * fetchAllTodoSuccessAction IF
 */
interface FetchAllTodoSuccessAction extends Action {
  type: ActionNames.FETCH_ALL_TODO_SUCCESS;
  payload: {
    todoList: [{id: number, title: string}];
  },
  meta: {
    loading: false;
  },
  error: false;
}

/**
 * 全てのTODOの取得が成功した際に実行されるaction
 *
 * @param {[ITodoEntity]} todoList
 * @returns {FetchAllTodoSuccessAction}
 */
export const fetchAllTodoSuccessAction = (todoList: [ITodoEntity]): FetchAllTodoSuccessAction => ({
  type: ActionNames.FETCH_ALL_TODO_SUCCESS,
  payload: {
    todoList: todoList,
  },
  meta: {
    loading: false,
  },
  error: false,
});

/**
 * TodoState IF
 */
export interface TodoState {
  currentTodo: ITodoEntity,
  todoList: [ITodoEntity];
  loading: boolean;
  isError: boolean;
  errors: {message: string};
}

export type TodoActions = PostTodoAction | FetchAllTodoSuccessAction;

const initialState: TodoState = {
  currentTodo: {
    id: 0,
    title: "",
  },
  todoList: [{id: 0, title: ""}],
  loading: false,
  isError: false,
  errors: {
    message: "",
  },
};

/**
 * reducer
 *
 * @param {TodoState} state
 * @param {TodoActions} action
 * @returns {TodoState}
 */
export default function reducer(state: TodoState = initialState, action: TodoActions): TodoState {
  switch (action.type) {
    case ActionNames.POST_TODO:
      return Object.assign(
        {},
        state,
        {
          currentTodo: action.payload.title,
          loading: action.meta.loading,
          isError: action.error,
        }
      );
    case ActionNames.FETCH_ALL_TODO_SUCCESS:
      return Object.assign(
        {},
        state,
        {
          todoList: action.payload.todoList,
          loading: action.meta.loading,
          isError: action.error,
        }
      );
    default:
      return state;
  }
}
