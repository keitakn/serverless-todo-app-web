import { AxiosError, AxiosInstance } from 'axios';
import { AppConfig } from '../AppConfig';
import getTodoAppBackendUri = AppConfig.getTodoAppBackendUri;
import { CognitoUserSession } from 'amazon-cognito-identity-js';

/**
 * TodoService
 * Todoアプリのビジネスロジック置き場
 *
 * @author keita-nishimoto
 * @since 2017-12-01
 */
export namespace TodoService {

  /**
   * TODOのデータ型
   */
  export interface ITodoEntity {
    id: string;
    title: string;
    isCompleted: boolean;
    createdAt: string;
    updatedAt: string;
  }

  /**
   * TODO作成のリクエスト型
   */
  export interface ICreateTodoRequest {
    title: string;
    session: CognitoUserSession;
  }

  /**
   * TODOリスト取得のリクエスト型
   */
  export interface IFetchTodoListRequest {
    session: CognitoUserSession;
  }

  /**
   * TODOを作成する
   *
   * @param {TodoService.ICreateTodoRequest} request
   * @param {AxiosInstance} httpClient
   * @returns {Promise<TodoService.ITodoEntity>}
   */
  export const createTodo = async (request: ICreateTodoRequest, httpClient: AxiosInstance) => {
    const url = `${getTodoAppBackendUri()}/todo`;

    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: request.session.getIdToken().getJwtToken(),
    };

    const requestConfig = {
      headers,
    };

    const createRequest = {
      title: request.title,
    };

    const apiResponse = await httpClient.post(url, createRequest, requestConfig).catch((error: AxiosError) => {
      // TODO 後でエラーハンドリングをちゃんと書く
      return Promise.reject(error);
    });

    const todoEntity: ITodoEntity = apiResponse.data;

    return todoEntity;
  };

  /**
   * TODOリストを取得する
   *
   * @param {TodoService.IFetchTodoListRequest} request
   * @param {AxiosInstance} httpClient
   * @returns {Promise<[TodoService.ITodoEntity]>}
   */
  export const fetchAllTodoList = async (request: IFetchTodoListRequest, httpClient: AxiosInstance) => {
    const url = `${getTodoAppBackendUri()}/todo`;

    const headers = {
      'Content-Type': 'application/json',
      Authorization: request.session.getIdToken().getJwtToken(),
    };

    const requestConfig = {
      headers,
    };

    const apiResponse = await httpClient.get(url, requestConfig).catch((error: AxiosError) => {
      // TODO 後でエラーハンドリングをちゃんと書く
      return Promise.reject(error);
    });

    const todoList: [ITodoEntity] = apiResponse.data.items;

    return todoList;
  };
}


