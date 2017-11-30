import { Action } from 'redux';
import { TodoService } from '../../domain/TodoService';
import ICreateTodoRequest = TodoService.ICreateTodoRequest;
import ITodoEntity = TodoService.ITodoEntity;

/**
 * actions Enum
 */
enum ActionNames {
  POST_TODO = 'POST_TODO',
  FETCH_ALL_TODO_SUCCESS = 'FETCH_ALL_TODO_SUCCESS',
}

/**
 * postTodoAction IF
 */
interface IPostTodoAction extends Action {
  type: ActionNames.POST_TODO;
  payload: {
    title: string;
  };
  meta: {
    loading: true;
  };
  error: false;
}

/**
 * TODOの作成リクエスト送信時に実行されるaction
 *
 * @param {ICreateTodoRequest} request
 * @returns {IPostTodoAction}
 */
export const postTodoAction = (request: ICreateTodoRequest): IPostTodoAction => ({
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
 * fetchAllTodoSuccessAction IF
 */
interface IFetchAllTodoSuccessAction extends Action {
  type: ActionNames.FETCH_ALL_TODO_SUCCESS;
  payload: {
    todoList: [ITodoEntity];
  };
  meta: {
    loading: false;
  };
  error: false;
}

/**
 * 全てのTODOの取得が成功した際に実行されるaction
 *
 * @param {[ITodoEntity]} todoList
 * @returns {IFetchAllTodoSuccessAction}
 */
export const fetchAllTodoSuccessAction = (todoList: [ITodoEntity]): IFetchAllTodoSuccessAction => ({
  type: ActionNames.FETCH_ALL_TODO_SUCCESS,
  payload: {
    todoList,
  },
  meta: {
    loading: false,
  },
  error: false,
});

/**
 * ITodoState IF
 */
export interface ITodoState {
  currentTodo: {
    id: string;
    title: string;
    isCompleted: boolean;
    createdAt: string;
    updatedAt: string;
  };
  todoList: [ITodoEntity];
  loading: boolean;
  isError: boolean;
  errors: {message: string};
}

export type TodoActions = IPostTodoAction | IFetchAllTodoSuccessAction;

const initialState: ITodoState = {
  currentTodo: {
    id: '',
    title: '',
    isCompleted: false,
    createdAt: '',
    updatedAt: '',
  },
  todoList: [{ id: '', title: '', isCompleted: false, createdAt: '', updatedAt: '' }],
  loading: false,
  isError: false,
  errors: {
    message: '',
  },
};

/**
 * reducer
 *
 * @param {ITodoState} state
 * @param {TodoActions} action
 * @returns {ITodoState}
 */
export default function reducer(state: ITodoState = initialState, action: TodoActions): ITodoState {
  switch (action.type) {
    case ActionNames.POST_TODO:
      return {
        ...state,
        currentTodo: {
          id: state.currentTodo.id,
          title: action.payload.title,
          isCompleted: state.currentTodo.isCompleted,
          createdAt: state.currentTodo.createdAt,
          updatedAt: state.currentTodo.updatedAt,
        },
        loading: action.meta.loading,
        isError: action.error,
      };
    case ActionNames.FETCH_ALL_TODO_SUCCESS:
      return {
        ...state,
        todoList: action.payload.todoList,
        loading: action.meta.loading,
        isError: action.error,
      };
    default:
      return state;
  }
}
