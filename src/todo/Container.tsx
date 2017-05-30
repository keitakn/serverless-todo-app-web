import {connect} from "react-redux";
import {RouteComponentProps} from "react-router";
import {Dispatch} from "redux";
import {ReduxAction, ReduxState} from "../store";
import {addAction} from "./module";
import Todo from "./Todo";
import {AxiosInstance} from "axios";
import HttpClientFactory from "../factories/HttpClientFactory";

export class ActionDispatcher {
  constructor(private dispatch: (action: ReduxAction) => void, private axiosInstance: AxiosInstance) {}

  public async addTodo(title: string): Promise<void> {
    try {
      const axiosResponse = await this.axiosInstance.post("/api/todo", {title: title});

      if (axiosResponse.status !== 201) {
        throw new Error(`illegal status code: ${axiosResponse.status}`);
      }

      this.dispatch(addAction(title));
    } catch (error) {
      console.error(error);
    }
  }
}

const axiosInstance = HttpClientFactory.create();

const mapStateToProps = (state: ReduxState, ownProps: RouteComponentProps<{myParams: string | undefined}>) => {
  if (ownProps.match.params.myParams === undefined) {
    return {value: state.todo};
  }
  return {value: state.todo, param: ownProps.match.params.myParams};
};

const mapDispatchToProps = (dispatch: Dispatch<ReduxAction>) => (
    {actions: new ActionDispatcher(dispatch, axiosInstance)}
  );

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
