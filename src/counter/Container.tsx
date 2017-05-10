import axios from "axios";
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
      const requestConfig = {
        headers: this.myHeaders,
      };

      const axiosInstance = axios.create(requestConfig);

      const axiosResponse = await axiosInstance.get("/api/count");

      if (axiosResponse.status !== 200) {
        throw new Error(`illegal status code: ${axiosResponse.status}`);
      }

      this.dispatch(
        incrementAmount(axiosResponse.data.amount),
      );

    } catch (error) {
      console.error(error);
    } finally {
      this.dispatch(fetchRequestFinish());
    }
  }
}

const mapStateToProps    = (state: ReduxState) => ({value: state.counter});
const mapDispatchToProps = (dispatch: Dispatch<ReduxAction>, ownProps: RouteComponentProps<{myParams: string}>) => {
  return {actions: new ActionDispatcher(dispatch)};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Counter);
