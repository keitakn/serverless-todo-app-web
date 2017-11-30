import { AxiosError, AxiosInstance } from 'axios';
import { AppConfig } from '../AppConfig';
import getTodoAppBackendUri = AppConfig.getTodoAppBackendUri;

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

    const apiResponse = await httpClient.post(url, request).catch((error: AxiosError) => {
      // TODO 後でエラーハンドリングをちゃんと書く
      return Promise.reject(error);
    });

    const todoEntity: ITodoEntity = apiResponse.data;

    return todoEntity;
  };
}


