import {AxiosInstance} from "axios";
import {connect} from "react-redux";
import {RouteComponentProps} from "react-router";
import {Dispatch} from "redux";
import HttpClientFactory from "../../factories/HttpClientFactory";
import {ReduxAction, ReduxState} from "../../store";
import {addTodoAction, fetchAllTodoAction} from "./module";
import Todo from "./Todo";

export class ActionDispatcher {
  constructor(private dispatch: (action: ReduxAction) => void, private axiosInstance: AxiosInstance) {}

  public async addTodo(title: string): Promise<void> {
    try {
      const axiosResponse = await this.axiosInstance.post("/api/todo", {title});

      if (axiosResponse.status !== 201) {
        throw new Error(`illegal status code: ${axiosResponse.status}`);
      }

      this.dispatch(addTodoAction(title));

      await this.findAll();
    } catch (error) {
      console.error(error);
    }
  }

  public async findAll(): Promise<void> {
    try {
      const axiosResponse = await this.axiosInstance.get("/api/todo");

      if (axiosResponse.status !== 200) {
        throw new Error(`illegal status code: ${axiosResponse.status}`);
      }

      this.dispatch(fetchAllTodoAction(axiosResponse.data));
    } catch (error) {
      return Promise.reject(error);
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
