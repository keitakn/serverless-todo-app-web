import axios, { AxiosAdapter, AxiosInstance } from 'axios';

/**
 * HttpClientFactory
 *
 * @author keita-nishimoto
 * @since 2017-05-13
 */
export default class HttpClientFactory {

  /**
   * HTTPクライアントを生成する
   *
   * @returns {AxiosInstance}
   */
  public static create(): AxiosInstance {
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    const requestConfig = {
      headers,
    };

    return axios.create(requestConfig);
  }

  /**
   * HTTPクライアントのモックを生成する
   *
   * @param mockAdapter
   * @returns {AxiosInstance}
   */
  public static createMockInstance(mockAdapter: AxiosAdapter): AxiosInstance {
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    };

    const requestConfig = {
      headers,
      adapter: mockAdapter,
    };

    return axios.create(requestConfig);
  }
}
