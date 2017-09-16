import { AxiosInstance } from 'axios';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Dispatch } from 'redux';
import HttpClientFactory from '../../factories/HttpClientFactory';
import { IReduxState, ReduxAction } from '../../store';
import { fetchAllTodoSuccessAction, ICreateTodoRequest, postTodoAction } from './module';
import Todo from './Todo';

/**
 * ActionDispatcher
 * 非同期処理でのビジネスロジックを定義し、Actionをdispatchする
 *
 * @link http://qiita.com/uryyyyyyy/items/d8bae6a7fca1c4732696
 */
export class ActionDispatcher {

  /**
   * @param {(action: ReduxAction) => void} dispatch
   * @param {AxiosInstance} httpClient
   */
  constructor(
    private dispatch: (action: ReduxAction) => void,
    private httpClient: AxiosInstance,
  ) {}

  /**
   * TODOを作成する
   *
   * @param {ICreateTodoRequest} request
   * @returns {Promise<void>}
   */
  public async create(request: ICreateTodoRequest): Promise<void> {
    try {
      const axiosResponse = await this.httpClient.post('/api/todo', request);

      if (axiosResponse.status !== 201) {
        return Promise.reject(
          new Error(`illegal status code: ${axiosResponse.status}`),
        );
      }

      this.dispatch(
        postTodoAction(request),
      );

      await this.fetchAll();
    } catch (error) {
      // TODO 異常系のactionを作る必要がある
      return Promise.reject(error);
    }
  }

  /**
   * 全てのTODOを取得する
   *
   * @returns {Promise<void>}
   */
  public async fetchAll(): Promise<void> {
    try {
      const axiosResponse = await this.httpClient.get('/api/todo');

      if (axiosResponse.status !== 200) {
        return Promise.reject(
          new Error(`illegal status code: ${axiosResponse.status}`),
        );
      }

      this.dispatch(fetchAllTodoSuccessAction(axiosResponse.data));
    } catch (error) {
      // TODO 異常系のactionを作る必要がある
      return Promise.reject(error);
    }
  }
}

const axiosInstance = HttpClientFactory.create();

const mapStateToProps = (state: IReduxState, ownProps: RouteComponentProps<{todoId: string | undefined}>) => {
  if (ownProps.match.params.todoId === undefined) {
    return { value: state.todo };
  }
  return { value: state.todo, param: ownProps.match.params.todoId };
};

const mapDispatchToProps = (dispatch: Dispatch<ReduxAction>) => ({
  actions: new ActionDispatcher(dispatch, axiosInstance),
});

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
