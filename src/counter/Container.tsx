import {connect} from "react-redux";
import {RouteComponentProps} from "react-router";
import {Dispatch} from "redux";
import {ReduxAction, ReduxState} from "../store";
import {Counter} from "./Counter";
import {decrementAmount, fetchRequestFinish, fetchRequestStart, incrementAmount} from "./module";

export class ActionDispatcher {

  private myHeaders = new Headers({
    "Content-Type": "application/json",
    "Accept": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  });

  constructor(private dispatch: (action: ReduxAction) => void) {}

  public increment(amount: number): void {
    this.dispatch(incrementAmount(amount));
  }

  public decrement(amount: number): void {
    this.dispatch(decrementAmount(amount));
  }

  public async asyncIncrement(): Promise<void> {
    this.dispatch(fetchRequestStart());

    try {
      const response: Response = await fetch("/api/count", {
        method: "GET",
        headers: this.myHeaders,
      });

      if (response.status === 200) {
        const json: {amount: number} = await response.json();
        this.dispatch(incrementAmount(json.amount));
      } else {
        throw new Error(`illegal status code: ${response.status}`);
      }
    } catch (err) {
      console.error(err);
    } finally {
      this.dispatch(fetchRequestFinish());
    }
  }
}

export default connect(
  (state: ReduxState) => ({value: state.counter}),
  (dispatch: Dispatch<ReduxAction>, ownProps: RouteComponentProps<{myParams: string}>) => {
    return {actions: new ActionDispatcher(dispatch)};
  },
)(Counter);
