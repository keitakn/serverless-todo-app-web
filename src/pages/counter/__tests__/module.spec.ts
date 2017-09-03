import reducer, {decrementAmount} from "../module";
import {CounterState, incrementAmount} from "../module";

/**
 * counter/module(Action, reducer)のテスト
 */
describe("counter/module", () => {

  /**
   * 正常系テスト
   * numが意図した数になるか確認
   */
  it("INCREMENT", () => {
    const state: CounterState = {num: 4, loadingCount: 0};
    const result = reducer(state, incrementAmount(3));
    expect(result.num).toBe(state.num + 3);
  });

  /**
   * 正常系テスト
   * numが意図した数になるか確認
   */
  it("DECREMENT", () => {
    const state: CounterState = {num: 4, loadingCount: 0};
    const result = reducer(state, decrementAmount(3));
    expect(result.num).toBe(state.num - 3);
  });
});
