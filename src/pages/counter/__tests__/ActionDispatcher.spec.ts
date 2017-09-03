import HttpClientFactory from "../../../factories/HttpClientFactory";
import {ActionDispatcher} from "../Container";
import {fetchRequestFinish, fetchRequestStart, incrementAmount} from "../module";
import {AxiosPromise, AxiosRequestConfig} from "axios";

/**
 * ActionDispatcherのテスト
 */
describe("ActionDispatcher", () => {

  /**
   * 正常系テスト
   * インクリメントが正常に行われる
   */
  it("increment", () => {
    const spy: any = {dispatch: null};
    spyOn(spy, "dispatch");

    const axiosInstance = HttpClientFactory.create();
    const actions = new ActionDispatcher(spy.dispatch, axiosInstance);
    actions.increment(100);
    expect(spy.dispatch.calls.count()).toEqual(1);
    expect(spy.dispatch.calls.argsFor(0)[0]).toEqual(incrementAmount(100));
  });

  /**
   * 正常系テスト
   * 非同期でのインクリメントが正常に行われる
   */
  it("fetchAmount success", async (done) => {
    const mockResponse = {
      amount: 100,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    const mockAdapter = (requestConfig: AxiosRequestConfig): AxiosPromise => {
      return new Promise((resolve) => {
        resolve({
          data: mockResponse,
          status: 200,
          statusText: "OK",
          headers,
          config: requestConfig
        });
      });
    };

    const axiosInstance = HttpClientFactory.createMockInstance(mockAdapter);

    const spy: any = {dispatch: null};
    spyOn(spy, "dispatch");
    const actions = new ActionDispatcher(spy.dispatch, axiosInstance);
    await actions.asyncIncrement();
    expect(spy.dispatch.calls.count()).toEqual(3);
    expect(spy.dispatch.calls.argsFor(0)[0]).toEqual(fetchRequestStart());
    expect(spy.dispatch.calls.argsFor(1)[0]).toEqual(incrementAmount(100));
    expect(spy.dispatch.calls.argsFor(2)[0]).toEqual(fetchRequestFinish());
    done();
  });

  /**
   * 異常系テスト
   * APIから400 Bad Requestがレスポンスされる
   */
  it("fetchAmount Bad Request", async (done) => {
    const mockResponse = {};

    const headers = {
      "Content-Type": "application/json",
    };

    const mockAdapter = (requestConfig: AxiosRequestConfig): AxiosPromise => {
      return new Promise((resolve) => {
        resolve({
          data: mockResponse,
          status: 400,
          statusText: "Bad Request",
          headers,
          config: requestConfig
        });
      });
    };

    const axiosInstance = HttpClientFactory.createMockInstance(mockAdapter);

    const spy: any = {dispatch: null};
    spyOn(spy, "dispatch");
    const actions = new ActionDispatcher(spy.dispatch, axiosInstance);
    await actions.asyncIncrement();
    expect(spy.dispatch.calls.count()).toEqual(2);
    expect(spy.dispatch.calls.argsFor(0)[0]).toEqual(fetchRequestStart());
    expect(spy.dispatch.calls.argsFor(1)[0]).toEqual(fetchRequestFinish());
    done();
  });
});
