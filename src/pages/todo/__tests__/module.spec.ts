import reducer, { fetchAllTodoSuccessAction, ITodoEntity, ITodoState, postTodoAction } from '../module';

/**
 * TODOページのreducerテスト
 *
 * @see https://jasmine.github.io/pages/docs_home.html
 */
describe('todo reducer tests', () => {

  /**
   * 正常系テストケース
   * TODO作成のリクエスト送信時に実行
   */
  it('postTodoAction', () => {
    const state: ITodoState = {
      currentTodo: {
        id: 0,
        title: '',
      },
      todoList: [{ id: 0, title: '' }],
      loading: false,
      isError: true,
      errors: {
        message: '',
      },
    };

    const postTodoRequest = {
      title: 'ねこのご飯を買う',
    };

    const result = reducer(state, postTodoAction(postTodoRequest));

    expect(result.currentTodo.title).toBe(postTodoRequest.title);
    expect(result.loading).toBeTruthy();
    expect(result.isError).toBeFalsy();
  });

  /**
   * 正常系テストケース
   * 全てのTODOの取得が成功した際に実行
   */
  it('fetchAllTodoSuccessAction', () => {
    const state: ITodoState = {
      currentTodo: {
        id: 0,
        title: '',
      },
      todoList: [{ id: 0, title: '' }],
      loading: true,
      isError: true,
      errors: {
        message: '',
      },
    };

    const todoList: [ITodoEntity] = [{
      id: 1,
      title: 'ねこのご飯を買う',
    }];

    const result = reducer(state, fetchAllTodoSuccessAction(todoList));

    expect(result.todoList).toBe(todoList);
    expect(result.loading).toBeFalsy();
    expect(result.isError).toBeFalsy();
  });
});
