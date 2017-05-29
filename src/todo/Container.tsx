import {connect} from "react-redux";
import {RouteComponentProps} from "react-router";
import {Dispatch} from "redux";
import {ReduxAction, ReduxState} from "../store";
import {addAction} from "./module";
import Todo from "./Todo";

export class ActionDispatcher {
  constructor(private dispatch: (action: ReduxAction) => void) {}

  public addTodo(title: string): void {
    this.dispatch(addAction(title));
  }
}

const mapStateToProps = (state: ReduxState, ownProps: RouteComponentProps<{myParams: string | undefined}>) => {
  if (ownProps.match.params.myParams === undefined) {
    return {value: state.todo};
  }
  return {value: state.todo, param: ownProps.match.params.myParams};
};

const mapDispatchToProps = (dispatch: Dispatch<ReduxAction>) => (
    {actions: new ActionDispatcher(dispatch)}
  );

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
